import * as THREE from 'three';
import {
  setMaterial,
  degToRadians
} from '../story.js';


class Snowman extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.getHead();
    this.getBody();
    this.getCarrot();
  }

  getHead() {
    const snowmanHead = new THREE.Mesh(new THREE.SphereGeometry(44, 30, 30), setMaterial(0xb2d0f4));
    this.add(snowmanHead);
  }

  getBody() {
    const snowmanBody = new THREE.Mesh(new THREE.SphereGeometry(75, 30, 30), setMaterial(0xb2d0f4));
    snowmanBody.position.set(0, -105, 0);
    this.add(snowmanBody);
  }

  getCarrot() {
    const snowmanCarrot = new THREE.Mesh(new THREE.ConeGeometry(18, 75, 30), setMaterial(0xff4500));
    snowmanCarrot.position.set(50, 0, 0);
    snowmanCarrot.rotation.copy(new THREE.Euler(0, 0, degToRadians(-90), 'XYZ' ));
    this.add(snowmanCarrot);
  }
}

export default Snowman;
