/*
 * JavaScript / Canvas teaching framwork
 * by Benjamin Bleckmann, Josef Strunk
 * Module: Robot
 *
 */

/* requireJS module definition */
define(["three"],
    (function(THREE) {

        "use strict";

        var Robot = function () {
			
			var headSize = [70,90,130];
			var torsoSize=[500,100,300];
			
			this.root = new THREE.Object3D();
			// skeleton
			this.head = new THREE.Object3D();
			this.head.name = "head";
			this.head.translateX(torsoSize[0]/2+headSize[0]/2);
			this.head.translateY(headSize[1]/2);
			this.torso = new THREE.Object3D();
			
			this.torso.add(this.head);
			
			//skin
			this.headSkin = new THREE.Mesh(new THREE.CubeGeometry(headSize[0],headSize[1],headSize[2]), 
										   new THREE.MeshNormalMaterial());
			//this.headSkin.rotateY(Math.PI/4);
			this.torsoSkin = new THREE.Mesh(new THREE.CubeGeometry( torsoSize[0],torsoSize[1],torsoSize[2]),
											new THREE.MeshNormalMaterial());
			this.torso.add(this.torsoSkin);
			this.head.add(this.headSkin);
			
			this.root.add(this.torso);
			
			
        
		this.getMesh = function() {
			return this.root;
		};
		
		};
		
		
        return Robot;
		
		
    }));

