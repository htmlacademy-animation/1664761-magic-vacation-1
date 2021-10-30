import * as THREE from 'three';
import {
  setMaterial
} from '../../story.js';
import {
  getLathePoints
} from '../utils/LatheOptions.js';

class Saturn extends THREE.Group {
  constructor() {
    super();

    this.sphereBigMesh;
    this.ringMesh;
    this.cylinderMesh;
    this.sphereSmallMesh;


    this.constructChildren();
  }

  constructChildren() {
    this.getSphereBig();
    this.getRing();
    this.getCylinder();
    this.getSphereSmall();
  }

  getSphereBig() {
    const sphere = new THREE.SphereGeometry(60, 50, 50);
    this.sphereBigMesh = new THREE.Mesh(sphere, setMaterial({
      color: 0xfc2947,
      flatShading: true
    }));

    this.add(this.sphereBigMesh);
  }

  getRing() {
    const points = getLathePoints((120 - 80), 2, 80);

    const ring = new THREE.LatheBufferGeometry(points, 50);
    this.ringMesh = new THREE.Mesh(ring, setMaterial({
      color: 0x5b3ea5,
      flatShading: true
    }));
    this.ringMesh.rotation.copy(new THREE.Euler(20 * THREE.Math.DEG2RAD, 0, 18 * THREE.Math.DEG2RAD), `XYZ`);

    this.add(this.ringMesh);
  }

  getCylinder() {
    const cylinder = new THREE.CylinderBufferGeometry(1, 1, 1000, 10);
    this.cylinderMesh = new THREE.Mesh(cylinder, setMaterial({
      color: 0x8388ab,
      flatShading: true
    }));

    const topOffset = this.sphereBigMesh.position.y + cylinder.parameters.height / 2;
    this.cylinderMesh.position.set(0, topOffset, 0);
    this.add(this.cylinderMesh);
  }

  getSphereSmall() {
    const sphere = new THREE.SphereGeometry(10, 30, 30);
    this.sphereSmallMesh = new THREE.Mesh(sphere, setMaterial({
      color: 0x5b3ea5,
      flatShading: true
    }));

    const topOffset = this.sphereBigMesh.position.y + this.sphereBigMesh.geometry.parameters.radius * 2;
    this.sphereSmallMesh.position.set(this.cylinderMesh.position.x, topOffset, this.cylinderMesh.position.z);
    this.add(this.sphereSmallMesh);
  }
}

export default Saturn;
