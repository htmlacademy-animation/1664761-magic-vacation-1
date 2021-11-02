import * as THREE from 'three';
import {
  setMaterial
} from '../../story.js';
import {
  getLathePoints,
  getLatheDegrees
} from '../utils/LatheOptions.js';
import roadShaderMaterial from '../materials/roadShaderMaterial.js';
import {
  colors
} from '../../../helpers/colorsAndReflection.js';

class Road extends THREE.Group {
  constructor() {
    super();

    this.startDeg = 0;
    this.finishDeg = 90;

    this.roadMesh;

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
    const material = new THREE.ShaderMaterial(roadShaderMaterial({
      baseColor: {
        value: new THREE.Color(colors.Grey)
      },
      stripeColor: {
        value: new THREE.Color(colors.White)
      }
    }));

    this.roadMesh = new THREE.Mesh(base, material);

    this.add(this.roadMesh);
  }
}

export default Road;
