import { vec3, matr4 } from "./mth.js";

class _camera {
  constructor() {
    //Rendering borders settings
    this.projSize = 0.1;
    this.projDist = 0.1;
    this.projFarClip = 1800;

    // Frame settings
    this.frameW = 1000; // Frame width
    this.frameH = 1000; // Frame height

    // Matrices settings
    this.matrView = matr4(); // View coordinate matrix
    this.matrProj = matr4(); // Projection coordinate matrix
    this.matrVP = matr4(); // View and projection matrix

    // Camera settings
    this.loc = vec3(); // Location
    this.at = vec3(); // Destination
    this.dir = vec3(); // Direction
    this.up = vec3(); // Up direction
    this.right = vec3(); // Right direction
    this.setDef();
  } // End of 'constructor' function

  // Camera parmeters setting function
  set(loc, at, up) {
    this.matrView = this.matrView.setView(loc, at, up);
    this.loc = vec3(loc);
    this.at = vec3(at);
    this.dir = vec3(
      -this.matrView.m[0][2],
      -this.matrView.m[1][2],
      -this.matrView.m[2][2]
    );
    this.up = vec3(
      this.matrView.m[0][1],
      this.matrView.m[1][1],
      this.matrView.m[2][1]
    );
    this.right = vec3(
      this.matrView.m[0][0],
      this.matrView.m[1][0],
      this.matrView.m[2][0]
    );
    this.matrVP = matr4(this.matrView).mulMatr(this.matrProj);
  } // End of 'set' function

  // Projection parameters setting function.
  setProj(projSize, projDist, projFarClip) {
    let rx = projSize,
      ry = projSize;

    this.projDist = projDist;
    this.projSize = projSize;
    this.projFarClip = projFarClip;

    // Correct aspect ratio
    if (this.frameW > this.frameH) rx *= this.frameW / this.frameH;
    else ry *= this.frameH / this.frameW;
    this.matrProj.setFrustum(
      -rx / 2.0,
      rx / 2.0,
      -ry / 2.0,
      ry / 2.0,
      projDist,
      projFarClip
    );

    // pre-calculate view * proj matrix
    this.matrVP = matr4(this.matrView).mulMatr(this.matrProj);
  } // End of 'setProj' function

  // Resize camera and projection function.
  setSize(frameW, frameH) {
    if (frameW < 1) frameW = 1;
    if (frameH < 1) frameH = 1;
    this.frameW = frameW;
    this.frameH = frameH;
    // Reset projection with new render window size
    this.setProj(this.projSize, this.projDist, this.projFarClip);
  } // End of 'setSize' function

  // Camera set default values function.
  setDef() {
    this.loc = vec3(0, 0, 8);
    this.at = vec3(0, 0, 0);
    this.dir = vec3(0, 0, -1);
    this.up = vec3(0, 1, 0);
    this.right = vec3(1, 0, 0);

    this.projDist = 0.1;
    this.projSize = 0.1;
    this.projFarClip = 1800;

    this.frameW = 1000;
    this.frameH = 1000;

    this.set(this.loc, this.at, this.up);
    this.setProj(this.projSize, this.projDist, this.projFarClip);
    this.setSize(this.frameW, this.frameH);
  } // End of 'setDef' function
} // End of '_camera' class

export function camera(...args) {
  return new _camera(args);
} // End of 'camera' function
