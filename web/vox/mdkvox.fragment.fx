
precision highp float;

#extension GL_EXT_shader_texture_lod : enable

// Input
varying vec4 vColor;

vec3 applyEaseInOut(vec3 x){
	return x * x * (3.0 - 2.0 * x);
}

void main(void) {
    
    vec4 vox_c = vColor;

	const float tonemappingCalibration = 1.9;
	vox_c.rgb = 1.0 - exp2(-tonemappingCalibration * vox_c.rgb);      

	// Contrast
	vec3 resultHighContrast = applyEaseInOut(vox_c.rgb);
    float contrast = 1.8;
    
	if (contrast < 1.0) {
		// Decrease contrast: interpolate towards zero-contrast image (flat grey)
		vox_c.rgb = mix(vec3(0.5, 0.5, 0.5), vox_c.rgb, contrast);
	} else {
		// Increase contrast: apply simple shoulder-toe high contrast curve
		vox_c.rgb = mix(vox_c.rgb, resultHighContrast, contrast - 1.0);
	}    
    
    gl_FragColor = vox_c;
}