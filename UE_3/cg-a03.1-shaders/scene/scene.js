/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: scene
 *
 * A Scene is a depth-sorted collection of things to be drawn, 
 * plus a background fill style.
 *
 */

/* requireJS module definition */
define(["three", "util", "shaders", "BufferGeometry", "random", "band", "parametric"],
    (function(THREE, util, shaders, BufferGeometry, Random, Band, parametric) {

        "use strict";

        /*
         * Scene constructor
         */
        var Scene = function(renderer, width, height) {

            // the scope of the object instance
            var scope = this;
			var start = Date.now()

            scope.renderer = renderer;
            scope.t = 0.0;

            scope.camera = new THREE.PerspectiveCamera( 66, width / height, 0.1, 2000 );
            scope.camera.position.z = 1200;
            scope.scene = new THREE.Scene();


            // Add a listener for 'keydown' events. By this listener, all key events will be
            // passed to the function 'onDocumentKeyDown'. There's another event type 'keypress'.
            document.addEventListener("keydown", onDocumentKeyDown, false);


            function onDocumentKeyDown(event){
                // Get the key code of the pressed key
                var keyCode = event.which;

                if(keyCode == 38){
                    console.log("cursor up");
                    scope.currentMesh.rotation.x += 0.05;
                    // Cursor down
                } else if(keyCode == 40){
                    console.log("cursor down");
                    scope.currentMesh.rotation.x += -0.05;
                    // Cursor left
                } else if(keyCode == 37){
                    console.log("cursor left");
                    scope.currentMesh.rotation.y += 0.05;
                    // Cursor right
                } else if(keyCode == 39){
                    console.log("cursor right");
                    scope.currentMesh.rotation.y += -0.05;
                    // Cursor up
                }
            };

            this.addBufferGeometry = function(bufferGeometry) {

                scope.currentMesh = bufferGeometry.getMesh();
                scope.scene.add( scope.currentMesh );

            }

            this.addMesh = function(mesh){
                scope.currentMesh = mesh;
                scope.scene.add(scope.currentMesh);
            }

            /*
             * drawing the scene
             */
            this.draw = function() {

                //request to window, to perform an animation
                requestAnimFrame( scope.draw );
                scope.renderer.render(scope.scene, scope.camera);

            };

            //creating the function for adding the light to the scene Aufgabe 3
            this.addLight = function(Light){

            scope.scene.add(Light);
            };

            this.getScope = function(){
                return this;
            }

            //animation for head
            this.animatehead = function(){
                var nodeHead = scope.scene.getObjectByName("head", true);
                if(nodeHead){
                    nodeHead.rotation.y += 0.08;
                }
            }
			
			// time for animating the explosion
			this.animateExplosion = function(){
				scope.currentMesh.children[0].material.uniforms[ 'time' ].value = .00035 * ( Date.now() - start );

			}
			
        };

        // this module only exports the constructor for Scene objects
        return Scene;

    })); // define