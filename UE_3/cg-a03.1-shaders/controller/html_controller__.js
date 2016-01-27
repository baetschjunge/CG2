/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: html_controller
 *
 * Defines callback functions for communicating with various 
 * HTML elements on the page, e.g. buttons and parameter fields.
 *
 */


/* requireJS module definition */
define(["jquery", "BufferGeometry", "random", "band", "parametric", "robot", "planet", "explosion"],
    (function($,BufferGeometry, Random, Band, Parametric, Robot, Planet, Explosion ) {
        "use strict";

        /*
         * define callback functions to react to changes in the HTML page
         * and provide them with a closure defining context and scene
         */
        var HtmlController = function(scene) {


            //additional material checkbox bookmark
            $("#solided").hide();

            $("#ellipsoid").hide();
            $("#random").show();
            $("#band").hide();
            $("#parametric").hide();
            $("#parainputs").hide();
            $("#anim").hide();
            $("#animaterobot").hide();
            $("#wired").hide();
            $("#planetpara").hide();
            $("#explosionpara").hide();


            $("#btnRandom").click( (function() {
                $("#random").show();
                $("#band").hide();
                $("#ellipsoid").hide();
                $("#parametric").hide();
                $("#parainputs").hide();
            }));

            $("#btnBand").click( (function() {
                $("#random").hide();
                $("#ellipsoid").hide();
                $("#band").show();
                $("#parametric").hide();
                $("#parainputs").hide();
            }));

            $("#btnEllipsoid").click( (function() {
                $("#random").hide();
                $("#band").hide();
                $("#ellipsoid").show();
                $("#parametric").hide();
                $("#parainputs").show();
            
                //Configuration for Ellipsoid
                $("#xKoord").val("((6 * Math.cos(u)) * Math.sin(v)) * 80");
                $("#yKoord").val("((6 * Math.sin(u)) * Math.sin(v)) * 80");
                $("#zKoord").val("6 * Math.cos(v) * 80");
                $("#uMin").val(0);
                $("#uMax").val(2*Math.PI);
                $("#vMin").val(0);
                $("#vMax").val(Math.PI);
            }));


            $("#btnParametric").click( (function() {
                $("#random").hide();
                $("#band").hide();
                $("#ellipsoid").hide();
                $("#parametric").show();
                $("#parainputs").show();
                $("#xKoord").val("u*150");
                $("#yKoord").val("v*150");
                $("#zKoord").val("((1/3)*Math.pow(u,3) + (1/2)*Math.pow(v,2))*150");
                $("#uMin").val("-2");
                $("#uMax").val("2");
                $("#vMin").val("-2");
                $("#vMax").val("2");
            }));

            $("#btnNewRandom").click( (function() {

                var numPoints = parseInt($("#numItems").attr("value"));
                var random = new Random(numPoints);
                var bufferGeometryRandom = new BufferGeometry();
                bufferGeometryRandom.addAttribute("position", random.getPositions());
                bufferGeometryRandom.addAttribute("color", random.getColors());

                scene.addBufferGeometry(bufferGeometryRandom);
            }));


            $("#btnNewBand").click( (function() {

                var config = {
                    segments : parseInt($("#numSegments").attr("value")),
                    radius : parseInt($("#radius").attr("value")),
                    height : parseInt($("#height").attr("value"))
                };

                var band = new Band(config);
                var bufferGeometryBand = new BufferGeometry();
                bufferGeometryBand.addAttribute("position", band.getPositions());
                bufferGeometryBand.addAttribute("color", band.getColors());

                scene.addBufferGeometry(bufferGeometryBand);
            }));

            //new Ellipsoid button
            $("#btnNewEllipsoid").click( (function() {

                var config = {
                    segments : parseInt($("#numSegmentsPara").attr("value")),
                    umin : parseInt($("#uMin").attr("value")),
                    //deleted the parseInt, so the values are fully completed
                    umax : parseInt($("#uMax").attr("value")),
                    vmin : parseInt($("#vMin").attr("value")),
                    //deleted the parseInt, so the values are fully completed
                    vmax : parseInt($("#vMax").attr("value"))
                }    
                var posFunc = function(u,v) {
                    var x = eval("((6 * Math.cos(u)) * Math.sin(v)) * 80");
                    var y = eval("((6 * Math.sin(u)) * Math.sin(v)) * 80");
                    var z = eval(" 6 * Math.cos(v) * 80");
                    return [x,y,z];
                };
                var parametric = new Parametric(posFunc, config);
                var bufferGeometryParametric = new BufferGeometry();

                bufferGeometryParametric.addAttribute("position", parametric.getPositions());
                bufferGeometryParametric.addAttribute("color", parametric.getColors());
                //set the index
                bufferGeometryParametric.setIndex(parametric.getArrayIndices());
                //add geometry to the scene
                scene.addBufferGeometry(bufferGeometryParametric);
            }));


            $("#btnNewParametric").click( (function() {
                console.log("test");
                var config = {
                    segments : parseInt($("#numSegmentsPara").attr("value")),
                    umin : parseInt($("#uMin").attr("value")),
                    umax : parseInt($("#uMax").attr("value")),
                    vmin : parseInt($("#vMin").attr("value")),
                    vmax : parseInt($("#vMax").attr("value"))
                };
                
                var posFunc = function(u,v) {
                    var x = eval($("#xKoord").attr("value"));
                    var y = eval($("#yKoord").attr("value"));
                    var z = eval($("#zKoord").attr("value"));
                    return [x,y,z];
                };

                var parametric = new Parametric(posFunc, config);
                var bufferGeometryParametric = new BufferGeometry();

                bufferGeometryParametric.addAttribute("position", parametric.getPositions());
                bufferGeometryParametric.addAttribute("color", parametric.getColors());

                //adding the new array to the geometry for showing up
                bufferGeometryParametric.setIndex(parametric.getArrayIndices());
                //add geometry to the scene
                scene.addBufferGeometry(bufferGeometryParametric);
            }));
            
            //new robot button
            $("#btnNewRobot").click((function(){
                var robot = new Robot();
                scene.addMesh(robot.getMesh());
            }));

            //checkboxes for animation and materials            
            //Animation Checkbox
            $("#animate").click( (function() {

                var checked = $("#animate").attr("checked");
                var scope = scene.getScope();
                //inner function for later call, if box is checked
                var render = function(){
                    if(document.getElementById("animate").checked==true)
                        requestAnimationFrame(render);
                        scope.currentMesh.rotation.y += 0.03;    
                };

                if(checked){
                    render();                    
                }
            }));
            
            //checkbox for wireframe
            $("#wire").click((function(){

                var checked = $("#wire").attr("checked");
                var scope = scene.getScope();

                if(checked){
                    scope.currentMesh.material.wireframe = true;               
                }
                else{
                    scope.currentMesh.material.wireframe = false;
                }

            }));

            
            //checkbox for solid material
            $("#solid").click((function(){
                
                var checked = $("#solid").attr("checked");
                var scope = scene.getScope();
                
                if(checked){
                    scope.currentMesh.material.transparent = true;
                }
                else{
                    scope.currentMesh.material.transparent = false;
                }            
            }));

            //Animation for the robot bookmark
            
            $("#animatehead").click( (function() {

                var checked = $("#animatehead").attr("checked");
                var scope = scene.getScope();      
                
                var render = function () {
                        
                    if(document.getElementById("animatehead").checked==true)
                    requestAnimationFrame( render ); 
                    scope.animatehead();
                    };  
                render();                   
            }));

            /*-------Aufgabe 3.1-------*/

            $("#btnPlanet").click((function() {
                $("#random").hide();
                $("#band").hide();
                $("#ellipsoid").hide();
                $("#parametric").hide();
                $("#parainputs").hide();
                $("#planetpara").show();
                $("#explosionpara").hide();
            }));

            $("#btnExplosion").click((function() {
                $("#random").hide();
                $("#band").hide();
                $("#ellipsoid").hide();
                $("#parametric").hide();
                $("#parainputs").hide();
                $("#planetpara").hide();
                $("#explosionpara").show();
            }));

            $("#btnNewPlanet").click((function() {

                var planet = new Planet();
                scene.addMesh(planet.getMesh());
                var color = new THREE.Color( 0xffffff );
                var aLight = new THREE.AmbientLight(color);
                scene.addLight(aLight);
                var dlight = new THREE.DirectionalLight(color, 0.5);
                dlight.name = "dLight";
                //Licht neu definieren, aus kugel rauszielen
                //Licht umdrehen
                dlight.position.set(0,1,0).normalize();
                scene.addLight(dlight);

            }));

            $("#animateworld").click( (function() {
                var checked = $("#animateworld").attr("checked");
                var scope = scene.getScope();
                //inner function for later call, if box is checked
                var render = function(){
                if(document.getElementById("animateworld").checked==true)
                    requestAnimationFrame(render);
                    scope.currentMesh.rotation.y += 0.03;
                    };

                    if(checked){
                        render();
                    }
            }));
            /*Test for setting the new material
            $("#daytexture").click((function(){
            var material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('textures/earth_month04.jpg') } );
            var checked = $("#animateworld").attr("checked");
            var scope = scene.getScope();
            var render = function(){
                if(document.getElementById("animateworld").checked==true)
                    requestAnimationFrame(render);
                    scope.material = material;
                };
            if(checked){
                render();
            }
            }));
            */
            /*
            daytexture
            nighttexture
            cloudtexture
            */
        };
    // return the constructor function
    return HtmlController;
})); // require



            
