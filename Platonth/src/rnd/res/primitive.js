import { shader } from "./resurses.js";

class _primitive {
  constructor(shdFileNamePrefix, vertexPos) {
    this.shd = shader(shdFileNamePrefix);
    this.shd.create().then(() => this.vboCreate());
    this.vertexPos = vertexPos;
    this.numOfVertex = vertexPos.length / 4;
  }

  vboCreate() {
    let posLoc = gl.getAttribLocation(this.shd.prog, "in_pos");
    const posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(this.vertexPos),
      gl.STATIC_DRAW
    );
    gl.vertexAttribPointer(posLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posLoc);
  }

  uboFloatCreate(floatUniform, uboName) {
    gl.useProgram(this.shd.prog);
    const uniformLocUBO = gl.getUniformLocation(this.shd.prog, uboName);
    gl.uniform1f(uniformLocUBO, floatUniform);
  }
}

export function primitive(...arg) {
  return new _primitive(...arg);
}

/*
  INT gl_prim_type = TTP_RndResPrimGetType(Prim->Type);

  Ttp->MtlApply(Prim->Mtl);
  glBindVertexArray(Prim->VA);
  if (Prim->Type == TTP_RND_PRIM_PATCH)
    glPatchParameteri(GL_PATCH_VERTICES, Prim->NumOfPatchPoints);
  if (Prim->IBuf != 0)
  {
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, Prim->IBuf);
    glDrawElements(gl_prim_type, Prim->NumOfElements, GL_UNSIGNED_INT, NULL);
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0);
  }
  else
    glDrawArrays(gl_prim_type, 0, Prim->NumOfElements);
  glBindVertexArray(0);
  glUseProgram(0);
 */
