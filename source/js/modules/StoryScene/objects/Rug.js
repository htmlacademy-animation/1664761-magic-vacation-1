import * as THREE from 'three';
import {
  setMaterial
} from '../../story.js';
import {
  getLathePoints,
  getLatheDegrees
} from '../utils/LatheOptions.js';

class Rug extends THREE.Group {
  constructor() {
    super();

    this.startDeg = 16;
    this.finishDeg = 74;

    this.lengthStrip = (this.finishDeg - this.startDeg) / 7;

    this.constructChildren();
  }

  constructChildren() {
    this.addBase();
    this.addStrips();
  }

  addBase() {
    const points = getLathePoints(180, 3, 763);
    const {
      start,
      length
    } = getLatheDegrees(this.startDeg, this.finishDeg);

    const base = new THREE.LatheBufferGeometry(points, 50, start, length);
    const mesh = new THREE.Mesh(base, setMaterial({
      color: 0x7a5ab2,
      flatShading: true
    }));

    this.add(mesh);
  }

  addStrips() {
    for (let index = 1; index < 6; index += 2) {
      const points = getLathePoints(180, 3, 763);
      const {
        start,
        length
      } = getLatheDegrees(this.startDeg + this.lengthStrip * index, this.startDeg + this.lengthStrip * (index + 1));

      const sprip = new THREE.LatheBufferGeometry(points, 5, start, length);
      const mesh = new THREE.Mesh(sprip, setMaterial({
        color: 0x583f8c,
        flatShading: true
      }));
      mesh.position.set(0, 1, 0);

      this.add(mesh);
    }
  }
}

export default Rug;
