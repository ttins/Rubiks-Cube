"use strict";

var canvas;
var gl;

var points = [];
var colors = [];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 1;
var slice;
var theta = [ 0, 0, 0 ];

var thetaLoc;

var NumVertices  = 0;
var points = [];
var colors = [];
var cubeCollection = [];//holds all cube instances

//collection update variables
var movDir = 0;//used for movement direction; 1 forward, -1 back, 0 undefined
var sliceString;//used for slice movement
var wholeCubeMove = false;//used for cube/slice movement

//animation loop stuff
var animTime = 90;//max degree amount to animate movement
var acumTime = 0;//current animated times
var degreeAdd = 0;//add to rotate degree
var acumAdd = 3;//needs to match degree add amount, sign doesnt matter

//win animation vars
var winAdd1 = 0;//used in win animation for translate
var winAdd2 = 0;
var winSlice1;
var winSlice2;
var winSolved = false;

//trackball Stuff -> has to stay integrated for this project
var trackingMouse = false;
var notInRange = true;//if mouse clicks don't start/end in a slice
var lastPos = [0, 0];//x,y of mousedown
var dLimit = 0.05;//limit of change in x,y values

//lock to keep mouse events from firing when animation is happening
//mainly to keep slice ranges in proper window x,y values so cube stays
//in proper ailignment on screen
var mutexLock = false;

//debug mode true on false off
var debugMode = true;

//containers for randomizer and solver
var randomMoves = [];
var solveMoves = [];//global shared in ai.js
var randLock = false;
var randType;

//form of trackball view change
//view functions - also uses trackballView function from the 
//moves.js script file
function mouseMotion( x,  y)
{
    var dx, dy, dz;

    var curPos = trackballView(x, y);
    if(trackingMouse) {
      dx = curPos[0] - lastPos[0];
      dy = curPos[1] - lastPos[1];

      //if there was a change greater than limit and dx > dy or dy > dx
      if ((Math.abs(dx) > dLimit) && (Math.abs(dx) > Math.abs(dy))) {
        if(curPos[0] > lastPos[0]){//spin right
	        axis = yAxis;
            degreeAdd = 3;
            movDir = 1; 
        }  
        else{//spin left
	        axis = yAxis;
            degreeAdd = -3;
            movDir = -1;           
        }         
      }
      else if ((Math.abs(dy) > dLimit) && (lastPos[0] > 0)) {//right hand side
        if(curPos[1] > lastPos[1]){//spin down
	        axis = xAxis;
            degreeAdd = -3;
            movDir = -1;
        }  
        else{//spin up
	        axis = xAxis;
            degreeAdd = 3;
            movDir = 1;           
        }         
      }
      else if ((Math.abs(dy) > dLimit) && (lastPos[0] < 0)) {//left hand side
        if(curPos[1] > lastPos[1]){//spin down
	        axis = zAxis;
            degreeAdd = -3;
            movDir = -1;
        }  
        else{//spin up
	        axis = zAxis;
            degreeAdd = 3;
            movDir = 1;           
        }         
      }
      else{//undefined movement
            movDir = 0;
      }
    }
}

function startMotion( x,  y)//mouse down/click hold
{
    trackingMouse = true;
    lastPos = trackballView(x, y);//function in moves.js
}

function stopMotion()//mouse up/click let go
{
    trackingMouse = false;
    if(movDir !==0){//don't anim or update any undefined directions
        startAnim(trackMove);  
    }
}

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    buildCubeCollection(cubeCollection);//uses globals, points, colors, numVertices

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.75, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    thetaLoc = gl.getUniformLocation(program, "theta");

