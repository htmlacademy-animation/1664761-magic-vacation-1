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
import {
  animConpass
} from '../../helpers/animate.js';


class StoryScene3 extends THREE.Group {
  constructor() {
    super();

    this.wall;
    this.floor;

    this.startTime = -1;
    this.counterLoadObj = 0;

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
    this.counterLoadObj += 1;
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
    this.counterLoadObj += 1;
    const mesh = new Floor({
      color: colors.MountainBlue,
      ...reflectivity.soft
    });
    this.add(mesh);
  }

  addSceneStatic() {
    this.counterLoadObj += 1;
    const model = new ModelObject('scene3').getObject();

    loadModel(model, true, null, (mesh) => {
      mesh.name = model.name;
      this.add(mesh);
    });
  }

  getSnowman() {
    this.counterLoadObj += 1;
    const snowman = new Snowman(true);

    snowman.position.set(220, 220, 400);

    this.add(snowman);
  }

  getRoad() {
    this.counterLoadObj += 1;
    const road = new Road();

    this.add(road);
  }

  getCompass() {
    this.counterLoadObj += 1;
    const model = new ModelObject('compass').getObject();

    loadModel(model, true, null, (mesh) => {
      mesh.name = model.name;
      this.compass = mesh;
      this.add(mesh);
    });
  }

  animations() {
    if (this.startTime < 0) {
      this.startTime = new THREE.Clock();
      return;
    }

    const t = this.startTime.getElapsedTime();

    animConpass(t, 0.2, this.compass.getObjectByName(`ArrowCenter`));
  }
}

export default StoryScene3;
