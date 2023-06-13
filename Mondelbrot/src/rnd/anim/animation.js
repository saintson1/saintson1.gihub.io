import { units } from "./unit.js";

class _animation {
  constructor() {
    this.units = units();
  }
  draw(drawType, offset) {
    if (drawType == undefined) drawType = gl.TRIANGLE_STRIP;
    if (offset == undefined) offset = 0;

    for (let i = 0; i < this.units.unitsArray.length; i++) {
      if (this.units.unitsArray[i].prim.shd.prog.then == undefined) {
        this.units.unitsArray[i].response();

        this.units.unitsArray[i].prim.vertex_buffer.apply();
        this.units.unitsArray[i].prim.index_buffer.apply();
        if (this.units.unitsArray[i].ubo != undefined)
          this.units.unitsArray[i].ubo.apply();
        gl.useProgram(this.units.unitsArray[i].prim.shd.prog);
        gl.drawElements(
          drawType,
          this.units.unitsArray[i].prim.numOfVertex,
          gl.UNSIGNED_SHORT,
          offset
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