//===========================
//  BUTTON EVENTS
//===========================
    document.getElementById( "randomizer" ).onclick = function () {
    if(mutexLock === false){ 
        var steps = document.getElementById( "steps" ).value;
        randType = "rand";
        randomMoves = randomize(steps);//in ai.js
        wholeCubeMove = false;//just slice movement
        randLock = true;
        randAnim(randType);
    }
    };
    document.getElementById( "solve" ).onclick = function () {
    if(mutexLock === false){ 
        var steps = document.getElementById( "steps" ).value;
        randType = "solve";
        //randomMoves = randomize(steps);//in ai.js
        //solveMoves = getSolveMoves();
        wholeCubeMove = false;//just slice movement
        randLock = true;
        randAnim(randType);
    }
    };    
    document.getElementById( "reset" ).onclick = function () {
    if((mutexLock === false) || (winSolved === true)){
        winSolved = false;
        document.getElementById( "winPoofDiv" ).style.display = 'none';
        document.getElementById( "lpoof" ).style.left = 45;
        document.getElementById( "rpoof" ).style.left = 360;
        document.getElementById( "winTextDiv" ).style.display = 'none';
        document.getElementById( "winTextDiv" ).style.left = 5; 
        NumVertices  = 0;
        points = [];
        colors = [];
        solveMoves = [];
        buildCubeCollection(cubeCollection);
        setDefualtAxis(20,45,15);
        render();        
    }
    };
    document.getElementById( "Instructions" ).onclick = function () {
    if(mutexLock === false){ 
        if(document.getElementById( "outerDiv" ).style.display === 'none'){
            document.getElementById( "outerDiv" ).style.display = 'block';    
        }
        else{
            document.getElementById( "outerDiv" ).style.display = 'none'; 
        }    
    }
    };   
//================================
//  TRACKBALL & MOVE MOUSE EVENTS
//================================
    //gets current window x,y values  
    canvas.addEventListener("mousedown", function(event){
    if(mutexLock === false){ 
      var x = 2*event.clientX/canvas.width-1;
      var y = 2*(canvas.height-event.clientY)/canvas.height-1;
      if(debugMode){//are we in debug mode?
        debugXYPrint(x,y);
      }
      //check for range of x,y vals to see if initiating a slice move
      if(getSliceRange(x,y).inRange){
          sliceMovementStart(x,y);
          notInRange = false;
          movDir = 0;//set to 0 so we don't fire animation unless mouseMotion says ok
      }
      else{
          notInRange = true;
          startMotion(x, y);              
      } 
    }
    });

    //main event to fire animation and update functions
    canvas.addEventListener("mouseup", function(event){        
    if(mutexLock === false){ 
      var x = 2*event.clientX/canvas.width-1;
      var y = 2*(canvas.height-event.clientY)/canvas.height-1;
      if(debugMode){//are we in debug mode?
        debugXYPrint(x,y);
      }
      //makes sure if we start out of range and end in range we just move cube
      //as normal or start in range and end out of range we only move cube as well
      if((getSliceRange(x,y).inRange) && (notInRange === false)){
            movDir = sliceMovementStop(x,y).movDir;
            degreeAdd = sliceMovementStop(x,y).degreeAdd;
            slice = sliceMovementStop(x,y).sliceArr;//holds indices of the cubeCollection for the slice only
            sliceString = sliceMovementStop(x,y).sliceString;//in moves.js
            axis = getAxis(sliceString);
            if(sliceString){//not undefined
                solve(axis,slice,sliceString,movDir);//add reverse of slice move to solve queue
                startAnim(sliceMove);
            }
            wholeCubeMove = false;//keeps from rendering whole cube on single slice move        
      }
      else{
        wholeCubeMove = true;
        solve(axis,0,"whole",movDir);//add reverse of cube move to solve queue
        stopMotion();  
      } 
    }
    });

    //gets change in window x,y values calls mouseMotion where we set 
    //variables for whole cube animation
    canvas.addEventListener("mousemove", function(event){
    if(mutexLock === false){ 
      var x = 2*event.clientX/canvas.width-1;
      var y = 2*(canvas.height-event.clientY)/canvas.height-1;
      mouseMotion(x, y);
    }
    } );

    //sets defualt position of entire cubeCollection which is handled
    //in the shader
    setDefualtAxis(20,45,15);
    render();
}

function setDefualtAxis(x,y,z)
{
    theta[xAxis] = x;
    theta[yAxis] = y;
    theta[zAxis] = z;  
}

function render()
{
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );//added here for update
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniform3fv(thetaLoc, theta);
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

}

function trackMove()//entire cube move
{
    for(var i =0;i<27;i++){
        cubeCollection[i].rotate(degreeAdd,axis);
    }
    render();
    acumTime += acumAdd;
    startAnim(trackMove);
}

