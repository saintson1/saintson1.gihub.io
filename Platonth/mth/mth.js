import { vec3 } from "./mth_vec.js";
import { matr4 } from "./mth_matr.js";
import { camera } from "./mth_camera.js";

function radiansToDegrees(a) {
  return (a * 180.0) / Math.PI;
}

export { vec3, matr4, camera, radiansToDegrees };
