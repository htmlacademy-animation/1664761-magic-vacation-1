import * as THREE from 'three';
import {
  degToRadians,
  setMaterial
} from '../../helpers/utilities.js';
import {
  loadSVG
} from './utils/svgLoader.js';
import Rug from './objects/Rug.js';
import Saturn from './objects/Saturn.js';
import {
  colors,
  reflectivity
} from '../../helpers/colorsAndReflection.js';
import Floor from './objects/Floor.js';
import {
  loadModel
} from './utils/loadModel.js';
import ModelObject from '../StoryScene/utils/modelObject.js';


class StoryScene4 extends THREE.Group {
  constructor() {
    super();

    this.wall;
    this.floor;

    this.isDark = true;

    this.constructChildren();
  }

  constructChildren() {
    this.getSaturn();
    this.getRug();
    this.getFlower();
    this.getWall();
    this.getFloor();
    this.addSceneStatic();
    this.getSonya();
  }

  getWall() {
    const model = new ModelObject('wallCornerUnit').getObject();

    loadModel(model, true, setMaterial({
      color: colors.ShadowedPurple,
      side: THREE.DoubleSide,
      ...reflectivity.basic
    }), (mesh) => {
      mesh.name = model.name;
      this.add(mesh);
    });
  }

  getFloor() {
    const mesh = new Floor({
      color: colors.ShadowedDarkPurple,
      ...reflectivity.soft
    });
    this.add(mesh);
  }

  addSceneStatic() {
    const model = new ModelObject('scene4').getObject();

    loadModel(model, true, null, (mesh) => {
      mesh.name = model.name;
      this.add(mesh);
    });
  }

  getSaturn() {
    const saturn = new Saturn(this.isDark, true);

    saturn.position.set(350, 500, 200);

    this.add(saturn);
  }

  getRug() {
    const rug = new Rug(this.isDark);

    this.add(rug);
  }

  async getFlower() {
    loadSVG(`flower-scene-4`, true, (svgGroup) => {
      svgGroup.position.set(60, 420, 440);
      svgGroup.rotation.copy(new THREE.Euler(0, degToRadians(90), 0), `XYZ`);
      svgGroup.scale.set(1, -1, 1);

      this.add(svgGroup);
    });
  }

  getSonya() {
    const model = new ModelObject('sonya').getObject();

    loadModel(model, true, null, (mesh) => {
      mesh.name = model.name;

      mesh.position.set(450, 150, 300);
      mesh.rotation.copy(new THREE.Euler(0, degToRadians(10), 0));

      this.add(mesh);
    });
  }

}

export default StoryScene4;
