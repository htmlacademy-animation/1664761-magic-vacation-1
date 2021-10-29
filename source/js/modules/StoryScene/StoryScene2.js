import * as THREE from 'three';
import {
  setMaterial,
  degToRadians
} from '../story.js';
import Lamp from './Lamp.js';
import SVGObject from './svgObject.js';


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
    const mesh = new THREE.Mesh(new THREE.ConeGeometry(250, 280, 4), setMaterial(0x0062c3));

    mesh.scale.set(0.23, 0.3, 0.3);
    mesh.rotation.copy(new THREE.Euler(degToRadians(10), 0, degToRadians(-3), 'XZY'));
    mesh.position.set(-8, -75, 15);

    this.add(mesh);
  }

  getLamp() {
    const lamp = new Lamp();

    lamp.scale.set(0.35, 0.35, 0.35);
    lamp.rotation.copy(new THREE.Euler(degToRadians(10), degToRadians(60), 0, 'XYZ'));
    lamp.position.set(137, -62, 15);

    this.add(lamp);
  }

  async loadLeaf1() {
    const leaf = await new SVGObject(`leaf1-scene2`).getObject();

    leaf.position.set(-95, -16, 10);
    leaf.rotation.copy(new THREE.Euler(0, degToRadians(10), degToRadians(-1)), `XYZ`);
    leaf.scale.set(0.9, -0.9, 0.9);

    this.add(leaf);
  }

  async loadLeaf2() {
    const leaf = await new SVGObject(`leaf2-scene2`).getObject();

    leaf.position.set(-110, -95, 10);
    leaf.rotation.copy(new THREE.Euler(0, degToRadians(10), degToRadians(45)), `XYZ`);
    leaf.scale.set(0.7, -0.7, 0.7);

    this.add(leaf);
  }

}

export default StoryScene2;
