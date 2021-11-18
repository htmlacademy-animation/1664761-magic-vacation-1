import * as THREE from 'three';
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
  animIntroObj,
  animSuitcaseIntro,
  animAirplaneIntro,
  animOpacity
} from '../helpers/animate.js';

class Intro extends THREE.Group {
  constructor() {
    super();

    this.counterLoadObj = 0;

    this.constructChildren();
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
    this.counterLoadObj += 1;
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
      this.add(this.airplane);
    });
  }

  getSuitcase() {
    this.counterLoadObj += 1;
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
      this.add(this.suitcase);
    });
  }

  getWatermelon() {
    this.counterLoadObj += 1;
    const model = new ModelObject('watermelon').getObject();

    loadModel(model, true, null, (mesh) => {
      mesh.name = model.name;
      mesh.position.set(-500, -280, 250);
      mesh.rotation.copy(new THREE.Euler(degToRadians(10), degToRadians(0), degToRadians(130)), `XYZ`);
      mesh.scale.set(0, 0, 0);
      this.watermelon = mesh;
      this.add(mesh);
    });
  }

  getKeyhole() {
    this.counterLoadObj += 1;
    loadSVG(`keyhole`, true, (svgGroup) => {
      svgGroup.position.set(-1500, 1515, 0);
      svgGroup.scale.set(1.5, -1.5, 1.5);

      this.add(svgGroup);
    });
  }

  getDummy() {
    this.counterLoadObj += 1;
    const dummy = new THREE.PlaneGeometry(1000, 1000);
    const dummyMesh = new THREE.Mesh(dummy, this.setMaterial({
      color: colors.Purple,
      ...reflectivity.basic
    }));

    dummyMesh.position.set(0, 0, 15);
    this.dummy = dummyMesh;
    this.add(dummyMesh);
  }

  getFlamingo() {
    this.counterLoadObj += 1;
    loadSVG(`flamingo`, true, (svgGroup) => {
      svgGroup.position.set(-320, 390, 150);
      svgGroup.rotation.copy(new THREE.Euler(degToRadians(10), degToRadians(30), degToRadians(10)), `XYZ`);
      svgGroup.scale.set(0, 0, 0);

      this.flamingo = svgGroup;
      this.add(svgGroup);
    });
  }

  getLeaf() {
    this.counterLoadObj += 1;
    loadSVG(`leaf-intro`, true, (svgGroup) => {
      svgGroup.position.set(560, 230, 50);
      svgGroup.rotation.copy(new THREE.Euler(degToRadians(10), degToRadians(10), degToRadians(-60)), `XYZ`);
      svgGroup.scale.set(0, 0, 0);

      this.leaf = svgGroup;
      this.add(svgGroup);
    });
  }

  getSnowflake() {
    this.counterLoadObj += 1;
    loadSVG(`snowflake`, true, (svgGroup) => {
      svgGroup.position.set(-300, -10, 100);
      svgGroup.rotation.copy(new THREE.Euler(degToRadians(-10), degToRadians(20), degToRadians(20)), `XYZ`);
      svgGroup.scale.set(0, 0, 0);

      this.snowflake = svgGroup;
      this.add(svgGroup);
    });
  }

  getQuestion() {
    this.counterLoadObj += 1;
    loadSVG(`question`, true, (svgGroup) => {
      svgGroup.position.set(100, -310, 100);
      svgGroup.rotation.copy(new THREE.Euler(degToRadians(-10), degToRadians(10), degToRadians(20)), `XYZ`);
      svgGroup.scale.set(0, 0, 0);

      this.question = svgGroup;
      this.add(svgGroup);
    });
  }

  getGroup(name, child) {
    const group = new THREE.Group();
    group.name = name;
    group.add(child);
    return group;
  }

  hideDummy(dur, delay) {
    setTimeout(() => {
      animOpacity(this.dummy, 0, dur);
    }, delay);
  }

  showDummy() {
    this.dummy.material.opacity = 1;
  }

  startAnimimations() {
    const duration = 1500;
    this.objectsArr = [
      this.watermelon,
      this.flamingo,
      this.leaf,
      this.question,
      this.snowflake,
    ];

    this.setOptAnimObj();

    animIntroObj(this.objectsArr, duration, 'easeOutCubic');
    animSuitcaseIntro(this.suitcase, duration, 'easeOutCubic');
    setTimeout(() => {
      animAirplaneIntro(this.airplane, duration, 'easeOutCubic');
    }, 500);
  }
}


export default Intro;
