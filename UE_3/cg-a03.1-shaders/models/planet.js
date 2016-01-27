/* requireJS module definition */
define(["three", "shaders"],
    (function(THREE, Shaders) {

        "use strict";

        var Planet = function() {


            this.root = new THREE.Object3D();

            // load and create required textures
            //texture loader
            var loader = new THREE.TextureLoader();
            loader.load( 'textures/earth_month04.jpg',

                function ( texture ) {
                // do something with the texture
                var material = new THREE.MeshBasicMaterial( {
                    map: texture
                    });
                }
            );

            var scope = this;

            // implement ShaderMaterial using the code from
            // the lecture

            var material = new THREE.ShaderMaterial({

                uniforms: THREE.UniformsUtils.merge(

                [
                                THREE.UniformsLib['lights'],
                                {
                                    phongDiffuseMaterial:    { type: 'c', value: new THREE.Color(1,0,0)},
                                    phongSpecularMaterial:   { type: 'c', value: new THREE.Color(0.7, 0.7, 0.7)},
                                    phongAmbientMaterial:    { type: 'c', value: new THREE.Color(0.8, 0.2, 0.2)},
                                    phongShininessMaterial:  { type: 'f', value: 16.0},
                                }
                                ]


                ),

                vertexShader: Shaders.getVertexShader("planet"),
                fragmentShader: Shaders.getFragmentShader("planet"),
                lights: true
            });


            // hint:
            // texture can be assigned only when it is loaded completely, e.g. like this
            //Define the texture for the planet with path
            //var material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture(loader) } );
            //material.uniforms.daytimeTexture.value = textureName;


            scope.mesh = new THREE.Mesh( new THREE.SphereGeometry(400, 100,100), material );
            scope.mesh.name = "planet";

            scope.root.add(scope.mesh);

            this.getMesh = function() {
                return this.root;
            };
        }; // constructor

        return Planet;

    })); // define module