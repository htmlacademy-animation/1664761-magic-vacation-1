import * as THREE from 'three';
import {
  setMaterial
} from '../../story.js';
import {
  getLathePoints,
  getLatheDegrees
} from '../utils/LatheOptions.js';

class Road extends THREE.Group {
  constructor() {
    super();

    this.startDeg = 0;
    this.finishDeg = 90;

    this.lengthStrip = (this.finishDeg - this.startDeg) / 12;

    this.constructChildren();
  }

  constructChildren() {
    this.addBase();
    this.addStrips();
  }

  addBase() {
    const points = getLathePoints(160, 3, 732);
    const {
      start,
      length
    } = getLatheDegrees(this.startDeg, this.finishDeg);

    const base = new THREE.LatheBufferGeometry(points, 50, start, length);
    const mesh = new THREE.Mesh(base, setMaterial({
      color: 0x676f7f,
      flatShading: true
    }));

    this.add(mesh);
  }

  addStrips() {
    for (let index = 1; index < 12; index += 3) {
      const points = getLathePoints(20, 3, 800);
      const {
        start,
        length
      } = getLatheDegrees(this.startDeg + this.lengthStrip * index, this.startDeg + this.lengthStrip * (index + 1));

      const sprip = new THREE.LatheBufferGeometry(points, 5, start, length);
      const mesh = new THREE.Mesh(sprip, setMaterial({
        color: 0xe2e7ee,
        flatShading: true
      }));
      mesh.position.set(0, 1, 0);

      this.add(mesh);
    }
  }
}

export default Road;
