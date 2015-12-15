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
			
			var tailState = 1;
			
			var clawState = 1;
			var clawHugState = 1;
			
			var torsoState = 1;
			
			var jumpState = 0;
			
			var faceState = 0;
			
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
                } else if(keyCode == 81) { // TAIL
					console.log("key Q");
	                var nodeHead = scope.scene.getObjectByName("tailJoint",true);
	                if (nodeHead) 
	                	nodeHead.rotation.z -=0.05;
	                	console.log(nodeHead.rotation.z);
                } else if(keyCode == 87) {
					console.log("key W");
	                var nodeHead = scope.scene.getObjectByName("tailMidJoint",true);
	                if (nodeHead) 
	                	nodeHead.rotation.z +=0.05;
	                	console.log(nodeHead.rotation.z);
                } else if(keyCode == 69) {
					console.log("key E");
	                var nodeHead = scope.scene.getObjectByName("tailMidJoint2",true);
	                if (nodeHead) 
	                	nodeHead.rotation.z +=0.05;
	                	console.log(nodeHead.rotation.z);
                } else if(keyCode == 82) {
					console.log("key R");
	                var nodeHead = scope.scene.getObjectByName("tailMidJoint3",true);
	                if (nodeHead) 
	                	nodeHead.rotation.z -=0.05;
	                	console.log(nodeHead.rotation.z);
                } else if(keyCode == 84) {
					console.log("key T");
	                var nodeHead = scope.scene.getObjectByName("tailMidJoint4",true);
	                if (nodeHead) 
	                	nodeHead.rotation.z -=0.05;
	                	console.log(nodeHead.rotation.z);
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
                } else if(keyCode == 48) {
					console.log("key 0");
	                var nodeHead =  scope.scene.getObjectByName("nose",true);
	                var nodeHead2 =  scope.scene.getObjectByName("eyeRight",true);
					var nodeHead3 =  scope.scene.getObjectByName("eyeLeft",true);

	               if (nodeHead) {
	               		if (jumpState == 0) {
			                //right
			                nodeHead.rotation.x += 2;
			                nodeHead2.rotation.x -= 0.05;
					        nodeHead3.rotation.x += 0.05;
			                				
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
            
            this.animateTail = function(){
				
				var nodeHead =  scope.scene.getObjectByName("tailJoint",true);
		        var nodeHead2 = scope.scene.getObjectByName("tailMidJoint",true);
		        var nodeHead3 = scope.scene.getObjectByName("tailMidJoint2",true);
		        var nodeHead4 = scope.scene.getObjectByName("tailMidJoint3",true);
		        var nodeHead5 = scope.scene.getObjectByName("tailMidJoint4",true);
				
				
				if (nodeHead) {
		                if (tailState == 1) {
			                nodeHead.rotation.z -= 0.3;
							nodeHead2.rotation.z += 0.12;
							nodeHead3.rotation.z += 0.12;
							nodeHead4.rotation.z -= 0.06;
							nodeHead5.rotation.z -= 0.0;					
						
							if (nodeHead.rotation.z <= -1.5){
								tailState = 2;	
							}
						} else if (tailState == 2){
							nodeHead.rotation.z += 0.025;
							nodeHead2.rotation.z -= 0.01;
							nodeHead3.rotation.z -= 0.01;
							nodeHead4.rotation.z += 0.005;
							nodeHead5.rotation.z += 0.00;
								
							if (nodeHead.rotation.z >= 0){
								tailState = 1;	
								}
						}
								
				}				
			}
		 
			this.animateClawsRun = function(){
		        
		        var nodeHead =  scope.scene.getObjectByName("clawJointRight",true);
				var nodeHead2 = scope.scene.getObjectByName("clawJointLeft",true);
						
		                
		        if (nodeHead) {
			       if (clawState == 1) {
				      	nodeHead.rotation.z -= 0.00375;
					  	nodeHead2.rotation.z += 0.00375;					
						if (nodeHead.rotation.z <= -0.05){
							clawState = 2;	
						}
					} else if (clawState == 2){
						nodeHead.rotation.z += 0.00375;
						nodeHead2.rotation.z -= 0.00375;
						if (nodeHead.rotation.z >= 0.05){
							clawState = 1;	
						}
					}				
				}   
			}		
		
			this.animateTorsoRun = function(){
				
				var nodeHead =  scope.scene.getObjectByName("torso",true);
	                
	               if (nodeHead) {
		                if (torsoState == 1) {
			                nodeHead.rotation.z -= 0.00075;					
							if (nodeHead.rotation.z <= -0.01){
								torsoState = 2;	
								}
							} else if (torsoState == 2){
								nodeHead.rotation.z += 0.00075;
								if (nodeHead.rotation.z >= 0.01){
									torsoState = 1;	
								}
							}	
						}
			}
			
			this.animateClawHug = function(){
					var nodeHead =  scope.scene.getObjectByName("clawPart3Right",true);
					var nodeHead2 =  scope.scene.getObjectByName("clawPart2Right",true);
					var nodeHead3 =  scope.scene.getObjectByName("clawPart3Left",true);
					var nodeHead4 =  scope.scene.getObjectByName("clawPart2Left",true);
	                
	               if (nodeHead) {
		                if (clawHugState == 1) {
			                nodeHead.rotation.y -= 0.05;
			                nodeHead.position.z += 0.5;
			                nodeHead2.rotation.y += 0.015;
			                nodeHead2.position.z -= 0.5;
			                
			                nodeHead3.rotation.y += 0.05;
							nodeHead3.position.z -= 0.5;
							nodeHead4.rotation.y -= 0.015;
							nodeHead4.position.z += 0.5;
			                					
							console.log(nodeHead.translateX);
							if (nodeHead.rotation.y <= -0.5){
								clawHugState = 2;	
								}
							} else if (clawHugState == 2){
								nodeHead.rotation.y += 0.05;
								nodeHead.position.z -= 0.5;
								nodeHead2.rotation.y -= 0.015;
								nodeHead2.position.z += 0.5;
								
								nodeHead3.rotation.y -= 0.05;
								nodeHead3.position.z += 0.5;
				                nodeHead4.rotation.y += 0.015;
				                nodeHead4.position.z -= 0.5;
								
								console.log(nodeHead.rotation.z);
								if (nodeHead.rotation.y >= 0){
									clawHugState = 1;	
								}
							}
								
					}
			}
		
			this.animateJumpUp = function() {
				
					
	                var nodeHead =  scope.scene.getObjectByName("legJointRight",true);
	                var nodeHead2 =  scope.scene.getObjectByName("tighRightFront",true);
					var nodeHead3 =  scope.scene.getObjectByName("jointMidRightFront",true);

					var nodeHead4 = scope.scene.getObjectByName("legJointRight2",true);
					var nodeHead5 = scope.scene.getObjectByName("tighRightCenter",true);
					var nodeHead6 = scope.scene.getObjectByName("jointMidRightCenter",true);
					
					var nodeHead7 = scope.scene.getObjectByName("legJointRight3",true);
					var nodeHead8 = scope.scene.getObjectByName("tighRightBack",true);
					var nodeHead9 = scope.scene.getObjectByName("jointMidRightBack",true);
	                
	                var nodeHead10 =  scope.scene.getObjectByName("legJointLeft",true);
	                var nodeHead11 =  scope.scene.getObjectByName("tighLeftFront",true);
					var nodeHead12 =  scope.scene.getObjectByName("jointMidLeftFront",true);
	                
	                var nodeHead13 = scope.scene.getObjectByName("legJointLeft2",true);
					var nodeHead14 = scope.scene.getObjectByName("tighLeftCenter",true);
					var nodeHead15 = scope.scene.getObjectByName("jointMidLeftCenter",true);

					var nodeHead16 = scope.scene.getObjectByName("legJointLeft3",true);
					var nodeHead17 = scope.scene.getObjectByName("tighLeftBack",true);
					var nodeHead18 = scope.scene.getObjectByName("jointMidLeftBack",true);
					
					var nodeHead19 = scope.scene.getObjectByName("tailJoint",true);
					var nodeHead20 = scope.scene.getObjectByName("tailMidJoint",true);
					
					var nodeHead21 = scope.scene.getObjectByName("clawJointRight",true);
					var nodeHead22 = scope.scene.getObjectByName("clawJointLeft",true);
					
	                //var nodeHead23 = scope.scene.getObjectByName("torso",true);
	               if (nodeHead) {
	               		if (jumpState == 0) {
			                //right
			                nodeHead.rotation.x -= 0.05;
			                nodeHead2.position.y -= 0.45;
					        nodeHead3.rotation.x += 0.045;
			                
			                nodeHead4.rotation.x -= 0.05;
			                nodeHead5.position.y -= 0.45;
					        nodeHead6.rotation.x += 0.045;
					        
					        nodeHead7.rotation.x -= 0.05;
			                nodeHead8.position.y -= 0.45;
					        nodeHead9.rotation.x += 0.045;
			                
			                //left
			                nodeHead10.rotation.x += 0.05;
			                nodeHead11.position.y -= 0.45;
					        nodeHead12.rotation.x -= 0.045;
			                
			                nodeHead13.rotation.x += 0.05;
			                nodeHead14.position.y -= 0.45;
					        nodeHead15.rotation.x -= 0.045;

			                nodeHead16.rotation.x += 0.05;
			                nodeHead17.position.y -= 0.45;
					        nodeHead18.rotation.x -= 0.045;
					        
					        //tail
					        nodeHead19.rotation.z = 0;
					        nodeHead20.rotation.z = 0;
					        
					        //claws
					        nodeHead21.rotation.z = 0;
					        nodeHead22.rotation.z = 0;
					        
					        //nodeHead23.position.y = 0;
					        				
							console.log(nodeHead.rotation.x);
							if (nodeHead.rotation.x <= -0.35){
								jumpState = 1;	
								}
							} else if (jumpState == 1) {
			                //right
			                nodeHead.rotation.x += 0.2;
			                nodeHead2.position.y += 1.8;
					        nodeHead3.rotation.x -= 0.18;
			                
			                nodeHead4.rotation.x += 0.2;
			                nodeHead5.position.y += 1.8;
					        nodeHead6.rotation.x -= 0.18;
			                					
			                nodeHead7.rotation.x += 0.2;
			                nodeHead8.position.y += 1.8;
					        nodeHead9.rotation.x -= 0.18;
					        
					        //left
					        nodeHead10.rotation.x -= 0.2;
			                nodeHead11.position.y += 1.8;
					        nodeHead12.rotation.x += 0.18;

					        nodeHead13.rotation.x -= 0.2;
							nodeHead14.position.y += 1.8;
					        nodeHead15.rotation.x += 0.18;
					        
					        nodeHead16.rotation.x -= 0.2;
			                nodeHead17.position.y += 1.8;
					        nodeHead18.rotation.x += 0.18;
					        
					        //tail
					        nodeHead19.rotation.z -= 0.004;
					        nodeHead20.rotation.z -= 0.01;
					        
					        //claws
					        nodeHead21.rotation.z -= 0.01;
					        nodeHead22.rotation.z -= 0.01;
					        
					        //nodeHead23.position.y += 30;
							//console.log(nodeHead.rotation.x);
							if (nodeHead.rotation.x >= 1.45){
								jumpState = 2;	
								}
							} else if (jumpState == 2){
								//right
								nodeHead.rotation.x -= 0.1;
								nodeHead2.position.y -= 0.9;
								nodeHead3.rotation.x += 0.09;
								
								nodeHead4.rotation.x -= 0.1;
								nodeHead5.position.y -= 0.9;
								nodeHead6.rotation.x += 0.09;
								
								nodeHead7.rotation.x -= 0.1;
								nodeHead8.position.y -= 0.9;
								nodeHead9.rotation.x += 0.09;
								
								//left
								nodeHead10.rotation.x += 0.1;
								nodeHead11.position.y -= 0.9;
								nodeHead12.rotation.x -= 0.09;
								
								nodeHead13.rotation.x += 0.1;
								nodeHead14.position.y -= 0.9;
								nodeHead15.rotation.x -= 0.09;
								
								nodeHead16.rotation.x += 0.1;
								nodeHead17.position.y -= 0.9;
								nodeHead18.rotation.x -= 0.09;
								
								//tail
								nodeHead19.rotation.z += 0.002;
								nodeHead20.rotation.z += 0.005;
								
								//claws
								nodeHead21.rotation.z += 0.005;
								nodeHead22.rotation.z += 0.005;
								
								//nodeHead23.position.y -= 15;
								//console.log(nodeHead.rotation.z);
								if (nodeHead.rotation.x <= 0){
									jumpState = 0;	
								}
							}
								
					}
				}
				
			this.animateFace = function(){
				var nodeHead =  scope.scene.getObjectByName("nose",true);
                var nodeHead2 =  scope.scene.getObjectByName("eyeRight",true);
				var nodeHead3 =  scope.scene.getObjectByName("eyeLeft",true);

                if (nodeHead) {
               		if (jumpState == 0) {
		                //right
		                nodeHead.rotation.x += 2;
		                nodeHead2.rotation.x -= 0.05;
				        nodeHead3.rotation.x += 0.05;
		                				
					}
				}
			}	
		
			this.clearRun = function(){

				var nodeHead0 = scope.scene.getObjectByName("torso",true);

				var nodeHead =  scope.scene.getObjectByName("legJointRight",true);
                var nodeHead2 = scope.scene.getObjectByName("tighRightFront",true);
                var nodeHead3 = scope.scene.getObjectByName("jointMidRightFront",true);
                
                var nodeHead4 =  scope.scene.getObjectByName("legJointRight2",true);
                var nodeHead5 = scope.scene.getObjectByName("tighRightCenter",true);
                var nodeHead6 = scope.scene.getObjectByName("jointMidRightCenter",true);
                
                var nodeHead7 =  scope.scene.getObjectByName("legJointRight3",true);
                var nodeHead8 = scope.scene.getObjectByName("tighRightBack",true);
                var nodeHead9 = scope.scene.getObjectByName("jointMidRightBack",true);
                
                var nodeHead10 = scope.scene.getObjectByName("legJointLeft",true);
                var nodeHead11 = scope.scene.getObjectByName("tighLeftFront",true);
                var nodeHead12 = scope.scene.getObjectByName("jointMidLeftFront",true);
                
                var nodeHead13 = scope.scene.getObjectByName("legJointLeft2",true);
                var nodeHead14 = scope.scene.getObjectByName("tighLeftCenter",true);
                var nodeHead15 = scope.scene.getObjectByName("jointMidLeftCenter",true);
                
                var nodeHead16 = scope.scene.getObjectByName("legJointLeft3",true);
				var nodeHead17 = scope.scene.getObjectByName("tighLeftBack",true);
                var nodeHead18 = scope.scene.getObjectByName("jointMidLeftBack",true);
				
				var nodeHead19 = scope.scene.getObjectByName("clawJointRight",true);
				var nodeHead20 = scope.scene.getObjectByName("clawJointLeft",true);
				
				// sets states back
				rotateLegFront = 1;
				rotateLegCenter = null;
				rotateLegBack = null;
				
				tailState = 1;
				
				clawState = 1;
				clawHugState = 1;
				
				torsoState = 1;
				
				jumpState = 0;
				
				
				nodeHead0.rotation.x = 0;
				nodeHead0.rotation.y = 0;
				nodeHead0.rotation.z = 0;
				
				// right
				/*
				nodeHead2.position.x = 0;
				nodeHead2.position.y = 0;
				nodeHead2.position.z = 0;
				*/
				
				nodeHead.rotation.x = 0;
				nodeHead.rotation.y = 0;
				nodeHead.rotation.z = 0;
				
				nodeHead2.rotation.x = 0;
				nodeHead2.rotation.y = 0;
				nodeHead2.rotation.z = 0;
				
				nodeHead3.rotation.x = 0;
				nodeHead3.rotation.y = 0;
				nodeHead3.rotation.z = 0;
				
				nodeHead4.rotation.x = 0;
				nodeHead4.rotation.y = 0;
				nodeHead4.rotation.z = 0;
				
				nodeHead5.rotation.x = 0;
				nodeHead5.rotation.y = 0;
				nodeHead5.rotation.z = 0;
				
				nodeHead6.rotation.x = 0;
				nodeHead6.rotation.y = 0;
				nodeHead6.rotation.z = 0;
				
				nodeHead7.rotation.x = 0;
				nodeHead7.rotation.y = 0;
				nodeHead7.rotation.z = 0;
				
				nodeHead8.rotation.x = 0;
				nodeHead8.rotation.y = 0;
				nodeHead8.rotation.z = 0;
				
				nodeHead9.rotation.x = 0;
				nodeHead9.rotation.y = 0;
				nodeHead9.rotation.z = 0;
				
				//left
				nodeHead10.rotation.x = 0;
				nodeHead10.rotation.y = 0;
				nodeHead10.rotation.z = 0;
				
				nodeHead11.rotation.x = 0;
				nodeHead11.rotation.y = 0;
				nodeHead11.rotation.z = 0;
				
				nodeHead12.rotation.x = 0;
				nodeHead12.rotation.y = 0;
				nodeHead12.rotation.z = 0;
				
				nodeHead13.rotation.x = 0;
				nodeHead13.rotation.y = 0;
				nodeHead13.rotation.z = 0;
				
				nodeHead14.rotation.x = 0;
				nodeHead14.rotation.y = 0;
				nodeHead14.rotation.z = 0;
				
				nodeHead15.rotation.x = 0;
				nodeHead15.rotation.y = 0;
				nodeHead15.rotation.z = 0;
				
				nodeHead16.rotation.x = 0;
				nodeHead16.rotation.y = 0;
				nodeHead16.rotation.z = 0;
				
				nodeHead17.rotation.x = 0;
				nodeHead17.rotation.y = 0;
				nodeHead17.rotation.z = 0;
				
				nodeHead18.rotation.x = 0;
				nodeHead18.rotation.y = 0;
				nodeHead18.rotation.z = 0;
				
				nodeHead19.rotation.x = 0;
				nodeHead19.rotation.y = 0;
				nodeHead19.rotation.z = 0;
				
				nodeHead20.rotation.x = 0;
				nodeHead20.rotation.y = 0;
				nodeHead20.rotation.z = 0;							
			}
			
        };
       
		
			

        // this module only exports the constructor for Scene objects
        return Scene;

    })); // define

    