function sliceMove()//single slice move
{
    for(var i =0;i<9;i++){
        cubeCollection[slice[i]].rotate(degreeAdd,axis); 
    }
    render();
    acumTime += acumAdd;
    startAnim(sliceMove);
}

//main animation loop, will continue to render up to animTime
function startAnim(move)
{
    mutexLock = true;
    if(acumTime < animTime){
        requestAnimFrame(move);        
    }
    if(acumTime >= animTime){
        mutexLock = false;//unlock/allow for movement/update again
        acumTime = 0;//reset acumTime for animations cycles
        animTime = 90;
        //update cubeCollection slices, axis and direction updated in mouse move function
        if(wholeCubeMove){
           cubeCollection = updateSlicesMove(cubeCollection,movDir,axis);//in slices.js
           if(debugMode){
                debugMoveVars(movDir,sliceString,axis);
                debugSlicePrint(cubeCollection);
                printCubeCollectionOrder(cubeCollection);     
           }  
        } 
        //update just the slice in cubeCollection index's
        else if(wholeCubeMove === false){
           cubeCollection = assignSlices(cubeCollection,sliceString,movDir);//in slices.js
           if(debugMode){
                debugMoveVars(movDir,sliceString,axis);
                debugSlicePrint(cubeCollection);
                printCubeCollectionOrder(cubeCollection);    
           }
           if(winSolved === false){
               checkForWin();
           }
        }
        //randomize and solve autos stuff
        if(randLock){
            randAnim(randType);    
        }
        //win animation
        if(winSolved){
            cubeSolvedAnim();    
        }     
    }
}

function randAnim(randType)
{
    var newMove;
    var length = 0;
    if(randType === "rand")//randomizer
    {
        length = randomMoves.length;
        if(length > 0){
            newMove = randomMoves.shift();
            acumAdd = 3;
            degreeAdd = 3 * newMove.direction;
            movDir = newMove.direction;
            slice = newMove.slice;
            axis = newMove.axis;
            sliceString = newMove.sliceString;    
        }
        else{
            randLock = false;
        }        
    }
    else if(randType === "solve")
    {
        length = solveMoves.length;
        if(length > 0){
            newMove = solveMoves.pop();
            acumAdd = 3;
            degreeAdd = 3 * newMove.direction;
            movDir = newMove.direction;
            slice = newMove.slice;
            axis = newMove.axis;
            sliceString = newMove.sliceString;                
        }
        else{
            randLock = false;
        }  
    }
    if((length > 0) && (randLock)){
        if(sliceString === "whole"){
            wholeCubeMove = true;
            startAnim(trackMove);    
        }
        else{
            wholeCubeMove = false;
            startAnim(sliceMove);    
        }    
    }   
}

