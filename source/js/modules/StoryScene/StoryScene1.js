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


class StoryScene1 extends THREE.Group {
  constructor() {
    super();

    this.wall;
    this.floor;

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
    const mesh = new Floor({
      color: colors.DarkPurple,
      ...reflectivity.soft
    });
    this.add(mesh);
  }

  addSceneStatic() {
    const model = new ModelObject('scene1').getObject();

    loadModel(model, true, null, (mesh) => {
      mesh.name = model.name;
      this.add(mesh);
    });
  }

  getFlower() {
    loadSVG(`flower`, true, (svgGroup) => {
      svgGroup.position.set(60, 420, 440);
      svgGroup.rotation.copy(new THREE.Euler(degToRadians(0), degToRadians(90), degToRadians(0)), `XYZ`);
      svgGroup.scale.set(1, -1, 1);

      this.add(svgGroup);
    });
  }

  getRug() {
    const rug = new Rug();

    this.add(rug);
  }

  getSaturn() {
    const saturn = new Saturn(false, true);

    saturn.position.set(350, 500, 200);

    this.add(saturn);
  }

  getDog() {
    const model = new ModelObject('dog').getObject();

    loadModel(model, true, null, (mesh) => {
      mesh.name = model.name;

      mesh.position.set(500, 0, 430);
      mesh.rotation.copy(new THREE.Euler(0, degToRadians(60), 0));

      this.add(mesh);
    });
  }

}

export default StoryScene1;
