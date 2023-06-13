#version 300 es

in highp vec4 in_pos;
out highp vec3 drawColor;

void main( void ) {
    drawColor = in_pos.xyz;
    gl_Position = in_pos;
}