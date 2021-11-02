import * as THREE from 'three';
import {
  degToRadians
} from '../story.js';
import SVGObject from './utils/svgObject.js';
import Rug from './objects/Rug.js';
import Saturn from './objects/Saturn.js';


class StoryScene4 extends THREE.Group {
  constructor() {
    super();

    this.isDark = true;

    this.constructChildren();
  }

  constructChildren() {
    this.getSaturn();
    this.getRug();
    this.getFlower();
  }

  getSaturn() {
    const saturn = new Saturn(this.isDark);

    saturn.position.set(85, 245, 100);

    this.add(saturn);
  }

  getRug() {
    const rug = new Rug(this.isDark);

    rug.position.set(20, -105, 0);
    rug.rotation.copy(new THREE.Euler(degToRadians(14), degToRadians(-47), 0), `XYZ`);
    rug.scale.set(0.7, 0.7, 0.7);

    this.add(rug);
  }

  async getFlower() {
    const flower = await new SVGObject(`flower-scene-4`).getObject();
    const scale = 0.7;

    flower.position.set(-220, 150, 200);
    flower.rotation.copy(new THREE.Euler(0, degToRadians(40), degToRadians(5)), `XYZ`);
    flower.scale.set(scale, -scale, scale);

    this.add(flower);
  }

}

export default StoryScene4;
