import {
  colors,
  reflectivity
} from '../../../helpers/colorsAndReflection.js';

const objectsConfig = [{
    name: `airplane`,
    type: `obj`,
    path: `3d/module-6/scene-0-objects/airplane.obj`,
    color: colors.White,
    reflectivity: reflectivity.soft
  },
  {
    name: `suitcase`,
    type: `gltf`,
    path: `3d/module-6/scene-0-objects/suitcase.gltf`,
  },
  {
    name: `watermelon`,
    type: `gltf`,
    path: `3d/module-6/scene-0-objects/watermelon.gltf`,
  },
  {
    name: `wallCornerUnit`,
    type: `obj`,
    path: `3d/module-6/rooms-scenes/common/WallCornerUnit.obj`,
  },
  {
    name: `scene1`,
    type: `gltf`,
    path: `3d/module-6/rooms-scenes/scenesStatic/scene1-static-output-1.gltf`,
  },
  {
    name: `scene2`,
    type: `gltf`,
    path: `3d/module-6/rooms-scenes/scenesStatic/scene2-static-output-1.gltf`,
  },
  {
    name: `scene3`,
    type: `gltf`,
    path: `3d/module-6/rooms-scenes/scenesStatic/scene3-static-output-1.gltf`,
  },
  {
    name: `scene4`,
    type: `gltf`,
    path: `3d/module-6/rooms-scenes/scenesStatic/scene4-static-output-1.gltf`,
  },
];

export default objectsConfig;
