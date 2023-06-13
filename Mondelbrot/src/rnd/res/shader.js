class _shader {
  constructor(fileNamePrefix) {
    this.fileNamePrefix = fileNamePrefix;
    this.prog;
  }
  async loadFromFile(type) {
    const res = await fetch(
      "./bin/assets/shaders/" + this.fileNamePrefix + "/" + type + ".glsl"
    );
    const data = await res.text();
    return data;
  }

  compil(typeName, source) {
    let progType;
    if (typeName == "vertex") progType = gl.VERTEX_SHADER;
    else if (typeName == "fragment") progType = gl.FRAGMENT_SHADER;

    let shader = gl.createShader(progType);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const buf = gl.getShaderInfoLog(shader);
      console.error(buf);
      alert(this.fileNamePrefix + "/" + typeName + "shader: Compile error!!!");
    }

    return shader;
  }
  create() {
    let shdVert, shdFrag;

    const promVert = this.loadFromFile("vertex"),
      promFrag = this.loadFromFile("fragment");

    return Promise.all([promVert, promFrag]).then((res) => {
      shdVert = this.compil("vertex", res[0]);
      shdFrag = this.compil("fragment", res[1]);

      this.prog = gl.createProgram();
      gl.attachShader(this.prog, shdVert);
      gl.attachShader(this.prog, shdFrag);
      gl.linkProgram(this.prog);

      if (!gl.getProgramParameter(this.prog, gl.LINK_STATUS)) {
        const Buf = gl.getProgramInfoLog(this.prog);
        console.alert(this.fileNamePrefix + "/" + typeName + "\n" + Buf);
      }
    });
  }
}

export function shader(...arg) {
  return new _shader(...arg);
}
