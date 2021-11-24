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
  animateMoveY,
  animateFPS
} from '../helpers/animate.js';
import CameraAndLight from './CameraAndLight.js';
import ModelObject from './StoryScene/utils/modelObject.js';
import {
  EffectComposer
} from 'three/examples/jsm/postprocessing/EffectComposer';
import {
  RenderPass
} from 'three/examples/jsm/postprocessing/RenderPass';
import {
  ShaderPass
} from 'three/examples/jsm/postprocessing/ShaderPass';
import bubbleRawShaderMaterial from '../helpers/helperRawShaderMaterial.js';

export let isScenery;
export let activeScene;

class IntroAndStory {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspectRation = this.width / this.height;

    this.center = {
      x: this.width / 2,
      y: this.height / 2
    };

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

    this.roomSettings = [{
        options: {
          hue: 0.0
        }
      },
      {
        options: {
          hue: 0.1,
          isMagnifier: true,
          animationSettings: {
            hue: {
              initalHue: 0.1,
              finalHue: -0.5,
              duration: 3000,
              variation: 0.3,
            },
          }
        }
      }
    ];

    this.bubbleGlareOffset = 0.8;
    this.bubbleGlareStartRadianAngle = 2;
    this.bubbleGlareEndRadianAngle = 2.8;

    this.bubblesDuration = 4000;

    this.bubbles = [{
        radius: 80,
        initialPosition: [this.center.x - 100, this.center.y - this.height * 1.8],
        position: [this.center.x - 100, this.center.y - this.height * 1.8],
        finalPosition: [this.center.x - 100, this.center.y + this.height * 1.8],
        amplitude: 80,
        glareOffset: this.bubbleGlareOffset,
        glareAngleStart: this.bubbleGlareStartRadianAngle,
        glareAngleEnd: this.bubbleGlareEndRadianAngle
      },
      {
        radius: 60,
        initialPosition: [this.center.x - 350, this.center.y - this.height * 2.2],
        position: [this.center.x - 350, this.center.y - this.height * 2.2],
        finalPosition: [this.center.x - 350, this.center.y + this.height * 1.4],
        amplitude: -100,
        glareOffset: this.bubbleGlareOffset,
        glareAngleStart: this.bubbleGlareStartRadianAngle,
        glareAngleEnd: this.bubbleGlareEndRadianAngle
      },
      {
        radius: 40,
        initialPosition: [this.center.x + 100, this.center.y - this.height * 2.4],
        position: [this.center.x + 100, this.center.y - this.height * 2.4],
        finalPosition: [this.center.x + 100, this.center.y + this.height * 1.2],
        amplitude: 60,
        glareOffset: this.bubbleGlareOffset,
        glareAngleStart: this.bubbleGlareStartRadianAngle,
        glareAngleEnd: this.bubbleGlareEndRadianAngle
      },
    ];

  }

  init() {
    window.addEventListener(`resize`, this.updateSize);

    this.canvas = document.getElementById(this.canvasID);
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.isScenery();

    this.sceneSize = new THREE.Vector2();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      logarithmicDepthBuffer: true
    });
    this.renderer.setClearColor(0x5f458c, 1);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(45, this.aspectRation, 0.1, 5000);

    this.addScene();

    this.composer = new EffectComposer(this.renderer);
    this.composer.setPixelRatio(window.devicePixelRatio);
    this.composer.setPixelRatio(window.devicePixelRatio);
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    this.getEffectMaterial = (texture) => new THREE.RawShaderMaterial(bubbleRawShaderMaterial({
      map: {
        value: texture
      },
      options: {
        value: this.roomSettings[1].options
      },
      ...this.addBubble(1),
    }));
    this.effectMaterial = this.getEffectMaterial();

    const effectPass = new ShaderPass(this.effectMaterial, `map`);
    this.composer.addPass(effectPass);

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
    activeScene = this.activeScene;

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

        this.resetHueShift(0);
        this.resetBubbles();

        this.cameraAndLight.setCameraStory(angle, duration, 'easeLinear');
        break;
      case 1:
        angle = 90;

        this.resetHueShift(1);
        this.animateHueShift();

        this.resetBubbles();
        this.animateBubbles(0);
        this.animateBubbles(1);
        this.animateBubbles(2);

        this.cameraAndLight.setCameraStory(angle, duration, 'easeLinear');
        break;
      case 2:
        angle = 180;

        this.resetHueShift(0);
        this.resetBubbles();

        this.cameraAndLight.setCameraStory(angle, duration, 'easeLinear');
        break;
      case 3:
        angle = 270;

        this.resetHueShift(0);
        this.resetBubbles();

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
    this.composer.render();

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

    const {
      width,
      height
    } = this.getSceneSize();
    const pixelRatio = this.renderer.getPixelRatio();
    const resolution = [width * pixelRatio, height * pixelRatio];
    this.effectMaterial.uniforms.magnification.value.resolution = resolution;
  }

  resetHueShift(i) {
    this.roomSettings[i].options.hue = this.roomSettings[i].options.hue;
  }

  hueShiftIntensityAnimationTick(from, to) {
    return (progress) => {
      let hueShift;
      if (progress < 0.5) {
        hueShift = from + progress * (to - from);
      } else {
        hueShift = to + progress * (from - to);
      }
      this.roomSettings[1].options.hue = hueShift;
    };
  }

  animateHueShift() {
    const {
      initalHue,
      finalHue,
      duration,
      variation
    } = this.roomSettings[1].options.animationSettings.hue;

    const offset = (Math.random() * variation * 2 + (1 - variation));

    let anim = () => {
      animateFPS(this.hueShiftIntensityAnimationTick(initalHue, finalHue * offset), duration * offset, 30, () => {
        if (this.activeScene === 1) {
          anim();
        }
      });
    };
    anim();
  }

  bubblePositionAnimationTick(bubble, from, to) {
    return (progress) => {
      const y = from[1] + progress * (to[1] - from[1]);
      const offset = bubble.amplitude * Math.pow(1 - progress, 1) * Math.sin(progress * Math.PI * 10);
      const x = (offset + bubble.initialPosition[0]);

      bubble.position = [x, y];
    };
  }

  animateBubbles(index) {
    let anim = () => {
      animateFPS(
        this.bubblePositionAnimationTick(this.bubbles[index], this.bubbles[index].initialPosition, this.bubbles[index].finalPosition),
        this.bubblesDuration,
        30,
        () => {
          if (this.activeScene === 1) {
            anim();
          }
        }
      );
    };
    anim();
  }

  resetBubbles() {
    this.bubbles.forEach((_, index) => {
      this.bubbles[index].position = [...this.bubbles[index].initialPosition];
    });
  }

  getSceneSize() {
    this.renderer.getSize(this.sceneSize);
    return this.sceneSize;
  }

  addBubble(index) {
    const {
      width,
      height
    } = this.getSceneSize();
    const pixelRatio = this.renderer.getPixelRatio();

    if (this.roomSettings[index].options.isMagnifier) {
      return {
        magnification: {
          value: {
            bubbles: this.bubbles,
            resolution: [width * pixelRatio, height * pixelRatio],
          }
        },
      };
    }

    return {};
  }

}

export default IntroAndStory;
