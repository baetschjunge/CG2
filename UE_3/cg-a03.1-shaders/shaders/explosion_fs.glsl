
uniform sampler2D explosion;
varying vec2 vUv;
varying float noise;

uniform float colorScale;
uniform float time;


//varying 
//varying 

// a random function to break the gradient a bit so it looks more natural
float random( vec3 scale, float seed ) {
    return fract( sin( dot( gl_FragCoord.xyz + seed, scale ) ) * 43758.5453 + seed ) ;
}


void main() {

    // noise values can be negative / we need to use its absolute values
    // our noise values might also not be in the full range between 0-1
    // add a scale (brightness) value that is controlled by a uniform variable

    // our goal is to access a color in our texture (explosion.png)
    // therefore we need a texture (uv) coordinate (vec2) that accesses a
    // value in the texture
    //
    // a small noise value should access a dark value in the texture
    // a high noise value should return a light value

        /*
            Explosion texture
        */
        // get a random offset
            float r = .01 * random( vec3( 13.78989, 150.7348, 15.87742 ), 0.0 );
            // lookup vertically in the texture, using noise and offset
            // to get the right RGB colour
            vec2 tPos = vec2( 0, -0.25 + 2.5 * noise + r);
            vec4 color = texture2D( explosion, tPos );

            //gl_FragColor = vec4(vec3(1.0) - color.rgb, color.a);
			gl_FragColor = vec4( color.rgb, 1.0 );
}
	