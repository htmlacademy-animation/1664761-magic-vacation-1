import * as THREE from 'three';
import SVGObject from './utils/svgObject.js';
import Saturn from './objects/Saturn.js';


class StoryScene4 extends THREE.Group {
  constructor() {
    super();

    this.isDark = true;

    this.constructChildren();
  }

  constructChildren() {
    this.getSaturn();
  }

  getSaturn() {
    const saturn = new Saturn(this.isDark);

    saturn.position.set(85, 245, 100);

    this.add(saturn);
  }

}

export default StoryScene4;
