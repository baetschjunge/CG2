
define(["util","vec2","Scene","PointDragger"],
	(function(util,vec2,Scene,PointDragger) {
		
		"use strict";
		
		/**	
		* A simple Circle that can be dragged around.
		* Parameters:
		* -point0 , coordinate where the Circle is.
		* 
		*/
		
		var Circle = function (point0, circleStyle){
		
		// draw style for drawing the circle
		this.circleStyle = circleStyle || { radius: "3", color: "#0000AA"};
		
		// initial values in case the point is undefined
		this.p0 = point0 || [25,25];
		
		// draw this circle into the provided 2D rendering context
            this.draw = function(context) {

                // draw actual circle
                context.beginPath();

				// set color for stroke Style
                context.strokeStyle = this.circleStyle.color;
				context.lineStyle = this.circleStyle.width;
				
				context.arc(this.p0[0],this.p0[1],this.circleStyle.radius, 0,Math.PI*2, true);

                // actually start drawing
				context.stroke();

            };

            // test whether the mouse position is on this line segment
            this.isHit = function(context,pos) {

                // project point on circle, get parameter of that projection point
                var t = vec2.projectPointOnLine(pos, this.p0, this.p0);

                // outside the circle segment?
                if(t<0.0 || t>1.0) {
                    return false;
                }

                // coordinates of the projected point
                var p = this.p0;

                // distance of the point from the circle
                var d = vec2.length(vec2.sub(p,pos));

                // allow 2 pixels extra "sensitivity"
                return (d<=((this.circleStyle.radius)+2)&& d>=((this.circleStyle.radius)-2));

            };

            // return list of draggers to manipulate this circle
            this.createDraggers = function() {

                var draggerStyle = { radius:4, color: this.circleStyle.color, width:0, fill:true }
                var draggers = [];

                // create closure and callbacks for dragger
                var _circle = this;
                var getP0 = function() { return _circle.p0; };
            
                var setP0 = function(dragEvent) { _circle.p0 = dragEvent.position; };
            
                draggers.push( new PointDragger(getP0, setP0, draggerStyle) );
   
				return draggers;

            };
						
		
		
		};
        // this module only exports the constructor for Circle objects
		return Circle;
		
	})); // define
		