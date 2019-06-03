precision highp float;

// Uniforms
uniform vec2 delta;    
uniform sampler2D waveTexture;

// Varyings
varying vec2 vUV;

void main()
{
    //http://madebyevan.com/webgl-water/
    /* get vertex info */
    vec4 info = texture2D(waveTexture, vUV);
    
    /* update the normal */
    vec3 dx = vec3(delta.x, texture2D(waveTexture, vec2(vUV.x + delta.x, vUV.y)).r - info.r, 0.0);
    vec3 dy = vec3(0.0, texture2D(waveTexture, vec2(vUV.x, vUV.y + delta.y)).r - info.r, delta.y);
    info.ba = normalize(cross(dy, dx)).xz;
    
    gl_FragColor = info;
}
