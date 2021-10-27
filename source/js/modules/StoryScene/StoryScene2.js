import * as THREE from 'three';
import {
  setMaterial,
  degToRadians
} from '../story.js';
import Lamp from './Lamp.js';


class StoryScene2 extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.getPyramid();
    this.getLamp();
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
    lamp.rotation.copy(new THREE.Euler(degToRadians(10), degToRadians(60), 0, 'XYZ' ));
    lamp.position.set(137, -62, 15);

    this.add(lamp);
  }
}

export default StoryScene2;