function checkForWin()
{
    winSolved = false;
    for(var i=0;i<27;i++)
    {
        if(cubeCollection[i].cubeNum === i){
            winSolved = true;
        }
        else{
            winSolved = false;
            break;
        }
    }
}
//WIN ANIMATION STUFF=================
function winMove()
{
    //based on acumTime xslices to 180
    if(acumTime < 45){
        winSlice1 = sliceArrayIndexs("x_slice1");
        for(var i =0;i<9;i++){
            cubeCollection[winSlice1[i]].translate(0.0,winAdd1,0.0); 
        }      
    }
    else if((acumTime > 45) && (acumTime <= 90)){
        winSlice1 = sliceArrayIndexs("x_slice1");
        winSlice2 = sliceArrayIndexs("x_slice2");
        for(var i =0;i<9;i++){
            cubeCollection[winSlice1[i]].translate(0.0,winAdd2,0.0);
            cubeCollection[winSlice2[i]].translate(0.0,winAdd1,0.0); 
        }      
    }
    else if((acumTime > 90) && (acumTime <= 135)){
        winSlice1 = sliceArrayIndexs("x_slice2");
        winSlice2 = sliceArrayIndexs("x_slice3");
        for(var i =0;i<9;i++){
            cubeCollection[winSlice1[i]].translate(0.0,winAdd2,0.0);
            cubeCollection[winSlice2[i]].translate(0.0,winAdd1,0.0); 
        }      
    }
    else if((acumTime > 135) && (acumTime <= 180)){
        winSlice1 = sliceArrayIndexs("x_slice3");
        for(var i =0;i<9;i++){
            cubeCollection[winSlice1[i]].translate(0.0,winAdd2,0.0); 
        }      
    }
    //based on acumTime zslices 180 to 360 
    else if((acumTime > 180) && (acumTime <= 225)){
        winSlice1 = sliceArrayIndexs("z_slice1");
        for(var i =0;i<9;i++){
            cubeCollection[winSlice1[i]].translate(0.0,winAdd1,0.0); 
        }      
    }
    else if((acumTime > 225) && (acumTime <= 270)){
        winSlice1 = sliceArrayIndexs("z_slice1");
        winSlice2 = sliceArrayIndexs("z_slice2");
        for(var i =0;i<9;i++){
            cubeCollection[winSlice1[i]].translate(0.0,winAdd2,0.0);
            cubeCollection[winSlice2[i]].translate(0.0,winAdd1,0.0); 
        }      
    }
    else if((acumTime > 270) && (acumTime <= 315)){
        winSlice1 = sliceArrayIndexs("z_slice2");
        winSlice2 = sliceArrayIndexs("z_slice3");
        for(var i =0;i<9;i++){
            cubeCollection[winSlice1[i]].translate(0.0,winAdd2,0.0);
            cubeCollection[winSlice2[i]].translate(0.0,winAdd1,0.0); 
        }      
    }
    else if((acumTime > 315) && (acumTime <= 360)){
        winSlice1 = sliceArrayIndexs("z_slice3");
        for(var i =0;i<9;i++){
            cubeCollection[winSlice1[i]].translate(0.0,winAdd2,0.0); 
        }      
    }
    //based on acumTime yslices 360 to 540 
    else if((acumTime > 360) && (acumTime <= 405)){
        winSlice1 = sliceArrayIndexs("y_slice1");
        for(var i =0;i<9;i++){
            cubeCollection[winSlice1[i]].translate(winAdd1,0.0,0.0); 
        }      
    }
    else if((acumTime > 405) && (acumTime <= 450)){
        winSlice1 = sliceArrayIndexs("y_slice1");
        winSlice2 = sliceArrayIndexs("y_slice2");
        for(var i =0;i<9;i++){
            cubeCollection[winSlice1[i]].translate(winAdd2,0.0,0.0);
            cubeCollection[winSlice2[i]].translate(winAdd1,0.0,0.0); 
        }      
    }
    else if((acumTime > 450) && (acumTime <= 495)){
        winSlice1 = sliceArrayIndexs("y_slice2");
        winSlice2 = sliceArrayIndexs("y_slice3");
        for(var i =0;i<9;i++){
            cubeCollection[winSlice1[i]].translate(winAdd2,0.0,0.0);
            cubeCollection[winSlice2[i]].translate(winAdd1,0.0,0.0); 
        }      
    }
    else if((acumTime > 495) && (acumTime <= 540)){
        winSlice1 = sliceArrayIndexs("y_slice3");
        for(var i =0;i<9;i++){
            cubeCollection[winSlice1[i]].translate(winAdd2,0.0,0.0); 
        }      
    }
    //jump rotate 
    else if((acumTime > 540) && (acumTime <= 645)){
        winAdd1 = .025;
        for(var i =0;i<27;i++){
            cubeCollection[i].translate(0.0,winAdd1,0.0);
            cubeCollection[i].rotate(27,yAxis); 
        }      
    }
    else if((acumTime > 645) && (acumTime <= 720)){
        winAdd1 = -.035;
        for(var i =0;i<27;i++){
            cubeCollection[i].translate(0.0,winAdd1,0.0);
            cubeCollection[i].rotate(18,yAxis); 
        }     
    }
    //div animations
    else if(acumTime === 723){
        document.getElementById( "winPoofDiv" ).style.display = 'block';
        poofMove();  
    } 

    if(acumTime === 0){
        document.getElementById( "winTextDiv" ).style.display = 'block';
        textMove();        
    }

               
    render();
    acumTime += acumAdd;
    startAnim(winMove);
}

