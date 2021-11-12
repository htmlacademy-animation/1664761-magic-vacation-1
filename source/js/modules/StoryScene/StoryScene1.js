import * as THREE from 'three';
import {
  degToRadians,
  setMaterial
} from '../../helpers/utilities.js';
import Rug from './objects/Rug.js';
import Saturn from './objects/Saturn.js';
import Floor from './objects/Floor.js';
import {
  loadSVG
} from './utils/svgLoader.js';
import {
  loadModel
} from './utils/loadModel.js';
import {
  colors,
  reflectivity
} from '../../helpers/colorsAndReflection.js';
import ModelObject from '../StoryScene/utils/modelObject.js';
import {
  animDogTail,
  animSaturn
} from '../../helpers/animate.js';


class StoryScene1 extends THREE.Group {
  constructor() {
    super();

    this.wall;
    this.floor;

    this.startTime = -1;
    this.counterLoadObj = 0;

    this.constructChildren();
  }

  constructChildren() {
    this.getFlower();
    this.getRug();
    this.getSaturn();
    this.getDog();
    this.getWall();
    this.getFloor();
    this.addSceneStatic();
  }

  getWall() {
    this.counterLoadObj += 1;
    const model = new ModelObject('wallCornerUnit').getObject();

    loadModel(model, true, setMaterial({
      color: colors.Purple,
      side: THREE.DoubleSide,
      ...reflectivity.soft
    }), (mesh) => {
      mesh.name = model.name;
      this.add(mesh);
    });
  }

  getFloor() {
    this.counterLoadObj += 1;
    const mesh = new Floor({
      color: colors.DarkPurple,
      ...reflectivity.soft
    });
    this.add(mesh);
  }

  addSceneStatic() {
    this.counterLoadObj += 1;
    const model = new ModelObject('scene1').getObject();

    loadModel(model, true, null, (mesh) => {
      mesh.name = model.name;
      this.add(mesh);
    });
  }

  getFlower() {
    this.counterLoadObj += 1;
    loadSVG(`flower`, true, (svgGroup) => {
      svgGroup.position.set(60, 420, 440);
      svgGroup.rotation.copy(new THREE.Euler(degToRadians(0), degToRadians(90), degToRadians(0)), `XYZ`);
      svgGroup.scale.set(1, -1, 1);

      this.add(svgGroup);
    });
  }

  getRug() {
    this.counterLoadObj += 1;
    const rug = new Rug();

    this.add(rug);
  }

  getSaturn() {
    this.counterLoadObj += 1;
    const saturn = new Saturn(false, true);

    saturn.position.set(350, 500, 200);

    this.saturn = saturn;
    this.add(saturn);
  }

  getDog() {
    this.counterLoadObj += 1;
    const model = new ModelObject('dog').getObject();

    loadModel(model, true, null, (mesh) => {
      mesh.name = model.name;

      mesh.position.set(500, 0, 430);
      mesh.rotation.copy(new THREE.Euler(0, degToRadians(60), 0));

      this.dog = mesh;
      this.add(mesh);
    });
  }

  animations() {
    if (this.startTime < 0) {
      this.startTime = new THREE.Clock();
      return;
    }

    const t = this.startTime.getElapsedTime();

    const ring = this.saturn.children.find(obj => {
      return obj.name === 'ring';
    });

    animDogTail(t, this.dog.getObjectByName(`Tail`));
    animSaturn(t, 0.02, this.saturn, ring);
  }

}

export default StoryScene1;
