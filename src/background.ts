import {
  Scene,
  WebGLRenderer,
  DoubleSide,
  MeshPhongMaterial,
  Geometry,
  Vector3,
  Face3,
  FaceColors,
  Mesh,
  AmbientLight,
  PointLight,
  PerspectiveCamera,
} from "three";
import WAVES from "vanta/dist/vanta.waves.min";

const THREE = {
  Scene,
  WebGLRenderer,
  DoubleSide,
  MeshPhongMaterial,
  Geometry,
  Vector3,
  Face3,
  FaceColors,
  Mesh,
  AmbientLight,
  PointLight,
  PerspectiveCamera,
};

const emerald700 = 0x47857;
const target = document.body;
WAVES({
  el: target,
  color: emerald700,
  THREE,
});
