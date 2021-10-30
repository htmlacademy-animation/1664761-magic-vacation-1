import * as THREE from 'three';
import {
  degToRadians
} from '../story.js';
import SVGObject from './utils/svgObject.js';
import Rug from './objects/Rug.js';
import Saturn from './objects/Saturn.js';


class StoryScene1 extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.getFlower();
    this.getRug();
    this.getSaturn();
  }

  async getFlower() {
    const flower = await new SVGObject(`flower`).getObject();

    flower.position.set(-290, 165, 100);
    flower.rotation.copy(new THREE.Euler(degToRadians(180), degToRadians(-20), degToRadians(-8)), `XYZ`);
    flower.scale.set(0.8, 0.8, 0.8);

    this.add(flower);
  }

  getRug() {
    const rug = new Rug();

    rug.position.set(0, -115, 0);
    rug.rotation.copy(new THREE.Euler(degToRadians(13), degToRadians(-52), 0), `XYZ`);
    rug.scale.set(0.7, 0.7, 0.7);

    this.add(rug);
  }

  getSaturn() {
    const saturn = new Saturn();

    saturn.position.set(57, 237, 100);

    this.add(saturn);
  }

}

export default StoryScene1;
