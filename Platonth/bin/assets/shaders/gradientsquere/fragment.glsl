#version 300 es

out highp vec4 out_color;
in highp vec3 drawColor;

uniform highp float time;

void main( void ) {
    highp float n = 0.5;
    out_color = vec4(drawColor + vec3(sin(time / 1000.0) * sin(time / 1000.0), sin(time / 1000.0),  1), 1.0 / n) * n;
}