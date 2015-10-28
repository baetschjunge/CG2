
define(["util","vec2","Scene","PointDragger"],
	(function(util,vec2,Scene,PointDragger) {
		
		"use strict";
		
		/**	
		* A simple Circle that can be dragged around.
		* Parameters:
		* -point0 , coordinate where the Circle is.
		* 
		*/
		
		var Circle = function (point0, point1, circleStyle){
		
		// draw style for drawing the circle
		this.circleStyle = circleStyle || { width: "3", color: "#0000AA"};
		
		// initial values in case the point is undefined
		this.p0 = point0 || [25,25];
		this.pointOnCircle = point1 || [20,25];
		var radius;
		
		
		// draw this circle into the provided 2D rendering context
            this.draw = function(context) {

				radius = vec2.length(vec2.sub(this.p0, this.pointOnCircle));
                // draw actual circle
                context.beginPath();

				// set color for stroke Style
                context.strokeStyle = this.circleStyle.color;

				context.lineWidth = this.circleStyle.width;
				
				context.arc(this.p0[0],this.p0[1],radius, 0,Math.PI*2, true);
				
                // actually start drawing
				context.stroke();

            };

            // test whether the mouse position is on this line segment
            this.isHit = function(context,pos) {
			
			 // check the gap between the clickposition and the circle
			var length = vec2.length(vec2.sub(pos, this.p0));
			var radius = vec2.length(vec2.sub(this.p0, this.pointOnCircle));

			// if click is near the radius
			if (length <= radius + 3 && length >= radius - 3)
				return true

			return false;
            };

            // return list of draggers to manipulate this circle
            this.createDraggers = function() {

                var draggerStyle = { radius:4, color: this.circleStyle.color, width:0, fill:true }
                var draggers = [];

                // create closure and callbacks for dragger
                var _circle = this;
				
                var getP0 = function() { return _circle.p0; };         
                var setP0 = function(dragEvent) { _circle.p0 = dragEvent.position; };
				
				var getP1 = function() { return _circle.pointOnCircle; };
                var setP1 = function(dragEvent) { _circle.pointOnCircle = dragEvent.position; };
				
                draggers.push( new PointDragger(getP0, setP0, draggerStyle) );
                draggers.push( new PointDragger(getP1, setP1, draggerStyle) );
   
				return draggers;

            };
			
			Circle.prototype.getColor = function() {
				return this.circleStyle.color;
			};
			
			Circle.prototype.setColor = function(color){
				this.circleStyle.color = color;
			};
			
			Circle.prototype.getRadius = function() {
				return radius = vec2.length(vec2.sub(this.p0, this.pointOnCircle));
			};
			
			Circle.prototype.setRadius = function(radius) {
			  var vecBetween = vec2.sub(this.pointOnCircle, this.p0);
			  vecBetween = vec2.mult(vecBetween, radius / vec2.length(vecBetween));
			  this.pointOnCircle = vec2.add(this.p0, vecBetween);
			  $("#radius").value=radius;
			};
			
			Circle.prototype.getWidth = function() {
				return this.circleStyle.width;
			};
			
			Circle.prototype.setWidth = function(width) {
				this.circleStyle.width = width;
			};
		
		};
        // this module only exports the constructor for Circle objects
		return Circle;
		
	})); // define
		