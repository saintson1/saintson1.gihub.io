#version 300 es

out highp vec4 out_color;
in highp vec3 drawPos;
uniform highp float time, size, lenqx, lenqy;

void main() {
    highp float k = sin(time * 0.00001) * sin(time * 0.00001);
    highp vec2 z, z0;
    highp float X0 = -lenqx * k - 1.0, X1 = lenqx * k - 1.0, Y0 = -lenqy * k - 0.3, Y1 = lenqy * k - 0.3, W = size, H = size;
    int n;

    z0 = z = vec2(X0 + (drawPos.x * size + size) * (X1 - X0) / W / 2.0, Y0 + (drawPos.y * size + size) * (Y1 - Y0) / H / 2.0);
    while(++n < 255 && z.x * z.x + z.y * z.y < 4.0) {
        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + z0;
    }
    if(float(n) / 255.0 > 0.9 && float(n) * 3.0 / 255.0 > 0.9 && float(n) * 7.0 / 255.0 > 0.9) {
        discard;
    }
    out_color = vec4(vec3(float(n) / 255.0, float(n) * 3.0 / 255.0, float(n) * 7.0 / 255.0), 1);
}