/* requireJS module definition */
define(["util", "vec2", "Scene", "PointDragger"], 
		(function(Util, vec2, Scene, PointDragger) {
    "use strict";

    /**
     *  A bezier curve, that can be dragged
     *  around by its endpoints and control points.
     *  Parameters:
     *  - p0 and p3: start and endpoint
     *  - p1 and p2: controlpoints
     *  - lineStyle: object defining width and color attributes for line drawing,
     *       begin of the form { width: 2, color: "#00FF00" }
     *  - ticks: show ticks or not
     *  - maxAngle: max angle to provide the accuracy of the curve
     */

    var BezierCurve = function(p0, p1, p2, p3, lineStyle, ticks, maxAngle, web, maxDepth) {

        // draw style for drawing the line
        this.lineStyle = lineStyle || {
            width : "2",
            color : "#0000AA"
        };

        this.p0 = p0 || [100,200];
        this.p1 = p1 || [200,300];
        this.p2 = p2 || [200,100];
        this.p3 = p3 || [300,200];
        this.ticks = ticks || true;
        this.web = web || false;
        this.maxAngle = maxAngle || 10;
        this.maxDepth = maxDepth || 5;
        this._lastPoint = undefined;
        this.points = [];

        console.log("creating bezier curve with [p0: " + this.p0 + ", p1: " + this.p1 +
            ", p2: " + this.p2 + ", p3: " + this.p3 +"] max angle:"+ this.maxAngle +
            ", show ticks: " + this.ticks + " and show web: " + this.web);
    };

    // draw this curve into the provided 2D rendering context
		BezierCurve.prototype.draw = function(context) {

        this.segments = 0;
        this.depth = 0;
        this.points = [];

        // draw actual line
        context.beginPath();
        context.lineJoin="round";
        context.lineCap="round";
        context.strokeStyle = this.lineStyle.color;
        context.lineWidth = this.lineStyle.width;
        context.moveTo(this.p0[0], this.p0[1]);
        this.points.push(this.p0);

        this.drawCurve(this.p0, this.p1, this.p2, this.p3, context, 0);
        this.drawPoint(this.p3, context);

        // set drawing style
        context.lineWidth = this.lineStyle.width;
        context.strokeStyle = this.lineStyle.color;

        // actually start drawing
        context.stroke();

    };

    // test whether the mouse position is on this line segment
    BezierCurve.prototype.isHit = function(context, pos) {

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
    BezierCurve.prototype.createDraggers = function() {

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

        draggers.push(new PointDragger(getP0, setP0, draggerStyle));
        draggers.push(new PointDragger(getP3, setP3, draggerStyle));
        draggers.push(new PointDragger(getP1, setP1, draggerStyle));
        draggers.push(new PointDragger(getP2, setP2, draggerStyle));

        return draggers;

    };

    // draw this curve with spezific points
    BezierCurve.prototype.drawCurve = function(point0, point1, point2, point3, context, currDepth) {

        var _curve = this;
        currDepth++;

        var a0 = vec2.add(vec2.mult(point0, 0.5), vec2.mult(point1, 0.5));
        var a1 = vec2.add(vec2.mult(point1, 0.5), vec2.mult(point2, 0.5));
        var a2 = vec2.add(vec2.mult(point2, 0.5), vec2.mult(point3, 0.5));

        var b0 = vec2.add(vec2.mult(a0, 0.5), vec2.mult(a1, 0.5));
        var b1 = vec2.add(vec2.mult(a1, 0.5), vec2.mult(a2, 0.5));

        var c0 = vec2.add(vec2.mult(b0, 0.5), vec2.mult(b1, 0.5));

        // draw the web
        if(_curve.web) {

            context.stroke();
            context.beginPath();
            // style of the web
            context.strokeStyle = "#ff0022";
            context.lineWidth = 1;

            context.moveTo(point0[0], point0[1]);
            context.lineTo(point1[0], point1[1]);
            context.lineTo(point2[0], point2[1]);
            context.lineTo(point3[0], point3[1]);
            context.lineTo(a2[0], a2[1]);
            context.lineTo(b1[0], b1[1]);
            context.lineTo(c0[0], c0[1]);
            context.lineTo(b0[0], b0[1]);
            context.lineTo(a0[0], a0[1]);
            context.lineTo(a1[0], a1[1]);
            context.lineTo(a2[0], a2[1]);

            context.stroke();
            context.beginPath();
            // old point and style
            context.strokeStyle = _curve.lineStyle.color;
            context.lineWidth = _curve.lineStyle.width;
            var last = _curve.points[_curve.points.length-1];
            context.moveTo(last[0], last[1]);
        }

        var angle = vec2.angle(vec2.sub(point0, c0), vec2.sub(point3, c0));

        // angle near 180 and maxDepth not reached
        if(currDepth > _curve.maxDepth || (currDepth > 1 && (angle <= 180+_curve.maxAngle/2 && angle >= 180-_curve.maxAngle/2))) {
            this.drawPoint(c0, context);
        } else {
            this.drawCurve(point0, a0, b0, c0, context, currDepth);
            this.drawCurve(c0, b1, a2, point3, context, currDepth);
        }
    };

    // draw this curve with spezific points
    BezierCurve.prototype.drawPoint = function(d3, context) {
        var _curve = this;

        context.lineTo(d3[0], d3[1]);
        _curve.points.push(d3);
        _curve.segments+=1;
        context.stroke();


        if(_curve.ticks) {

            if(_curve.points.length > 2) {

                var po1 = _curve.points[_curve.points.length-3];
                var po2 = _curve.points[_curve.points.length-2];
                var po3 = _curve.points[_curve.points.length-1];

                var helpVec = vec2.sub(po1,po3);
                // ortogonal
                helpVec = [helpVec[1],-helpVec[0]];
                // normalize
                var direction = vec2.mult(helpVec, 1/vec2.length(helpVec));
                var start = vec2.sub(po2, vec2.mult(direction, _curve.lineStyle.width+1));
                var end = vec2.add(po2, vec2.mult(direction, _curve.lineStyle.width+1));

                context.beginPath();
                context.strokeStyle = "#ff0000";
                context.lineWidth = 1;

                context.moveTo(start[0], start[1]);
                context.lineTo(end[0], end[1]);

                context.stroke();
                context.beginPath();
                context.strokeStyle = _curve.lineStyle.color;
                context.lineWidth = _curve.lineStyle.width;
                context.moveTo(d3[0], d3[1]);
            }
        }
    }

    // get the current color
    BezierCurve.prototype.getColor = function() {
        return this.lineStyle.color;
    };

    // set the current color
    BezierCurve.prototype.setColor = function(color) {
        this.lineStyle.color = color;
    };

    // get the current color
    BezierCurve.prototype.getWidth = function() {
        return this.lineStyle.width;
    };

    // set the current color
    BezierCurve.prototype.setWidth = function(width) {
        this.lineStyle.width = width;
    };

    // set the formel for x
    BezierCurve.prototype.setFormelX = function(formel) {
        this.xFormel = formel;
    };

    // set the formel for y
    BezierCurve.prototype.setFormelY = function(formel) {
        this.yFormel = formel;
    };

    // get the current formel for x
    BezierCurve.prototype.getFormelX = function() {
        return this.xFormel;
    };

    // get the current formel for y
    BezierCurve.prototype.getFormelY = function() {
        return this.yFormel;
    };

    // set the min of t
    BezierCurve.prototype.setMinT = function(value) {
        if(value<this.maxT)
            this.minT = value;
    };

    // set the max of t
    BezierCurve.prototype.setMaxT = function(value) {
        if(value>this.minT)
            this.maxT = value;
    };

    // get the current min of t
    BezierCurve.prototype.getMinT = function() {
        return this.minT;
    };

    // get the current max of t
    BezierCurve.prototype.getMaxT = function() {
        return this.maxT;
    };

    // set the segments
    BezierCurve.prototype.setSegments = function(value) {
        this.segments = value;
    };

    // get the current segments
    BezierCurve.prototype.getSegments = function() {
        return this.segments;
    };

    // set the ticks
    BezierCurve.prototype.setTicks = function(value) {
        this.ticks = value;
    };

    // get the ticks
    BezierCurve.prototype.getTicks = function() {
        return this.ticks;
    };

    // this module only exports the constructor for BezierCurve objects
    return BezierCurve;

}));
// define