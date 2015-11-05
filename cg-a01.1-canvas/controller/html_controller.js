/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de
 * changes by Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: html_controller
 *
 * Defines callback functions for communicating with various 
 * HTML elements on the page, e.g. buttons and parameter fields.
 *
 */


/* requireJS module definition */
define(["jquery", "Line", "Circle", "Point", "KdTree", "util", "kdutil","ParametricCurve","BezierCurve"],
    (function($, Line, Circle, Point, KdTree, Util, KdUtil,ParametricCurve,BezierCurve) {
        "use strict";

        /*
         * define callback functions to react to changes in the HTML page
         * and provide them with a closure defining context and scene
         */
        var HtmlController = function(context,scene,sceneController) {
			
			var kdTree;
            var pointList = [];

            // generate random X coordinate within the canvas
            var randomX = function() {
                return Math.floor(Math.random()*(context.canvas.width-10))+5;
            };

            // generate random Y coordinate within the canvas
            var randomY = function() {
                return Math.floor(Math.random()*(context.canvas.height-10))+5;
            };

            // generate random color in hex notation
            var randomColor = function() {

                // convert a byte (0...255) to a 2-digit hex string
                var toHex2 = function(byte) {
                    var s = byte.toString(16); // convert to hex string
                    if(s.length == 1) s = "0"+s; // pad with leading 0
                    return s;
                };

                var r = Math.floor(Math.random()*25.9)*10;
                var g = Math.floor(Math.random()*25.9)*10;
                var b = Math.floor(Math.random()*25.9)*10;

                // convert to hex notation
                return "#"+toHex2(r)+toHex2(g)+toHex2(b);
            };
			
			// public method: show parameters for selected object
            this.showParamsForObj = function(obj) {

                if(!obj) {
                    $("#radius_div").hide();
                    return;
                }

                $("#obj_lineWidth").attr("value", obj.lineStyle.width);
                $("#obj_color").attr("value", obj.lineStyle.color);
                if(obj.radius == undefined) {
                    $("#radius_div").hide();
                } else {
                    $("#radius_div").show();
                    $("#obj_radius").attr("value", obj.radius);
                };

            };

            // for all elements of class objParams
            $(".objParam").change( (function(ev) {

                var obj = sceneController.getSelectedObject();
                if(!obj) {
                    window.console.log("ParamController: no object selected.");
                    return;
                };

                obj.lineStyle.width = parseInt($("#obj_lineWidth").attr("value"));
                obj.lineStyle.color = $("#obj_color").attr("value");
                if(obj.radius != undefined) {
                    obj.radius = parseInt($("#obj_radius").attr("value"));
                };

                scene.draw(context);
            }));
			
			
		/*
		 * event handler for "change radius".
		 */
			$("#color").change((function() {
				var selObj = sceneController.getSelectedObject();
				selObj.setColor(this.value);
				sceneController.deselect();
				sceneController.select(selObj);
			}));
		
		/*
		 * event handler for "change width".
		 */		 
			$("#width").change((function() {
				var selObj = sceneController.getSelectedObject();
				selObj.setWidth(this.value);
				sceneController.deselect();
				sceneController.select(selObj);
			}));
		
		/*
		 * event handler for "change radius".
		 */
			$("#radius").change((function() {
            var selObj = sceneController.getSelectedObject();
            if (selObj.pointOnCircle)
                selObj.setRadius(this.value);
				scene.draw(context);
        }));
		
		 /*
		 * event handler for "change segments".
		*/
        $("#segments").change((function() {
            var selObj = sceneController.getSelectedObject();
            selObj.setSegments(parseInt($("#segments").val()));
            scene.draw(context);
        }));
			
			
			

            /*
             * event handler for "new line button".
             */
            $("#btnNewLine").click( (function() {

                // create the actual line and add it to the scene
                var style = {
                    width: Math.floor(Math.random()*3)+1,
                    color: randomColor()
                };

                var line = new Line( [randomX(),randomY()],
                    [randomX(),randomY()],
                    style );
                scene.addObjects([line]);

                // deselect all objects, then select the newly created object
                sceneController.deselect();
                sceneController.select(line); // this will also redraw

            }));
			
			$("#btnNewCircle").click( (function() {
			
				//create the circle and add it to the scene
				var style = {
					width: Math.floor(Math.random()*3)+1,
                    color: randomColor()
                };
				
				var circle = new Circle( [randomX(),randomY()],[randomX(),randomY()],
				style );
                scene.addObjects([circle]);

                // deselect all objects, then select the newly created object
                sceneController.deselect();
                sceneController.select(circle); // this will also redraw
				
			
			}));
			
			 /*
			 * event handler for "new parametric curve".
			 */
				$("#btnNewParametric").click((function() {
					window.console.log("test");
					// create the actual line and add it to the scene
					var style = {
						width : Math.floor(Math.random() * 3) + 1,
						color : randomColor()
					};
					//get values
					var xt =$("#xt").val();
					var yt =$("#yt").val();
					var minT = parseInt($("#minT").val());
					var maxT =parseInt($("#maxT").val());
					var segments=parseInt($("#segments").val());
					var check = $("#checkTicks").attr("checked");
					
							
					var curve = new ParametricCurve(xt, yt, minT,maxT, segments, style,check);
					scene.addObjects([curve]);

					// deselect all objects, then select the newly
					// created object
					sceneController.deselect();
					sceneController.select(curve);
				// this will also
				// redraw

				}));
				
				/*
					Eventhandler for checkbox Ticks
				*/
			
				$("#checkTicks").click( (function() {
			
				var selObj = sceneController.getSelectedObject();
				if($("#checkTicks").attr('checked'))
					selObj.ticks = true;
				else
					selObj.ticks = false;
				
				scene.draw(context);
			}));			
		
				
			/*
			 * event handler for "new bezier button".
			*/
			$("#btnNewBezier").click((function() {

				// create the actual line and add it to the scene
				var style = {
					width : Math.floor(Math.random() * 3) + 1,
					color : randomColor()
				};
 
				var curve = new BezierCurve( [randomX(),randomY()],
											 [randomX(),randomY()],
											 [randomX(),randomY()],
											 [randomX(),randomY()], style);
				scene.addObjects([curve]);

				// deselect all objects, then select the newly
				// created object
				sceneController.deselect();
				sceneController.select(curve);
			// this will also
			// redraw
			}));	
			
			$("#btnNewPoint").click( (function() {
			
				//create the circle and add it to the scene
				var style = {
					width: Math.floor(Math.random()*3)+1 ,
                    radius: 3,
                    color: randomColor()
                };
				
				var point = new Point( [randomX(),randomY()],style );
                scene.addObjects([point]);

                // deselect all objects, then select the newly created object
                sceneController.deselect();
                sceneController.select(point); // this will also redraw
				
				
			
			}));
			
			$("#btnNewPointList").click( (function() {

                // create the actual line and add it to the scene
                var style = {
                    width: Math.floor(Math.random()*3)+1,
					radius: 5,
                    color: randomColor()
                };

                var numPoints = $("#kdTreeNumbers").attr("value");;
                for(var i=0; i<numPoints; ++i) {
                    var point = new Point([randomX(), randomY()],style);
                    scene.addObjects([point]);
                    pointList.push(point);
					
                }
				
                // deselect all objects, then select the newly created object
                sceneController.deselect();
				

            }));
			
			 $("#visKdTree").click( (function() {

                var showTree = $("#visKdTree").attr("checked");
                if(showTree && kdTree) {
                    KdUtil.visualizeKdTree(sceneController, scene, kdTree.root, 0, 0, 600, true);
                }

            }));

            $("#btnBuildKdTree").click( (function() {

                kdTree = new KdTree(pointList);

            }));

            /**
             * creates a random query point and
             * runs linear search and kd-nearest-neighbor search
             */
            $("#btnQueryKdTree").click( (function() {

                var style = {
                    width: 2,
					radius: 3,
                    color: "#ff0000"
                };
                var queryPoint = new Point([randomX(), randomY()],
                    style);
                scene.addObjects([queryPoint]);
                sceneController.select(queryPoint); 

                console.log("query point: ", queryPoint.p0);

                ////////////////////////////////////////////////
                // TODO: measure and compare timings of linear//
                //       and kd-nearest-neighbor search	      //
                ////////////////////////////////////////////////
				
				
                var linearTiming;
                var kdTiming;
				var t_start, t_end;
				t_start = new Date().getTime();
				
				
                var minIdx = KdUtil.linearSearch(pointList, queryPoint.p0);
				t_end = new Date().getTime();
                console.log("nearest neighbor linear: ", pointList[minIdx].p0);
				
				
				
				var t_start2, t_end2;
				t_start2 = new Date().getTime();
				
                var kdNearestNeighbor = kdTree.findNearestNeighbor(kdTree.root, queryPoint.p0, 10000000, kdTree.root, 0);
				t_end2 = new Date().getTime();
                console.log("nearest neighbor kd: ", kdNearestNeighbor.point.p0);
				
				
				alert("linearSearch:" + (t_end - t_start) + "ms"
				+ "   " + "findNearestNeighbor:" + (t_end2 - t_start2) + "ms");
                sceneController.select(pointList[minIdx]);
                sceneController.select(kdNearestNeighbor.point);

            }));

        };

        // return the constructor function
        return HtmlController;
		
    })); // require



            
