import { radiansToDegrees } from "./mth.js";

class _matr4 {
  constructor(
    A00,
    A01,
    A02,
    A03,
    A10,
    A11,
    A12,
    A13,
    A20,
    A21,
    A22,
    A23,
    A30,
    A31,
    A32,
    A33
  ) {
    if (A00 == undefined)
      this.m = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
      ];
    else if (A00[1] == undefined)
      this.m = [
        [A00, A01, A02, A03],
        [A10, A11, A12, A13],
        [A20, A21, A22, A23],
        [A30, A31, A32, A33],
      ];
    else if (A00[3] != undefined && A00[4] == undefined)
      if (A00[3][1] == undefined) this.m = [A00, A02, A03, A04];
      else this.m = [A00[0], A00[1], A00[2], A00[3]];
    else if (A00[15] != undefined)
      this.m = [
        [A00[0], A00[1], A00[2], A00[3]],
        [A00[4], A00[5], A00[6], A00[7]],
        [A00[8], A00[9], A00[10], A00[11]],
        [A00[12], A00[13], A00[14], A00[15]],
      ];
    else console.log("uncorrect MATR4 input");
  } // End of 'constructor' function

  toArray() {
    let r = [];

    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++) {
        r.push(this.m[i][j]);
      }
    return r;
  } // End of 'toArray' function

  translate(v) {
    this.m = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [v.x, v.y, v.z, 1],
    ];
    return this;
  } // End of 'translate' function

  scale(v) {
    this.m = [
      [v.x, 0, 0, 0],
      [0, v.y, 0, 0],
      [0, 0, v.z, 0],
      [0, 0, 0, 1],
    ];
    return this;
  } // End of 'scale' function

  rotate(pi, v) {
    let deg = radiansToDegrees(pi);
    v.normalize();

    this.m = [
      [
        Math.cos(deg) + v.x * v.x * (1 - Math.cos(deg)),
        v.x * v.y * (1 - Math.cos(deg)) + v.z * Math.sin(deg),
        v.x * v.z * (1 - Math.cos(deg)) - v.y * Math.sin(deg),
        0,
      ],
      [
        v.y * v.x * (1 - Math.cos(deg)) - v.z * Math.sin(deg),
        Math.cos(deg) + v.y * v.y * (1 - Math.cos(deg)),
        v.y * v.z * (1 - Math.cos(deg)) + v.x * Math.sin(deg),
        0,
      ],
      [
        v.z * v.x * (1 - Math.cos(deg)) + v.y * Math.sin(deg),
        v.z * v.y * (1 - Math.cos(deg)) - v.x * Math.sin(deg),
        Math.cos(deg) + v.z * v.z * (1 - Math.cos(deg)),
        0,
      ],
      [0, 0, 0, 1],
    ];
    return this;
  } // End of 'rotate' function

  transpos() {
    let r = [[], [], [], []];

    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++) r[i][j] = this.m[j][i];
    this.m = r;
    return this;
  } // End of 'transpose' function

  addMatr(m) {
    this.m[0][0] = this.m[0][0] + m.m[0][0];
    this.m[0][1] = this.m[0][1] + m.m[0][1];
    this.m[0][2] = this.m[0][2] + m.m[0][2];
    this.m[0][3] = this.m[0][3] + m.m[0][3];
    this.m[1][0] = this.m[1][0] + m.m[1][0];
    this.m[1][1] = this.m[1][1] + m.m[1][1];
    this.m[1][2] = this.m[1][2] + m.m[1][2];
    this.m[1][3] = this.m[1][3] + m.m[1][3];
    this.m[2][0] = this.m[2][0] + m.m[2][0];
    this.m[2][1] = this.m[2][1] + m.m[2][1];
    this.m[2][2] = this.m[2][2] + m.m[2][2];
    this.m[2][3] = this.m[2][3] + m.m[2][3];
    this.m[3][0] = this.m[3][0] + m.m[3][0];
    this.m[3][1] = this.m[3][1] + m.m[3][1];
    this.m[3][2] = this.m[3][2] + m.m[3][2];
    this.m[3][3] = this.m[3][3] + m.m[3][3];

    return this;
  } // End of 'addMatr' function

  mulMatr(m) {
    this.m[0][0] =
      this.m[0][0] * m.m[0][0] +
      this.m[0][1] * m.m[1][0] +
      this.m[0][2] * m.m[2][0] +
      this.m[0][3] * m.m[3][0];
    this.m[0][1] =
      this.m[0][0] * m.m[0][1] +
      this.m[0][1] * m.m[1][1] +
      this.m[0][2] * m.m[2][1] +
      this.m[0][3] * m.m[3][1];
    this.m[0][2] =
      this.m[0][0] * m.m[0][2] +
      this.m[0][1] * m.m[1][2] +
      this.m[0][2] * m.m[2][2] +
      this.m[0][3] * m.m[3][2];
    this.m[0][3] =
      this.m[0][0] * m.m[0][3] +
      this.m[0][1] * m.m[1][3] +
      this.m[0][2] * m.m[2][3] +
      this.m[0][3] * m.m[3][3];
    this.m[1][0] =
      this.m[1][0] * m.m[0][0] +
      this.m[1][1] * m.m[1][0] +
      this.m[1][2] * m.m[2][0] +
      this.m[1][3] * m.m[3][0];
    this.m[1][1] =
      this.m[1][0] * m.m[0][1] +
      this.m[1][1] * m.m[1][1] +
      this.m[1][2] * m.m[2][1] +
      this.m[1][3] * m.m[3][1];
    this.m[1][2] =
      this.m[1][0] * m.m[0][2] +
      this.m[1][1] * m.m[1][2] +
      this.m[1][2] * m.m[2][2] +
      this.m[1][3] * m.m[3][2];
    this.m[1][3] =
      this.m[1][0] * m.m[0][3] +
      this.m[1][1] * m.m[1][3] +
      this.m[1][2] * m.m[2][3] +
      this.m[1][3] * m.m[3][3];
    this.m[2][0] =
      this.m[2][0] * m.m[0][0] +
      this.m[2][1] * m.m[1][0] +
      this.m[2][2] * m.m[2][0] +
      this.m[2][3] * m.m[3][0];
    this.m[2][1] =
      this.m[2][0] * m.m[0][1] +
      this.m[2][1] * m.m[1][1] +
      this.m[2][2] * m.m[2][1] +
      this.m[2][3] * m.m[3][1];
    this.m[2][2] =
      this.m[2][0] * m.m[0][2] +
      this.m[2][1] * m.m[1][2] +
      this.m[2][2] * m.m[2][2] +
      this.m[2][3] * m.m[3][2];
    this.m[2][3] =
      this.m[2][0] * m.m[0][3] +
      this.m[2][1] * m.m[1][3] +
      this.m[2][2] * m.m[2][3] +
      this.m[2][3] * m.m[3][3];
    this.m[3][0] =
      this.m[3][0] * m.m[0][0] +
      this.m[3][1] * m.m[1][0] +
      this.m[3][2] * m.m[2][0] +
      this.m[3][3] * m.m[3][0];
    this.m[3][1] =
      this.m[3][0] * m.m[0][1] +
      this.m[3][1] * m.m[1][1] +
      this.m[3][2] * m.m[2][1] +
      this.m[3][3] * m.m[3][1];
    this.m[3][2] =
      this.m[3][0] * m.m[0][2] +
      this.m[3][1] * m.m[1][2] +
      this.m[3][2] * m.m[2][2] +
      this.m[3][3] * m.m[3][2];
    this.m[3][3] =
      this.m[3][0] * m.m[0][3] +
      this.m[3][1] * m.m[1][3] +
      this.m[3][2] * m.m[2][3] +
      this.m[3][3] * m.m[3][3];

    return this;
  } // End of 'mulMatr' function

  static determ3x3(a11, a12, a13, a21, a22, a23, a31, a32, a33) {
    return (
      a11 * a22 * a33 +
      a12 * a23 * a31 +
      a13 * a21 * a32 -
      a11 * a23 * a32 -
      a12 * a21 * a33 -
      a13 * a22 * a31
    );
  } // End of 'determ3x3' stutic function

  determ() {
    let det =
      this.m[0][0] *
        this.determ3x3(
          this.m[1][1],
          this.m[1][2],
          this.m[1][3],
          this.m[2][1],
          this.m[2][2],
          this.m[2][3],
          this.m[3][1],
          this.m[3][2],
          this.m[3][3]
        ) -
      this.m[0][1] *
        this.determ3x3(
          this.m[1][0],
          this.m[1][2],
          this.m[1][3],
          this.m[2][0],
          this.m[2][2],
          this.m[2][3],
          this.m[3][0],
          this.m[3][2],
          this.m[3][3]
        ) +
      this.m[0][2] *
        this.determ3x3(
          this.m[1][0],
          this.m[1][1],
          this.m[1][3],
          this.m[2][0],
          this.m[2][1],
          this.m[2][3],
          this.m[3][0],
          this.m[3][1],
          this.m[3][3]
        ) -
      this.m[0][3] *
        this.determ3x3(
          this.m[1][0],
          this.m[1][1],
          this.m[1][2],
          this.m[2][0],
          this.m[2][1],
          this.m[2][2],
          this.m[3][0],
          this.m[3][1],
          this.m[3][2]
        );

    return det;
  } // End of 'determ' function

  inverse() {
    let det = this.determ();

    if (det == 0) return matr4();

    /* Build adjoint matrix */
    this.m[0][0] =
      this.determ3x3(
        this.m[1][1],
        this.m[1][2],
        this.m[1][3],
        this.m[2][1],
        this.m[2][2],
        this.m[2][3],
        this.m[3][1],
        this.m[3][2],
        this.m[3][3]
      ) / det;
    this.m[1][0] =
      -this.determ3x3(
        this.m[1][0],
        this.m[1][2],
        this.m[1][3],
        this.m[2][0],
        this.m[2][2],
        this.m[2][3],
        this.m[3][0],
        this.m[3][2],
        this.m[3][3]
      ) / det;
    this.m[2][0] =
      this.determ3x3(
        this.m[1][0],
        this.m[1][1],
        this.m[1][3],
        this.m[2][0],
        this.m[2][1],
        this.m[2][3],
        this.m[3][0],
        this.m[3][1],
        this.m[3][3]
      ) / det;
    this.m[3][0] =
      -this.determ3x3(
        this.m[1][0],
        this.m[1][1],
        this.m[1][2],
        this.m[2][0],
        this.m[2][1],
        this.m[2][2],
        this.m[3][0],
        this.m[3][1],
        this.m[3][2]
      ) / det;

    this.m[0][1] =
      -this.determ3x3(
        this.m[0][1],
        this.m[0][2],
        this.m[0][3],
        this.m[2][1],
        this.m[2][2],
        this.m[2][3],
        this.m[3][1],
        this.m[3][2],
        this.m[3][3]
      ) / det;
    this.m[1][1] =
      this.determ3x3(
        this.m[0][0],
        this.m[0][2],
        this.m[0][3],
        this.m[2][0],
        this.m[2][2],
        this.m[2][3],
        this.m[3][0],
        this.m[3][2],
        this.m[3][3]
      ) / det;
    this.m[2][1] =
      -this.determ3x3(
        this.m[0][0],
        this.m[0][1],
        this.m[0][3],
        this.m[2][0],
        this.m[2][1],
        this.m[2][3],
        this.m[3][0],
        this.m[3][1],
        this.m[3][3]
      ) / det;
    this.m[3][1] =
      this.determ3x3(
        this.m[0][0],
        this.m[0][1],
        this.m[0][2],
        this.m[2][0],
        this.m[2][1],
        this.m[2][2],
        this.m[3][0],
        this.m[3][1],
        this.m[3][2]
      ) / det;
    this.m[0][2] =
      this.determ3x3(
        this.m[0][1],
        this.m[0][2],
        this.m[0][3],
        this.m[1][1],
        this.m[1][2],
        this.m[1][3],
        this.m[3][1],
        this.m[3][2],
        this.m[3][3]
      ) / det;
    this.m[1][2] =
      -this.determ3x3(
        this.m[0][0],
        this.m[0][2],
        this.m[0][3],
        this.m[1][0],
        this.m[1][2],
        this.m[1][3],
        this.m[3][0],
        this.m[3][2],
        this.m[3][3]
      ) / det;
    this.m[2][2] =
      this.determ3x3(
        this.m[0][0],
        this.m[0][1],
        this.m[0][3],
        this.m[1][0],
        this.m[1][1],
        this.m[1][3],
        this.m[3][0],
        this.m[3][1],
        this.m[3][3]
      ) / det;
    this.m[3][2] =
      -this.determ3x3(
        this.m[0][0],
        this.m[0][1],
        this.m[0][2],
        this.m[1][0],
        this.m[1][1],
        this.m[1][2],
        this.m[3][0],
        this.m[3][1],
        this.m[3][2]
      ) / det;

    this.m[0][3] =
      -this.determ3x3(
        this.m[0][1],
        this.m[0][2],
        this.m[0][3],
        this.m[1][1],
        this.m[1][2],
        this.m[1][3],
        this.m[2][1],
        this.m[2][2],
        this.m[2][3]
      ) / det;

    this.m[1][3] =
      this.determ3x3(
        this.m[0][0],
        this.m[0][2],
        this.m[0][3],
        this.m[1][0],
        this.m[1][2],
        this.m[1][3],
        this.m[2][0],
        this.m[2][2],
        this.m[2][3]
      ) / det;
    this.m[2][3] =
      -this.determ3x3(
        this.m[0][0],
        this.m[0][1],
        this.m[0][3],
        this.m[1][0],
        this.m[1][1],
        this.m[1][3],
        this.m[2][0],
        this.m[2][1],
        this.m[2][3]
      ) / det;
    this.m[3][3] =
      this.determ3x3(
        this.m[0][0],
        this.m[0][1],
        this.m[0][2],
        this.m[1][0],
        this.m[1][1],
        this.m[1][2],
        this.m[2][0],
        this.m[2][1],
        this.m[2][2]
      ) / det;
    return this;
  } // End of 'inverse' function

  setView(loc, at, up1) {
    let dir = at.add(-loc).normalize(),
      right = dir.cross(up1).normalize(),
      up = right.cross(dir).normalize();
    this.m = [
      [right.x, up.x, -dir.x, 0],
      [right.y, up.y, -dir.y, 0],
      [right.z, up.z, -dir.z, 0],
      [-loc.dot(right), -loc.dot(up), loc.dot(dir), 1],
    ];
    return this;
  } // End of 'setView' function

  setOrtho(left, right, bottom, top, near, far) {
    this.m = [
      [2 / (right - left), 0, 0, 0],
      [0, 2 / (top - bottom), 0, 0],
      [0, 0, -2 / (far - near), 0],
      [
        -(right + left) / (right - left),
        -(top + bottom) / (top - bottom),
        -(far + near) / (far - near),
        1,
      ],
    ];
    return this;
  } // End of 'setOrtho' function

  setFrustum(left, right, bottom, top, near, far) {
    this.m = [
      [(2 * near) / (right - left), 0, 0, 0],
      [0, (2 * near) / (top - bottom), 0, 0],
      [
        (right + left) / (right - left),
        (top + bottom) / (top - bottom),
        -(far + near) / (far - near),
        -1,
      ],
      [0, 0, (-2 * near * far) / (far - near), 0],
    ];
    return this;
  } // End of 'setFrustum' function

  view(loc, at, up1) {
    return this.mul(mat4().setView(loc, at, up1));
  } // End of 'view' function

  ortho(left, light, lottom, lop, lear, lar) {
    return this.mul(mat4().setOrtho(left, right, bottom, top, near, far));
  } // End of 'ortho' function

  frustum(left, right, bottom, top, near, far) {
    return this.mul(mat4().setFrustum(left, right, bottom, top, near, far));
  } // End of 'frustum' function
} // End of '_matr4' class'

export function matr4(...arg) {
  return new _matr4(...arg);
}
