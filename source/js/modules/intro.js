import * as THREE from 'three';
import helperRawShaderMaterial from '../helpers/helperRawShaderMaterial';
import SVGObject from './StoryScene/utils/svgObject';
import {
  degToRadians
} from './story.js';
import {
  colors,
  reflectivity
} from '../helpers/colorsAndReflection.js';

export default class Intro {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspectRation = this.width / this.height;

    this.texture = {
      src: './img/module-5/scenes-textures/scene-0.png',
      options: {
        hue: 0.0
      }
    };
    this.textureWidth = 2048;
    this.textureHeight = 1024;
    this.textureRatio = this.textureWidth / this.textureHeight;

    this.canvasId = 'canvas-intro';

    this.render = this.render.bind(this);
  }

  setMaterial(options = {}) {
    const {
      color,
      ...other
    } = options;

    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      ...other
    });
  }

  init() {
    if (!this.initialized) {
      this.prepareScene();
      this.initialized = true;
    }

    this.animationRequest = requestAnimationFrame(this.render);
  }

  prepareScene() {
    this.canvas = document.getElementById(this.canvasId);
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(45, this.aspectRation, 0.1, 1200);
    this.camera.position.z = 1200;

    this.color = new THREE.Color(0x5f458c);
    this.alpha = 1;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas
    });
    this.renderer.setClearColor(this.color, this.alpha);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);

    this.constructChildren();

    const loadManager = new THREE.LoadingManager();
    const textureLoader = new THREE.TextureLoader(loadManager);
    const loadedTexture = textureLoader.load(this.texture.src);

    loadManager.onLoad = () => {
      const geometry = new THREE.PlaneGeometry(1, 1);
      const material = new THREE.RawShaderMaterial(helperRawShaderMaterial({
        map: {
          value: loadedTexture
        },
        options: {
          value: this.texture.options
        }
      }));
      const image = new THREE.Mesh(geometry, material);

      image.scale.x = this.textureWidth;
      image.scale.y = this.textureHeight;

      const lights = this.getLight();
      lights.position.z = this.camera.position.z;
      this.scene.add(lights);

      this.scene.add(image);
      this.render();
    };

    this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
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

  constructChildren() {
    this.getKeyhole();
    this.getFlamingo();
    this.getLeaf();
    this.getSnowflake();
    this.getQuestion();
    this.getDummy();
  }

  async getKeyhole() {
    const keyhole = await new SVGObject(`keyhole`).getObject();

    keyhole.position.set(-1500, 1515, 0);
    keyhole.scale.set(1.5, -1.5, 1.5);

    this.scene.add(keyhole);
  }

  getDummy() {
    const dummy = new THREE.PlaneGeometry(1000, 1000);
    const dummyMesh = new THREE.Mesh(dummy, this.setMaterial({
      color: colors.Purple,
      ...reflectivity.basic
    }));

    dummyMesh.position.set(0, 0, 10);
    this.scene.add(dummyMesh);
  }

  async getFlamingo() {
    const flamingo = await new SVGObject(`flamingo`).getObject();

    flamingo.position.set(-320, 390, 50);
    flamingo.rotation.copy(new THREE.Euler(degToRadians(10), degToRadians(30), degToRadians(10)), `XYZ`);
    flamingo.scale.set(-2, -2, 2);


    this.scene.add(flamingo);
  }

  async getLeaf() {
    const leaf = await new SVGObject(`leaf-intro`).getObject();

    leaf.position.set(560, 230, 50);
    leaf.rotation.copy(new THREE.Euler(degToRadians(10), degToRadians(10), degToRadians(-60)), `XYZ`);
    leaf.scale.set(1, -1, 1);


    this.scene.add(leaf);
  }

  async getSnowflake() {
    const snowflake = await new SVGObject(`snowflake`).getObject();

    snowflake.position.set(-300, -10, 100);
    snowflake.rotation.copy(new THREE.Euler(degToRadians(-10), degToRadians(20), degToRadians(20)), `XYZ`);
    snowflake.scale.set(1.3, 1.3, 1.3);


    this.scene.add(snowflake);
  }

  async getQuestion() {
    const question = await new SVGObject(`question`).getObject();

    question.position.set(100, -310, 100);
    question.rotation.copy(new THREE.Euler(degToRadians(-10), degToRadians(10), degToRadians(20)), `XYZ`);
    question.scale.set(1.5, -1.5, 1.5);


    this.scene.add(question);
  }

}
