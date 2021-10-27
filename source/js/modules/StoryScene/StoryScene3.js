import * as THREE from 'three';
import {
  setMaterial,
  degToRadians
} from '../story.js';
import Snowman from './Snowman.js';


class StoryScene3 extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.getSnowman();
  }

  getSnowman() {
    const snowman = new Snowman();

    snowman.scale.set(0.95, 0.95, 0.95);
    snowman.rotation.copy(new THREE.Euler(degToRadians(10), degToRadians(-50), 0, 'XYZ' ));
    snowman.position.set(-130, -15, 0);

    this.add(snowman);
  }
}

export default StoryScene3;
