import { primitive } from "../res/resurses.js";
import { matr4, vec3 } from "../../../mth/mth.js";

/////////////////
///GradientSquere
/////////////////
class GradientSquere {
  prim;
  init() {
    const pos = [-1, 1, 0, 1, -1, -4, 0, 1, 3, 1, 0, 1];
    //const pos = [1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, 1, -1, 1, 0, 1];
    this.prim = primitive("gradientsquere", pos);
  }

  response() {
    let date = new Date();
    let time = date.getSeconds() * 1000 + date.getMilliseconds();
    this.prim.uboFloatCreate(time, "time");
  }
}
/////////////
///Mondelbrot
/////////////

class Mondelbrot {
  prim;
  init() {
    const pos = [1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, 1, -1, 1, 0, 1];
    this.prim = primitive("mondelbrot", pos);
  }

  response() {
    let time, size, lenqx, lenqy;

    let date = new Date();
    time = date.getSeconds() * 1000 + date.getMilliseconds();
    this.prim.uboFloatCreate(time, "time");

    size = 65536.0;
    this.prim.uboFloatCreate(size, "size");

    lenqx = 2.0;
    this.prim.uboFloatCreate(lenqx, "lenqx");

    lenqy = 2.0;
    this.prim.uboFloatCreate(lenqy, "lenqy");
  }
}

/////////////
///ProjSquare
/////////////

class ProjSquare {
  prim;
  init() {
    let pos = [1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, 1, -1, 1, 0, 1];

    this.prim = primitive("projsquare", pos);
  }

  response() {
    let time;

    let date = new Date();
    time = date.getSeconds() * 1000 + date.getMilliseconds();

    let matrR = matr4();
    matrR.mulMatr(matr4().scale(vec3(0.5)));
    matrR.mulMatr(matr4().rotate(Math.sin(time * 0.001), vec3(0, 1, 0)));
    matrR.toArray();
    for (let i = 0; i < matrR.m.length; i++)
      this.prim.uboFloatCreate(matrR.m[i], "matrR" + i);
  }
}

//////////////////
///exportetd class
//////////////////
class _units {
  unitsArray = [];

  init() {
    //this.unitsArray.push(new GradientSquere());
    //this.unitsArray.push(new Mondelbrot());
    this.unitsArray.push(new ProjSquare());
  }
}

export function units(...arg) {
  return new _units(...arg);
}
