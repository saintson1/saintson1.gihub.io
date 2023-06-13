function vboToArray(vbo) {
  let i = 0,
    j,
    arr = [];

  while (vbo[i] != undefined) {
    j = 0;
    while (vbo[i][j] != undefined) {
      arr.push(vbo[i][j]);
      j++;
    }
    i++;
  }
  return arr;
}

/*class buffer {
  constructor(type, size) {
    if (size == 0 || type == undefined) return;
    this.id = gl.createBuffer();
    this.type = type;
    gl.bindBuffer(this.type, this.id);
    gl.bufferData(type, size, gl.STATIC_DRAW);
  }
  update(data, offset) {
    gl.bindBuffer(this.type, this.id);
    gl.bufferSubData(this.type, offset, data, 0);
  }
  apply() {
    gl.bindBuffer(this.type, this.id);
  }
}
*/
class _vertex_buffer {
  constructor(
    vertexPosArray,
    vertexTexCoordArray,
    vertexColorArray,
    vertexNormalizArray,
    prog
  ) {
    this.vbo = [];

    let isPos = false,
      isTex = false,
      isNorm = false,
      isColor = false;

    this.vao = gl.createVertexArray();

    this.primVertexBuffer = gl.createBuffer();

    this.apply();

    if (vertexPosArray != undefined || vertexPosArray != null) {
      isPos = true;
      const posLoc = gl.getAttribLocation(prog, "in_pos");
      gl.vertexAttribPointer(posLoc, 4, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(posLoc);
    }

    if (vertexTexCoordArray != undefined || vertexTexCoordArray != null) {
      isTex = true;
      const posTex = gl.getAttribLocation(prog, "in_tex");
      gl.vertexAttribPointer(posTex, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(posTex);
    }

    if (vertexNormalizArray != undefined || vertexNormalizArray != null) {
      isNorm = true;
      const posNorm = gl.getAttribLocation(prog, "in_norm");
      gl.vertexAttribPointer(posNorm, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(posNorm);
    }

    if (vertexColorArray != undefined || vertexColorArray != null) {
      isColor = true;
      const posColor = gl.getAttribLocation(prog, "in_color");
      gl.vertexAttribPointer(posColor, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(posColor);
    }
    for (let i = 0; i < vertexPosArray.length; i++) {
      if (isPos) {
        this.vbo.push(vertexPosArray[i]);
      }

      if (isTex) {
        this.vbo.push(vertexTexCoordArray[i]);
      }

      if (isNorm) {
        this.vbo.push(vertexNormalizArray[i]);
      }

      if (isColor) {
        this.vbo.push(vertexColorArray[i]);
      }
    }

    let vertexAtributArray = vboToArray(this.vbo);

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(vertexAtributArray),
      gl.STATIC_DRAW
    );

    gl.bindVertexArray(null);
  }

  apply() {
    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.primVertexBuffer);
  }
}

export function vertex_buffer(...args) {
  return new _vertex_buffer(...args);
}

class _index_buffer {
  constructor(indexArray) {
    this.indexBuffer = gl.createBuffer();
    this.apply();
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indexArray),
      gl.STATIC_DRAW
    );
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }

  apply() {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
  }
}

export function index_buffer(...args) {
  return new _index_buffer(...args);
}

class _ubo_buffer {
  constructor(prog, name, bindPoint, data) {
    this.bindPoint = bindPoint;
    this.uniformBuffer = gl.createBuffer();
    this.name = name;
    this.prog = prog;
    this.apply();

    if (data != undefined) {
      if (typeof data == "number")
        gl.bufferData(gl.UNIFORM_BUFFER, data * 4, gl.DYNAMIC_DRAW);
      gl.bufferData(gl.UNIFORM_BUFFER, new Float32Array(data), gl.DYNAMIC_DRAW);
    }
    gl.bindBuffer(gl.UNIFORM_BUFFER, null);
  }

  apply() {
    this.uboLoc = gl.getUniformBlockIndex(this.prog, this.name);
    gl.uniformBlockBinding(this.prog, this.uboLoc, this.bindPoint);
    gl.bindBufferBase(gl.UNIFORM_BUFFER, this.bindPoint, this.uniformBuffer);
  }

  update(data, offset) {
    if (offset == undefined) offset = 0;
    this.apply();
    gl.bufferSubData(gl.UNIFORM_BUFFER, offset, new Float32Array(data));
    gl.bindBuffer(gl.UNIFORM_BUFFER, null);
  }
}

export function ubo_buffer(...args) {
  return new _ubo_buffer(...args);
}
