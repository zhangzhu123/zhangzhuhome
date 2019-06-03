precision highp float;

const float PI = 3.141592653589793;

// Uniforms
uniform sampler2D waveTexture;

uniform vec2 center;
uniform float radius;
uniform float strength;

// Varyings
varying vec2 vUV;

void main()
{
    //http://madebyevan.com/webgl-water/    
    /* get vertex info */
    vec4 info = texture2D(waveTexture, vUV);

    /* add the drop to the height */
    float drop = max(0.0, 1.0 - length(center * 0.5 + 0.5 - vUV) / radius);
    drop = 0.5 - cos(drop * PI) * 0.5;
    info.r += drop * strength;
    
    gl_FragColor = info; 
}
