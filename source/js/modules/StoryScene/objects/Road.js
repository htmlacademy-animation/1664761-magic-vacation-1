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
}

export default Road;
