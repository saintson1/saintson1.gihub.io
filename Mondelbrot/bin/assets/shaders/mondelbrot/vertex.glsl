#version 300 es

in highp vec4 in_pos;
out highp vec3 drawPos;

mat4 matrScale(vec3 s) {
  return mat4(vec4(s.x, 0, 0, 0), vec4(0, s.y, 0, 0), vec4(0, 0, s.z, 0), vec4(0, 0, 0, 1));
}

mat4 matrTranslate(vec3 d) {
  return mat4(vec4(1, 0, 0, 0), vec4(0, 1, 0, 0), vec4(0, 0, 1, 0), vec4(d.x, d.y, d.z, 1));
}

void main(void) {
  drawPos = in_pos.xyz;
  gl_Position = in_pos;
}