#version 300 es

in highp vec4 in_pos;
out highp vec3 pos;

uniform highp float matrR0, matrR1, matrR2, matrR3, matrR4, matrR5, matrR6, matrR7, matrR8, matrR9, matrR10, matrR11, matrR12, matrR13, matrR14, matrR15;
//

void main(void) {
    highp mat4 r = mat4(vec4(matrR0, matrR1, matrR2, matrR3), vec4(matrR4, matrR5, matrR6, matrR7), vec4(matrR8, matrR9, matrR10, matrR11), vec4(matrR12, matrR13, matrR14, matrR15));
    pos = in_pos.xyz;
    gl_Position = in_pos;// * r;
}