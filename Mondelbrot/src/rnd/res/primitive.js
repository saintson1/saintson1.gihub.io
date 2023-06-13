import { shader, vertex_buffer, index_buffer } from "./resurses.js";

class _primitive {
  constructor(
    shdFileNamePrefix,
    indexArray,
    vertexPosArray,
    vertexTexCoordArray,
    vertexColorArray,
    vertexNormalizArray
  ) {
    this.shd = shader(shdFileNamePrefix);
    this.shd.prog = this.shd.create();
    this.shd.prog.then(() => {
      this.numOfVertex = vertexPosArray.length;
      this.vertex_buffer = vertex_buffer(
        vertexPosArray,
        vertexTexCoordArray,
        vertexColorArray,
        vertexNormalizArray,
        this.shd.prog
      );
      this.index_buffer = index_buffer(indexArray);
    });
  }

  uboFloatCreate(floatUniform, uboName) {
    if (this.shd.prog.then != undefined) return;
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
