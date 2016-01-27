



define(["three"],
	(function (THREE){

		"use strict";

		var Robot = function(){

			//size of head
			var sizeHead = [100,100,100];
			//size of body
			var sizeTorso = [300,400,200];
			//size of arm elements
			var sizeArms = [70,250,140];
			//size of joints in arm
			var jointsize = [80,80,80,80];
			//size of joints in leg
			var jointlegsize = [70,15,15];
			//size of leg
			var sizeLegs = [50,200,80];
			//foot
			var footer = [135,40,200];

			//create the body object
			this.head = new THREE.Object3D();
			this.head.name = "head";
			
			//define a root object
			this.root = new THREE.Object3D();

			//create the torso object
			this.torso = new THREE.Object3D();
			this.torso.name = "torso";

			//right arm
			//upperjoint
			this.armright1 = new THREE.Object3D();
			this.armright1.name = "armright1";
			//upperarm
			this.armright2 = new THREE.Object3D();
			this.armright2.name = "armright2";
			//underjoint
			this.armright3 = new THREE.Object3D();
			this.armright3.name = "armright3";
			//underarm
			this.armright4 = new THREE.Object3D();
			this.armright4.name = "armright4";

			//left arm
			//upperjoint
			this.armleft1 = new THREE.Object3D();
			this.armleft1.name = "armleft1";
			//upperarm
			this.armleft2 = new THREE.Object3D();
			this.armleft2.name = "armleft2";
			//underjoint
			this.armleft3 = new THREE.Object3D();
			this.armleft3.name = "armleft3";
			//underarm
			this.armleft4 = new THREE.Object3D();
			this.armleft4.name = "armleft4";

			//right leg
			//upperjoint
			this.legright1 = new THREE.Object3D();
			this.legright1.name = "legright1";
			//upperleg
			this.legright2 = new THREE.Object3D();
			this.legright2.name = "legright2";
			//underjoint
			this.legright3 = new THREE.Object3D();
			this.legright3.name = "legright3";
			//underleg
			this.legright4 = new THREE.Object3D();
			this.legright4.name = "legright4";
			//right foot
			this.legfootright = new THREE.Object3D();
			this.legfootright.name = "legfootright";

			//left leg
			//upperjoint
			this.legleft1 = new THREE.Object3D();
			this.legleft1.name = "legleft1";
			//upperleg
			this.legleft2 = new THREE.Object3D();
			this.legleft2.name = "legleft2";
			//underjoint
			this.legleft3 = new THREE.Object3D();
			this.legleft3.name = "legleft3";

			//underleg
			this.legleft4 = new THREE.Object3D();
			this.legleft4.name = "legleft4";
			//left foot
			this.legfootleft = new THREE.Object3D();
			this.legfootleft.name = "legfootleft";
		

			//get Material for the bodyparts
			//material for head
			this.skinHead = new THREE.Mesh(new THREE.CubeGeometry(sizeHead[0],sizeHead[1],sizeHead[2]), new THREE.MeshNormalMaterial());
			this.skinHead.translateY(sizeHead[0]+sizeArms[2]);


			//material for torso
			this.skinTorso = new THREE.Mesh(new THREE.CubeGeometry(sizeTorso[0],sizeTorso[1],sizeTorso[2]), new THREE.MeshNormalMaterial());

			//material for arm

			//right arm
			this.skinarmright1 = new THREE.Mesh(new THREE.CylinderGeometry(jointsize[0],jointsize[1],jointsize[2],jointsize[3]), new THREE.MeshNormalMaterial());
			this.skinarmright1.translateY(sizeTorso[1]/4);
			this.skinarmright1.translateX(sizeTorso[0]/2);
			this.skinarmright1.rotateZ(jointsize[0]);
			
			this.skinarmright2 = new THREE.Mesh(new THREE.CubeGeometry(sizeArms[0], sizeArms[1], sizeArms[2]), new THREE.MeshNormalMaterial());
			this.skinarmright2.translateY(sizeArms[1]/2);
			
			this.skinarmright3 = new THREE.Mesh(new THREE.CylinderGeometry(jointsize[0],jointsize[1],jointsize[2],jointsize[3]), new THREE.MeshNormalMaterial());	
			this.skinarmright3.translateY(sizeArms[1]/2);

			this.skinarmright4 = new THREE.Mesh(new THREE.CubeGeometry(sizeArms[0],sizeArms[1],sizeArms[2]), new THREE.MeshNormalMaterial());
			this.skinarmright4.translateX(sizeTorso[2]-sizeHead[0]/2);
			this.skinarmright4.rotateZ(sizeTorso[2]+sizeHead[0]);

			//left arm
			this.skinarmleft1 = new THREE.Mesh(new THREE.CylinderGeometry(jointsize[0],jointsize[1],jointsize[2],jointsize[3]), new THREE.MeshNormalMaterial());
			this.skinarmleft1.translateY(sizeTorso[1]/4);
			this.skinarmleft1.translateX(-sizeTorso[0]/2);
			this.skinarmleft1.rotateZ(-jointsize[0]);

			this.skinarmleft2 = new THREE.Mesh(new THREE.CubeGeometry(sizeArms[0], sizeArms[1], sizeArms[2]), new THREE.MeshNormalMaterial());
			this.skinarmleft2.translateY(sizeArms[1]/2);

			this.skinarmleft3 = new THREE.Mesh(new THREE.CylinderGeometry(jointsize[0],jointsize[1],jointsize[2],jointsize[3]), new THREE.MeshNormalMaterial());	
			this.skinarmleft3.translateY(sizeArms[1]/2);

			this.skinarmleft4 = new THREE.Mesh(new THREE.CubeGeometry(sizeArms[0],sizeArms[1],sizeArms[2]), new THREE.MeshNormalMaterial());
			this.skinarmleft4.translateX(-sizeTorso[2]+50);
			this.skinarmleft4.rotateZ(-sizeTorso[2]-100);

			//right leg
			this.skinlegright1 = new THREE.Mesh(new THREE.SphereGeometry(jointlegsize[0],jointlegsize[1],jointlegsize[2]), new THREE.MeshNormalMaterial());
			this.skinlegright1.translateY(-sizeTorso[1]/2);
			this.skinlegright1.translateX(sizeTorso[0]/4);

			this.skinlegright2 = new THREE.Mesh(new THREE.CubeGeometry(sizeLegs[0],sizeLegs[1],sizeLegs[2]), new THREE.MeshNormalMaterial());
			this.skinlegright2.translateY(-sizeLegs[1]/2);

			this.skinlegright3 = new THREE.Mesh(new THREE.SphereGeometry(jointlegsize[0],jointlegsize[1],jointlegsize[2]), new THREE.MeshNormalMaterial());
			this.skinlegright3.translateY(-sizeLegs[1]/2);

			this.skinlegright4 = new THREE.Mesh(new THREE.CubeGeometry(sizeLegs[0],sizeLegs[1],sizeLegs[2]), new THREE.MeshNormalMaterial());
			this.skinlegright4.translateY(-sizeLegs[1]/2);

			this.skinlegfootright = new THREE.Mesh(new THREE.CubeGeometry(footer[0], footer[1], footer[2]), new THREE.MeshNormalMaterial());
			this.skinlegfootright.translateY(-sizeLegs[1]/2);
			this.skinlegfootright.translateZ(+footer[2]/3);

			//right leg
			this.skinlegleft1 = new THREE.Mesh(new THREE.SphereGeometry(jointlegsize[0],jointlegsize[1],jointlegsize[2]), new THREE.MeshNormalMaterial());
			this.skinlegleft1.translateY(-sizeTorso[1]/2);
			this.skinlegleft1.translateX(-sizeTorso[0]/4);

			this.skinlegleft2 = new THREE.Mesh(new THREE.CubeGeometry(sizeLegs[0],sizeLegs[1],sizeLegs[2]), new THREE.MeshNormalMaterial());
			this.skinlegleft2.translateY(-sizeLegs[1]/2);

			this.skinlegleft3 = new THREE.Mesh(new THREE.SphereGeometry(jointlegsize[0],jointlegsize[1],jointlegsize[2]), new THREE.MeshNormalMaterial());
			this.skinlegleft3.translateY(-sizeLegs[1]/2);

			this.skinlegleft4 = new THREE.Mesh(new THREE.CubeGeometry(sizeLegs[0],sizeLegs[1],sizeLegs[2]), new THREE.MeshNormalMaterial());
			this.skinlegleft4.translateY(-sizeLegs[1]/2);

			this.skinlegfootleft = new THREE.Mesh(new THREE.CubeGeometry(footer[0], footer[1], footer[2]), new THREE.MeshNormalMaterial());
			this.skinlegfootleft.translateY(-sizeLegs[1]/2);
			this.skinlegfootleft.translateZ(+footer[2]/3);


			//adding material to the bodyparts
			this.head.add(this.skinHead);
			this.torso.add(this.skinTorso);
			
			this.armright1.add(this.skinarmright1);
			this.armright2.add(this.skinarmright2);
			this.armright3.add(this.skinarmright3);
			this.armright4.add(this.skinarmright4);

			this.armleft1.add(this.skinarmleft1);
			this.armleft2.add(this.skinarmleft2);
			this.armleft3.add(this.skinarmleft3);
			this.armleft4.add(this.skinarmleft4);

			this.legright1.add(this.skinlegright1);
			this.legright2.add(this.skinlegright2);
			this.legright3.add(this.skinlegright3);

			this.legright4.add(this.skinlegright4);
			this.legfootright.add(this.skinlegfootright);

			this.legleft1.add(this.skinlegleft1);
			this.legleft2.add(this.skinlegleft2);
			this.legleft3.add(this.skinlegleft3);
			this.legleft4.add(this.skinlegleft4);
			this.legfootleft.add(this.skinlegfootleft);		


			//connect parts to each other
			this.root.add(this.torso);
			//adding head to the torso
			this.torso.add(this.head);
			//adding upperrightjoin to torso
			this.torso.add(this.skinarmright1);		
			this.skinarmright1.add(this.skinarmright2);
			this.skinarmright2.add(this.skinarmright3);
			this.skinarmright3.add(this.skinarmright4);

			this.torso.add(this.skinarmleft1);
			this.skinarmleft1.add(this.skinarmleft2);
			this.skinarmleft2.add(this.skinarmleft3);
			this.skinarmleft3.add(this.skinarmleft4);

			this.torso.add(this.skinlegright1);
			this.skinlegright1.add(this.skinlegright2);
			this.skinlegright2.add(this.skinlegright3);
			this.skinlegright3.add(this.skinlegright4);
			this.skinlegright4.add(this.skinlegfootright);

			this.torso.add(this.skinlegleft1);
			this.skinlegleft1.add(this.skinlegleft2);
			this.skinlegleft2.add(this.skinlegleft3);
			this.skinlegleft3.add(this.skinlegleft4);
			this.skinlegleft4.add(this.skinlegfootleft);

			this.getMesh = function() {
				return this.root;
			}
		};

		return Robot;
		//console.log(this.torso);
	}));