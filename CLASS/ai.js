"use strict";
var solveMoves=[];//I guess globals are shared throughout JS script scope, good
                  //to know, already working on final stages before found this
                  //out through debugging.  Guess, loading all scripts to stack
                  //any vars with same name obviously get loaded to same space
                  //easy exploit, bad practice?

function randomize(steps)
{
    var rmove = {};
    //window.alert(steps);
    var randomMoves = [];
    var randNum,randDir;
    var axis,sliceString;
    var slice = [];

    for(var i=0;i<steps;i++)
    {
        randNum = Math.floor(Math.random() * 9) + 1;
        randDir = Math.floor(Math.random() * 2) + 1;
        if(randDir === 1){
            randDir = -1;
        }
        else{
            randDir = 1;
        }
        if(randNum===1){//xslice1
            sliceString = "x_slice1";
            slice = sliceArrayIndexs(sliceString);
            axis = getAxis(sliceString);
        }
        if(randNum===2){//xslice2
            sliceString = "x_slice2";
            slice = sliceArrayIndexs(sliceString);//in slices.js
            axis = getAxis(sliceString);//in slices.js
        } 
        if(randNum===3){//xslice3
            sliceString = "x_slice3";
            slice = sliceArrayIndexs(sliceString);//in slices.js
            axis = getAxis(sliceString);//in slices.js
        } 
        if(randNum===4){//yslice1
            sliceString = "y_slice1";
            slice = sliceArrayIndexs(sliceString);//in slices.js
            axis = getAxis(sliceString);//in slices.js
        }   
        if(randNum===5){//yslice2
            sliceString = "y_slice2";
            slice = sliceArrayIndexs(sliceString);//in slices.js
            axis = getAxis(sliceString);//in slices.js
        } 
        if(randNum===6){//yslice3
            sliceString = "y_slice3";
            slice = sliceArrayIndexs(sliceString);//in slices.js
            axis = getAxis(sliceString);//in slices.js
        }
        if(randNum===7){//zslice1
            sliceString = "z_slice1";
            slice = sliceArrayIndexs(sliceString);//in slices.js
            axis = getAxis(sliceString);//in slices.js
        }  
        if(randNum===8){//zslice2
            sliceString = "z_slice2";
            slice = sliceArrayIndexs(sliceString);//in slices.js
            axis = getAxis(sliceString);//in slices.js
        }
        if(randNum===9){//zslice3
            sliceString = "z_slice3";
            slice = sliceArrayIndexs(sliceString);//in slices.js
            axis = getAxis(sliceString);//in slices.js
        } 
        rmove = {'axis': axis,'slice': slice, 'sliceString': sliceString, 'direction': randDir};
        randomMoves.push(rmove);
        //window.alert(randomMoves[i].direction);
        solve(axis,slice,sliceString,randDir);               
    }

    return randomMoves;
}

function solve(axis,slice,sliceString,direction)
{
    var rmove = {};

    rmove = {'axis': axis,'slice': slice, 'sliceString': sliceString, 'direction': direction*-1};

    solveMoves.push(rmove);

    return rmove;
}

