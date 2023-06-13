import { animation } from "./anim/animation.js";
import { camera } from "../../mth/mth.js";

class _render {
  constructor() {
    this.anim = animation();
    this.camera = camera();
  }
  draw() {
    this.anim.draw();
  }

  response() {
    //
  }

  start() {
    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
  }

  init() {
    const canvas = document.getElementById("glCanvas");
    window.gl = canvas.getContext("webgl2");

    this.anim.init();
  }

  close() {
    // Windows work
  }
}

export function render(...arg) {
  return new _render(...arg);
}
