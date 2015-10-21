
define(["util","vec2","Scene","PointDragger"],
	(function(util,vec2,Scene,PointDragger) {
		
		"use strict";
		
		/**	
		* A simple point that can be dragged around.
		* Parameters:
		* -point0 , coordinate where the point is.
		* 
		*/
		
		var Point = function (point0, pointStyle){
		
		// draw style for drawing the point
		this.pointStyle = pointStyle || { radius: "3", color: "#0000AA"};
		
		// initial values in case the point is undefined
		this.p0 = point0 || [25,25];
		
		// draw this point into the provided 2D rendering context
            this.draw = function(context) {

                // draw actual point
                context.beginPath();


				// set color for stroke Style
                context.strokeStyle = this.pointStyle.color;
				
				context.arc(this.p0[0],this.p0[1],this.pointStyle.radius, 0,Math.PI*2);

                // actually start drawing
				context.fill();
				
                
				

            };

            // test whether the mouse position is on this line segment
            this.isHit = function(context,pos) {

                // project point on line, get parameter of that projection point
                var t = vec2.projectPointOnLine(pos, this.p0, this.p1);

                // outside the line segment?
                if(t<0.0 || t>1.0) {
                    return false;
                }

                // coordinates of the projected point
                var p = vec2.add(this.p0, vec2.mult( vec2.sub(this.p1,this.p0), t ));

                // distance of the point from the line
                var d = vec2.length(vec2.sub(p,pos));

                // allow 2 pixels extra "sensitivity"
                return d<=(this.lineStyle.width/2)+2;

            };

            // return list of draggers to manipulate this line
           this.createDraggers = function() {

                var draggerStyle = { radius:4, color: this.pointStyle.color, width:0, fill:true }
                var draggers = [];

                // create closure and callbacks for dragger
                var _circle = this;
                var getP0 = function() { return _circle.p0; };
            
                var setP0 = function(dragEvent) { _circle.p0 = dragEvent.position; };
            
                draggers.push( new PointDragger(getP0, setP0, draggerStyle) );
   
				return draggers;

            };
			
		
		
		};
        // this module only exports the constructor for Point objects
		return Point;
		
	})); // define
		