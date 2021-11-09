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


class StoryScene2 extends THREE.Group {
  constructor() {
    super();

    this.wall;
    this.floor;

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
    const mesh = new Floor({
      color: colors.BrightBlue,
      ...reflectivity.soft
    });
    this.add(mesh);
  }

  addSceneStatic() {
    const model = new ModelObject('scene2').getObject();

    loadModel(model, true, null, (mesh) => {
      mesh.name = model.name;
      this.add(mesh);
    });
  }

  getLamp() {
    const lamp = new Lamp(true);

    lamp.position.set(650, 173, 120);
    lamp.rotation.copy(new THREE.Euler(degToRadians(0), degToRadians(20), 0, 'XYZ'));
    lamp.scale.set(0.7, 0.7, 0.7);

    this.add(lamp);
  }

  loadLeaf1() {
    loadSVG(`leaf1-scene2`, true, (svgGroup) => {
      svgGroup.position.set(80, 250, 350);
      svgGroup.rotation.copy(new THREE.Euler(0, degToRadians(90), degToRadians(-10)), `XYZ`);
      svgGroup.scale.set(2, -2, 2);

      this.add(svgGroup);
    });
  }

  loadLeaf2() {
    loadSVG(`leaf2-scene2`, true, (svgGroup) => {
      svgGroup.position.set(65, 120, 420);
      svgGroup.rotation.copy(new THREE.Euler(0, degToRadians(90), degToRadians(35)), `XYZ`);
      svgGroup.scale.set(1.5, -1.5, 1.5);

      this.add(svgGroup);
    });
  }

  getPyramid() {
    const pyramid = new Pyramid(true);

    pyramid.position.set(230, 150, 260);
    pyramid.rotation.copy(new THREE.Euler(0, degToRadians(45), 0, 'XYZ'));

    this.add(pyramid);
  }

}

export default StoryScene2;
