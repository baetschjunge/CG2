/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 * changed by Benjamin Bleckmann, Josef Strunk
 *
 * Module: BufferGeometry
 *
 * BufferGeometry Vertex-Arrays and Vertex-Attributes
 * stored in float32 arrays for the given attributes.
 * In our cases we assume all attributes have
 * numItems*3 size e.g. position (x, y, z), color (r, g, b)
 *
 * BufferGeometry is (at least for now) used to render Points with
 * vertexcolors.
 * Therefore we add a point material (THREE.PointsMaterial) and point container (THREE.Points).
 *
 */

/* requireJS module definition */
define(["three"],
    (function(THREE) {

        "use strict";

        var BufferGeometry = function () {

            this.mesh     = undefined;
            this.geometry = new THREE.BufferGeometry();
			
			/*
            this.material = new THREE.PointsMaterial( {
                color: 0xaaaaaa,
                size: 10,
				vertexColors: THREE.VertexColors
            } );
			*/
			
			
			this.material = new THREE.MeshBasicMaterial( {
                color: 0xf000,
				side: THREE.DoubleSide,
				
				//wireframe: true
            } );
			
			
            /**
             * Adds a vertex attribute, we assume each element has three components, e.g.
             * [position_x0, position_y0, position_z0, position_x1, position_y1, position_z1,...]
             * AddAttribute updates the mesh.
             *
             * @param name vertex attributes name, e.g. position, color, normal
             * @param buffer
             */
			 
            this.addAttribute = function(name, buffer) {
                this.geometry.addAttribute( name, new THREE.BufferAttribute( buffer, 3 ) );
                this.geometry.computeBoundingSphere();
            }
			
			this.setIndex = function(buffer) {
				this.geometry.setIndex( new THREE.BufferAttribute( buffer, 1 ) );
				this.mesh = new THREE.Mesh( this.geometry, this.material );
			}

            this.getMesh = function() {
                return this.mesh;
            }
            
            this.getMaterial = function() {
	            return this.material;
            }
			
			this.setWireframe = function(wireframe) {
				this.material.wireframe = wireframe;
			}
        };

        return BufferGeometry;
    }));
