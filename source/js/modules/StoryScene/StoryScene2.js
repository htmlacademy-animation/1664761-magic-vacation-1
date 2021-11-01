import * as THREE from 'three';
import {
  setMaterial,
  degToRadians
} from '../story.js';
import Lamp from './objects/Lamp.js';
import SVGObject from './utils/svgObject.js';
import { colors, reflectivity } from '../../helpers/colorsAndReflection.js';


class StoryScene2 extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.getPyramid();
    this.getLamp();
    this.loadLeaf1();
    this.loadLeaf2();
  }

  getPyramid() {
    const mesh = new THREE.Mesh(new THREE.ConeGeometry(250, 280, 4), setMaterial({color: colors.Blue, flatShading: true, ...reflectivity.soft}));

    mesh.scale.set(0.45, 0.6, 0.45);
    mesh.rotation.copy(new THREE.Euler(degToRadians(10), 0, 0, 'XZY'));
    mesh.position.set(-8, -155, 15);

    this.add(mesh);
  }

  getLamp() {
    const lamp = new Lamp();

    lamp.position.set(265, -115, 80);
    lamp.rotation.copy(new THREE.Euler(degToRadians(10), degToRadians(60), 0, 'XYZ'));
    lamp.scale.set(0.7, 0.7, 0.7);

    this.add(lamp);
  }

  async loadLeaf1() {
    const leaf = await new SVGObject(`leaf1-scene2`).getObject();

    leaf.position.set(-180, -40, 20);
    leaf.rotation.copy(new THREE.Euler(0, degToRadians(10), degToRadians(-1)), `XYZ`);
    leaf.scale.set(1.5, -1.5, 1.5);

    this.add(leaf);
  }

  async loadLeaf2() {
    const leaf = await new SVGObject(`leaf2-scene2`).getObject();

    leaf.position.set(-210, -200, 10);
    leaf.rotation.copy(new THREE.Euler(0, degToRadians(10), degToRadians(45)), `XYZ`);
    leaf.scale.set(1.2, -1.2, 1.2);

    this.add(leaf);
  }

}

export default StoryScene2;
