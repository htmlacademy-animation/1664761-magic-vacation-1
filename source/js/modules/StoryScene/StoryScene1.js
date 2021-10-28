import * as THREE from 'three';
import {
  setMaterial,
  degToRadians
} from '../story.js';
import SVGObject from './svgObject.js';


class StoryScene2 extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.getFlower();
  }

  async getFlower() {
    const flower = await new SVGObject(`flower`).getObject();

    flower.position.set(-290, 165, 100);
    flower.rotation.copy(new THREE.Euler(degToRadians(180), degToRadians(-20), degToRadians(-8)), `XYZ`);
    flower.scale.set(0.8, 0.8, 0.8);

    this.add(flower);
  }

}

export default StoryScene2;
