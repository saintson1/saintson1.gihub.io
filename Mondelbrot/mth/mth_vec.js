class _vec3 {
  constructor(x, y, z) {
    if (x == undefined) {
      (this.x = 1), (this.y = 1), (this.z = 1);
    } else if (typeof x == "object")
      if (x.length == 3) {
        (this.x = x[0]), (this.y = x[1]), (this.z = x[2]);
      } else {
        (this.x = x.x), (this.y = x.y), (this.z = x.z);
      }
    else if (y == undefined && z == undefined)
      (this.x = x), (this.y = x), (this.z = x);
    else {
      (this.x = x), (this.y = y), (this.z = z);
    }
  } // End of 'constructor' function

  toArray() {
    return [this.x, this.y, this.z];
  } // End of 'toArray' function

  add(v) {
    if (typeof v == "number") return vec3(this.x + v, this.y + v, this.z + v);
    return vec3(this.x + v.x, this.y + v.y, this.z + v.z);
  } // End of 'add' function

  cross(a) {
    if (typeof a == "number") {
      if (a == 0) return vec3(0);
      if (a == 1) return this;
      return vec3(this.x * a, this.y * a, this.z * a);
    } else {
      return vec3(
        this.y * a.z - this.z * a.y,
        this.z * a.x - this.x * a.z,
        this.x * a.y - this.y * a.x
      );
    }
  } // End of 'cross' function

  neg() {
    return this.cross(-1);
  } // End of 'neg' function

  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  } // End of 'dot' function

  len() {
    if (this.dot(this) == 1 || this.dot(this) == 0) return this.dot(this);
    return Math.sqrt(this.dot(this));
  } // End of 'len' function

  normalize() {
    if (this.len == 1 || this.len == 0) return this;

    return this.cross(Math.sqrt(1.0 / this.len()));
  } // End of 'normalize' function

  pointTransform(matr) {
    return vec3(
      this.x * matr[0][0] +
        this.y * matr[1][0] +
        this.z * matr[2][0] +
        matr[3][0],
      this.x * matr[0][1] +
        this.y * matr[1][1] +
        this.z * matr[2][1] +
        matr[3][1],
      this.x * matr[0][2] +
        this.y * matr[1][2] +
        this.z * matr[2][2] +
        matr[3][2]
    );
  } // End of 'pointTransform' function

  vectorTransform(matr) {
    return vec3(
      this.x * matr[0][0] + this.y * matr[1][0] + this.z * matr[2][0],
      this.x * matr[0][1] + this.y * matr[1][1] + this.z * matr[2][1],
      this.x * matr[0][2] + this.y * matr[1][2] + this.z * matr[2][2]
    );
  } // End of 'vectorTransform' function

  mulMatr(matr) {
    let r = this.pointTransform(matr);
    r.cross(
      1.0 /
        (r.x * matr[0][3] + r.y * matr[1][3] + r.z * matr[2][3] + matr[3][3])
    );

    return vec3(r);
  } // End of 'mulMatr' function
}

export function vec3(...arg) {
  return new _vec3(...arg);
}
