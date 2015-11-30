/*
 * JavaScript / Canvas teaching framework 
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 * changes by Benjamin Bleckmann, Josef Strunk
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


            $("#random").hide();
            $("#band").hide();
			$("#ellipsoid").hide();
			$("#parametric").show();

            $("#btnRandom").click( (function() {
                $("#band").hide();
				$("#parametric").hide();
				$("#ellipsoid").hide();
				$("#random").show();
            }));

            $("#btnBand").click( (function() {
                $("#random").hide();
				$("#parametric").hide();
				$("#ellipsoid").hide();
                $("#band").show();
				
            }));
			
			$("#btnEllipsoid").click( (function() {
                $("#random").hide();
                $("#band").hide();
				$("#parametric").hide();
				$("#ellipsoid").show();
			}));
			
			$("#btnParametric").click( (function() {
                $("#random").hide();
                $("#band").hide();
				$("#parametric").show();
				$("#ellipsoid").hide();
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
			
			$("#btnNewEllipsoid").click( (function() {


                var config = {
                    segments : parseInt($("#numSegmentsEllipsoid").attr("value")),
                    umin : 0,
                    umax : 2*Math.PI,
                    vmin : 0,
                    vmax : Math.PI
                };
				
				var a = ($("#constA").attr("value"));
				var b = ($("#constB").attr("value"));
				var c = ($("#constC").attr("value"));
				
				var posFunc = function(u,v) {
                    var x = eval(a+"*Math.cos(u)*Math.sin(v)*125");
                    var y = eval(b+"*Math.sin(u)*Math.sin(v)*125");
                    var z = eval(c+"*Math.cos(v)*125");
                    return [x,y,z];
                };


              var parametric = new Parametric(posFunc, config);
			  
			  var bufferGeometryParametric = new BufferGeometry();
                  bufferGeometryParametric.addAttribute("position", parametric.getPositions());
                  bufferGeometryParametric.addAttribute("color", parametric.getColors());
				  bufferGeometryParametric.setIndex(parametric.getIndices());

                scene.addBufferGeometry(bufferGeometryParametric);
                

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
				  bufferGeometryParametric.setIndex(parametric.getIndices());

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
				  bufferGeometryParametric.setIndex(parametric.getIndices());

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
				  bufferGeometryParametric.setIndex(parametric.getIndices());

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



            
