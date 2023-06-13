import { primitive, ubo_buffer } from "../res/resurses.js";
import { matr4, vec3 } from "../../../mth/mth.js";

//BindPoints:
//gradientSquereTime = 0;
//mondelbrotPrecalcAtr = 1;
//projSquareWorldMatrix = 2;

/////////////////
///GradientSquere
/////////////////
class GradientSquere {
  prim;
  ubo;
  init() {
    //const pos = [-0.5, -0.5, 0, 1, 0.5, -0.5, 0, 1, 0.5, 0.5, 0, 1];
    const pos = [
      [-1, 1, 0, 1],
      [-1, -4, 0, 1],
      [3, 1, 0, 1],
    ];
    const ind = [0, 1, 2];
    //const pos = [1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, 1, -1, 1, 0, 1];
    this.prim = primitive("gradientsquere", ind, pos);
    this.prim.shd.prog.then(() => {
      this.ubo = ubo_buffer(this.prim.shd.prog, "uboTime", 3, 16);
    });
  }

  response() {
    let date = new Date();
    let time = date.getSeconds() * 1000 + date.getMilliseconds();
    let uboTime = [time, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    if (this.ubo == undefined) return;
    this.ubo.update(uboTime);
  }
}
/////////////
///Mondelbrot
/////////////

class Mondelbrot {
  prim;
  init() {
    const pos = [
      [1, -1, -0.1, 1],
      [-1, -1, -0.1, 1],
      [1, 1, -0.1, 1],
      [-1, 1, -0.1, 1],
    ];
    const ind = [0, 1, 2, 3];

    this.prim = primitive("mondelbrot", ind, pos);
    this.prim.shd.prog.then(() => {
      this.ubo = ubo_buffer(
        this.prim.shd.prog,
        "mondelbrotAtributes",
        3,
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      );
    });
  }

  response() {
    let time,
      size,
      lenqx,
      lenqy,
      ubo = [];

    let date = new Date();
    time = date.getSeconds() * 1000 + date.getMilliseconds();
    ubo[0] = time;

    size = 65536.0;
    ubo[1] = size;

    lenqx = 2.0;
    ubo[2] = lenqx;

    lenqy = 2.0;
    ubo[3] = lenqy;

    if (this.ubo == undefined) return;
    this.ubo.update(ubo);
  }
}

/////////////
///ProjSquare
/////////////

class ProjSquare {
  init() {
    let pos = [
      [1, -1, 0, 1],
      [-1, -1, 0, 1],
      [1, 1, 0, 1],
      [-1, 1, 0, 1],
    ];
    const ind = [0, 1, 2, 3];
    this.prim = primitive("projsquare", ind, pos);
    this.prim.shd.prog.then(() => {
      this.ubo = ubo_buffer(
        this.prim.shd.prog,
        "matrW",
        3,
        matr4().toArray().m
      );
    });
  }

  response() {
    let time;

    let date = new Date();
    time = date.getSeconds() * 1000 + date.getMilliseconds();

    let matrR = matr4();
    matrR.mulMatr(matr4().scale(vec3(0.5)));
    matrR.mulMatr(matr4().rotate(Math.sin(time * 0.001) * 0.1, vec3(0, 1, 0)));
    matrR.toArray();
    if (this.ubo == undefined) return;
    this.ubo.update(matrR.m);
  }
}

//////////////////
///exportetd class
//////////////////
class _units {
  unitsArray = [];

  init() {
    this.unitsArray.push(new GradientSquere());
    this.unitsArray.push(new Mondelbrot());
    this.unitsArray.push(new ProjSquare());
  }
}

export function units(...arg) {
  return new _units(...arg);
}
