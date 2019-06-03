precision highp float;

//
attribute vec3 position;
attribute vec4 color;

//
uniform mat4 world;
uniform mat4 viewProjection;

//
varying vec4 vColor;

void main(void) {    
    vColor = color;
    gl_Position = viewProjection * world * vec4(position, 1.0);
}