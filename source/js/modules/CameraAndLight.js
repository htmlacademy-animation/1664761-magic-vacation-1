import * as THREE from 'three';
import easingFunc from '../helpers/utilities.js';
import {
  degToRadians
} from '../helpers/utilities.js';
import {
  isScenery
} from './IntroAndStory.js';

class CameraAndLight extends THREE.Group {
  constructor(camera, introGroup, storyGroup) {
    super();

    const optPosition = {
      ls: [0, 600, 1900],
      po: [0, 600, 2300],
    };

    this.angle = 0;

    const directionalLight = new THREE.DirectionalLight(new THREE.Color(`rgb(255,255,255)`), 1.3);
    directionalLight.position.set(0, 800, 0);
    directionalLight.target = storyGroup;

    let cameraAndLightGroup = new THREE.Group();
    let cameraMouseRotationRig = new THREE.Group();

    cameraMouseRotationRig.add(camera);
    cameraAndLightGroup.add(cameraMouseRotationRig, directionalLight);

    this.add(cameraAndLightGroup);

    this.isIntroScene = true;

    this.activeObjects = {
      camera,
      introGroup,
      storyGroup,
      cameraMouseRotationRig,
      cameraAndLightGroup,
      optPosition
    };
  }

  setCameraIntro() {
    const {
      camera,
      introGroup,
      storyGroup,
      cameraAndLightGroup
    } = this.activeObjects;

    this.rotation.copy(new THREE.Euler(0, 0, 0));
    cameraAndLightGroup.position.set(0, -storyGroup.position.y, -storyGroup.position.z + 1405);
    camera.lookAt(introGroup.position.x, introGroup.position.y, introGroup.position.z);
  }

  setCameraStory(finish, duration, ease, endCB = () => {}) {
    const {
      camera,
      storyGroup,
      cameraAndLightGroup,
      optPosition
    } = this.activeObjects;

    let progress = 0;
    let startTime = Date.now();

    const start = this.angle;
    const thisObj = this;

    let position;
    let lookAtY = 0;

    function loop() {

      progress = (Date.now() - startTime) / duration;

      const easing = easingFunc[ease](progress);

      const angle = start + easing * (finish - start);

      if (progress > 1) {
        thisObj.rotation.copy(new THREE.Euler(0, degToRadians(finish), 0));
        endCB();
        thisObj.angle = finish;
        return;
      }

      if (isScenery) {
        position = optPosition.ls;
        lookAtY = 0;
      } else {
        position = optPosition.po;
        lookAtY = -200;
      }

      cameraAndLightGroup.position.set(...position);

      camera.lookAt(storyGroup.position.x, storyGroup.position.y + lookAtY, storyGroup.position.z);

      thisObj.rotation.copy(new THREE.Euler(0, degToRadians(angle), 0));

      requestAnimationFrame(loop);
    }

    loop();
  }

  setCameraRotation(coef) {
    const {
      cameraMouseRotationRig,
      camera,
      storyGroup,
      introGroup
    } = this.activeObjects;

    let lookAtY = 0;

    cameraMouseRotationRig.position.y = coef * 50;

    if (isScenery) {
      lookAtY = 0;
    } else {
      lookAtY = -200;
    }

    if (this.isIntroScene) {
      camera.lookAt(introGroup.position.x, introGroup.position.y, introGroup.position.z);
    } else {
      camera.lookAt(storyGroup.position.x, storyGroup.position.y + lookAtY, storyGroup.position.z);
    }
  }

  animIntroToStory(endCB) {
    const {
      camera,
      introGroup,
      storyGroup,
      cameraAndLightGroup,
      optPosition
    } = this.activeObjects;

    const duration = 500;

    let position;
    let lookAtY = 0;

    if (isScenery) {
      position = optPosition.ls;
      lookAtY = 0;
    } else {
      position = optPosition.po;
      lookAtY = -200;
    }

    this.animateLookAt(camera, [introGroup.position.x, introGroup.position.y, introGroup.position.z], [storyGroup.position.x, storyGroup.position.y + lookAtY, storyGroup.position.z], duration, 'easeLinear');
    this.animateMove(cameraAndLightGroup, position, duration, 'easeLinear', endCB);
  }

  animateMove(item, finish, duration, ease, endCB = () => {}) {
    let progress = 0;
    let startTime = Date.now();
    const start = [item.position.x, item.position.y, item.position.z];
    const setParamsXYZ = this.setParamsXYZ;

    function loop() {

      progress = (Date.now() - startTime) / duration;

      const easing = easingFunc[ease](progress);

      const position = setParamsXYZ(start, finish, easing);

      if (progress > 1) {
        item.position.set(...finish);
        endCB();
        return;
      }

      item.position.set(...position);

      requestAnimationFrame(loop);
    }

    loop();
  }

  animateLookAt(item, start, finish, duration, ease, endCB = () => {}) {
    let progress = 0;
    let startTime = Date.now();
    const setParamsXYZ = this.setParamsXYZ;

    function loop() {

      progress = (Date.now() - startTime) / duration;

      const easing = easingFunc[ease](progress);

      const look = setParamsXYZ(start, finish, easing);

      if (progress > 1) {
        item.lookAt(...finish);
        endCB();
        return;
      }

      item.lookAt(...look);

      requestAnimationFrame(loop);
    }

    loop();
  }

  setParamsXYZ(start, finish, easing) {
    let paramsArr = [];

    for (let i = 0; i <= 2; i++) {
      const param = start[i] + easing * (finish[i] - start[i]);
      paramsArr.push(param);
    }

    return paramsArr;
  }

  addChild(item) {
    this.add(item);
  }
}

export default CameraAndLight;
