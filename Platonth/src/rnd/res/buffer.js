class vertex_buffer {
  constructor(prog, vertexPos) {
    let posLoc = gl.getAttribLocation(prog, "in_pos");
    const posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPos), gl.STATIC_DRAW);
    gl.vertexAttribPointer(posLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posLoc);
  }
}

class ubo_buffer {
  constructor(prog, floatUniform, bufferName) {
    gl.useProgram(prog);
    const uniformLocUBO = gl.getUniformLocation(this.shd.prog, bufferName);
    gl.uniform1f(uniformLocUBO, floatUniform);
  }
}

export function primitive(...arg) {
  return new _primitive(...arg);
}
