/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 * changes by Benjamin Bleckmann, Josef Strunk
 * Module: scene
 *
 * A Scene is a depth-sorted collection of things to be drawn, 
 * plus a background fill style.
 *
 */



/* requireJS module definition */
define(["three", "util", "shaders", "BufferGeometry","BufferGeometryPoints", "random", "band","parametric"],
    (function(THREE, util, shaders, BufferGeometry, BufferGeometryPoints, Random, Band,Parametric) {

        "use strict";

        /*
         * Scene constructor
         */
        var Scene = function(renderer, width, height) {

            // the scope of the object instance
            var scope = this;

            scope.renderer = renderer;
            scope.t = 0.0;

            scope.camera = new THREE.PerspectiveCamera( 66, width / height, 0.1, 2000 );
            scope.camera.position.z = 1000;
            scope.scene = new THREE.Scene();

            // Add a listener for 'keydown' events. By this listener, all key events will be
            // passed to the function 'onDocumentKeyDown'. There's another event type 'keypress'.
            document.addEventListener("keydown", onDocumentKeyDown, false);

			var rotateLegFront = 1;
			var rotateLegCenter = null;
			var rotateLegBack = null;

			var rotateClawRight = true;
			var rotateClawLeft = true;
			
			
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
                    // key "a"
                } else if(keyCode == 89) {
					console.log("key Y");
	                var nodeHead =  scope.scene.getObjectByName("legJointRight",true);
	                var nodeHead2 = scope.scene.getObjectByName("legJointRight2",true);
	                var nodeHead3 = scope.scene.getObjectByName("legJointRight3",true);
	                var nodeHead4 = scope.scene.getObjectByName("legJointLeft3",true);
	                var nodeHead5 = scope.scene.getObjectByName("legJointLeft2",true);
	                var nodeHead6 = scope.scene.getObjectByName("legJointLeft",true);
	                
	                if (nodeHead) {
		                if (rotateLegFront == 1) {
			                nodeHead.rotation.x -= 0.05;
							nodeHead.rotation.y += 0.05;
								
							nodeHead4.rotation.x += 0.05;
							nodeHead4.rotation.y -= 0.05;
														
						
							if (nodeHead.rotation.x <= -0.3){
								rotateLegFront = 2;
								if(rotateLegBack == null){
									rotateLegBack = 1;
								}
							}
		                } else if (rotateLegFront == 2) {
			                nodeHead.rotation.x += 0.05;
							nodeHead.rotation.y += 0.05;												

												
							nodeHead4.rotation.x -= 0.05;
							nodeHead4.rotation.y -= 0.05;
											
							
							if (nodeHead.rotation.y >= 0.6){
								rotateLegFront = 3;	
								if(rotateLegCenter == null){
									rotateLegCenter = 1;
								}
							}
		                } else if (rotateLegFront == 3){
			                nodeHead.rotation.y -= 0.05;
			                
			                nodeHead4.rotation.y += 0.05;
			               		              
			                
							if (nodeHead.rotation.y <= 0){
								rotateLegFront = 1;	
								
								nodeHead.rotation.x = 0;
								nodeHead.rotation.y = 0;
																
								nodeHead4.rotation.x = 0;
								nodeHead4.rotation.y = 0;
								
								}
		                }
		                
		                if (rotateLegCenter == 1) {
			               
							
							nodeHead2.rotation.x -= 0.05;
							nodeHead2.rotation.y += 0.05;
							
							nodeHead5.rotation.x += 0.05;
							nodeHead5.rotation.y -= 0.05;
												
						
							if (nodeHead2.rotation.x <= -0.3){
								rotateLegCenter = 2;
							}
		                } else if (rotateLegCenter == 2) {
			             
							nodeHead2.rotation.x += 0.05;
							nodeHead2.rotation.y += 0.05;
														
							nodeHead5.rotation.x -= 0.05;
							nodeHead5.rotation.y -= 0.05;
		
							if (nodeHead2.rotation.y >= 0.6){
								rotateLegCenter = 3;	
							}
		                } else if (rotateLegCenter == 3){
			           
			                nodeHead2.rotation.y -= 0.05;
			                
			                nodeHead5.rotation.y += 0.05;
			           
			                
							if (nodeHead2.rotation.y <= 0){
								rotateLegCenter = 1;								
								
								nodeHead2.rotation.x = 0;
								nodeHead2.rotation.y = 0;
								
								nodeHead5.rotation.x = 0;
								nodeHead5.rotation.y = 0;
							
								}
		                }
		                
		                if (rotateLegBack == 1) {
			               
							
							nodeHead3.rotation.x -= 0.05;
							nodeHead3.rotation.y += 0.05;
							
							nodeHead6.rotation.x += 0.05;
							nodeHead6.rotation.y -= 0.05;
							
						
							if (nodeHead3.rotation.x <= -0.3){
								rotateLegBack = 2;
							}
		                } else if (rotateLegBack == 2) {
			             
							nodeHead3.rotation.x += 0.05;
							nodeHead3.rotation.y += 0.05;
												
							nodeHead6.rotation.x -= 0.05;
							nodeHead6.rotation.y -= 0.05;
							
							
							if (nodeHead3.rotation.y >= 0.6){
								rotateLegBack = 3;	
							}
		                } else if (rotateLegBack == 3){
			           
			              
			                
			                nodeHead3.rotation.y -= 0.05;
			                
			                nodeHead6.rotation.y += 0.05;
			                
							if (nodeHead3.rotation.y <= 0){
								rotateLegBack = 1;	
								
								nodeHead3.rotation.x = 0;
								nodeHead3.rotation.y = 0;
								
								nodeHead6.rotation.x = 0;
								nodeHead6.rotation.y = 0;
							}
		                }
	                }        		  		                	
                } else if(keyCode == 49) {
					console.log("key 2");
	                var nodeHead = scope.scene.getObjectByName("jointMidRightFront",true);
	                if (nodeHead) 
	                	nodeHead.rotation.z +=0.05;
                } else if(keyCode == 50) {
					console.log("key 2");
	                var nodeHead = scope.scene.getObjectByName("jointMidRightCenter",true);
	                if (nodeHead) 
	                	nodeHead.rotation.z +=0.05;
                } else if(keyCode == 51) {
					console.log("key 3");
	                var nodeHead = scope.scene.getObjectByName("jointMidRightBack",true);
	                if (nodeHead) 
	                	nodeHead.rotation.z +=0.05;
                } else if(keyCode == 52) {
					console.log("key 4");
	                var nodeHead = scope.scene.getObjectByName("jointMidLeftFront",true);
	                if (nodeHead) 
	                	nodeHead.rotation.z +=0.05;
                } else if(keyCode == 53) {
					console.log("key 5");
	                var nodeHead = scope.scene.getObjectByName("jointMidLeftCenter",true);
	                if (nodeHead) 
	                	nodeHead.rotation.z +=0.05;
                } else if(keyCode == 54) {
					console.log("key 6");
	                var nodeHead = scope.scene.getObjectByName("jointMidLeftBack",true);
	                if (nodeHead) 
	                	nodeHead.rotation.z +=0.05;
                } else if(keyCode == 55) {
					console.log("key 7");
	                var nodeHead = scope.scene.getObjectByName("clawsJointMidRight",true);
	                if (nodeHead) 
	                	nodeHead.rotation.z +=0.05;
                } else if(keyCode == 56) {
					console.log("key 8");
	                var nodeHead = scope.scene.getObjectByName("clawsJointMidLeft",true);
	                if (nodeHead) 
	                	nodeHead.rotation.z +=0.05;
                } else if(keyCode == 81) {
					console.log("key Q");
	                var nodeHead = scope.scene.getObjectByName("tailJoint",true);
	                if (nodeHead) 
	                	nodeHead.rotation.z +=0.05;
                } else if(keyCode == 87) {
					console.log("key W");
	                var nodeHead = scope.scene.getObjectByName("tailMidJoint",true);
	                if (nodeHead) 
	                	nodeHead.rotation.z +=0.05;
                } else if(keyCode == 69) {
					console.log("key E");
	                var nodeHead = scope.scene.getObjectByName("tailMidJoint2",true);
	                if (nodeHead) 
	                	nodeHead.rotation.z +=0.05;
                } else if(keyCode == 82) {
					console.log("key R");
	                var nodeHead = scope.scene.getObjectByName("tailMidJoint3",true);
	                if (nodeHead) 
	                	nodeHead.rotation.z +=0.05;
                } else if(keyCode == 84) {
					console.log("key T");
	                var nodeHead = scope.scene.getObjectByName("tailMidJoint4",true);
	                if (nodeHead) 
	                	nodeHead.rotation.z +=0.05;
                } else if(keyCode == 90) {
					console.log("key Z");
	                var nodeHead = scope.scene.getObjectByName("clawJointMidRight",true);
	                if (nodeHead) {
	                	if (rotateClawLeft){ 
	                			nodeHead.rotation.x +=0.05;
							if (nodeHead.rotation.x >= Math.PI/2){
								rotateClawLeft = false;}
							} else {
							 nodeHead.rotation.x -=0.05
							if (nodeHead.rotation.x <= -Math.PI/2) 
								rotateClawLeft = true; 
							}
					}
	                
                } else if(keyCode == 85) {
					console.log("key U");
	                var nodeHead = scope.scene.getObjectByName("clawJointMidLeft",true);
	                
	                
	                if (nodeHead) {
	                	if (rotateClawRight){ 
	                			nodeHead.rotation.x +=0.05;
							if (nodeHead.rotation.x >= Math.PI/2){
								rotateClawRight = false;}
							} else {
							 nodeHead.rotation.x -=0.05
							if (nodeHead.rotation.x <= -Math.PI/2) 
								rotateClawRight = true; 
							}
					}	
                } 
				
            };
			//q81 w87 e69 r82 t84

            this.addBufferGeometry = function(bufferGeometry){

                scope.currentMesh = bufferGeometry.getMesh();
                scope.scene.add( scope.currentMesh );

            };
			
			this.addBufferGeometryPoints = function(bufferGeometryPoints) {

                scope.currentMesh = bufferGeometryPoints.getMesh();
                scope.scene.add( scope.currentMesh );

            };
			
			this.addMesh = function(mesh){
				scope.currentMesh = mesh;
				scope.scene.add(scope.currentMesh);
			};

            /*
             * drawing the scene
             */
            this.draw = function() {

                requestAnimFrame( scope.draw );

                scope.renderer.render(scope.scene, scope.camera);

            };
			
			this.getScope = function() {
                return this;
            };
            
            this.animateLegs = function(){
	            	var nodeHead =  scope.scene.getObjectByName("legJointRight",true);
	                var nodeHead2 = scope.scene.getObjectByName("legJointRight2",true);
	                var nodeHead3 = scope.scene.getObjectByName("legJointRight3",true);
	                var nodeHead4 = scope.scene.getObjectByName("legJointLeft3",true);
	                var nodeHead5 = scope.scene.getObjectByName("legJointLeft2",true);
	                var nodeHead6 = scope.scene.getObjectByName("legJointLeft",true);
	                
	                if (nodeHead) {
		                if (rotateLegFront == 1) {
			                nodeHead.rotation.x -= 0.025;
							nodeHead.rotation.y += 0.025;
								
							nodeHead4.rotation.x += 0.025;
							nodeHead4.rotation.y -= 0.025;
														
						
							if (nodeHead.rotation.x <= -0.3){
								rotateLegFront = 2;
								if(rotateLegBack == null){
									rotateLegBack = 1;
								}
							}
		                } else if (rotateLegFront == 2) {
			                nodeHead.rotation.x += 0.025;
							nodeHead.rotation.y += 0.025;												

												
							nodeHead4.rotation.x -= 0.025;
							nodeHead4.rotation.y -= 0.025;
											
							
							if (nodeHead.rotation.y >= 0.6){
								rotateLegFront = 3;	
								if(rotateLegCenter == null){
									rotateLegCenter = 1;
								}
							}
		                } else if (rotateLegFront == 3){
			                nodeHead.rotation.y -= 0.025;
			                
			                nodeHead4.rotation.y += 0.025;
			               		              
			                
							if (nodeHead.rotation.y <= 0){
								rotateLegFront = 1;	
								
								nodeHead.rotation.x = 0;
								nodeHead.rotation.y = 0;
																
								nodeHead4.rotation.x = 0;
								nodeHead4.rotation.y = 0;
								
								}
		                }
		                
		                if (rotateLegCenter == 1) {
			               
							
							nodeHead2.rotation.x -= 0.025;
							nodeHead2.rotation.y += 0.025;
							
							nodeHead5.rotation.x += 0.025;
							nodeHead5.rotation.y -= 0.025;
												
						
							if (nodeHead2.rotation.x <= -0.3){
								rotateLegCenter = 2;
							}
		                } else if (rotateLegCenter == 2) {
			             
							nodeHead2.rotation.x += 0.025;
							nodeHead2.rotation.y += 0.025;
														
							nodeHead5.rotation.x -= 0.025;
							nodeHead5.rotation.y -= 0.025;
		
							if (nodeHead2.rotation.y >= 0.6){
								rotateLegCenter = 3;	
							}
		                } else if (rotateLegCenter == 3){
			           
			                nodeHead2.rotation.y -= 0.025;
			                
			                nodeHead5.rotation.y += 0.025;
			           
			                
							if (nodeHead2.rotation.y <= 0){
								rotateLegCenter = 1;								
								
								nodeHead2.rotation.x = 0;
								nodeHead2.rotation.y = 0;
								
								nodeHead5.rotation.x = 0;
								nodeHead5.rotation.y = 0;
							
								}
		                }
		                
		                if (rotateLegBack == 1) {
			               
							
							nodeHead3.rotation.x -= 0.025;
							nodeHead3.rotation.y += 0.025;
							
							nodeHead6.rotation.x += 0.025;
							nodeHead6.rotation.y -= 0.025;
							
						
							if (nodeHead3.rotation.x <= -0.3){
								rotateLegBack = 2;
							}
		                } else if (rotateLegBack == 2) {
			             
							nodeHead3.rotation.x += 0.025;
							nodeHead3.rotation.y += 0.025;
												
							nodeHead6.rotation.x -= 0.025;
							nodeHead6.rotation.y -= 0.025;
							
							
							if (nodeHead3.rotation.y >= 0.6){
								rotateLegBack = 3;	
							}
		                } else if (rotateLegBack == 3){
			           
			              
			                
			                nodeHead3.rotation.y -= 0.025;
			                
			                nodeHead6.rotation.y += 0.025;
			                
							if (nodeHead3.rotation.y <= 0){
								rotateLegBack = 1;	
								
								nodeHead3.rotation.x = 0;
								nodeHead3.rotation.y = 0;
								
								nodeHead6.rotation.x = 0;
								nodeHead6.rotation.y = 0;
							}
		                }
	                }   
            }
        };
		
		


        // this module only exports the constructor for Scene objects
        return Scene;

    })); // define

    
