import { units } from "./unit.js";

class _animation {
  constructor() {
    this.units = units();
  }
  draw() {
    for (let i = 0; i < this.units.unitsArray.length; i++) {
      if (this.units.unitsArray[i].prim.shd.prog != undefined) {
        this.units.unitsArray[i].response();
        gl.useProgram(this.units.unitsArray[i].prim.shd.prog);
        gl.drawArrays(
          gl.TRIANGLE_STRIP,
          0,
          this.units.unitsArray[i].prim.numOfVertex
        );
      }
    }
  }

  init() {
    this.units.init();

    for (let i = 0; i < this.units.unitsArray.length; i++) {
      this.units.unitsArray[i].init();
    }
  }
}

export function animation(...arg) {
  return new _animation(...arg);
}
