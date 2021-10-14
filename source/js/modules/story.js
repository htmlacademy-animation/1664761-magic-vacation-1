import * as THREE from 'three';
import helperRawShaderMaterial from '../helpers/helperRawShaderMaterial';

export default class Story {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspectRation = this.width / this.height;

    this.textures = [
      {src: './img/module-5/scenes-textures/scene-1.png', options: {hue: 0.0}},
      {src: './img/module-5/scenes-textures/scene-2.png', options: {hue: -0.25}},
      {src: './img/module-5/scenes-textures/scene-3.png', options: {hue: 0.0}},
      {src: './img/module-5/scenes-textures/scene-4.png', options: {hue: 0.0}},
    ];
    this.textureWidth = 2048;
    this.textureHeight = 1024;
    this.textureRatio = this.textureWidth / this.textureHeight;

    this.canvasId = 'canvas-story';

    this.render = this.render.bind(this);
  }

  init() {
    this.canvas = document.getElementById(this.canvasId);
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(45, this.aspectRation, 0.1, 1200);
    this.camera.position.z = 1200;

    this.color = new THREE.Color(0x5f458c);
    this.alpha = 1;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas
    });
    this.renderer.setClearColor(this.color, this.alpha);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);

    const loadManager = new THREE.LoadingManager();
    const textureLoader = new THREE.TextureLoader(loadManager);
    const loadedTextures = this.textures.map((texture) => ({src: textureLoader.load(texture.src), options: texture.options}));
    const geometry = new THREE.PlaneGeometry(1, 1);

    

    loadManager.onLoad = () => {
      loadedTextures.forEach((texture, i) => {
        const material = new THREE.RawShaderMaterial(helperRawShaderMaterial(texture.src, texture.options));
        const image = new THREE.Mesh(geometry, material);
        image.scale.x = this.textureWidth;
        image.scale.y = this.textureHeight;
        image.position.x = this.textureWidth * i;

        this.scene.add(image);
      });
      this.render();
    };
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  setScene(i) {
    this.camera.position.x = this.textureWidth * i;
    this.render();
  }

}
