/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 * changes by Benjamin Bleckmann, Josef Strunk
 * Module: ParametricSurface
 *
 */

/* requireJS module definition */
define(["three"],
    (function(THREE) {

        "use strict";

        var ParametricSurface = function (posFunc, config) {
							

			var umin = config.umin;
			var umax = config.umax;
			var vmin = config.vmin;
			var vmax = config.vmax;
			var segments = config.segments;
			
			var positionFunc = posFunc;
			
            this.positions = new Float32Array((segments+1) * (segments+1) * 3);
            this.colors = new Float32Array((segments+1) * (segments+1) * 3);
			this.indices = new Uint32Array(segments * segments * 2 * 3);
			
			var color = new THREE.Color();

			var uSteps = (umax-umin)/segments;
			var vSteps = (vmax-vmin)/segments;

			
			for(var i=0; i<segments+1; i++) {
				for(var j=0; j<segments+1; j++) {
			
					// compute u and v
					var u = umin + i * uSteps;
					var v = vmin + j * vSteps;
			
					// compute the x,y and z  coordinates
					var coords = positionFunc(u,v);

					// IMPORTANT: push each float value separately!
					var index = ( j + i * (segments+1) ) * 3;
					
					this.positions[ index ]     = coords[0];
					this.positions[ index + 1 ] = coords[1];
					this.positions[ index + 2 ] = coords[2];

					color.setRGB( 1,0,0 );

					this.colors[ index ]     = color.r;
					this.colors[ index + 1 ] = color.g;
					this.colors[ index + 2 ] = color.b;
					
					// current index into the vertex buffers
					var vindex = i*(segments+1) + j;
					
					// index inside the
					var iindex = (i*(segments+1) + j)*6;
					
					// indices for drawing two triangles per patch
                    if(i<=segments && j<=segments) {
                        var ii = iindex;
						
						this.indices[ii]   = vindex;
                        this.indices[ii+1] = vindex+(segments+1);
                        this.indices[ii+2] = vindex+(segments+1)+1;
                        this.indices[ii+3] = vindex+(segments+1)+1;
                        this.indices[ii+4] = vindex+1;
                        this.indices[ii+5] = vindex;
						
                    };
				}
            };
			
            this.getPositions = function() {
                return this.positions;
            };

            this.getColors = function() {
                return this.colors;
            };
			
			this.getIndices = function() {
				return this.indices;	
			};

        };
		
		
        return ParametricSurface;
    }));

