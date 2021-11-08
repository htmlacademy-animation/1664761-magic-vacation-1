import * as THREE from 'three';
import helperRawShaderMaterial from '../helpers/helperRawShaderMaterial';
import {
  animateFPS
} from '../helpers/animate.js';
import SceneAllStory from './StoryScene/StorySceneAll.js';
import {
  OrbitControls
} from '../../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { degToRadians } from '../helpers/utilities';


export class Story {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.center = {
      x: this.width / 2,
      y: this.height / 2
    };
    this.aspectRation = this.width / this.height;

    this.textures = [{
        src: './img/module-5/scenes-textures/scene-1.png',
        options: {
          hue: 0.0
        },
        // scene: new StoryScene1()
      },
      {
        src: `./img/module-5/scenes-textures/scene-2.png`,
        options: {
          hue: 0.1,
          isMagnifier: true,
          animationSettings: {
            hue: {
              initalHue: 0.1,
              finalHue: -0.4,
              duration: 2000,
              variation: 0.4,
            },
          },
        },
        // scene: new StoryScene2()
      },
      {
        src: './img/module-5/scenes-textures/scene-3.png',
        options: {
          hue: 0.0
        },
        // scene: new StoryScene3()
      },
      {
        src: './img/module-5/scenes-textures/scene-4.png',
        options: {
          hue: 0.0
        },
        // scene: new StoryScene4()
      },
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

    this.textureWidth = 2048;
    this.textureHeight = 1024;
    this.textureRatio = this.textureWidth / this.textureHeight;

    this.canvasId = 'canvas-story';

    this.animateBubbles = this.animateBubbles.bind(this);
    this.render = this.render.bind(this);
  }

  addBubble(i) {
    const width = this.renderer.getSize().width;
    const pixelRatio = this.renderer.getPixelRatio();

    if (this.textures[i].options.isMagnifier) {
      return {
        magnification: {
          value: {
            bubbles: this.bubbles,
            resolution: [width * pixelRatio, width / this.textureRatio * pixelRatio],
          }
        },
      };
    }

    return {};
  }

  init() {
    this.canvas = document.getElementById(this.canvasId);
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.scene = new THREE.Scene();
    this.addSceneAllStory();

    this.camera = new THREE.PerspectiveCamera(35, this.aspectRation, 0.1, 2550);

    this.controls = new OrbitControls(this.camera, document.getElementById('story'));

    this.color = new THREE.Color(0x5f458c);
    this.alpha = 1;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: false,
      logarithmicDepthBuffer: false,
      powerPreference: 'high-performance'
    });
    this.renderer.setClearColor(this.color, this.alpha);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);

    const lights = this.getLight();
    this.lights = lights;
    this.lights.position.z = this.camera.position.z;
    this.scene.add(this.lights);

    this.isAnim = true;


    this.render();
  }

  addSceneAllStory() {
    const sceneAllStory = new SceneAllStory();

    sceneAllStory.position.set(0, 0, -3000);
    sceneAllStory.rotation.copy(new THREE.Euler(0, degToRadians(-45), 0));

    this.SceneAllStory = sceneAllStory;
    this.scene.add(sceneAllStory);
  }

  resetHueShift() {
    this.textures[1].options.hue = this.textures[1].options.hue;
  }

  hueShiftIntensityAnimationTick(from, to) {
    return (progress) => {
      let hueShift;
      if (progress < 0.5) {
        hueShift = from + progress * (to - from);
      } else {
        hueShift = to + progress * (from - to);
      }
      this.textures[1].options.hue = hueShift;
    };
  }

  animateHueShift() {
    const {
      initalHue,
      finalHue,
      duration,
      variation
    } = this.textures[1].options.animationSettings.hue;

    const offset = (Math.random() * variation * 2 + (1 - variation));

    let anim = () => {
      animateFPS(this.hueShiftIntensityAnimationTick(initalHue, finalHue * offset), duration * offset, 30, () => {
        if (activeScene == 1) {
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
      animateFPS(this.bubblePositionAnimationTick(this.bubbles[index], this.bubbles[index].initialPosition, this.bubbles[index].finalPosition), this.bubblesDuration, 30, () => {
        if (activeScene === 1) {
          anim();
        }
      });
    };
    anim();
  }

  resetBubbles() {
    this.bubbles.forEach((_, index) => {
      this.bubbles[index].position = [...this.bubbles[index].initialPosition];
    });
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    this.controls.update();

    if (this.isAnim) {
      requestAnimationFrame(this.render);
    } else {
      cancelAnimationFrame(this.render);
    }
  }

  setScene(i) {
    this.render();

    activeScene = i;
    let angle = 0;

    if (i == 1) {
      if (animHueKey != true) {
        animHueKey = true;
        this.resetHueShift();
        this.animateHueShift();

        this.resetBubbles();
        this.animateBubbles(0);
        this.animateBubbles(1);
        this.animateBubbles(2);
      }

    } else {
      animHueKey = false;
    }

    if (i == 0) {
      angle = 90;
    } else if (i == 1) {
      angle = 0;
    } else if (i == 2) {
      angle = -90;
    } else if (i == 3) {
      angle = 180;
    }

    this.setCamera(angle);
  }

  setCamera(angle) {
    const posX = 2250 * Math.cos(degToRadians(angle));
    const posZ = 2250 * Math.sin(degToRadians(angle));

    this.camera.position.set(this.SceneAllStory.position.x + posX, 800, this.SceneAllStory.position.z + posZ);

    this.controls.target.set(this.SceneAllStory.position.x, this.SceneAllStory.position.y, this.SceneAllStory.position.z);

    this.setPositionLight();
  }

  setPositionLight() {
    this.lights.position.x = this.camera.position.x;
    this.lights.position.z = this.camera.position.z;
  }

  getLight() {
    const light = new THREE.Group();

    let lightUnit = new THREE.DirectionalLight(new THREE.Color(`rgb(255,255,255)`), 0.8);
    lightUnit.position.set(0, 1000, 3000);
    light.add(lightUnit);

    lightUnit = new THREE.PointLight(new THREE.Color(`rgb(246,242,255)`), 0.5, 3000, 0.5);
    lightUnit.position.set(-785, -350, 710);
    light.add(lightUnit);

    lightUnit = new THREE.PointLight(new THREE.Color(`rgb(245,254,255)`), 0.5, 3000, 0.5);
    lightUnit.position.set(730, -800, 985);
    light.add(lightUnit);

    return light;
  }

  appendRendererToDOMElement(renderer, targetNode) {
    targetNode.appendChild(renderer.domElement);
  }

}

export let activeScene;

let animHueKey = false;
