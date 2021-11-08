import * as THREE from 'three';
import {
  setMaterial,
  degToRadians
} from '../../../helpers/utilities.js';
import {
  getLathePoints
} from '../utils/LatheOptions.js';
import {
  colors,
  reflectivity
} from '../../../helpers/colorsAndReflection.js';
import {
  isShadow
} from '../../../helpers/isShadow.js';

class Saturn extends THREE.Group {
  constructor(isDark, isShadow) {
    super();

    this.isDark = isDark;
    this.isShadow = isShadow;

    this.color1 = this.isDark ? colors.ShadowedDominantRed : colors.DominantRed;
    this.color2 = this.isDark ? colors.ShadowedBrightPurple : colors.BrightPurple;
    this.color3 = colors.MetalGrey;

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

    isShadow(this);
  }

  getSphereBig() {
    const sphere = new THREE.SphereGeometry(60, 50, 50);
    this.sphereBigMesh = new THREE.Mesh(sphere, setMaterial({
      color: this.color1,
      ...reflectivity.soft
    }));

    this.add(this.sphereBigMesh);
  }

  getRing() {
    const points = getLathePoints((120 - 80), 2, 80);

    const ring = new THREE.LatheBufferGeometry(points, 50);
    this.ringMesh = new THREE.Mesh(ring, setMaterial({
      color: this.color2,
      ...reflectivity.soft
    }));
    this.ringMesh.rotation.copy(new THREE.Euler(degToRadians(15), 0, 0), `XYZ`);

    this.add(this.ringMesh);
  }

  getCylinder() {
    const cylinder = new THREE.CylinderBufferGeometry(1, 1, 1000, 10);
    this.cylinderMesh = new THREE.Mesh(cylinder, setMaterial({
      color: this.color3,
      ...reflectivity.soft
    }));

    const topOffset = this.sphereBigMesh.position.y + cylinder.parameters.height / 2;
    this.cylinderMesh.position.set(0, topOffset, 0);
    this.add(this.cylinderMesh);
  }

  getSphereSmall() {
    const sphere = new THREE.SphereGeometry(10, 30, 30);
    this.sphereSmallMesh = new THREE.Mesh(sphere, setMaterial({
      color: this.color2,
      ...reflectivity.soft
    }));

    const topOffset = this.sphereBigMesh.position.y + this.sphereBigMesh.geometry.parameters.radius * 2;
    this.sphereSmallMesh.position.set(this.cylinderMesh.position.x, topOffset, this.cylinderMesh.position.z);
    this.add(this.sphereSmallMesh);
  }
}

export default Saturn;
