import * as THREE from "three";
import WAVES from "vanta/dist/vanta.waves.min";

const emerald700 = 0x47857;
const target = document.body;
WAVES({
  el: target,
  color: emerald700,
  THREE,
});
