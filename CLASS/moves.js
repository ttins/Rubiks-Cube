"use strict";

var startX,startY,endX,endY;

function trackballView( x,  y ) {
    var d, a;
    var v = [];

    v[0] = x;
    v[1] = y;

    d = v[0]*v[0] + v[1]*v[1];
    if (d < 1.0)
      v[2] = Math.sqrt(1.0 - d);
    else {
      v[2] = 0.0;
      a = 1.0 /  Math.sqrt(d);
      v[0] *= a;
      v[1] *= a;
    }
    return v;
}

//check for slice moves
//Some slice groups get overwritten
//found after implementation
//will keep in for possible use later
//and have to recalculate in another function
function getSliceRange(x,y)
{
    //move directions
    var inRange = false;
    var slice;
    var results = {};

    //=========[xslices]====================================
    //  VERTICAL GROUPS
    //xslice1 .055 < x < .211
    //        -.5  < y < .230
    if((x < .211) && (x > .055) && (y < .23) && (y > -.5)){
       inRange = true;
       slice = "x_slice1"; 
    }    
    //xslice2 .238 < x < .386
    //      -.461  < y < .285
    else if((x < .386) && (x > .238) && (y < .285) && (y > -.461)){
       inRange = true;
       slice = "x_slice2";   
    } 
    //xslice3 .41 < x < .57
    //      -.417 < y < .336
    else if((x < .57) && (x > .41) && (y < .336) && (y > -.417)){
       inRange = true;
       slice = "x_slice3";  
    }
    //  HORIZONTAL GROUPS
    //xslice1 -.484 < x < .164
    //        .227  < y < .371
    else if((x < .164) && (x > -.484) && (y < .371) && (y > .227)){
       inRange = true;
       slice = "x_slice1";  
    }  
    //xslice2 -.305 < x < .352
    //        .273  < y < .418
    else if((x < .352) && (x > -.305) && (y < .418) && (y > .273)){
       inRange = true;
       slice = "x_slice2";  
    } 
    //xslice3 -.121 < x < .531
    //        .32  < y < .465
    else if((x < .531) && (x > -.121) && (y < .465) && (y > .32)){
       inRange = true;
       slice = "x_slice3";  
    } 
    //=========[zslices]====================================
    //  VERTICAL GROUPS
    //zslice1 -.129 < x < .035  
    //        -.523 < y < .242
    else if((x < .035) && (x > -.129) && (y < .242) && (y > -.523)){
       inRange = true;
       slice = "z_slice1";  
    }  
    //zslice2 -.32  < x < -.152  
    //        -.484 < y < .281
    else if((x < -.152) && (x > -.32) && (y < .281) && (y > -.484)){
       inRange = true;
       slice = "z_slice2"; 
    } 
    //zslice3 -.508 < x < -.34   
    //        -.438 < y < .32
    else if((x < -.34) && (x > -.508) && (y < .32) && (y > -.438)){
       inRange = true;
       slice = "z_slice3"; 
    } 
    //  HORIZONTAL GROUPS
    //zslice1 -.106 < x < .531  
    //         .227 < y < .383
    else if((x < .531) && (x > -.106) && (y < .383) && (y > .227)){
       inRange = true;
       slice = "z_slice1"; 
    } 
    //zslice2 -.309 < x < .367  
    //         .273 < y < .422
    else if((x < .367) && (x > -.309) && (y < .422) && (y > .273)){
       inRange = true;
       slice = "z_slice2"; 
    } 
    //zslice3 -.484 < x < .145  
    //         .305 < y < .465
    else if((x < .145) && (x > -.484) && (y < .465) && (y > .305)){
       inRange = true;
       slice = "z_slice3"; 
    } 
    //=========[yslices]====================================
    //  RIGHT GROUPS
    //yslice1  .046 < x < .57  
    //         -.027 < y < .355
    else if((x < .57) && (x > .046) && (y < .355) && (y > -.027)){
       inRange = true;
       slice = "y_slice1"; 
    } 
    //yslice2  .051 < x < .574  
    //        -.277 < y < .098
    else if((x < .574) && (x > .051) && (y < .098) && (y > -.277)){
       inRange = true;
       slice = "y_slice2"; 
    }
    //yslice3  .051 < x < .578  
    //         -.538 < y < -.152
    else if((x < .578) && (x > .051) && (y < -.152) && (y > -.538)){
       inRange = true;
       slice = "y_slice3"; 
    }    
    //  LEFT GROUPS
    //yslice1  -.576 < x < .043  
    //         -.027 < y < .332
    else if((x < .043) && (x > -.576) && (y < .332) && (y > -.027)){
       inRange = true;
       slice = "y_slice1"; 
    }  
    //yslice2  -.512 < x < .051  
    //         -.28 < y < .078
    else if((x < .051) && (x > -.512) && (y < .078) && (y > -.28)){
       inRange = true;
       slice = "y_slice2"; 
    } 
    //yslice3  -.512 < x < .051  
    //         -.531 < y < -.179
    else if((x < .051) && (x > -.512) && (y < -.179) && (y > -.531)){
       inRange = true;
       slice = "y_slice3"; 
    } 
               
    results.inRange = inRange;
    results.slice = slice;

    return results;
}

