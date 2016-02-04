/* requireJS module definition */
define(["jquery", "three", "shaders"],
    (function($, THREE, Shaders) {

        "use strict";

        var Explosion = function() {

            var start = Date.now();

            this.root = new THREE.Object3D();

            var scope = this;

            // load explosion texture
            //
            // Loading textures is asynchronous. That means you the load function
            // takes the file url as input and three callback functions
            // onLoadSuccess, onLoadProgress and onLoadError
            // we need to handle these cases. Only in onLoadSuccess we can setup
            // the scene, the texture and the shaders correctly.
            // correctly this would be implemented with promises (see assignment add-on question)


            var material = new THREE.ShaderMaterial({
                uniforms: THREE.UniformsUtils.merge([
                    THREE.UniformsLib['lights'],
                    {	
                        explosion:					{type: "t", value:null},
                        
                        //topoTexture:				{type: "t", value: null},
                        time: 						{type: "f", value: 0.0},
						
                        colorScale:					{type: "f", value: parseFloat($("#colorScaleExplosion").attr("value"))},	//1.7
                        freqScale:					{type: "f", value: parseFloat($("#freqScaleExplosion").attr("value"))},		//-1.0
                        weight:						{type: "f", value: parseFloat($("#weightExplosion").attr("value"))}		//180.0
                    }]),
                vertexShader: Shaders.getVertexShader('explosion'),
                fragmentShader: Shaders.getFragmentShader('explosion'),
                lights:true
            });
		
			material.uniforms.explosion.value = THREE.ImageUtils.loadTexture("textures/explosion.png");



            scope.mesh = new THREE.Mesh( new THREE.SphereGeometry( 300, 100, 100 ), material );
            scope.mesh.name = "explosion";
            scope.root.add(scope.mesh);



            this.getMesh = function() {
                return this.root;
            };


        }; // constructor


        return Explosion;

    })); // define module

