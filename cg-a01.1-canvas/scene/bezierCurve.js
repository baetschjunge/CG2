

/* requireJS module definition */
define(["util", "vec2", "Scene", "PointDragger"],
	(function(Util, vec2, Scene, PointDragger) {
    "use strict";

    /**
	 *  A parametric curve, that can be dragged
	 *  around by its endpoints.
	 *  Parameters:
	 *  - point0 and point1: array objects representing [x,y] coordinates of start and end point
	 *  - lineStyle: object defining width and color attributes for line drawing,
	 *       begin of the form { width: 2, color: "#00FF00" }
	 */

    var SimpleBezierCurve = function(p0, p1, p2, p3, lineStyle, ticks) {
        //console.log("creating bezier curve with [x(t): " + xFormel + ", y(t): " + yFormel + "] from t="+minT+" to t=" + maxT);

        // draw style for drawing the line
        this.lineStyle = lineStyle || {
            width : "2",
            color : "#0000AA"
        };

        // convert to Vec2 just in case the points were given as arrays
        this.p0 = p0 || [100,200];
        this.p1 = p1 || [200,300];
        this.p2 = p2 || [200,100];
        this.p3 = p3 || [300,200];
        this.f = function(t) {
            var p = vec2.mult(this.p0, Math.pow(1-t,3));
            p = vec2.add(p,vec2.mult(this.p1, 3*Math.pow(1-t,2)*t));
            p = vec2.add(p,vec2.mult(this.p2, 3*(1-t)*Math.pow(t,2)));
            p = vec2.add(p,vec2.mult(this.p3, Math.pow(t,3)));
            return p;
        };
        this.ticks = ticks || true;
        this.segments = 20;
        this.points = [];

    };

    // draw this line into the provided 2D rendering context
    SimpleBezierCurve.prototype.draw = function(context) {

        this.points = [];

        // draw actual line
        context.beginPath();
        context.strokeStyle = this.lineStyle.color;
        context.lineWidth = this.lineStyle.width;

        // set points to be drawn
        var step = 1/this.segments;
        var t = 0;
        var first = true;
        var lastX;
        var lastY;
        var lastLastX;
        var lastLastY;
        var x;
        var y;
        while(t <= 1.00000000001) {
            lastLastX = lastX;
            lastLastY = lastY;
            lastX = x;
            lastY = y;
            var p = this.f(t);
            this.points.push(p);
            x=p[0];
            y=p[1];
            if(first) {
                context.moveTo(x, y);
                first = false;
            } else {
                context.lineTo(x, y);
            }
            if(this.ticks) {
                context.stroke();
                context.beginPath();
                context.strokeStyle = "#ff0000";
                context.lineWidth = 1;
                var helpVec = vec2.sub([x,y],[lastLastX,lastLastY]);
                helpVec = [helpVec[1],-helpVec[0]];
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
            t+=step;
        }

        // set drawing style
        context.lineWidth = this.lineStyle.width;
        context.strokeStyle = this.lineStyle.color;

        // actually start drawing
        context.stroke();

    };

    // test whether the mouse position is on this line segment
    SimpleBezierCurve.prototype.isHit = function(context, pos) {
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

    // return list of draggers to manipulate this line
    SimpleBezierCurve.prototype.createDraggers = function() {

        var draggerStyle = {
            radius : 4,
            color : this.lineStyle.color,
            width : this.lineStyle.width,
            fill : true
        }
        var draggers = [];

        // create closure and callbacks for dragger
        var _line = this;
        var getP0 = function() {
            return _line.p0;
        };
        var setP0 = function(dragEvent) {
            _line.p0 = dragEvent.position;
        };
        var getP1 = function() {
            return _line.p1;
        };
        var setP1 = function(dragEvent) {
            _line.p1 = dragEvent.position;
        };
        var getP2 = function() {
            return _line.p2;
        };
        var setP2 = function(dragEvent) {
            _line.p2 = dragEvent.position;
        };
        var getP3 = function() {
            return _line.p3;
        };
        var setP3 = function(dragEvent) {
            _line.p3 = dragEvent.position;
        };

        draggers.push(new PointDragger(getP0, setP0,draggerStyle));
        draggers.push(new PointDragger(getP3, setP3,draggerStyle));
        draggers.push(new PointDragger(getP1, setP1, draggerStyle));
        draggers.push(new PointDragger(getP2, setP2, draggerStyle));

        return draggers;

    };

    // get the current color
    SimpleBezierCurve.prototype.getColor = function() {
        return this.lineStyle.color;
    };

    // set the current color
    SimpleBezierCurve.prototype.setColor = function(color) {
        this.lineStyle.color = color;
    };

    // get the current color
    SimpleBezierCurve.prototype.getWidth = function() {
        return this.lineStyle.width;
    };

    // set the current color
    SimpleBezierCurve.prototype.setWidth = function(width) {
        this.lineStyle.width = width;
    };

    // set the formel for x
    SimpleBezierCurve.prototype.setFormelX = function(formel) {
        this.xFormel = formel;
    };

    // set the formel for y
    SimpleBezierCurve.prototype.setFormelY = function(formel) {
        this.yFormel = formel;
    };

    // get the current formel for x
    SimpleBezierCurve.prototype.getFormelX = function() {
        return this.xFormel;
    };

    // get the current formel for y
    SimpleBezierCurve.prototype.getFormelY = function() {
        return this.yFormel;
    };

    // set the min of t
    SimpleBezierCurve.prototype.setMinT = function(value) {
        if(value<this.maxT)
            this.minT = value;
    };

    // set the max of t
    SimpleBezierCurve.prototype.setMaxT = function(value) {
        if(value>this.minT)
            this.maxT = value;
    };

    // get the current min of t
    SimpleBezierCurve.prototype.getMinT = function() {
        return this.minT;
    };

    // get the current max of t
    SimpleBezierCurve.prototype.getMaxT = function() {
        return this.maxT;
    };

    // set the segments
    SimpleBezierCurve.prototype.setSegments = function(value) {
        this.segments = value;
    };

    // get the current segments
    SimpleBezierCurve.prototype.getSegments = function() {
        return this.segments;
    };

    // set the ticks
    SimpleBezierCurve.prototype.setTicks = function(value) {
        this.ticks = value;
    };

    // get the ticks
    SimpleBezierCurve.prototype.getTicks = function() {
        return this.ticks;
    };

    // this module only exports the constructor for StraightLine objects
    return SimpleBezierCurve;

}));
// define

