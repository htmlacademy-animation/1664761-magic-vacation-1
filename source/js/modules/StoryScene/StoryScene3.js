import * as THREE from 'three';
import Snowman from './objects/Snowman.js';
import Road from './objects/Road.js';
import {
  degToRadians,
  setMaterial
} from '../../helpers/utilities.js';
import {
  colors,
  reflectivity
} from '../../helpers/colorsAndReflection.js';
import Floor from './objects/Floor.js';
import {
  loadModel
} from './utils/loadModel.js';
import ModelObject from '../StoryScene/utils/modelObject.js';


class StoryScene3 extends THREE.Group {
  constructor() {
    super();

    this.wall;
    this.floor;

    this.constructChildren();
  }

  constructChildren() {
    this.getSnowman();
    this.getRoad();
    this.getWall();
    this.getFloor();
    this.addSceneStatic();
    this.getCompass();
  }

  getWall() {
    const model = new ModelObject('wallCornerUnit').getObject();

    loadModel(model, true, setMaterial({
      color: colors.SkyLightBlue,
      side: THREE.DoubleSide,
      ...reflectivity.soft
    }), (mesh) => {
      mesh.name = model.name;
      this.add(mesh);
    });
  }

  getFloor() {
    const mesh = new Floor({
      color: colors.MountainBlue,
      ...reflectivity.soft
    });
    this.add(mesh);
  }

  addSceneStatic() {
    const model = new ModelObject('scene3').getObject();

    loadModel(model, true, null, (mesh) => {
      mesh.name = model.name;
      this.add(mesh);
    });
  }

  getSnowman() {
    const snowman = new Snowman(true);

    snowman.position.set(220, 220, 400);

    this.add(snowman);
  }

  getRoad() {
    const road = new Road();

    this.add(road);
  }

  getCompass() {
    const model = new ModelObject('compass').getObject();

    loadModel(model, true, null, (mesh) => {
      mesh.name = model.name;
      this.add(mesh);
    });
  }
}

export default StoryScene3;
