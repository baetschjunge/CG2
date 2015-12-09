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
			
			var headSize = [200,180,260];
			var torsoSize=[1000,200,600];
			var jointSizeLegs=[60,30,30];
			var midJointSizeLegs=[60,30,30];
			var thighSize=[80,80,200]; //top legs
			var shankSize=[60,200,60]; //lower legs
			var footSize=[100,20,100] //feets
			
			this.root = new THREE.Object3D();
			// skeleton
			this.head = new THREE.Object3D();
			this.head.name = "head";
			this.head.translateX(torsoSize[0]/2+headSize[0]/2);
			this.head.translateY(headSize[1]/2);
			//joints
			this.joint = new THREE.Object3D();
			this.joint.translateZ(torsoSize[2]/2);
			this.joint.translateX(torsoSize[0]/2-torsoSize[0]*1/5);
			
			this.joint2 = new THREE.Object3D();
			this.joint2.translateZ(torsoSize[2]/2);
			this.joint3 = new THREE.Object3D();
			
			this.joint3.translateZ(torsoSize[2]/2);
			this.joint3.translateX(torsoSize[0]/2-torsoSize[0]*4/5);
			
			this.leg2 = new THREE.Object3D();
			this.leg2.translateZ(jointSizeLegs[0]+thighSize[2]/2-thighSize[2]*1/10);
			
			this.midJoint2 = new THREE.Object3D();
			this.midJoint2.translateZ(thighSize[2]/2);
			
			this.shank = new THREE.Object3D();
			this.shank.translateY(-shankSize[1]/2+shankSize[1]*1/10-jointSizeLegs[0]/2);
			
			this.foot2 = new THREE.Object3D();
			this.foot2.translateY(-shankSize[1]/2-footSize[1]/2);
			
			this.torso = new THREE.Object3D();
			
			
			this.torso.add(this.head);
			this.torso.add(this.joint);
			this.torso.add(this.joint2);
			this.torso.add(this.joint3);
			this.joint2.add(this.leg2);
			this.leg2.add(this.midJoint2);
			this.midJoint2.add(this.shank);
			this.shank.add(this.foot2);
			
			//skin
			this.headSkin = new THREE.Mesh(new THREE.CubeGeometry(headSize[0],headSize[1],headSize[2]), 
										   new THREE.MeshNormalMaterial());
			this.torsoSkin = new THREE.Mesh(new THREE.CubeGeometry( torsoSize[0],torsoSize[1],torsoSize[2]),
											new THREE.MeshNormalMaterial());
			this.jointSkin = new THREE.Mesh(new THREE.SphereGeometry(jointSizeLegs[0],jointSizeLegs[1],jointSizeLegs[2]),
											new THREE.MeshNormalMaterial());
			this.jointSkin2 = new THREE.Mesh(new THREE.SphereGeometry(jointSizeLegs[0],jointSizeLegs[1],jointSizeLegs[2]),
											 new THREE.MeshNormalMaterial());
			this.jointSkin3 = new THREE.Mesh(new THREE.SphereGeometry(jointSizeLegs[0],jointSizeLegs[1],jointSizeLegs[2]),
											 new THREE.MeshNormalMaterial());
			this.leg2Skin = new THREE.Mesh(new THREE.CubeGeometry(thighSize[0],thighSize[1],thighSize[2]),
										  new THREE.MeshNormalMaterial());
			//this.legSkin.rotateX(Math.PI/6);
			this.midJointSkin2 = new THREE.Mesh(new THREE.SphereGeometry(midJointSizeLegs[0],midJointSizeLegs[1],midJointSizeLegs[2]),
											 new THREE.MeshNormalMaterial());
			this.shankSkin = new THREE.Mesh(new THREE.CubeGeometry(shankSize[0],shankSize[1],shankSize[2]),
							              new THREE.MeshNormalMaterial());
			this.footSkin = new THREE.Mesh(new THREE.CubeGeometry(footSize[0],footSize[1],footSize[2]),
							              new THREE.MeshNormalMaterial());
											
			this.torso.add(this.torsoSkin);
			this.head.add(this.headSkin);
			this.joint.add(this.jointSkin);
			this.joint2.add(this.jointSkin2);
			this.joint3.add(this.jointSkin3);
			this.leg2.add(this.leg2Skin);
			this.midJoint2.add(this.midJointSkin2);
			this.shank.add(this.shankSkin);
			this.foot2.add(this.footSkin);
			
			this.root.add(this.torso);
			
			
        
		this.getMesh = function() {
			return this.root;
		};
		
		};
		
		
        return Robot;
		
		
    }));