function sliceMovementStart(x,y)
{
    startX = x;
    startY = y;
}

//======================================================
//  SLICE MOVE DIRECTIONS
//  Slice based on cube presentation on screen currently
//
//  1 forward on respective axis
//  -1 backward on respective axis
//  0: undefined do nothing
//======================================================
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
function sliceMovementStop(x,y)
{
    endX = x;
    endY = y;
    var startSlice = getSliceRange(startX,startY).slice;
    var endSlice = getSliceRange(endX,endY).slice;
    var movDir;
    var degreeAdd;
    var sliceString;
    var sliceArr;
    var results = {};
/*
    window.alert("Start Slice " + startSlice);
    window.alert("End Slice " + endSlice);

    window.alert("start X " + startX);
    window.alert("start Y " + startY);
    window.alert("end X " + endX);    
    window.alert("end Y " + endY);
*/       
    if(startSlice === endSlice){
        if(endY > startY){//moved up
            movDir = -1;//up towards upper left corner
            degreeAdd = -3;
        }
        else if((endX < startX) && (endY > 0)){//top of cube move
            movDir = -1;//up towards upper left corner
            degreeAdd = -3;
        }
        else if((endX > startX) && (endY > 0)){//top of cube move
            movDir = 1;//down towards bottom right corner
            degreeAdd = 3;
        }
        else if(endY < startY){//moved down
            movDir = 1;//down towards bottom right corner
            degreeAdd = 3;
        }
        sliceString = endSlice;   
    }
    //slices compositions
    else{
        sliceString = getCrossSlice(startSlice,endSlice);
        //window.alert("In here " + sliceString);
        if((sliceString === "z_slice1") || (sliceString === "z_slice2") || (sliceString === "z_slice3")){
            if(startSlice === "x_slice1"){
                movDir = -1;//down towards bottom right corner
                degreeAdd = -3;                
            }
            else{
                movDir = 1;//down towards bottom right corner
                degreeAdd = 3;
            }
        }
        else if((sliceString === "y_slice1") || (sliceString === "y_slice2") || (sliceString === "y_slice3")){
            //window.alert("In here");
            if((startSlice === "x_slice1") || (startSlice === "z_slice3")){
                movDir = 1;//spin towards right
                degreeAdd = 3;                
            }
            else{
                movDir = -1;//spin towards left
                degreeAdd = -3;
            }        
        }
    }//end else slices compositions

    sliceArr = sliceArrayIndexs(sliceString);//in slices.js

    results.movDir = movDir;
    results.degreeAdd = degreeAdd;
    results.sliceString = sliceString;
    results.sliceArr = sliceArr;

    return results;
}

