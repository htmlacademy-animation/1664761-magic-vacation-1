import * as THREE from 'three';
import helperRawShaderMaterial from '../helpers/helperRawShaderMaterial';
import SVGObject from './StoryScene/utils/svgObject.js';
import {
  degToRadians
} from '../helpers/utilities.js';
import {
  colors,
  reflectivity
} from '../helpers/colorsAndReflection.js';
import ModelObject from './StoryScene/utils/modelObject.js';
import {
  loadModel
} from './StoryScene/utils/loadModel.js';
import {
  loadSVG
} from './StoryScene/utils/svgLoader.js';
import {
  OrbitControls
} from '../../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import {
  animIntroObj,
  animSuitcaseIntro,
  animAirplaneIntro
} from '../helpers/animate.js';


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

    this.isAnim = false;
    this.checkObj = true;
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

    this.isAnim = true;
    this.animationRequest = requestAnimationFrame(this.render);
  }

  prepareScene() {
    this.canvas = document.getElementById(this.canvasId);
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(45, this.aspectRation, 0.1, 3000);
    this.camera.position.z = 1405;

    this.controls = new OrbitControls(this.camera, document.getElementById('top'));

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
      this.animObj();
      this.render();
    };
  }

  animObj() {
    this.objectsArr = [
      this.watermelon,
      this.flamingo,
      this.leaf,
      this.question,
      this.snowflake,
      this.suitcase
    ];

    let i = 0;
    this.objectsArr.forEach((item) => {
      if (!item) {
        i += 1;
      }
    });

    if (i == 0) {
      this.checkObj = false;
      this.startAnimimations();
    }
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    this.controls.update();

    if (this.checkObj) {
      this.animObj();
    }

    if (this.isAnim) {
      requestAnimationFrame(this.render);
    } else {
      cancelAnimationFrame(this.render);
    }
  }

  stopAnim() {
    this.isAnim = false;
  }

  getLight() {
    const light = new THREE.Group();

    let lightUnit = new THREE.DirectionalLight(new THREE.Color(`rgb(255,255,255)`), 0.5);
    lightUnit.position.set(0, this.camera.position.z * Math.tan(degToRadians(-15)), this.camera.position.z);
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
    this.getAirplane();
    this.getSuitcase();
    this.getWatermelon();
    this.getDummy();
  }

  setOptAnimObj() {
    this.flamingo.optAnim = {
      startScale: [0, 0, 0],
      finishScale: [-2, -2, 2],
      startPosition: [0, 0, 100],
      finishPosition: [-480, 370, 100],
      amp: -0.3,
      period: 0.3
    };

    this.watermelon.optAnim = {
      startScale: [0, 0, 0],
      finishScale: [1, 1, 1],
      startPosition: [0, 0, 100],
      finishPosition: [-300, -150, 800],
      amp: -0.3,
      period: 0.3
    };

    this.leaf.optAnim = {
      startScale: [0, 0, 0],
      finishScale: [1.4, -1.4, 1.4],
      startPosition: [0, 0, 100],
      finishPosition: [660, 350, 150],
      amp: 0.3,
      period: 0.3
    };

    this.question.optAnim = {
      startScale: [0, 0, 0],
      finishScale: [1.6, -1.6, 1.6],
      startPosition: [0, 0, 100],
      finishPosition: [100, -330, 100],
      amp: -0.2,
      period: 0.3
    };

    this.snowflake.optAnim = {
      startScale: [0, 0, 0],
      finishScale: [1.4, 1.4, 1.4],
      startPosition: [0, 0, 100],
      finishPosition: [-450, -10, 100],
      amp: 0.3,
      period: 0.2
    };

    this.suitcase.optAnim = {
      startScale: [0, 0, 0],
      finishScale: [0.7, 0.7, 0.7],
      startPosition: [0, 0, 100],
      finishPosition: [-70, -150, 400],
      startRotation: [-100, 0, 0],
      finishRotation: [20, -50, -10],
      amp: -0.1,
      period: 0.35
    };

    this.airplane.optAnim = {
      startScale: [0, 0, 0],
      finishScale: [1.1, 1.1, 1.1],
      startRotationAirplane: [0, -90, -180],
      finishRotationAirplane: [-30, -90, 30],
      startPositionYZ: [0, 0, 0],
      finishPositionYZ: [0, 230, -200],
      startRotationAxis: 0,
      finishRotationAxis: 200,
      amp: 0.3,
      period: 0.4
    };
  }

  getAirplane() {
    const model = new ModelObject('airplane').getObject();

    loadModel(model, true, this.setMaterial({
      color: model.color,
      ...model.reflectivity
    }), (mesh) => {
      const groupScale = this.getGroup('scale', mesh);
      const groupRotationAirplane = this.getGroup('rotationAirplane', groupScale);
      const groupPositionYZ = this.getGroup('positionYZ', groupRotationAirplane);
      const groupRotationAxis = this.getGroup('rotationAxis', groupPositionYZ);
      const groupMove = this.getGroup('move', groupRotationAxis);

      groupScale.scale.set(0, 0, 0);
      groupRotationAirplane.rotation.copy(new THREE.Euler(degToRadians(90), degToRadians(-90), 0));
      groupMove.position.set(140, -170, 0);

      this.airplane = groupMove;
      this.scene.add(this.airplane);
    });
  }

  getSuitcase() {
    const model = new ModelObject('suitcase').getObject();

    loadModel(model, true, null, (mesh) => {
      mesh.rotation.copy(new THREE.Euler(0, degToRadians(-90), 0));

      const groupScale = this.getGroup('scale', mesh);
      const groupRotation = this.getGroup('rotation', groupScale);
      const groupPositionXY = this.getGroup('positionXY', groupRotation);
      const groupMove = this.getGroup('move', groupPositionXY);

      groupScale.scale.set(0, 0, 0);
      groupMove.position.set(0, 0, 50);
      groupRotation.rotation.copy(new THREE.Euler(degToRadians(-100), 0, 0));

      this.suitcase = groupMove;
      this.scene.add(this.suitcase);
    });
  }

  getWatermelon() {
    const model = new ModelObject('watermelon').getObject();

    loadModel(model, true, null, (mesh) => {
      mesh.name = model.name;
      mesh.position.set(-500, -280, 250);
      mesh.rotation.copy(new THREE.Euler(degToRadians(10), degToRadians(0), degToRadians(130)), `XYZ`);
      mesh.scale.set(0, 0, 0);
      this.watermelon = mesh;
      this.scene.add(mesh);
    });
  }

  getKeyhole() {
    loadSVG(`keyhole`, true, (svgGroup) => {
      svgGroup.position.set(-1500, 1515, 0);
      svgGroup.scale.set(1.5, -1.5, 1.5);

      this.scene.add(svgGroup);
    });
  }

  getDummy() {
    const dummy = new THREE.PlaneGeometry(1000, 1000);
    const dummyMesh = new THREE.Mesh(dummy, this.setMaterial({
      color: colors.Purple,
      ...reflectivity.basic
    }));

    dummyMesh.position.set(0, 0, 15);
    this.scene.add(dummyMesh);
  }

  getFlamingo() {
    loadSVG(`flamingo`, true, (svgGroup) => {
      svgGroup.position.set(-320, 390, 150);
      svgGroup.rotation.copy(new THREE.Euler(degToRadians(10), degToRadians(30), degToRadians(10)), `XYZ`);
      svgGroup.scale.set(0, 0, 0);

      this.flamingo = svgGroup;
      this.scene.add(svgGroup);
    });
  }

  getLeaf() {
    loadSVG(`leaf-intro`, true, (svgGroup) => {
      svgGroup.position.set(560, 230, 50);
      svgGroup.rotation.copy(new THREE.Euler(degToRadians(10), degToRadians(10), degToRadians(-60)), `XYZ`);
      svgGroup.scale.set(0, 0, 0);

      this.leaf = svgGroup;
      this.scene.add(svgGroup);
    });
  }

  getSnowflake() {
    loadSVG(`snowflake`, true, (svgGroup) => {
      svgGroup.position.set(-300, -10, 100);
      svgGroup.rotation.copy(new THREE.Euler(degToRadians(-10), degToRadians(20), degToRadians(20)), `XYZ`);
      svgGroup.scale.set(0, 0, 0);

      this.snowflake = svgGroup;
      this.scene.add(svgGroup);
    });
  }

  getQuestion() {
    loadSVG(`question`, true, (svgGroup) => {
      svgGroup.position.set(100, -310, 100);
      svgGroup.rotation.copy(new THREE.Euler(degToRadians(-10), degToRadians(10), degToRadians(20)), `XYZ`);
      svgGroup.scale.set(0, 0, 0);

      this.question = svgGroup;
      this.scene.add(svgGroup);
    });
  }

  getGroup(name, child) {
    const group = new THREE.Group();
    group.name = name;
    group.add(child);
    return group;
  }

  startAnimimations() {
    const duration = 1500;

    this.setOptAnimObj();

    animIntroObj(this.objectsArr, duration, 'easeOutCubic');
    animSuitcaseIntro(this.suitcase, duration, 'easeOutCubic');
    setTimeout(() => {
      animAirplaneIntro(this.airplane, duration, 'easeOutCubic');
    }, 500);
  }
}
