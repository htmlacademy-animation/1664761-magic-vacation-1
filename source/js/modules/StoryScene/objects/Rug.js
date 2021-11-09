import * as THREE from 'three';
import {
  getLathePoints,
  getLatheDegrees
} from '../utils/LatheOptions.js';
import rugShaderMaterial from '../materials/rugShaderMaterial.js';
import {
  colors
} from '../../../helpers/colorsAndReflection.js';

class Rug extends THREE.Group {
  constructor(isDark) {
    super();

    this.isDark = isDark;

    this.color1 = this.isDark ? colors.ShadowedLightPurple : colors.LightPurple;
    this.color2 = this.isDark ? colors.ShadowedAdditionalPurple : colors.AdditionalPurple;

    this.startDeg = 16;
    this.finishDeg = 74;

    this.lengthStrip = (this.finishDeg - this.startDeg) / 7;

    this.constructChildren();
  }

  constructChildren() {
    this.addBase();
  }

  addBase() {
    const points = getLathePoints(180, 3, 763);
    const {
      start,
      length
    } = getLatheDegrees(this.startDeg, this.finishDeg);

    const base = new THREE.LatheBufferGeometry(points, 50, start, length);
    const material = new THREE.ShaderMaterial(rugShaderMaterial({
      baseColor: {
        value: new THREE.Color(this.color1)
      },
      stripeColor: {
        value: new THREE.Color(this.color2)
      }
    }));

    const rugMesh = new THREE.Mesh(base, material);
    rugMesh.receiveShadow = true;
    this.add(rugMesh);
  }
}

export default Rug;
