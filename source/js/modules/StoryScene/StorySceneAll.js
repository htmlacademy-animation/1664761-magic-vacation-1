import * as THREE from 'three';
import {
  degToRadians
} from '../../helpers/utilities.js';
import StoryScene1 from './StoryScene1.js';
import StoryScene2 from './StoryScene2.js';
import StoryScene3 from './StoryScene3.js';
import StoryScene4 from './StoryScene4.js';

class StorySceneAll extends THREE.Group {
  constructor() {
    super();

    this.storyScene1;
    this.storyScene2;
    this.storyScene3;
    this.storyScene4;

    this.constructChildren();
  }

  constructChildren() {
    this.addStoryScene1();
    this.addStoryScene2();
    this.addStoryScene3();
    this.addStoryScene4();
  }

  addStoryScene1() {
    const storyScene1 = new StoryScene1();
    storyScene1.position.set(0, 0, 0);
    this.storyScene1 = storyScene1;
    this.add(storyScene1);
  }

  addStoryScene2() {
    const storyScene2 = new StoryScene2();
    storyScene2.position.set(0, 0, 0);
    storyScene2.rotation.copy(new THREE.Euler(0, degToRadians(90), 0));
    this.storyScene2 = storyScene2;
    this.add(storyScene2);
  }

  addStoryScene3() {
    const storyScene3 = new StoryScene3();
    storyScene3.position.set(0, 0, 0);
    storyScene3.rotation.copy(new THREE.Euler(0, degToRadians(180), 0));
    this.storyScene3 = storyScene3;
    this.add(storyScene3);
  }

  addStoryScene4() {
    const storyScene4 = new StoryScene4();
    storyScene4.position.set(0, 0, 0);
    storyScene4.rotation.copy(new THREE.Euler(0, degToRadians(270), 0));
    this.storyScene4 = storyScene4;
    this.add(storyScene4);
  }

  animationsScene(activeScene) {
    switch (activeScene) {
      case 0:
        if (this.children[0].children.length != this.children[0].counterLoadObj) {
          return;
        } else {
          this.children[0].animations();
        }
        break;
      case 1:
        if (this.children[1].children.length != this.children[1].counterLoadObj) {
          return;
        } else {
          this.children[1].animations();
        }
        break;
      case 2:
        if (this.children[2].children.length != this.children[2].counterLoadObj) {
          return;
        } else {
          this.children[2].animations();
        }
        break;
      case 3:
        if (this.children[3].children.length != this.children[3].counterLoadObj) {
          return;
        } else {
          this.children[3].animations();
        }
        break;
    }
  }
}

export default StorySceneAll;