function cubeSolvedAnim()
{
    document.getElementById( "winPoofDiv" ).style.display = 'none';
    document.getElementById( "lpoof" ).style.left = 165;
    document.getElementById( "rpoof" ).style.left = 265;
    document.getElementById( "winTextDiv" ).style.display = 'none';
    document.getElementById( "winTextDiv" ).style.left = 10;
    winAdd1 = .0075;//.0075
    winAdd2 = -.0075;//-.0075
    animTime = 781;
    startAnim(winMove);   
}

function poofMove()
{
    var elem1 = document.getElementById("lpoof");
    var elem2 = document.getElementById("rpoof"); 
    var lpos = 165;
    var rpos = 265;
    var id = setInterval(frame, 1);
    function frame() {
        if (acumTime === (animTime-1)) {
            clearInterval(id);
        } else {
            lpos -=1.5;
            rpos+=1.5; 
            elem1.style.left = lpos + 'px'; 
            elem2.style.left = rpos + 'px'; 
        }
    }
}

function textMove()
{
    var elem1 = document.getElementById("winTextDiv");
    var lpos = 10;
    var id = setInterval(frame, 10);
    function frame() {
        if (acumTime === (animTime-1)) {
            clearInterval(id);
        } else {
            lpos+=.75; 
            elem1.style.left = lpos + 'px';  
        }
    }
}
//===================================

//builds our rubiks cube by building cube instances and storing
//in the cubeCollection
function buildCubeCollection(cubeCollection)
{
    for(var i=0;i<27;i++)
    {
        setCubeNum(i);
        cubeCollection[i] = cubeMods();
        cubeCollection[i].scale(0.25,0.25,0.25);

        //translate cubes-----------------
        //x & y translate first
        if((i+1)%9 === 1)//top left
        {
            cubeCollection[i].translate(-0.26,0.26,0.0);
        }
        else if((i+1)%9 === 2)//top middle
        {
            cubeCollection[i].translate(0.0,0.26,0.0);
        }
        else if((i+1)%9 === 3)//top right
        {
            cubeCollection[i].translate(0.26,0.26,0.0);
        }
        else if((i+1)%9 === 4)//left
        {
            cubeCollection[i].translate(-0.26,0.0,0.0);
        }
        else if((i+1)%9 === 5)//middle
        {
            cubeCollection[i].translate(0.0,0.0,0.0);
        }
        else if((i+1)%9 === 6)//right
        {
            cubeCollection[i].translate(0.26,0.0,0.0);
        }
        else if((i+1)%9 === 7)//bottom left
        {
            cubeCollection[i].translate(-0.26,-0.26,0.0);
        }
        else if((i+1)%9 === 8)//bottom middle
        {
            cubeCollection[i].translate(0.0,-0.26,0.0);
        }
        else if((i+1)%9 === 0)//bottom right
        {
            cubeCollection[i].translate(0.26,-0.26,0.0);
        }
        //z translate
        if(i<9)
        {
            cubeCollection[i].translate(0.0,0.0,0.26);
        }
        else if(i > 17)
        {
            cubeCollection[i].translate(0.0,0.0,-0.26);
        }

        //acumulators
        points = points.concat(cubeCollection[i].points);
        colors = colors.concat(cubeCollection[i].colors);
        NumVertices += cubeCollection[i].numVertices;
    }    
}

