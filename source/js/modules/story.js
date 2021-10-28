import * as THREE from 'three';
import helperRawShaderMaterial from '../helpers/helperRawShaderMaterial';
import {
  animateFPS
} from '../helpers/animate.js';
import StoryScene1 from './StoryScene/StoryScene1.js';
import StoryScene2 from './StoryScene/StoryScene2.js';
import StoryScene3 from './StoryScene/StoryScene3.js';


export const setMaterial = (color) => {
  return new THREE.MeshStandardMaterial({
    color: color,
  });
};

export const degToRadians = (deg) => (deg * Math.PI) / 180;

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
        scene: new StoryScene1()
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
        scene: new StoryScene2()
      },
      {
        src: './img/module-5/scenes-textures/scene-3.png',
        options: {
          hue: 0.0
        },
        scene: new StoryScene3()
      },
      {
        src: './img/module-5/scenes-textures/scene-4.png',
        options: {
          hue: 0.0
        }
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

    this.camera = new THREE.PerspectiveCamera(35, this.aspectRation, 0.1, 1200);
    this.camera.position.z = 750;

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

    const loadManager = new THREE.LoadingManager();
    const textureLoader = new THREE.TextureLoader(loadManager);
    const loadedTextures = this.textures.map((texture) => ({
      src: textureLoader.load(texture.src),
      options: texture.options,
      scene: texture.scene
    }));
    const geometry = new THREE.PlaneGeometry(1, 1);


    loadManager.onLoad = () => {
      loadedTextures.forEach((texture, i) => {
        const material = new THREE.RawShaderMaterial(helperRawShaderMaterial({
          map: {
            value: texture.src
          },
          options: {
            value: texture.options
          },
          ...this.addBubble(i),
        }));
        const image = new THREE.Mesh(geometry, material);
        image.scale.x = this.textureWidth;
        image.scale.y = this.textureHeight;
        image.position.x = this.textureWidth * i;

        const lights = this.getLight();
        lights.position.z = this.camera.position.z;
        this.scene.add(lights);

        if (texture.scene) {
          texture.scene.position.x = this.textureWidth * i;
          this.scene.add(texture.scene);
        }

        this.scene.add(image);

      });
      this.render();
    };
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

    if (activeScene == 1) {
      requestAnimationFrame(this.render);
    } else {
      cancelAnimationFrame(this.render);
    }
  }

  setScene(i) {
    this.camera.position.x = this.textureWidth * i;
    this.render();

    activeScene = i;

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
  }

  getLight() {
    const light = new THREE.Group();

    let lightUnit = new THREE.DirectionalLight(new THREE.Color(`rgb(255,255,255)`), 0.3);
    lightUnit.position.set(0, this.camera.position.z * Math.tan(-15 * THREE.Math.DEG2RAD), this.camera.position.z);
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