//function to check for slices that are
//compositions from other slices
//IE: z slices from top and y slices
function getCrossSlice(startSlice,endSlice)
{
    var sliceString;

    //trying to move z slices from the top towards the upper right corner
    //start from x_slice1 and land on x_slice2 or x_slice3, or start from
    //x_slice2 or x_slice3 and land on x_slice1
    if(((startSlice === "x_slice1") && ((endSlice === "x_slice2") || (endSlice === "x_slice3")))
        || (((startSlice === "x_slice2") || (startSlice === "x_slice3")) 
            && ((endSlice === "x_slice2") || (endSlice === "x_slice1")))){
        if((startX < .531) && (startX > -.106) && (startY < .383) && (startY > .227)
                 && (endX < .531) && (endX > -.106) && (endY < .383) && (endY > .227)){
            sliceString = "z_slice1";
            //window.alert("In here z1"); 
        }
        else if((startX < .367) && (startX > -.309) && (startY < .422) && (startY > .273)
                 && (endX < .367) && (endX > -.309) && (endY < .422) && (endY > .273)){
            sliceString = "z_slice2";
            //window.alert("In here z2"); 
        }
        else if((startX < .145) && (startX > -.484) && (startY < .465) && (startY > .305)
                 && (endX < .145) && (endX > -.484) && (endY < .465) && (endY > .305)){
            sliceString = "z_slice3";
            //window.alert("In here z3"); 
        }        
    }//end z slices
    //y slices right side
    if(((startSlice === "x_slice1") && ((endSlice === "x_slice2") || (endSlice === "x_slice3")))
        || (((startSlice === "x_slice2") || (startSlice === "x_slice3")) && 
            ((endSlice === "x_slice2") || (endSlice === "x_slice1")))
            ){
        if((startX < .563) && (startX > .059) && (startY < .344) && (startY > -.012)
          && (endX < .563) && (endX > .059) && (endY < .344) && (endY > -.012)){
            sliceString = "y_slice1";//right side 
            //window.alert("In here y1 right");
        } 
        else if((startX < .574) && (startX > .051) && (startY < .098) && (startY > -.277)
          && (endX < .574) && (endX > .051) && (endY < .098) && (endY > -.277)){
            sliceString = "y_slice2";//right side 
            //window.alert("In here y2 right");
        } 
        else if((startX < .578) && (startX > .051) && (startY < -.152) && (startY > -.538)
          && (endX < .578) && (endX > .051) && (endY < -.152) && (endY > -.538)){
            sliceString = "y_slice3";//right side 
            //window.alert("In here y3 right");
        }     
    }//end y right slices
    //y slices left side
    if(((startSlice === "z_slice1") && ((endSlice === "z_slice2") || (endSlice === "z_slice3")))
        || (((startSlice === "z_slice2") || (startSlice === "z_slice3")) && 
            ((endSlice === "z_slice2") || (endSlice === "z_slice1")))
            ){
        if((startX < .043) && (startX > -.576) && (startY < .332) && (startY > -.027)
          && (endX < .043) && (endX > -.576) && (endY < .332) && (endY > -.027)){
            sliceString = "y_slice1";//right side 
            //window.alert("In here y1 left");
        } 
        else if((startX < .051) && (startX > -.512) && (startY < .078) && (startY > -.28)
          && (endX < .051) && (endX > -.512) && (endY < .078) && (endY > -.28)){
            sliceString = "y_slice2";//right side 
            //window.alert("In here y2 left");
        } 
        else if((startX < .051) && (startX > -.512) && (startY < -.179) && (startY > -.531)
          && (endX < .051) && (endX > -.512) && (endY < -.179) && (endY > -.531)){
            sliceString = "y_slice3";//right side 
            //window.alert("In here y3 left");
        }     
    }//end y left slices
    return sliceString;
}

