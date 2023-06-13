#version 300 es

in highp vec4 in_pos;
out highp vec3 pos;

uniform matrW {
    mat4 r;
};
void main(void) {
    pos = (in_pos * r).xyz;
    gl_Position = in_pos * r;
}