#version 300 es

out highp vec4 out_color;
in highp vec3 pos;

void main(void) {
    highp float n = 0.00000000000000000000001;
    out_color = vec4(0.85 + pos.z * n, 0.25 + pos.z * n, 0.85 + pos.z * n, 1);
}