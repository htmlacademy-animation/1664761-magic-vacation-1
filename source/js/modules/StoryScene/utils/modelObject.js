import objectsConfig from './objectsConfig.js';

class ModelObject {
  constructor(name) {
    this.name = name;
  }

  getObject() {
    const modelObj = objectsConfig.find(obj => {
      return obj.name === this.name;
    });
    return modelObj;
  }
}

export default ModelObject;
