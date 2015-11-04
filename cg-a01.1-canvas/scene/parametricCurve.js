/* requireJS module definition */
define(["util", "vec2", "Scene", "PointDragger"], 
	(function(Util, vec2, Scene, PointDragger) {
    "use strict";
	
	
	
	 var ParametricCurve = function(xFormel, yFormel, minT, maxT, segments, lineStyle, ticks){
		// draw style for drawing the curve
        this.lineStyle = lineStyle || {
            width : "2",
            color : "#0000AA"
        };
		
		this.xFormel = vec2.makeFunction(xFormel) || vec2.makeFunction("40*7");
        this.yFormel = vec2.makeFunction(yFormel) || vec2.makeFunction("40*7");
        this.xFormelString = xFormel || "40*7";
        this.yFormelString = yFormel || "40*7";
        this.minT = minT || 0;
        this.maxT = maxT || 1;
        this.segments = segments || 20;
        this.ticks = ticks || true;
        this.points = [];
		
		console.log("creating parametric curve with [x(t): " + this.xFormelString + ", y(t): " + this.yFormelString + "] from t="+this.minT+" to t=" + this.maxT + " with " + this.segments + " segments and show ticks: " +this.ticks);
		
		
		this.draw = function(context) {

        this.points = [];

        // set style
        context.beginPath();
        context.lineJoin="round";
        context.lineCap="round";
        context.strokeStyle = this.lineStyle.color;
        context.lineWidth = this.lineStyle.width;

        // vars for creating the line
        // step: how much t grow every iteration
        var step = (this.maxT - this.minT)/this.segments;
        var t = this.minT;
        // first: first time moveTo instead of lineTo
        var first = true;
        var lastX;
        var lastY;
        var lastLastX;
        var lastLastY;
        var x;
        var y;
        while(t <= this.maxT+0.00000000001) {
            lastLastX = lastX;
            lastLastY = lastY;
            lastX = x;
            lastY = y;
            x = this.xFormel(t);
            y = this.yFormel(t);
            this.points.push([x,y]);
            if(first) {
                context.moveTo(x, y);
                first = false;
            } else {
                context.lineTo(x, y);
                // draw tick
                if(this.ticks) {
                    context.stroke();
                    context.beginPath();
                    context.strokeStyle = "#ff0000";
                    context.lineWidth = 1;
                    var helpVec = vec2.sub([x,y],[lastLastX,lastLastY]);
                    // ortogonal
                    helpVec = [helpVec[1],-helpVec[0]];
                    // normalize
                    var direction = vec2.mult(helpVec, 1/vec2.length(helpVec));
                    var start = vec2.sub([lastX,lastY], vec2.mult(direction, this.lineStyle.width+1));
                    context.moveTo(start[0], start[1]);
                    var end = vec2.add([lastX,lastY], vec2.mult(direction, this.lineStyle.width+1));
                   
				   context.lineTo(end[0], end[1]);
                    context.stroke();
                    context.beginPath();
                    context.strokeStyle = this.lineStyle.color;
                    context.lineWidth = this.lineStyle.width;
                    context.moveTo(x, y);
                }
            }
            t+=step;
        }

        // set drawing style
        context.lineWidth = this.lineStyle.width;
        context.strokeStyle = this.lineStyle.color;

        context.stroke();

    };
	
	this.isHit = function(context, pos) {

        var p0;
        var p1;
        for(var i = 0; i < this.points.length;++i) {
            p1 = p0;
            p0 = this.points[i];

            if(p1) {
                // project point on line, get parameter of that projection point
                var delta = vec2.projectPointOnLine(pos, p0, p1);

                // outside the line segment?
                if (!(delta < 0.0 || delta > 1.0)) {

                    // coordinates of the projected point
                    var p = vec2.add(p0, vec2.mult(vec2.sub(p1, p0), delta));

                    // distance of the point from the line
                    var d = vec2.length(vec2.sub(p, pos));

                    // allow 2 pixels extra "sensitivity"
                    if(d <= (this.lineStyle.width / 2) + 2)
                        return true;
                }
            }
        }

        return false;
    };
	
	// return list of draggers to manipulate this curve
    ParametricCurve.prototype.createDraggers = function() {
        return [];
    };

    // get the current color
    ParametricCurve.prototype.getColor = function() {
        return this.lineStyle.color;
    };

    // set the current color
    ParametricCurve.prototype.setColor = function(color) {
        this.lineStyle.color = color;
    };

    // get the current color
    ParametricCurve.prototype.getWidth = function() {
        return this.lineStyle.width;
    };

    // set the current color
    ParametricCurve.prototype.setWidth = function(width) {
        this.lineStyle.width = width;
    };

    // set the formel for x
    ParametricCurve.prototype.setFormelX = function(formel) {
        this.xFormelString = formel;
        this.xFormel = vec2.makeFunction(formel);
    };

    // set the formel for y
    ParametricCurve.prototype.setFormelY = function(formel) {
        this.yFormelString = formel;
        this.yFormel = vec2.makeFunction(formel);
    };

    // get the current formel for x
    ParametricCurve.prototype.getFormelX = function() {
        return this.xFormelString;
    };

    // get the current formel for y
    ParametricCurve.prototype.getFormelY = function() {
        return this.yFormelString;
    };

    // set the min of t
    ParametricCurve.prototype.setMinT = function(value) {
        if(value<this.maxT)
            this.minT = value;
    };

    // set the max of t
    ParametricCurve.prototype.setMaxT = function(value) {
        if(value>this.minT)
            this.maxT = value;
    };

    // get the current min of t
    ParametricCurve.prototype.getMinT = function() {
        return this.minT;
    };

    // get the current max of t
    ParametricCurve.prototype.getMaxT = function() {
        return this.maxT;
    };

    // set the segments
    ParametricCurve.prototype.setSegments = function(value) {
        this.segments = value;
    };

    // get the current segments
    ParametricCurve.prototype.getSegments = function() {
        return this.segments;
    };

    // set the ticks
    ParametricCurve.prototype.setTicks = function(value) {
        this.ticks = value;
    };

    // get the ticks
    ParametricCurve.prototype.getTicks = function() {
        return this.ticks;
    };

    // this module only exports the constructor for ParametricCurve objects
    return ParametricCurve;
		
	}
	
}));
	//define
