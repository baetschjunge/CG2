/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 * changes by Benjamin Bleckmann, Josef Strunk
 * Module: scene
 *
 * A Scene is a depth-sorted collection of things to be drawn, 
 * plus a background fill style.
 *
 */



/* requireJS module definition */
define(["three", "util", "shaders", "BufferGeometry","BufferGeometryPoints", "random", "band","parametric"],
    (function(THREE, util, shaders, BufferGeometry, BufferGeometryPoints, Random, Band,Parametric) {

        "use strict";

        /*
         * Scene constructor
         */
        var Scene = function(renderer, width, height) {

            // the scope of the object instance
            var scope = this;

            scope.renderer = renderer;
            scope.t = 0.0;

            scope.camera = new THREE.PerspectiveCamera( 66, width / height, 0.1, 2000 );
            scope.camera.position.z = 1000;
            scope.scene = new THREE.Scene();

            // Add a listener for 'keydown' events. By this listener, all key events will be
            // passed to the function 'onDocumentKeyDown'. There's another event type 'keypress'.
            document.addEventListener("keydown", onDocumentKeyDown, false);


            function onDocumentKeyDown(event){
                // Get the key code of the pressed key
                var keyCode = event.which;

                if(keyCode == 38){
                    console.log("cursor up");
                    scope.currentMesh.rotation.x += 0.05;
                    // Cursor down
                } else if(keyCode == 40){
                    console.log("cursor down");
                    scope.currentMesh.rotation.x += -0.05;
                    // Cursor left
                } else if(keyCode == 37){
                    console.log("cursor left");
                    scope.currentMesh.rotation.y += 0.05;
                    // Cursor right
                } else if(keyCode == 39){
                    console.log("cursor right");
                    scope.currentMesh.rotation.y += -0.05;
                    // key "a"
                } else if(keyCode == 49) {
					console.log("key 1");
	                var nodeHead = scope.scene.getObjectByName("jointMidRightFront",true);
						console.log("test");
	                	nodeHead.rotation.z += 0.05;
                } else if(keyCode == 50) {
					console.log("key 2");
	                var nodeHead = scope.scene.getObjectByName("jointMidRightCenter",true);
	                if (nodeHead) 
	                	nodeHead.rotation.z +=0.05;
                } else if(keyCode == 51) {
					console.log("key 3");
	                var nodeHead = scope.scene.getObjectByName("jointMidRightBack",true);
	                if (nodeHead) 
	                	nodeHead.rotation.z +=0.05;
                } else if(keyCode == 52) {
					console.log("key 4");
	                var nodeHead = scope.scene.getObjectByName("jointMidLeftFront",true);
	                if (nodeHead) 
	                	nodeHead.rotation.z +=0.05;
                } else if(keyCode == 53) {
					console.log("key 5");
	                var nodeHead = scope.scene.getObjectByName("jointMidLeftCenter",true);
	                if (nodeHead) 
	                	nodeHead.rotation.z +=0.05;
                } else if(keyCode == 54) {
					console.log("key 6");
	                var nodeHead = scope.scene.getObjectByName("jointMidLeftBack",true);
	                if (nodeHead) 
	                	nodeHead.rotation.z +=0.05;
                } else if(keyCode == 55) {
					console.log("key 7");
	                var nodeHead = scope.scene.getObjectByName("clawsJointMidRight",true);
	                if (nodeHead) 
	                	nodeHead.rotation.z +=0.05;
                } else if(keyCode == 56) {
					console.log("key 8");
	                var nodeHead = scope.scene.getObjectByName("clawsJointMidLeft",true);
	                if (nodeHead) 
	                	nodeHead.rotation.z +=0.05;
                } else if(keyCode == 81) {
					console.log("key Q");
	                var nodeHead = scope.scene.getObjectByName("tailJoint",true);
	                if (nodeHead) 
	                	nodeHead.rotation.z +=0.05;
                } else if(keyCode == 87) {
					console.log("key W");
	                var nodeHead = scope.scene.getObjectByName("tailMidJoint",true);
	                if (nodeHead) 
	                	nodeHead.rotation.z +=0.05;
                } else if(keyCode == 69) {
					console.log("key E");
	                var nodeHead = scope.scene.getObjectByName("tailMidJoint2",true);
	                if (nodeHead) 
	                	nodeHead.rotation.z +=0.05;
                } else if(keyCode == 82) {
					console.log("key R");
	                var nodeHead = scope.scene.getObjectByName("tailMidJoint3",true);
	                if (nodeHead) 
	                	nodeHead.rotation.z +=0.05;
                } else if(keyCode == 84) {
					console.log("key T");
	                var nodeHead = scope.scene.getObjectByName("tailMidJoint4",true);
	                if (nodeHead) 
	                	nodeHead.rotation.z +=0.05;
                } else if(keyCode == 90) {
					console.log("Z");
	                var nodeHead = scope.scene.getObjectByName("clawJointMidRight",true);
	                if (nodeHead) 
	                	nodeHead.rotation.x +=0.05;
                } else if(keyCode == 85) {
					console.log("key U");
	                var nodeHead = scope.scene.getObjectByName("clawJointMidLeft",true);
	                if (nodeHead) 
	                	nodeHead.rotation.x +=0.05;
						console.log(nodeHead.rotation.x);
                } 
				
            };
			//q81 w87 e69 r82 t84

            this.addBufferGeometry = function(bufferGeometry){

                scope.currentMesh = bufferGeometry.getMesh();
                scope.scene.add( scope.currentMesh );

            };
			
			this.addBufferGeometryPoints = function(bufferGeometryPoints) {

                scope.currentMesh = bufferGeometryPoints.getMesh();
                scope.scene.add( scope.currentMesh );

            };
			
			this.addMesh = function(mesh){
				scope.currentMesh = mesh;
				scope.scene.add(scope.currentMesh);
			};

            /*
             * drawing the scene
             */
            this.draw = function() {

                requestAnimFrame( scope.draw );

                scope.renderer.render(scope.scene, scope.camera);

            };
			
			this.getScope = function() {
                return this;
            };
        };
		
		


        // this module only exports the constructor for Scene objects
        return Scene;

    })); // define

    
