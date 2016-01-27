/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: ParametricSurface
 *
 */

/* requireJS module definition */
define(["three"],
    (function(THREE) {

        "use strict";

        var ParametricSurface = function (posFunc, config) {

            //min value for u
            var umin = config.umin;
            //max value for u
            var umax = config.umax;
            //min value for v
            var vmin = config.vmin;
            //max value for v
            var vmax = config.vmax;
            //Segments of the geometry
            var segments = config.segments;
            
            var positionFunc = posFunc;

            //segments + 1 for not leaving the array
            //array for the positioning
            this.positions = new Float32Array( (segments+1) * (segments+1) * 3);
            //array for the coloring of the geometry
            this.colors = new Float32Array( (segments+1) * (segments+1) * 3 );
            //array for indicies

            // multiply by 2 because of the triangles
            //fuellen mit richtigen indizies, reihenfolge + indizies
            // *2, wegen der Dreiecks Array
            this.indices = new Uint32Array( segments * segments * 2 * 3);

            var color = new THREE.Color();
            var uSteps = (umax-umin)/(segments);
            var vSteps = (vmax-vmin)/(segments);

            //for loop to set each point with the color
            for(var i=0; i<segments+1; i++) {
                for(var j=0; j<segments+1; j++) {
            
                    // compute u and v
                    var u = umin + i * uSteps;
                    var v = vmin + j * vSteps;
            
                    // compute the x,y and z  coordinates
                    var coords = positionFunc(u,v);

                    // IMPORTANT: push each float value separately!
                    var index = ( j + i * (segments + 1) ) * 3;

                    //the coordinates for the triangle
                    this.positions[ index ]     = coords[0];
                    this.positions[ index + 1 ] = coords[1];
                    this.positions[ index + 2 ] = coords[2];

                    //Color Red
                    color.setRGB( 1,0,0 );

                    //color for the coordinates
                    this.colors[ index ]     = color.r;
                    this.colors[ index + 1 ] = color.g;
                    this.colors[ index + 2 ] = color.b;

                    // current index into the vertex buffer
                    var vbindex = i*(segments+1) + j;

                    // index inside vertex buffer
                    var ivbindex = (i*(segments+1) + j) * 6;
                
                    //Fallabdeckung, dass nicht über Segmente gelaufen wird. Im for loop +1 definiert für die Ganzheit der Punkte
                    if(i<segments && j<segments){
                        
                        //fuege immer drei punkte als dreieck zusammen, ein index hat jeweils 3 Punkte
                        var iih = ivbindex;
                        this.indices[iih] = vbindex;
                        this.indices[ iih+1 ] = vbindex+(segments+1);
                        this.indices[ iih+2 ] = vbindex+(segments+1)+1;
                        this.indices[ iih+3 ] = vbindex+(segments+1)+1;
                        this.indices[ iih+4 ] = vbindex+1;
                        this.indices[ iih+5 ] = vbindex;    
                    };
                    console.log("u: " + u + " v: " + v + " uMin: " + umin + " vMin: " + vmin + " uMax: " + umax + " vMax: " + vmax);
  
                } 
            };

            console.log(this.positions);

            this.getPositions = function() {
                return this.positions;
            };

            this.getColors = function() {
                return this.colors;
            };

            //getter for indicies array
            this.getArrayIndices = function(){
                return this.indices;
            };

        };

        return ParametricSurface;
    }));

