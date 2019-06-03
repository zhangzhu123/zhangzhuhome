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
      
    /* calculate average neighbor height */
    vec2 dx = vec2(delta.x, 0.0);
    vec2 dy = vec2(0.0, delta.y);
    float average = (
        texture2D(waveTexture, vUV - dx).r +
        texture2D(waveTexture, vUV - dy).r +
        texture2D(waveTexture, vUV + dx).r +
        texture2D(waveTexture, vUV + dy).r
    ) * 0.25;
      
    /* change the velocity to move toward the average */
    info.g += (average - info.r) * 2.0;
    
    /* attenuate the velocity a little so waves do not last forever */
    info.g *= 0.995;
    
    /* move the vertex along the velocity */
    info.r += info.g;
    
    gl_FragColor = info;
    //gl_FragColor = vec4(average,average,average,1);
}
