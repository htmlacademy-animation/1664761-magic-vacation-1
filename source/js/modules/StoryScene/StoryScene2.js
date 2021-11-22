import * as THREE from 'three';
import {
  setMaterial,
  degToRadians
} from '../../helpers/utilities.js';
import Lamp from './objects/Lamp.js';
import Pyramid from './objects/Pyramid.js';
import {
  colors,
  reflectivity
} from '../../helpers/colorsAndReflection.js';
import Floor from './objects/Floor.js';
import {
  loadSVG
} from './utils/svgLoader.js';
import {
  loadModel
} from './utils/loadModel.js';
import ModelObject from '../StoryScene/utils/modelObject.js';
import {
  animLeaf
} from '../../helpers/animate.js';


class StoryScene2 extends THREE.Group {
  constructor() {
    super();

    this.wall;
    this.floor;

    this.startTime = -1;
    this.counterLoadObj = 0;

    this.constructChildren();
  }

  constructChildren() {
    this.getPyramid();
    this.getLamp();
    this.loadLeaf1();
    this.loadLeaf2();
    this.getWall();
    this.getFloor();
    this.addSceneStatic();
  }

  getWall() {
    this.counterLoadObj += 1;
    const model = new ModelObject('wallCornerUnit').getObject();

    loadModel(model, true, setMaterial({
      color: colors.Blue,
      side: THREE.DoubleSide,
      ...reflectivity.basic
    }), (mesh) => {
      mesh.name = model.name;
      this.add(mesh);
    });
  }

  getFloor() {
    this.counterLoadObj += 1;
    const mesh = new Floor({
      color: colors.BrightBlue,
      ...reflectivity.soft
    });
    mesh.scale.set(1.5, 1.5, 1.5);
    this.add(mesh);
  }

  addSceneStatic() {
    this.counterLoadObj += 1;
    const model = new ModelObject('scene2').getObject();

    loadModel(model, true, null, (mesh) => {
      mesh.name = model.name;
      this.add(mesh);
    });
  }

  getLamp() {
    this.counterLoadObj += 1;
    const lamp = new Lamp(true);

    lamp.position.set(650, 173, 120);
    lamp.rotation.copy(new THREE.Euler(degToRadians(0), degToRadians(20), 0, 'XYZ'));
    lamp.scale.set(0.7, 0.7, 0.7);

    this.add(lamp);
  }

  loadLeaf1() {
    this.counterLoadObj += 1;
    const leafGroup = this.setLeaf1();
    leafGroup.position.set(80, 0, 300);
    leafGroup.rotation.copy(new THREE.Euler(0, degToRadians(90), degToRadians(-10)));
    leafGroup.scale.set(2.8, -2.8, 2.8);
    this.leaf1 = leafGroup;
    this.add(leafGroup);
  }

  setLeaf1() {
    const leafGroup = new THREE.Group();

    loadSVG(`leaf1-scene2`, true, (svgGroup) => {
      svgGroup.position.set(-60, -120, 0);
      leafGroup.add(svgGroup);
    });

    return leafGroup;
  }

  loadLeaf2() {
    this.counterLoadObj += 1;
    const leafGroup = this.setLeaf2();
    leafGroup.position.set(80, 0, 300);
    leafGroup.rotation.copy(new THREE.Euler(0, degToRadians(90), degToRadians(35)));
    leafGroup.scale.set(1.9, -1.9, 1.9);
    this.leaf2 = leafGroup;
    this.add(leafGroup);
  }

  setLeaf2() {
    const leafGroup = new THREE.Group();

    loadSVG(`leaf2-scene2`, true, (svgGroup) => {
      svgGroup.position.set(-60, -120, 0);
      leafGroup.add(svgGroup);
    });

    return leafGroup;
  }

  getPyramid() {
    this.counterLoadObj += 1;
    const pyramid = new Pyramid(true);

    pyramid.position.set(230, 150, 260);
    pyramid.rotation.copy(new THREE.Euler(0, degToRadians(45), 0, 'XYZ'));

    this.add(pyramid);
  }

  animations() {
    if (this.startTime < 0) {
      this.startTime = new THREE.Clock();
      return;
    }

    const t = this.startTime.getElapsedTime();

    animLeaf(t, this.leaf1, 0.1, 0.2);
    animLeaf(t, this.leaf2, -0.05, 0.1);

    if (t > 4) {
      this.startTime = new THREE.Clock();
    }

  }
}
export default StoryScene2;
