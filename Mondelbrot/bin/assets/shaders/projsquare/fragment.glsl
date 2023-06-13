#version 300 es

out highp vec4 out_color;
in highp vec3 pos;

void main(void) {
    highp float n = 0.75;
    out_color = vec4(0.85, 0.25, 0.85, 1) - vec4(vec3(pos.z * n), 1);
}