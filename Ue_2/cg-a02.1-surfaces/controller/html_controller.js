/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: html_controller
 *
 * Defines callback functions for communicating with various 
 * HTML elements on the page, e.g. buttons and parameter fields.
 *
 */


/* requireJS module definition */
define(["jquery", "BufferGeometry", "random", "band","parametric"],
    (function($,BufferGeometry, Random, Band,Parametric) {
        "use strict";

        /*
         * define callback functions to react to changes in the HTML page
         * and provide them with a closure defining context and scene
         */
        var HtmlController = function(scene) {


            $("#random").show();
            $("#band").hide();
			$("#parametric").hide();

            $("#btnRandom").click( (function() {
                $("#random").show();
                $("#band").hide();
				$("#parametric").hide();
            }));

            $("#btnBand").click( (function() {
                $("#random").hide();
				$("#parametric").hide();
                $("#band").show();
            }));
			
			$("#btnParametric").click( (function() {
                $("#random").hide();
                $("#band").hide();
				$("#parametric").show();
			}));
			

            $("#btnNewRandom").click( (function() {

                var numPoints = parseInt($("#numItems").attr("value"));
                var random = new Random(numPoints);
                var bufferGeometryRandom = new BufferGeometry();
                bufferGeometryRandom.addAttribute("position", random.getPositions());
                bufferGeometryRandom.addAttribute("color", random.getColors());

                scene.addBufferGeometry(bufferGeometryRandom);
            }));


            $("#btnNewBand").click( (function() {

                var config = {
                    segments : parseInt($("#numSegments").attr("value")),
                    radius : parseInt($("#radius").attr("value")),
                    height : parseInt($("#height").attr("value"))
                };


                var band = new Band(config);
                var bufferGeometryBand = new BufferGeometry();
                bufferGeometryBand.addAttribute("position", band.getPositions());
                bufferGeometryBand.addAttribute("color", band.getColors());

                scene.addBufferGeometry(bufferGeometryBand);
            }));
			
			$("#btnNewParametric").click( (function() {

                var config = {
                    segments : parseInt($("#numSegmentsPara").attr("value")),
                    umin : parseInt($("#numUmin").attr("value")),
                    umax : parseInt($("#numUmax").attr("value")),
                    vmin : parseInt($("#numVmin").attr("value")),
                    vmax : parseInt($("#numVmax").attr("value"))
                };
				
				var posFunc = function(u,v) {
                    var x = eval($("#x").attr("value"));
                    var y = eval($("#y").attr("value"));
                    var z = eval($("#z").attr("value"));
                    return [x,y,z];
                };


              var parametric = new Parametric(posFunc, config);
			  
			  var bufferGeometryParametric = new BufferGeometry();
                  bufferGeometryParametric.addAttribute("position", parametric.getPositions());
                  bufferGeometryParametric.addAttribute("color", parametric.getColors());

                scene.addBufferGeometry(bufferGeometryParametric);
                

            }));
			
			$("#btnNewParametric2").click( (function() {


                var config = {
                    segments : parseInt($("#numSegmentsPara").attr("value")),
                    umin : -Math.PI,
                    umax : Math.PI,
                    vmin : -Math.PI,
                    vmax : Math.PI
                };
				
				var posFunc = function(u,v) {
                    var x = eval("Math.cos(u)*200");
                    var y = eval("Math.cos(v)*200");
                    var z = eval("Math.cos(u+v)*200");
                    return [x,y,z];
                };


              var parametric = new Parametric(posFunc, config);
			  
			  var bufferGeometryParametric = new BufferGeometry();
                  bufferGeometryParametric.addAttribute("position", parametric.getPositions());
                  bufferGeometryParametric.addAttribute("color", parametric.getColors());

                scene.addBufferGeometry(bufferGeometryParametric);
                

            }));
			
			$("#btnNewParametric3").click( (function() {

                var config = {
                    segments : parseInt($("#numSegmentsPara").attr("value")),
                    umin : 0,
                    umax : 2*Math.PI,
                    vmin : 0,
                    vmax : 2*Math.PI
                };
				
				var posFunc = function(u,v) {
                    var x = eval("((5+2*Math.cos(v))*Math.cos(u))*50");
                    var y = eval("((5+2*Math.cos(v))*Math.sin(u))*50");
                    var z = eval("2*Math.sin(v)*50");
                    return [x,y,z];
                };


              var parametric = new Parametric(posFunc, config);
			  
			  var bufferGeometryParametric = new BufferGeometry();
                  bufferGeometryParametric.addAttribute("position", parametric.getPositions());
                  bufferGeometryParametric.addAttribute("color", parametric.getColors());

                scene.addBufferGeometry(bufferGeometryParametric);
                

            }));
			
			$("#CheckBoxRotation").click( (function() {

			    var checked = $("#CheckBoxRotation").attr("checked");
				var scope = scene.getScope();	
				var render = function () {
						
						if(document.getElementById("CheckBoxRotation").checked==true)
						requestAnimationFrame( render ); 
						scope.currentMesh.rotation.x += 0.01; 
						scope.currentMesh.rotation.y += 0.01; 
						
						//	scene.renderer.render(scene, camera);

				};
					
				if(checked){
					render();
				}
									
            }));
			

        };

        // return the constructor function
        return HtmlController;


    })); // require



            
