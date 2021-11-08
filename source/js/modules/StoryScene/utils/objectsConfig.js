import {
  colors,
  reflectivity
} from '../../../helpers/colorsAndReflection.js';

const objectsConfig = [{
    name: `airplane`,
    type: `obj`,
    path: `3d/module-6/scene-0-objects/airplane.obj`,
    color: colors.White,
    reflectivity: reflectivity.soft,
    castShadow: true
  },
  {
    name: `suitcase`,
    type: `gltf`,
    path: `3d/module-6/scene-0-objects/suitcase.gltf`,
    castShadow: true,
  },
  {
    name: `watermelon`,
    type: `gltf`,
    path: `3d/module-6/scene-0-objects/watermelon.gltf`,
    castShadow: true
  },
  {
    name: `wallCornerUnit`,
    type: `obj`,
    path: `3d/module-6/rooms-scenes/common/WallCornerUnit.obj`,
    receiveShadow: true,
  },
  {
    name: `scene1`,
    type: `gltf`,
    path: `3d/module-6/rooms-scenes/scenesStatic/scene1-static-output-1.gltf`,
    castShadow: true,
  },
  {
    name: `scene2`,
    type: `gltf`,
    path: `3d/module-6/rooms-scenes/scenesStatic/scene2-static-output-1.gltf`,
    castShadow: true,
    receiveShadow: true,
  },
  {
    name: `scene3`,
    type: `gltf`,
    path: `3d/module-6/rooms-scenes/scenesStatic/scene3-static-output-1.gltf`,
    castShadow: true,
    receiveShadow: true,
  },
  {
    name: `scene4`,
    type: `gltf`,
    path: `3d/module-6/rooms-scenes/scenesStatic/scene4-static-output-1.gltf`,
    castShadow: true,
  },
  {
    name: `dog`,
    type: `gltf`,
    path: `3d/module-6/rooms-scenes/objects/dog.gltf`,
    castShadow: true,
  },
  {
    name: `compass`,
    type: `gltf`,
    path: `3d/module-6/rooms-scenes/objects/compass.gltf`,
    castShadow: true,
  },
  {
    name: `sonya`,
    type: `gltf`,
    path: `3d/module-6/rooms-scenes/objects/sonya.gltf`,
    castShadow: true,
  },
];

export default objectsConfig;
