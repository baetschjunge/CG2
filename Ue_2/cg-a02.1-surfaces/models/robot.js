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
			
			//head
			var headSize = [100,90,130];
			//torso
			var torsoSize=[500,100,300];
			
			//leg parts
			var legJointSize=[30,15,15];
			var tighSize = [20,15,150,20];
			var legJointMid = [20,15,15];
			var footSize = [10,1,200,20];
			/*
			var midlegJointSize=[30,15,15];
			var thighSize=[40,40,100]; //top leg
			var shankSize=[30,100,30]; //lower leg
			var footSize=[50,10,50]; //feets
			*/
			
			//../scene/scene.js
			//tail
			var tailJointSize=[50,20,20];
			//var tailPartSize=[150,60,60];../scene/scene.js
			var tailPartSize = [40,30,200,20];
			var tailMidJointSize = [40,20,20];
			var tailPart2Size = [20,30,200,20];
			var tailMidJoint2Size = [30,15,15];
			var tailPart3Size = [15,20,300,20];
			var tailMidJoint3Size = [25,15,15];
			var tailPart4Size = [10,15,200,20];
			var tailMidJoint4Size = [20,15,15];
			var tailPart5Size = [1,10,200,20];
			
			
			
			
			this.root = new THREE.Object3D();
			
			// skeleton head
			this.head = new THREE.Object3D();
			this.head.name = "head";
			this.head.translateX(torsoSize[0]/2+headSize[0]/2);
			this.head.translateY(headSize[1]/2);
			
			// leg right
			// leg right front
			this.legJointRight = new THREE.Object3D();
			this.legJointRight.translateZ(torsoSize[2]/2);
			this.legJointRight.translateX(torsoSize[0]/2-torsoSize[0]*1/5);
			
			this.tighRightFront = new THREE.Object3D();
			this.tighRightFront.translateZ(tighSize[2]/2);
			this.tighRightFront.translateY(+legJointSize[0]);

			this.jointMidRightFront = new THREE.Object3D();
			this.jointMidRightFront.translateZ(tighSize[2]/2-legJointMid[0]);
			this.jointMidRightFront.translateY(+legJointSize[0]);

			this.footRightFront = new THREE.Object3D();
			this.footRightFront.translateY(-footSize[2]/2+legJointMid[0]/2);
			this.footRightFront.translateZ(+tighSize[2]*1/3);
			
			// leg right center
			this.legJointRight2 = new THREE.Object3D();
			this.legJointRight2.translateZ(torsoSize[2]/2);
			
			this.tighRightCenter = new THREE.Object3D();
			this.tighRightCenter.translateZ(tighSize[2]/2);
			this.tighRightCenter.translateY(+legJointSize[0]);
			
			this.jointMidRightCenter = new THREE.Object3D();
			this.jointMidRightCenter.translateZ(tighSize[2]/2-legJointMid[0]);
			this.jointMidRightCenter.translateY(+legJointSize[0]);
			
			this.footRightCenter = new THREE.Object3D();
			this.footRightCenter.translateY(-footSize[2]/2+legJointMid[0]/2);
			this.footRightCenter.translateZ(+tighSize[2]*1/3);
			
			// leg right back
			this.legJointRight3 = new THREE.Object3D();
			this.legJointRight3.translateZ(torsoSize[2]/2);
			this.legJointRight3.translateX(torsoSize[0]/2-torsoSize[0]*4/5);
			
			this.tighRightBack = new THREE.Object3D();
			this.tighRightBack.translateZ(tighSize[2]/2);
			this.tighRightBack.translateY(+legJointSize[0]);
			
			this.jointMidRightBack = new THREE.Object3D();
			this.jointMidRightBack.translateZ(tighSize[2]/2-legJointMid[0]);
			this.jointMidRightBack.translateY(+legJointSize[0]);
			
			this.footRightBack = new THREE.Object3D();
			this.footRightBack.translateY(-footSize[2]/2+legJointMid[0]/2);
			this.footRightBack.translateZ(+tighSize[2]*1/3);
			
						
			// left leg skin
			// leg left back
			this.legJointLeft = new THREE.Object3D();
			this.legJointLeft.translateZ(-torsoSize[2]/2);
			this.legJointLeft.translateX(-torsoSize[0]/2+torsoSize[0]*1/5);
			
			this.tighLeftBack = new THREE.Object3D();
			this.tighLeftBack.translateZ(-tighSize[2]/2);
			this.tighLeftBack.translateY(+legJointSize[0]);

			this.jointMidLeftBack = new THREE.Object3D();
			this.jointMidLeftBack.translateZ(-tighSize[2]/2+legJointMid[0]);
			this.jointMidLeftBack.translateY(+legJointSize[0]);

			this.footLeftBack = new THREE.Object3D();
			this.footLeftBack.translateY(-footSize[2]/2+legJointMid[0]/2);
			this.footLeftBack.translateZ(-tighSize[2]*1/3);
			
			
			// leg left center
			this.legJointLeft2 = new THREE.Object3D();
			this.legJointLeft2.translateZ(-torsoSize[2]/2);
			
			this.tighLeftCenter = new THREE.Object3D();
			this.tighLeftCenter.translateZ(-tighSize[2]/2);
			this.tighLeftCenter.translateY(+legJointSize[0]);
			
			this.jointMidLeftCenter = new THREE.Object3D();
			this.jointMidLeftCenter.translateZ(-tighSize[2]/2+legJointMid[0]);
			this.jointMidLeftCenter.translateY(+legJointSize[0]);
			
			this.footLeftCenter = new THREE.Object3D();
			this.footLeftCenter.translateY(-footSize[2]/2+legJointMid[0]/2);
			this.footLeftCenter.translateZ(-tighSize[2]*1/3);
			
			
			
			// leg left front
			this.legJointLeft3 = new THREE.Object3D();
			this.legJointLeft3.translateZ(-torsoSize[2]/2);
			this.legJointLeft3.translateX(-torsoSize[0]/2+torsoSize[0]*4/5);
			
			this.tighLeftFront = new THREE.Object3D();
			this.tighLeftFront.translateZ(-tighSize[2]/2);
			this.tighLeftFront.translateY(+legJointSize[0]);
			
			this.jointMidLeftFront = new THREE.Object3D();
			this.jointMidLeftFront.translateZ(-tighSize[2]/2+legJointMid[0]);
			this.jointMidLeftFront.translateY(+legJointSize[0]);
			
			this.footLeftFront = new THREE.Object3D();
			this.footLeftFront.translateY(-footSize[2]/2+legJointMid[0]/2);
			this.footLeftFront.translateZ(-tighSize[2]*1/3);
			
			
			// tail
			this.tailJoint = new THREE.Object3D();
			this.tailJoint.translateX(-torsoSize[0]/2);
			
			this.tailPart = new THREE.Object3D();
			this.tailPart.translateX(-tailPartSize[2]/2);
			this.tailPart.translateY(+tailPartSize[0]);
			
			this.tailMidJoint = new THREE.Object3D();
			this.tailMidJoint.translateX(-tailPartSize[2]/2);
			this.tailMidJoint.translateY(+tailMidJointSize[0]*1.5);			
			
			this.tailPart2 = new THREE.Object3D();
			this.tailPart2.translateY(+tailPart2Size[2]/2);
			
			this.tailMidJoint2 = new THREE.Object3D();
			this.tailMidJoint2.translateY(+tailPart2Size[2]/2);
			
			this.tailPart3 = new THREE.Object3D();
			this.tailPart3.translateX(+tailPart2Size[2]/2+tailMidJoint2Size[0]/2);
			this.tailPart3.translateY(+tailPart2Size[2]/2-tailMidJoint2Size[0]);
			
			this.tailMidJoint3 = new THREE.Object3D();
			this.tailMidJoint3.translateX(+tailPart3Size[2]/2-tailMidJoint3Size[0]);
			this.tailMidJoint3.translateY(+tailMidJoint3Size[0]*3);
			
			this.tailPart4 = new THREE.Object3D();
			this.tailPart4.translateX(+tailPart4Size[2]/2);
			
			this.tailMidJoint4 = new THREE.Object3D();
			this.tailMidJoint4.translateX(+tailPart4Size[2]/2-tailMidJoint4Size[0]/3);
			
			this.tailPart5 = new THREE.Object3D();
			this.tailPart5.translateX(+tailPart5Size[2]/3);
			this.tailPart5.translateY(-tailPart5Size[2]/3);
			
			
			
			
			
			
			// torso
			this.torso = new THREE.Object3D();
			// head
			this.torso.add(this.head);
			
			// leg right front
			this.torso.add(this.legJointRight);
			this.legJointRight.add(this.tighRightFront);
			this.tighRightFront.add(this.jointMidRightFront);
			this.jointMidRightFront.add(this.footRightFront);

			// leg2 right center
			this.torso.add(this.legJointRight2);
			this.legJointRight2.add(this.tighRightCenter);
			this.tighRightCenter.add(this.jointMidRightCenter);
			this.jointMidRightCenter.add(this.footRightCenter);
			
			// leg right back
			this.torso.add(this.legJointRight3);
			this.legJointRight3.add(this.tighRightBack);
			this.tighRightBack.add(this.jointMidRightBack);
			this.jointMidRightBack.add(this.footRightBack);			
			
			
			// left leg skin
			// leg left back
			this.torso.add(this.legJointLeft);
			this.legJointLeft.add(this.tighLeftBack);
			this.tighLeftBack.add(this.jointMidLeftBack);
			this.jointMidLeftBack.add(this.footLeftBack);
			
			// leg left center
			this.torso.add(this.legJointLeft2);
			this.legJointLeft2.add(this.tighLeftCenter);
			this.tighLeftCenter.add(this.jointMidLeftCenter);
			this.jointMidLeftCenter.add(this.footLeftCenter);
			
			
			// leg left front
			this.torso.add(this.legJointLeft3);
			this.legJointLeft3.add(this.tighLeftFront);
			this.tighLeftFront.add(this.jointMidLeftFront);
			this.jointMidLeftFront.add(this.footLeftFront);
						
			//tail
			this.torso.add(this.tailJoint);		
			this.tailJoint.add(this.tailPart);
			this.tailPart.add(this.tailMidJoint);
			this.tailMidJoint.add(this.tailPart2);
			this.tailPart2.add(this.tailMidJoint2);
			this.tailMidJoint2.add(this.tailPart3);
			this.tailPart3.add(this.tailMidJoint3);
			this.tailMidJoint3.add(this.tailPart4);
			this.tailPart4.add(this.tailMidJoint4);
			this.tailMidJoint4.add(this.tailPart5);
			
			
			
			// this is head, torso skin
			this.headSkin = new THREE.Mesh(new THREE.CubeGeometry(headSize[0],headSize[1],headSize[2]), 
										   new THREE.MeshNormalMaterial());
			this.torsoSkin = new THREE.Mesh(new THREE.CubeGeometry( torsoSize[0],torsoSize[1],torsoSize[2]),
											new THREE.MeshNormalMaterial());
			
			// right leg skin
			// this is leg right Front skin
			this.legJointRightSkin = new THREE.Mesh(new THREE.SphereGeometry(legJointSize[0],legJointSize[1],legJointSize[2]),
											new THREE.MeshNormalMaterial());
			this.tighRightFrontSkin = new THREE.Mesh(new THREE.CylinderGeometry( tighSize[0] , tighSize[1] , tighSize[2], tighSize[3]), new THREE.MeshNormalMaterial());	
			this.tighRightFrontSkin.rotateX(-Math.PI*4/6);
			this.jointMidRightFrontSkin = new THREE.Mesh(new THREE.SphereGeometry(legJointMid[0],legJointMid[1],legJointMid[2]),
											 new THREE.MeshNormalMaterial());
			this.footRightFrontSkin = new THREE.Mesh(new THREE.CylinderGeometry( footSize[0] , footSize[1] , footSize[2], footSize[3]), new THREE.MeshNormalMaterial());	
			this.footRightFrontSkin.rotateX(-Math.PI*1/6);
			
			// leg right center
			this.legJointRightSkin2 = new THREE.Mesh(new THREE.SphereGeometry(legJointSize[0],legJointSize[1],legJointSize[2]),
											 new THREE.MeshNormalMaterial());
			this.tighRightCenterSkin = new THREE.Mesh(new THREE.CylinderGeometry( tighSize[0] , tighSize[1] , tighSize[2], tighSize[3]), new THREE.MeshNormalMaterial());	
			this.tighRightCenterSkin.rotateX(-Math.PI*4/6);
			this.jointMidRightCenterSkin = new THREE.Mesh(new THREE.SphereGeometry(legJointMid[0],legJointMid[1],legJointMid[2]),
											 new THREE.MeshNormalMaterial());
			this.footRightCenterSkin = new THREE.Mesh(new THREE.CylinderGeometry( footSize[0] , footSize[1] , footSize[2], footSize[3]), new THREE.MeshNormalMaterial());	
			this.footRightCenterSkin.rotateX(-Math.PI*1/6)
						
			// this is leg right back skin
			this.legJointRightSkin3 = new THREE.Mesh(new THREE.SphereGeometry(legJointSize[0],legJointSize[1],legJointSize[2]),
											 new THREE.MeshNormalMaterial());
			this.tighRightBackSkin = new THREE.Mesh(new THREE.CylinderGeometry( tighSize[0] , tighSize[1] , tighSize[2], tighSize[3]), new THREE.MeshNormalMaterial());	
			this.tighRightBackSkin.rotateX(-Math.PI*4/6);
			this.jointMidRightBackSkin = new THREE.Mesh(new THREE.SphereGeometry(legJointMid[0],legJointMid[1],legJointMid[2]),
											 new THREE.MeshNormalMaterial());
			this.footRightBackSkin = new THREE.Mesh(new THREE.CylinderGeometry( footSize[0] , footSize[1] , footSize[2], footSize[3]), new THREE.MeshNormalMaterial());	
			this.footRightBackSkin.rotateX(-Math.PI*1/6);								 
			
			
			// left leg skin
			// leg left back
			this.legJointLeftSkin = new THREE.Mesh(new THREE.SphereGeometry(legJointSize[0],legJointSize[1],legJointSize[2]),
											new THREE.MeshNormalMaterial());
			
			
			this.tighLeftBackSkin = new THREE.Mesh(new THREE.CylinderGeometry( tighSize[0] , tighSize[1] , tighSize[2], tighSize[3]), new THREE.MeshNormalMaterial());	
			this.tighLeftBackSkin.rotateX(+Math.PI*4/6);
			this.jointMidLeftBackSkin = new THREE.Mesh(new THREE.SphereGeometry(legJointMid[0],legJointMid[1],legJointMid[2]),
											 new THREE.MeshNormalMaterial());
			this.footLeftBackSkin = new THREE.Mesh(new THREE.CylinderGeometry( footSize[0] , footSize[1] , footSize[2], footSize[3]), new THREE.MeshNormalMaterial());	
			this.footLeftBackSkin.rotateX(+Math.PI*1/6);

			// leg left center
			this.legJointLeftSkin2 = new THREE.Mesh(new THREE.SphereGeometry(legJointSize[0],legJointSize[1],legJointSize[2]),
											 new THREE.MeshNormalMaterial());
			
			this.tighLeftCenterSkin = new THREE.Mesh(new THREE.CylinderGeometry( tighSize[0] , tighSize[1] , tighSize[2], tighSize[3]), new THREE.MeshNormalMaterial());	
			this.tighLeftCenterSkin.rotateX(+Math.PI*4/6);
			
			this.jointMidLeftCenterSkin = new THREE.Mesh(new THREE.SphereGeometry(legJointMid[0],legJointMid[1],legJointMid[2]),
											 new THREE.MeshNormalMaterial());
			
			this.footLeftCenterSkin = new THREE.Mesh(new THREE.CylinderGeometry( footSize[0] , footSize[1] , footSize[2], footSize[3]), new THREE.MeshNormalMaterial());	
			this.footLeftCenterSkin.rotateX(+Math.PI*1/6);
			
			
			// leg left front
			this.legJointLeftSkin3 = new THREE.Mesh(new THREE.SphereGeometry(legJointSize[0],legJointSize[1],legJointSize[2]),
											 new THREE.MeshNormalMaterial());
			this.tighLeftFrontSkin = new THREE.Mesh(new THREE.CylinderGeometry( tighSize[0] , tighSize[1] , tighSize[2], tighSize[3]), new THREE.MeshNormalMaterial());	
			this.tighLeftFrontSkin.rotateX(+Math.PI*4/6);
			
			this.jointMidLeftFrontSkin = new THREE.Mesh(new THREE.SphereGeometry(legJointMid[0],legJointMid[1],legJointMid[2]),
											 new THREE.MeshNormalMaterial());
			
			this.footLeftFrontSkin = new THREE.Mesh(new THREE.CylinderGeometry( footSize[0] , footSize[1] , footSize[2], footSize[3]), new THREE.MeshNormalMaterial());	
			this.footLeftFrontSkin.rotateX(+Math.PI*1/6);
											 

			
			// this is the tail skin
			this.taillegJointRightSkin = new THREE.Mesh(new THREE.SphereGeometry( tailJointSize[0] , tailJointSize[1] , tailJointSize[2]), new THREE.MeshNormalMaterial());
			this.tailPartSkin = new THREE.Mesh(new THREE.CylinderGeometry( tailPartSize[0] , tailPartSize[1] , tailPartSize[2], tailPartSize[3]), new THREE.MeshNormalMaterial());	
			this.tailPartSkin.rotateZ(-(2*Math.PI)/3);	
			this.tailMidlegJointRightSkin = new THREE.Mesh(new THREE.SphereGeometry( tailMidJointSize[0] , tailMidJointSize[1] , tailMidJointSize[2]), new THREE.MeshNormalMaterial());
			this.tailPart2Skin = new THREE.Mesh(new THREE.CylinderGeometry( tailPart2Size[0] , tailPart2Size[1] , tailPart2Size[2], tailPart2Size[3]), new THREE.MeshNormalMaterial());							
			this.tailMidJoint2Skin = new THREE.Mesh(new THREE.SphereGeometry( tailMidJoint2Size[0] , tailMidJoint2Size[1] , tailMidJoint2Size[2]), new THREE.MeshNormalMaterial());						
			this.tailPart3Skin = new THREE.Mesh(new THREE.CylinderGeometry( tailPart3Size[0] , tailPart3Size[1] , tailPart3Size[2], tailPart3Size[3]), new THREE.MeshNormalMaterial());	
			this.tailPart3Skin.rotateZ(-Math.PI/3);						
			this.tailMidJoint3Skin = new THREE.Mesh(new THREE.SphereGeometry( tailMidJoint3Size[0] , tailMidJoint3Size[1] , tailMidJoint3Size[2]), new THREE.MeshNormalMaterial());								
			this.tailPart4Skin = new THREE.Mesh(new THREE.CylinderGeometry( tailPart4Size[0] , tailPart4Size[1] , tailPart4Size[2], tailPart4Size[3]), new THREE.MeshNormalMaterial());	
			this.tailPart4Skin.rotateZ(-Math.PI/2);
			this.tailMidJoint4Skin = new THREE.Mesh(new THREE.SphereGeometry( tailMidJoint4Size[0] , tailMidJoint4Size[1] , tailMidJoint4Size[2]), new THREE.MeshNormalMaterial());		
			this.tailPart5Skin = new THREE.Mesh(new THREE.CylinderGeometry( tailPart5Size[0] , tailPart5Size[1] , tailPart5Size[2], tailPart5Size[3]), new THREE.MeshNormalMaterial());	
			this.tailPart5Skin.rotateZ(-Math.PI*3/4);
				
							
											
			this.torso.add(this.torsoSkin);
			this.head.add(this.headSkin);
			
			
			// leg right 
			// leg right front
			this.legJointRight.add(this.legJointRightSkin);
			this.tighRightFront.add(this.tighRightFrontSkin);
			this.jointMidRightFront.add(this.jointMidRightFrontSkin);
			this.footRightFront.add(this.footRightFrontSkin);
			
			// leg right center
			this.legJointRight2.add(this.legJointRightSkin2);
			this.tighRightCenter.add(this.tighRightCenterSkin);
			this.jointMidRightCenter.add(this.jointMidRightCenterSkin);
			this.footRightCenter.add(this.footRightCenterSkin);
			
			
			// leg right back
			this.legJointRight3.add(this.legJointRightSkin3);
			this.tighRightBack.add(this.tighRightBackSkin);
			this.jointMidRightBack.add(this.jointMidRightBackSkin);
			this.footRightBack.add(this.footRightBackSkin);
			
			
			// left leg skin
			// leg left back
			this.legJointLeft.add(this.legJointLeftSkin);
			this.tighLeftBack.add(this.tighLeftBackSkin);
			this.jointMidLeftBack.add(this.jointMidLeftBackSkin);
			this.footLeftBack.add(this.footLeftBackSkin);
			
			// leg left center
			this.legJointLeft2.add(this.legJointLeftSkin2);
			this.tighLeftCenter.add(this.tighLeftCenterSkin);
			this.jointMidLeftCenter.add(this.jointMidLeftCenterSkin);
			this.footLeftCenter.add(this.footLeftCenterSkin);
			
			// leg left front
			this.legJointLeft3.add(this.legJointLeftSkin3);
			this.tighLeftFront.add(this.tighLeftFrontSkin);
			this.jointMidLeftFront.add(this.jointMidLeftFrontSkin);
			this.footLeftFront.add(this.footLeftFrontSkin);
			
			//tail
			this.tailJoint.add(this.taillegJointRightSkin);	
			this.tailPart.add(this.tailPartSkin);		
			this.tailMidJoint.add(this.tailMidlegJointRightSkin);
			this.tailPart2.add(this.tailPart2Skin);	
			this.tailMidJoint2.add(this.tailMidJoint2Skin);
			this.tailPart3.add(this.tailPart3Skin);
			this.tailMidJoint3.add(this.tailMidJoint3Skin);
			this.tailPart4.add(this.tailPart4Skin);
			this.tailMidJoint4.add(this.tailMidJoint4Skin);
			this.tailPart5.add(this.tailPart5Skin);
			
					
			this.root.add(this.torso);
        
			this.getMesh = function() {
				return this.root;
				};
		
		};
		
		
        return Robot;
		
		
    }));

