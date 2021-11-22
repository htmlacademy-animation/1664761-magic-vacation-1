import * as THREE from 'three';
import SceneIntro from './intro.js';
import SceneAllStory from './StoryScene/StorySceneAll.js';
import {
  loadModel
} from './StoryScene/utils/loadModel.js';
import {
  degToRadians
} from '../helpers/utilities.js';
import {
  animateScale,
  animateMoveY
} from '../helpers/animate.js';
import CameraAndLight from './CameraAndLight.js';
import ModelObject from './StoryScene/utils/modelObject.js';

export let isScenery;

class IntroAndStory {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspectRation = this.width / this.height;

    this.textureWidth = 2048;
    this.textureHeight = 1024;
    this.textureRatio = this.textureWidth / this.textureHeight;

    this.canvasID = `canvas-intro-story`;

    this.startTime = -1;

    this.introGroupObj;
    this.introSceneIsAnim = false;
    this.SceneAllStory;
    this.suitcase;
    this.suitcaseOnLoad = false;
    this.cameraAndLight;

    this.render = this.render.bind(this);
    this.updateSize = this.updateSize.bind(this);

    this.isAnim = false;
  }

  init() {
    window.addEventListener(`resize`, this.updateSize);

    this.canvas = document.getElementById(this.canvasID);
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.isScenery();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas
    });
    this.renderer.setClearColor(0x5f458c, 1);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(45, this.aspectRation, 0.1, 5000);

    this.addScene();

    this.cameraAndLight = new CameraAndLight(this.camera, this.introGroupObj, this.SceneAllStory);

    this.cameraAndLight.position.set(this.SceneAllStory.position.x, this.SceneAllStory.position.y, this.SceneAllStory.position.z);
    this.scene.add(this.cameraAndLight);
    this.addSuitcase();

    const lights = this.setLights();
    this.lights = lights;
    this.cameraAndLight.addChild(this.lights);

    this.isAnim = true;

    document.addEventListener(`mousemove`, (e) => {
      let mouseY = e.pageY;
      let windowH = window.innerHeight;
      let coef = 1 - (mouseY / (windowH * 0.5));
      this.cameraAndLight.setCameraRotation(coef);
    });

    this.render();
  }

  addScene() {
    this.addSceneIntro();
    this.addSceneAllStory();
  }

  addSceneIntro() {
    const sceneIntro = new SceneIntro();
    this.sceneIntro = sceneIntro;

    sceneIntro.scale.set(1, 1, 1);
    sceneIntro.position.set(0, 0, 0);
    this.introGroupObj = sceneIntro;
    this.scene.add(sceneIntro);
  }

  addSceneAllStory() {
    const sceneAllStory = new SceneAllStory();

    sceneAllStory.scale.set(1, 1, 1);
    sceneAllStory.position.set(0, -500, -2500);
    sceneAllStory.rotation.copy(new THREE.Euler(0, degToRadians(-45), 0));
    this.SceneAllStory = sceneAllStory;
    this.scene.add(sceneAllStory);
  }

  setSuitcase() {
    const suitcaseGroup = new THREE.Group();
    const model = new ModelObject('suitcase').getObject();

    loadModel(model, true, null, (mesh) => {
      mesh.position.set(-300, 0, 800);
      mesh.scale.set(0, 0, 0);
      mesh.rotation.copy(new THREE.Euler(0, degToRadians(-23), 0));

      suitcaseGroup.add(mesh);
      mesh.name = model.name;
      this.suitcaseOnLoad = true;
      suitcaseGroup.add(mesh);
    });

    return suitcaseGroup;
  }

  addSuitcase() {
    const suitcase = this.setSuitcase();
    this.suitcase = suitcase;
    this.cameraAndLight.addChild(this.suitcase);
  }

  startAnimationsSuitcase() {
    if (this.suitcaseOnLoad != true || this.suitcaseIsAnim != true) {
      return;
    } else {
      setTimeout(() => {
        this.animationsSuitcase();
        this.suitcaseIsAnim = false;
      }, 100);
    }
  }

  animationsSuitcase() {
    const duration = 400;
    const suitcase = this.suitcase.getObjectByName('suitcase');
    animateMoveY(suitcase, 100, 0, duration, 'easeInCubic');
    animateScale(suitcase, [0.9, 0.9, 0.9], [0.85, 0.95, 0.9], duration, 'easeOutCubic', () => {
      animateScale(suitcase, [0.85, 0.95, 0.9], [0.9, 0.9, 1], duration / 2, 'easeOutCubic', () => {
        animateScale(suitcase, [0.9, 0.9, 1], [0.9, 0.95, 0.85], duration / 3, 'easeOutCubic', () => {
          animateScale(suitcase, [0.9, 0.95, 0.85], [0.9, 0.9, 0.9], duration / 3, 'easeOutCubic');
        });
      });
    });
  }

  setLights() {
    const lightsGroup = new THREE.Group();

    let pointLight1 = new THREE.PointLight(new THREE.Color(`rgb(246,242,255)`), 0.1);
    pointLight1.position.set(-500, 500, 1800);
    pointLight1.castShadow = true;
    pointLight1.shadow.camera.far = 3000;
    pointLight1.shadow.mapSize.width = 1000;
    pointLight1.shadow.mapSize.height = 1000;
    lightsGroup.add(pointLight1);

    let pointLight2 = new THREE.PointLight(new THREE.Color(`rgb(245,254,255)`), 0.1);
    pointLight2.position.set(700, 800, 1400);
    pointLight2.castShadow = true;
    pointLight2.shadow.camera.far = 3000;
    pointLight2.shadow.mapSize.width = 1000;
    pointLight2.shadow.mapSize.height = 1000;
    lightsGroup.add(pointLight2);

    return lightsGroup;
  }

  setStory(sceneID) {
    this.activeScene = sceneID;
    const duration = 500;

    let angle = 0;

    if (sceneID === 'intro') {
      this.cameraAndLight.isIntroScene = true;
    } else {
      this.cameraAndLight.isIntroScene = false;
    }

    switch (sceneID) {
      case 'intro':
        this.cameraAndLight.setCameraIntro();
        break;
      case 'fromIntro':
        this.cameraAndLight.animIntroToStory(() => {
          this.introGroupObj.showDummy();
        });
        this.introGroupObj.hideDummy(300, 100);
        break;
      case 0:
        angle = 0;
        this.cameraAndLight.setCameraStory(angle, duration, 'easeLinear');
        break;
      case 1:
        angle = 90;
        this.cameraAndLight.setCameraStory(angle, duration, 'easeLinear');
        break;
      case 2:
        angle = 180;
        this.cameraAndLight.setCameraStory(angle, duration, 'easeLinear');
        break;
      case 3:
        angle = 270;
        this.cameraAndLight.setCameraStory(angle, duration, 'easeLinear');
        break;
    }

  }

  animIntroScene() {
    if (this.introGroupObj.children.length != this.introGroupObj.counterLoadObj) {
      return;
    } else if (this.introSceneIsAnim != true) {
      this.introSceneIsAnim = true;
      this.introGroupObj.startAnimimations();
    }
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    this.animIntroScene();
    this.SceneAllStory.animationsScene(this.activeScene);
    this.startAnimationsSuitcase();

    if (this.isAnim) {
      requestAnimationFrame(this.render);
    } else {
      cancelAnimationFrame(this.render);
    }
  }

  isScenery() {
    isScenery = window.innerHeight < window.innerWidth;
  }

  updateSize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.aspectRation = this.width / this.height;

    this.isScenery();

    this.camera.aspect = this.aspectRation;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);

    this.sceneIntro.setPositionIntroObj();
  }
}

export default IntroAndStory;
