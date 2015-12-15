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
			
			// claws
			var clawJointSize =[15,15,15];
			var clawPartSize = [20,10,100,10];
			var clawJointMidSize = [25,15,15];
			var clawPart2Size = [20,1,100,10];
			var clawPart3Size = [10,1,75,10];
			
			
			
			this.root = new THREE.Object3D();
			
			
			// torso
			this.torso = new THREE.Object3D();
			this.torso.name = "torso";
			
			
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
			this.legJointRight.name = "legJointRight";
			
			this.tighRightFront = new THREE.Object3D();
			this.tighRightFront.translateZ(tighSize[2]/2);
			this.tighRightFront.translateY(+legJointSize[0]);
			this.tighRightFront.name = "tighRightFront";
			
			this.jointMidRightFront = new THREE.Object3D();
			this.jointMidRightFront.translateZ(tighSize[2]/2-legJointMid[0]);
			this.jointMidRightFront.translateY(+legJointSize[0]);
			this.jointMidRightFront.name = "jointMidRightFront";

			this.footRightFront = new THREE.Object3D();
			this.footRightFront.translateY(-footSize[2]/2+legJointMid[0]/2);
			this.footRightFront.translateZ(+tighSize[2]*1/3);
			this.footRightFront.name = "footRightFront";
			
			
			// leg right center
			this.legJointRight2 = new THREE.Object3D();
			this.legJointRight2.translateZ(torsoSize[2]/2);
			this.legJointRight2.name = "legJointRight2";
			
			this.tighRightCenter = new THREE.Object3D();
			this.tighRightCenter.translateZ(tighSize[2]/2);
			this.tighRightCenter.translateY(+legJointSize[0]);
			this.tighRightCenter.name = "tighRightCenter.name";
			
			this.jointMidRightCenter = new THREE.Object3D();
			this.jointMidRightCenter.translateZ(tighSize[2]/2-legJointMid[0]);
			this.jointMidRightCenter.translateY(+legJointSize[0]);
			this.jointMidRightCenter.name = "jointMidRightCenter";
			
			this.footRightCenter = new THREE.Object3D();
			this.footRightCenter.translateY(-footSize[2]/2+legJointMid[0]/2);
			this.footRightCenter.translateZ(+tighSize[2]*1/3);
			this.footRightCenter.name = "footRightCenter";
			
			
			// leg right back
			this.legJointRight3 = new THREE.Object3D();
			this.legJointRight3.translateZ(torsoSize[2]/2);
			this.legJointRight3.translateX(torsoSize[0]/2-torsoSize[0]*4/5);
			this.legJointRight3.name = "legJointRight3";
			
			this.tighRightBack = new THREE.Object3D();
			this.tighRightBack.translateZ(tighSize[2]/2);
			this.tighRightBack.translateY(+legJointSize[0]);
			this.tighRightBack.name = "tighRightBack";
			
			this.jointMidRightBack = new THREE.Object3D();
			this.jointMidRightBack.translateZ(tighSize[2]/2-legJointMid[0]);
			this.jointMidRightBack.translateY(+legJointSize[0]);
			this.jointMidRightBack.name = "jointMidRightBack";
			
			this.footRightBack = new THREE.Object3D();
			this.footRightBack.translateY(-footSize[2]/2+legJointMid[0]/2);
			this.footRightBack.translateZ(+tighSize[2]*1/3);
			this.footRightBack.name = "footRightBack";
			
						
			// left leg skin
			// leg left back
			this.legJointLeft = new THREE.Object3D();
			this.legJointLeft.translateZ(-torsoSize[2]/2);
			this.legJointLeft.translateX(-torsoSize[0]/2+torsoSize[0]*1/5);
			this.legJointLeft.name = "legJointLeft";
			
			this.tighLeftBack = new THREE.Object3D();
			this.tighLeftBack.translateZ(-tighSize[2]/2);
			this.tighLeftBack.translateY(+legJointSize[0]);
			this.tighLeftBack.name = "tighLeftBack";
			
			this.jointMidLeftBack = new THREE.Object3D();
			this.jointMidLeftBack.translateZ(-tighSize[2]/2+legJointMid[0]);
			this.jointMidLeftBack.translateY(+legJointSize[0]);
			this.jointMidLeftBack.name = "jointMidLeftBack";

			this.footLeftBack = new THREE.Object3D();
			this.footLeftBack.translateY(-footSize[2]/2+legJointMid[0]/2);
			this.footLeftBack.translateZ(-tighSize[2]*1/3);
			this.footLeftBack.name = "footLeftBack";
			
			
			// leg left center
			this.legJointLeft2 = new THREE.Object3D();
			this.legJointLeft2.translateZ(-torsoSize[2]/2);
			this.legJointLeft2.name = "legJointLeft2";
			
			this.tighLeftCenter = new THREE.Object3D();
			this.tighLeftCenter.translateZ(-tighSize[2]/2);
			this.tighLeftCenter.translateY(+legJointSize[0]);
			this.tighLeftCenter.name = "tighLeftCenter";
			
			this.jointMidLeftCenter = new THREE.Object3D();
			this.jointMidLeftCenter.translateZ(-tighSize[2]/2+legJointMid[0]);
			this.jointMidLeftCenter.translateY(+legJointSize[0]);
			this.jointMidLeftCenter.name = "jointMidLeftCenter";
			
			this.footLeftCenter = new THREE.Object3D();
			this.footLeftCenter.translateY(-footSize[2]/2+legJointMid[0]/2);
			this.footLeftCenter.translateZ(-tighSize[2]*1/3);
			this.footLeftCenter.name = "footLeftCenter";
			
			
			// leg left front
			this.legJointLeft3 = new THREE.Object3D();
			this.legJointLeft3.translateZ(-torsoSize[2]/2);
			this.legJointLeft3.translateX(-torsoSize[0]/2+torsoSize[0]*4/5);
			this.legJointLeft3.name = "legJointLeft3";
			
			this.tighLeftFront = new THREE.Object3D();
			this.tighLeftFront.translateZ(-tighSize[2]/2);
			this.tighLeftFront.translateY(+legJointSize[0]);
			this.tighLeftFront.name = "tighLeftFront";
			
			this.jointMidLeftFront = new THREE.Object3D();
			this.jointMidLeftFront.translateZ(-tighSize[2]/2+legJointMid[0]);
			this.jointMidLeftFront.translateY(+legJointSize[0]);
			this.jointMidLeftFront.name = "jointMidLeftFront";
			
			this.footLeftFront = new THREE.Object3D();
			this.footLeftFront.translateY(-footSize[2]/2+legJointMid[0]/2);
			this.footLeftFront.translateZ(-tighSize[2]*1/3);
			this.footLeftFront.name = "footLeftFront";
			
			
			// tail
			this.tailJoint = new THREE.Object3D();
			this.tailJoint.translateX(-torsoSize[0]/2);
			this.tailJoint.name = "tailJoint";
			
			this.tailPart = new THREE.Object3D();
			this.tailPart.translateX(-tailPartSize[2]/2);
			this.tailPart.translateY(+tailPartSize[0]);
			this.tailPart.name = "tailPart";
			
			this.tailMidJoint = new THREE.Object3D();
			this.tailMidJoint.translateX(-tailPartSize[2]/2);
			this.tailMidJoint.translateY(+tailMidJointSize[0]*1.5);		
			this.tailMidJoint.name = "tailMidJoint";
			
			this.tailPart2 = new THREE.Object3D();
			this.tailPart2.translateY(+tailPart2Size[2]/2);
			this.tailPart2.name = "tailPart2";
			
			this.tailMidJoint2 = new THREE.Object3D();
			this.tailMidJoint2.translateY(+tailPart2Size[2]/2);
			this.tailMidJoint2.name = "tailMidJoint2";
			
			this.tailPart3 = new THREE.Object3D();
			this.tailPart3.translateX(+tailPart2Size[2]/2+tailMidJoint2Size[0]/2);
			this.tailPart3.translateY(+tailPart2Size[2]/2-tailMidJoint2Size[0]);
			this.tailPart3.name = "tailPart3";
			
			this.tailMidJoint3 = new THREE.Object3D();
			this.tailMidJoint3.translateX(+tailPart3Size[2]/2-tailMidJoint3Size[0]);
			this.tailMidJoint3.translateY(+tailMidJoint3Size[0]*3);
			this.tailMidJoint3.name = "tailMidJoint3";
			
			this.tailPart4 = new THREE.Object3D();
			this.tailPart4.translateX(+tailPart4Size[2]/2);
			this.tailPart4.name = "tailPart4";
			
			this.tailMidJoint4 = new THREE.Object3D();
			this.tailMidJoint4.translateX(+tailPart4Size[2]/2-tailMidJoint4Size[0]/3);
			this.tailMidJoint4.name = "tailMidJoint4";
			
			this.tailPart5 = new THREE.Object3D();
			this.tailPart5.translateX(+tailPart5Size[2]/2);
			this.tailPart5.translateY(-tailMidJoint4Size[0]/2*3);
			this.tailPart5.name = "tailPart5";
			
			
			// claws right
			this.clawJointRight = new THREE.Object3D();
			this.clawJointRight.translateX(+torsoSize[0]/2);
			this.clawJointRight.translateZ(+torsoSize[2]*3/6);
			this.clawJointRight.name = "clawJointRight";
			
			this.clawPartRight = new THREE.Object3D();
			this.clawPartRight.translateX(+clawPartSize[0]*2);
			this.clawPartRight.translateZ(+clawPartSize[0]*2);
			this.clawPartRight.name = "clawPartRight";
			
			this.clawJointMidRight = new THREE.Object3D();
			this.clawJointMidRight.translateX(+clawPartSize[2]/2-clawJointMidSize[0]/2);
			this.clawJointMidRight.translateZ(+clawPartSize[2]/2-clawJointMidSize[0]/2);
			this.clawJointMidRight.name = "clawJointMidRight";
			
			this.clawPart2Right = new THREE.Object3D();
			this.clawPart2Right.translateX(+clawPart2Size[2]/2);
			this.clawPart2Right.name = "clawPart2Right";
			
			this.clawPart3Right = new THREE.Object3D();
			this.clawPart3Right.translateX(+clawJointMidSize[0]);
			this.clawPart3Right.translateZ(-clawJointMidSize[0]);
			this.clawPart3Right.name = "clawPart3Right";

			
			// claws left
			this.clawJointLeft = new THREE.Object3D();
			this.clawJointLeft.translateX(+torsoSize[0]/2);
			this.clawJointLeft.translateZ(-torsoSize[2]*3/6);
			this.clawJointLeft.name = "clawJointLeft";
			
			this.clawPartLeft = new THREE.Object3D();
			this.clawPartLeft.translateX(+clawPartSize[0]*2);
			this.clawPartLeft.translateZ(-clawPartSize[0]*2);
			this.clawPartLeft.name = "clawPartLeft";
			
			this.clawJointMidLeft = new THREE.Object3D();
			this.clawJointMidLeft.translateX(+clawPartSize[2]/2-clawJointMidSize[0]/2);
			this.clawJointMidLeft.translateZ(-clawPartSize[2]/2+clawJointMidSize[0]/2);
			this.clawJointMidLeft.name = "clawJointMidLeft";

			this.clawPart2Left = new THREE.Object3D();
			this.clawPart2Left.translateX(+clawPart2Size[2]/2);
			this.clawPart2Left.name = "clawPart2Left";
			
			this.clawPart3Left = new THREE.Object3D();
			this.clawPart3Left.translateX(+clawJointMidSize[0]);
			this.clawPart3Left.translateZ(+clawJointMidSize[0]);
			this.clawPart3Left.name = "clawPart3Left";
			
			
			
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
			this.torso.add(this.legJointLeft3);
			this.legJointLeft3.add(this.tighLeftBack);
			this.tighLeftBack.add(this.jointMidLeftBack);
			this.jointMidLeftBack.add(this.footLeftBack);
			
			// leg left center
			this.torso.add(this.legJointLeft2);
			this.legJointLeft2.add(this.tighLeftCenter);
			this.tighLeftCenter.add(this.jointMidLeftCenter);
			this.jointMidLeftCenter.add(this.footLeftCenter);
			
			
			// leg left front
			this.torso.add(this.legJointLeft);
			this.legJointLeft.add(this.tighLeftFront);
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
			
			// claws right
			this.torso.add(this.clawJointRight);
			this.clawJointRight.add(this.clawPartRight);
			this.clawPartRight.add(this.clawJointMidRight);
			this.clawJointMidRight.add(this.clawPart2Right);
			this.clawJointMidRight.add(this.clawPart3Right);
			
			// claws left
			this.torso.add(this.clawJointLeft);
			this.clawJointLeft.add(this.clawPartLeft);
			this.clawPartLeft.add(this.clawJointMidLeft);
			this.clawJointMidLeft.add(this.clawPart2Left);
			this.clawJointMidLeft.add(this.clawPart3Left);
			
			
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
			this.tailJointRightSkin = new THREE.Mesh(new THREE.SphereGeometry( tailJointSize[0] , tailJointSize[1] , tailJointSize[2]), new THREE.MeshNormalMaterial());
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
			this.tailPart5Skin.rotateZ(-Math.PI*3/5);
			
			// claws right
			this.clawJointRightSkin = new THREE.Mesh(new THREE.SphereGeometry( clawJointSize[0] , clawJointSize[1] , clawJointSize[2]), new THREE.MeshNormalMaterial());	
			this.clawPartRightSkin = new THREE.Mesh(new THREE.CylinderGeometry( clawPartSize[0] , clawPartSize[1] , clawPartSize[2], clawPartSize[3]), new THREE.MeshNormalMaterial());	
			this.clawPartRightSkin.rotateZ(-Math.PI/2);
			this.clawPartRightSkin.rotateX(+Math.PI/4);
			this.clawJointMidRightSkin = new THREE.Mesh(new THREE.SphereGeometry( clawJointMidSize[0] , clawJointMidSize[1] , clawJointMidSize[2]), new THREE.MeshNormalMaterial());
			this.clawPart2RightSkin = new THREE.Mesh(new THREE.CylinderGeometry( clawPart2Size[0] , clawPart2Size[1] , clawPart2Size[2], clawPart2Size[3]), new THREE.MeshNormalMaterial());	
			this.clawPart2RightSkin.rotateZ(-Math.PI/2);
			this.clawPart2RightSkin.rotateX(+Math.PI);
			this.clawPart3RightSkin = new THREE.Mesh(new THREE.CylinderGeometry( clawPart3Size[0] , clawPart3Size[1] , clawPart3Size[2], clawPart3Size[3]), new THREE.MeshNormalMaterial());	
			this.clawPart3RightSkin.rotateZ(-Math.PI/2);
			this.clawPart3RightSkin.rotateX(+Math.PI*4/5);
			
			// claws left
			this.clawJointLeftSkin = new THREE.Mesh(new THREE.SphereGeometry( clawJointSize[0] , clawJointSize[1] , clawJointSize[2]), new THREE.MeshNormalMaterial());	
			this.clawPartLeftSkin = new THREE.Mesh(new THREE.CylinderGeometry( clawPartSize[0] , clawPartSize[1] , clawPartSize[2], clawPartSize[3]), new THREE.MeshNormalMaterial());	
			this.clawPartLeftSkin.rotateZ(+Math.PI/2);
			this.clawPartLeftSkin.rotateX(+Math.PI/4+Math.PI);			
			this.clawJointMidLeftSkin = new THREE.Mesh(new THREE.SphereGeometry( clawJointMidSize[0] , clawJointMidSize[1] , clawJointMidSize[2]), new THREE.MeshNormalMaterial());
			this.clawPart2LeftSkin = new THREE.Mesh(new THREE.CylinderGeometry( clawPart2Size[0] , clawPart2Size[1] , clawPart2Size[2], clawPart2Size[3]), new THREE.MeshNormalMaterial());	
			this.clawPart2LeftSkin.rotateZ(-Math.PI/2);
			this.clawPart2LeftSkin.rotateX(+Math.PI);
			this.clawPart3LeftSkin = new THREE.Mesh(new THREE.CylinderGeometry( clawPart3Size[0] , clawPart3Size[1] , clawPart3Size[2], clawPart3Size[3]), new THREE.MeshNormalMaterial());	
			this.clawPart3LeftSkin.rotateZ(-Math.PI/2);
			this.clawPart3LeftSkin.rotateX(-Math.PI*4/5);
			
											
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
			this.tailJoint.add(this.tailJointRightSkin);	
			this.tailPart.add(this.tailPartSkin);		
			this.tailMidJoint.add(this.tailMidlegJointRightSkin);
			this.tailPart2.add(this.tailPart2Skin);	
			this.tailMidJoint2.add(this.tailMidJoint2Skin);
			this.tailPart3.add(this.tailPart3Skin);
			this.tailMidJoint3.add(this.tailMidJoint3Skin);
			this.tailPart4.add(this.tailPart4Skin);
			this.tailMidJoint4.add(this.tailMidJoint4Skin);
			this.tailPart5.add(this.tailPart5Skin);
			
			//claws right
			this.clawJointRight.add(this.clawJointRightSkin);
			this.clawPartRight.add(this.clawPartRightSkin);
			this.clawJointMidRight.add(this.clawJointMidRightSkin);
			this.clawPart2Right.add(this.clawPart2RightSkin);
			this.clawPart3Right.add(this.clawPart3RightSkin);
			
			// claws left
			this.clawJointLeft.add(this.clawJointLeftSkin);
			this.clawPartLeft.add(this.clawPartLeftSkin);
			this.clawJointMidLeft.add(this.clawJointMidLeftSkin);
			this.clawPart2Left.add(this.clawPart2LeftSkin);
			this.clawPart3Left.add(this.clawPart3LeftSkin);


		
			this.root.add(this.torso);
        
			this.getMesh = function() {
				return this.root;
				};
		
		
		/* 
   var posFunc = function(u,v) {
                    var x = eval("Math.cos(u)*200");
                    var y = eval("Math.cos(v)*200");
                    var z = eval("Math.cos(u+v)*200");
                    return new THREE.Vector3(x,y,z);
                };
   
   
   this.torsoSkin = new THREE.Mesh(new THREE.ParametricGeometry(posFunc,50,50,false),
           new THREE.MeshNormalMaterial({side: THREE.DoubleSide}));
   */
		
		
		};
		
        return Robot;
		
		
    }));

