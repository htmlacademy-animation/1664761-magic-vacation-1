import svgForms from './svgForms.js';

class SVGObject {
  constructor(name) {
    this.name = name;
  }

  getObject() {
    const svg = svgForms.find(obj => {
      return obj.name === this.name;
    });
    return svg;
  }
}

export default SVGObject;