//DEBUGGING FUNCTIONS enabled if debugMode true
//======================================================
//  SLICES INDEX'S
//  these are the indices of the main collection
//  corresponding to slices
//
//  x_slice1 = [0 3 6 9 12 15 18 21 24]
//  x_slice2 = [1 4 7 10 13 16 19 22 25]
//  x_slice3 = [2 5 8 11 14 17 20 23 26]
//  
//  y_slice1 = [0 1 2 9 10 11 18 19 20]
//  y_slice2 = [3 4 5 12 13 14 21 22 23]
//  y_slice3 = [6 7 8 15 16 17 24 25 26]
//
//  z_slice1 = [0 1 2 3 4 5 6 7 8]
//  z_slice2 = [9 10 11 12 13 14 15 16 17]
//  z_slice3 = [18 19 20 21 22 23 24 25 26]
//======================================================
function debugSlicePrint(collection)
{
    var dbx_slice1 = "";
    var dbx_slice2 = "";
    var dbx_slice3 = "";
    var dby_slice1 = "";
    var dby_slice2 = "";
    var dby_slice3 = "";
    var dbz_slice1 = "";
    var dbz_slice2 = "";
    var dbz_slice3 = "";

    for(var i = 0;i<27;i++)
    {
        if(//xslice1
            (i === 0) || (i === 3) || (i === 6) ||
            (i === 9) || (i === 12) || (i === 15) ||
            (i === 18) || (i === 21) || (i === 24)
          ){
                dbx_slice1 += " " + (String(collection[i].cubeNum));
          }
        if(//xslice2
            (i === 1) || (i === 4) || (i === 7) ||
            (i === 10) || (i === 13) || (i === 16) ||
            (i === 19) || (i === 22) || (i === 25)
          ){
                dbx_slice2 += " " + (String(collection[i].cubeNum));
          }
        if(//xslice3
            (i === 2) || (i === 5) || (i === 8) ||
            (i === 11) || (i === 14) || (i === 17) ||
            (i === 20) || (i === 23) || (i === 26)
          ){
                dbx_slice3 += " " + (String(collection[i].cubeNum));
          }
        if(//yslice1
            (i === 0) || (i === 1) || (i === 2) ||
            (i === 9) || (i === 10) || (i === 11) ||
            (i === 18) || (i === 19) || (i === 20)
          ){
                dby_slice1 += " " + (String(collection[i].cubeNum));
          }
        if(//yslice2
            (i === 3) || (i === 4) || (i === 5) ||
            (i === 12) || (i === 13) || (i === 14) ||
            (i === 21) || (i === 22) || (i === 23)
          ){
                dby_slice2 += " " + (String(collection[i].cubeNum));
          }
        if(//yslice3
            (i === 6) || (i === 7) || (i === 8) ||
            (i === 15) || (i === 16) || (i === 17) ||
            (i === 24) || (i === 25) || (i === 26)
          ){
                dby_slice3 += " " + (String(collection[i].cubeNum));
          } 
        if(//zslice1
            (i === 0) || (i === 1) || (i === 2) ||
            (i === 3) || (i === 4) || (i === 5) ||
            (i === 6) || (i === 7) || (i === 8)
          ){
                dbz_slice1 += " " + (String(collection[i].cubeNum));
          }  
        if(//zslice2
            (i === 9) || (i === 10) || (i === 11) ||
            (i === 12) || (i === 13) || (i === 14) ||
            (i === 15) || (i === 16) || (i === 17)
          ){
                dbz_slice2 += " " + (String(collection[i].cubeNum));
          } 
        if(//zslice3
            (i === 18) || (i === 19) || (i === 20) ||
            (i === 21) || (i === 22) || (i === 23) ||
            (i === 24) || (i === 25) || (i === 26)
          ){
                dbz_slice3 += " " + (String(collection[i].cubeNum));
          }                            
    }//end for
    console.log("cubes in x slice 1");
    console.log(dbx_slice1); 
    console.log("cubes in x slice 2");
    console.log(dbx_slice2);
    console.log("cubes in x slice 3");
    console.log(dbx_slice3);   
    console.log("cubes in y slice 1");
    console.log(dby_slice1); 
    console.log("cubes in y slice 2");
    console.log(dby_slice2);
    console.log("cubes in y slice 3");
    console.log(dby_slice3); 
    console.log("cubes in z slice 1");
    console.log(dbz_slice1); 
    console.log("cubes in z slice 2");
    console.log(dbz_slice2);
    console.log("cubes in z slice 3");
    console.log(dbz_slice3);      
}

function debugXYPrint(x,y)
{
    console.log("x , y");
    console.log(x , y);  
}

function debugMoveVars(movDir,sliceString,axis)
{
    var axisString;
    if(axis === 0){
        axisString = "xAxis";
    }
    else if(axis === 1){
        axisString = "yAxis";
    }
    else{
        axisString = "zAxis";
    }
    var sliceDebugString = "";
    sliceDebugString += "direction: " + movDir;
    sliceDebugString += " sliceString: " + sliceString + " axis: " + axisString;
    console.log(sliceDebugString);    
}

function printCubeCollectionOrder(collection)
{
    var collectionString = "";
    for(var i=0;i<27;i++)
    {
        collectionString += " " + (String(collection[i].cubeNum));
    }
    console.log("Cube Collection 0-26");
    console.log(collectionString);
}