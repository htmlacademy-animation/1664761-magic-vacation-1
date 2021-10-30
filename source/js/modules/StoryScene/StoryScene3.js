import * as THREE from 'three';
import {
  degToRadians
} from '../story.js';
import Snowman from './objects/Snowman.js';
import Road from './objects/Road.js';


class StoryScene3 extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.getSnowman();
    this.getRoad();
  }

  getSnowman() {
    const snowman = new Snowman();

    snowman.scale.set(0.95, 0.95, 0.95);
    snowman.rotation.copy(new THREE.Euler(degToRadians(10), degToRadians(-50), 0, 'XYZ'));
    snowman.position.set(-130, -15, 0);

    this.add(snowman);
  }

  getRoad() {
    const road = new Road();

    road.scale.set(0.75, 0.75, 0.75);
    road.rotation.copy(new THREE.Euler(degToRadians(13), degToRadians(-45), 0), `XYZ`);
    road.position.set(0, -100, 0);

    this.add(road);
  }
}

export default StoryScene3;
