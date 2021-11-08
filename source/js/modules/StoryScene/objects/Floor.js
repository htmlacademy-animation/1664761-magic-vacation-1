import * as THREE from 'three';
import { degToRadians } from '../../../helpers/utilities';
import {getLatheDegrees } from '../utils/LatheOptions';

class Floor extends THREE.Group {
  constructor(settings) {
    super();

    this.settings = settings;

    this.startDeg = 0;
    this.finishDeg = 90;

    this.constructChildren();
  }

  constructChildren() {
    this.addBase(this.settings);
  }

  setMaterial(options = {}) {
    const { color, ...other } = options;

    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      side: THREE.DoubleSide,
      ...other
    });
  }

  addBase(settings) {
    const { start, length } = getLatheDegrees(this.startDeg, this.finishDeg);
    const base = new THREE.CircleGeometry(1350, 10, start, length);
    const baseMesh = new THREE.Mesh(base, this.setMaterial(settings));
    baseMesh.rotation.copy(new THREE.Euler(degToRadians(90), 0, 0));
    baseMesh.receiveShadow = true;
    this.add(baseMesh);
  }
}

export default Floor;