import * as THREE from 'three';
import {
  setMaterial,
  degToRadians
} from '../../story.js';


class Lamp extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.getLampUpper();
    this.getLampMid();
    this.getLampBot();
    this.getPole();
    this.getLampBaseSphere();
    this.getLampBaseCylinder();
  }

  getLampUpper() {
    const lampUpper = new THREE.Mesh(new THREE.CylinderGeometry(45, 57, 6, 4), setMaterial({
      color: 0x0062c3,
      flatShading: true
    }));
    lampUpper.position.set(0, 178, 0);
    this.add(lampUpper);
  }

  getLampMid() {
    const lampMid = new THREE.Mesh(new THREE.CylinderGeometry(42, 34, 60, 4), setMaterial({
      color: 0x9db4ee,
      flatShading: true
    }));
    lampMid.position.set(0, 145, 0);
    this.add(lampMid);
  }

  getLampBot() {
    const lampBot = new THREE.Mesh(new THREE.CylinderGeometry(37, 37, 4, 4), setMaterial({
      color: 0x0062c3,
      flatShading: true
    }));
    lampBot.position.set(0, 115, 0);
    this.add(lampBot);
  }

  getPole() {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(7, 7, 230, 4), setMaterial({
      color: 0x0062c3,
      flatShading: true
    }));

    this.add(pole);
  }

  getLampBaseSphere() {
    const lampBaseSphere = new THREE.Mesh(new THREE.SphereGeometry(16, 30, 30, 0, Math.PI * 2.00, Math.PI * 0.50, Math.PI * 1.00), setMaterial({
      color: 0x0062c3,
      flatShading: true
    }));
    lampBaseSphere.position.set(0, -128, 0);
    lampBaseSphere.rotation.copy(new THREE.Euler(degToRadians(180), 0, 0, 'XYZ'));
    this.add(lampBaseSphere);
  }

  getLampBaseCylinder() {
    const lampBaseCylinder = new THREE.Mesh(new THREE.CylinderGeometry(16, 16, 120, 4), setMaterial({
      color: 0x0062c3,
      flatShading: true
    }));
    lampBaseCylinder.position.set(0, -188, 0);
    this.add(lampBaseCylinder);
  }
}

export default Lamp;
