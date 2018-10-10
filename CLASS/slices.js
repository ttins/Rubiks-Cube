"use strict";

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

//direction 1 forward, -1 backward
//sliceString, slice that was moved
//this just swaps refrences to the main cube collection, after
//we moved, this is to keep the sub cubes updated in the cubeCollection
//array at their proper index numbers, we then return the collectionTemp
//which has the proper cubes stored at the proper place for the render()
//function
function assignSlices(cubeCollection,sliceString,movDir)
{
    var i;
    var collectionTemp = [];//temp array for updating slices

    //store real values to temp array
    for(i =0;i<27;i++)
    {
        collectionTemp[i] = cubeCollection[i];
    }  
    switch(sliceString)//just switch positions in collection at proper slice
    {
//================================================================
//
//x_slice1 indices = [0 3 6 9 12 15 18 21 24]
//
//================================================================        
        case "x_slice1":
        {          
            if(movDir === 1)//forward
            {         
                for(i =0;i<27;i++)
                {
                    if(i===0)
                        collectionTemp[i] = cubeCollection[i+18];
                    if(i===3)
                        collectionTemp[i] = cubeCollection[i+6];
                    if(i===6)
                        collectionTemp[i] = cubeCollection[i-6];
                    if(i===9)
                        collectionTemp[i] = cubeCollection[i+12];
                    if(i===15)
                        collectionTemp[i] = cubeCollection[i-12];
                    if(i===24)
                        collectionTemp[i] = cubeCollection[i-18];
                    if(i===21)
                        collectionTemp[i] = cubeCollection[i-6];
                    if(i===18)
                        collectionTemp[i] = cubeCollection[i+6];
                }    
            }//end forward direction
            else//backward
            {
                for(i =0;i<27;i++)
                {
                    if(i===0)
                        collectionTemp[i] = cubeCollection[i+6];
                    if(i===3)
                        collectionTemp[i] = cubeCollection[i+12];
                    if(i===6)
                        collectionTemp[i] = cubeCollection[i+18];
                    if(i===9)
                        collectionTemp[i] = cubeCollection[i-6];
                    if(i===15)
                        collectionTemp[i] = cubeCollection[i+6];
                    if(i===24)
                        collectionTemp[i] = cubeCollection[i-6];
                    if(i===21)
                        collectionTemp[i] = cubeCollection[i-12];
                    if(i===18)
                        collectionTemp[i] = cubeCollection[i-18];
                } 
            }//end backward direction
            break;
        }//end x_slice1 case
//================================================================
//
//x_slice2 indices = [1 4 7 10 13 16 19 22 25]
//
//================================================================
        case "x_slice2":
        {          
            if(movDir === 1)//forward
            {         
                for(i =0;i<27;i++)
                {
                    if(i===1)
                        collectionTemp[i] = cubeCollection[i+18];
                    if(i===4)
                        collectionTemp[i] = cubeCollection[i+6];
                    if(i===7)
                        collectionTemp[i] = cubeCollection[i-6];
                    if(i===10)
                        collectionTemp[i] = cubeCollection[i+12];
                    if(i===16)
                        collectionTemp[i] = cubeCollection[i-12];
                    if(i===25)
                        collectionTemp[i] = cubeCollection[i-18];
                    if(i===22)
                        collectionTemp[i] = cubeCollection[i-6];
                    if(i===19)
                        collectionTemp[i] = cubeCollection[i+6];
                }    
            }//end forward direction
            else//backward
            {
                for(i =0;i<27;i++)
                {
                    if(i===1)
                        collectionTemp[i] = cubeCollection[i+6];
                    if(i===4)
                        collectionTemp[i] = cubeCollection[i+12];
                    if(i===7)
                        collectionTemp[i] = cubeCollection[i+18];
                    if(i===10)
                        collectionTemp[i] = cubeCollection[i-6];
                    if(i===16)
                        collectionTemp[i] = cubeCollection[i+6];
                    if(i===25)
                        collectionTemp[i] = cubeCollection[i-6];
                    if(i===22)
                        collectionTemp[i] = cubeCollection[i-12];
                    if(i===19)
                        collectionTemp[i] = cubeCollection[i-18];
                } 
            }//end backward direction
            break;
        }//end x_slice2 case
//================================================================
//
//x_slice3 indices = [2 5 8 11 14 17 20 23 26]
//
//================================================================
        case "x_slice3":
        {          
            if(movDir === 1)//forward
            {         
                for(i =0;i<27;i++)
                {
                    if(i===2)
                        collectionTemp[i] = cubeCollection[i+18];
                    if(i===5)
                        collectionTemp[i] = cubeCollection[i+6];
                    if(i===8)
                        collectionTemp[i] = cubeCollection[i-6];
                    if(i===11)
                        collectionTemp[i] = cubeCollection[i+12];
                    if(i===17)
                        collectionTemp[i] = cubeCollection[i-12];
                    if(i===26)
                        collectionTemp[i] = cubeCollection[i-18];
                    if(i===23)
                        collectionTemp[i] = cubeCollection[i-6];
                    if(i===20)
                        collectionTemp[i] = cubeCollection[i+6];
                }    
            }//end forward direction
            else//backward
            {
                for(i =0;i<27;i++)
                {
                    if(i===2)
                        collectionTemp[i] = cubeCollection[i+6];
                    if(i===5)
                        collectionTemp[i] = cubeCollection[i+12];
                    if(i===8)
                        collectionTemp[i] = cubeCollection[i+18];
                    if(i===11)
                        collectionTemp[i] = cubeCollection[i-6];
                    if(i===17)
                        collectionTemp[i] = cubeCollection[i+6];
                    if(i===26)
                        collectionTemp[i] = cubeCollection[i-6];
                    if(i===23)
                        collectionTemp[i] = cubeCollection[i-12];
                    if(i===20)
                        collectionTemp[i] = cubeCollection[i-18];
                } 
            }//end backward direction
            break;
        }//end x_slice3 case
//================================================================
//
//y_slice1 indices = [0 1 2 9 10 11 18 19 20]
//
//================================================================
        case "y_slice1":
        {          
            if(movDir === 1)//forward
            {         
                for(i =0;i<27;i++)
                {
                    if(i===0)
                        collectionTemp[i] = cubeCollection[i+18];
                    if(i===1)
                        collectionTemp[i] = cubeCollection[i+8];
                    if(i===2)
                        collectionTemp[i] = cubeCollection[i-2];
                    if(i===9)
                        collectionTemp[i] = cubeCollection[i+10];
                    if(i===10)
                        collectionTemp[i] = cubeCollection[i];
                    if(i===11)
                        collectionTemp[i] = cubeCollection[i-10];
                    if(i===18)
                        collectionTemp[i] = cubeCollection[i+2];
                    if(i===19)
                        collectionTemp[i] = cubeCollection[i-8];
                    if(i===20)
                        collectionTemp[i] = cubeCollection[i-18];
                }    
            }//end forward direction
            else//backward
            {
                for(i =0;i<27;i++)
                {
                    if(i===0)
                        collectionTemp[i] = cubeCollection[i+2];
                    if(i===1)
                        collectionTemp[i] = cubeCollection[i+10];
                    if(i===2)
                        collectionTemp[i] = cubeCollection[i+18];
                    if(i===9)
                        collectionTemp[i] = cubeCollection[i-8];
                    if(i===10)
                        collectionTemp[i] = cubeCollection[i];
                    if(i===11)
                        collectionTemp[i] = cubeCollection[i+8];
                    if(i===18)
                        collectionTemp[i] = cubeCollection[i-18];
                    if(i===19)
                        collectionTemp[i] = cubeCollection[i-10];
                    if(i===20)
                        collectionTemp[i] = cubeCollection[i-2];
                } 
            }//end backward direction
            break;
        }//end y_slice1 case 
//================================================================
//
//y_slice2 indices = [3 4 5 12 13 14 21 22 23]
//
//================================================================
        case "y_slice2":
        {          
            if(movDir === 1)//forward
            {         
                for(i =0;i<27;i++)
                {
                    if(i===3)
                        collectionTemp[i] = cubeCollection[i+18];
                    if(i===4)
                        collectionTemp[i] = cubeCollection[i+8];
                    if(i===5)
                        collectionTemp[i] = cubeCollection[i-2];
                    if(i===12)
                        collectionTemp[i] = cubeCollection[i+10];
                    if(i===13)
                        collectionTemp[i] = cubeCollection[i];
                    if(i===14)
                        collectionTemp[i] = cubeCollection[i-10];
                    if(i===21)
                        collectionTemp[i] = cubeCollection[i+2];
                    if(i===22)
                        collectionTemp[i] = cubeCollection[i-8];
                    if(i===23)
                        collectionTemp[i] = cubeCollection[i-18];
                }    
            }//end forward direction
            else//backward
            {
                for(i =0;i<27;i++)
                {
                    if(i===3)
                        collectionTemp[i] = cubeCollection[i+2];
                    if(i===4)
                        collectionTemp[i] = cubeCollection[i+10];
                    if(i===5)
                        collectionTemp[i] = cubeCollection[i+18];
                    if(i===12)
                        collectionTemp[i] = cubeCollection[i-8];
                    if(i===13)
                        collectionTemp[i] = cubeCollection[i];
                    if(i===14)
                        collectionTemp[i] = cubeCollection[i+8];
                    if(i===21)
                        collectionTemp[i] = cubeCollection[i-18];
                    if(i===22)
                        collectionTemp[i] = cubeCollection[i-10];
                    if(i===23)
                        collectionTemp[i] = cubeCollection[i-2];
                } 
            }//end backward direction
            break;
        }//end y_slice2 case 
//================================================================
//
//y_slice3 indices = [6 7 8 15 16 17 24 25 26]
//
//================================================================
        case "y_slice3":
        {          
            if(movDir === 1)//forward
            {         
                for(i =0;i<27;i++)
                {
                    if(i===6)
                        collectionTemp[i] = cubeCollection[i+18];
                    if(i===7)
                        collectionTemp[i] = cubeCollection[i+8];
                    if(i===8)
                        collectionTemp[i] = cubeCollection[i-2];
                    if(i===15)
                        collectionTemp[i] = cubeCollection[i+10];
                    if(i===16)
                        collectionTemp[i] = cubeCollection[i];
                    if(i===17)
                        collectionTemp[i] = cubeCollection[i-10];
                    if(i===24)
                        collectionTemp[i] = cubeCollection[i+2];
                    if(i===25)
                        collectionTemp[i] = cubeCollection[i-8];
                    if(i===26)
                        collectionTemp[i] = cubeCollection[i-18];
                }    
            }//end forward direction
            else//backward
            {
                for(i =0;i<27;i++)
                {
                    if(i===6)
                        collectionTemp[i] = cubeCollection[i+2];
                    if(i===7)
                        collectionTemp[i] = cubeCollection[i+10];
                    if(i===8)
                        collectionTemp[i] = cubeCollection[i+18];
                    if(i===15)
                        collectionTemp[i] = cubeCollection[i-8];
                    if(i===16)
                        collectionTemp[i] = cubeCollection[i];
                    if(i===17)
                        collectionTemp[i] = cubeCollection[i+8];
                    if(i===24)
                        collectionTemp[i] = cubeCollection[i-18];
                    if(i===25)
                        collectionTemp[i] = cubeCollection[i-10];
                    if(i===26)
                        collectionTemp[i] = cubeCollection[i-2];
                } 
            }//end backward direction
            break;
        }//end y_slice3 case
//================================================================
//
//z_slice1 indices = [0 1 2 3 4 5 6 7 8]
//
//================================================================
        case "z_slice1":
        {          
            if(movDir === 1)//forward
            {         
                for(i =0;i<27;i++)
                {
                    if(i===0)
                        collectionTemp[i] = cubeCollection[i+2];
                    if(i===1)
                        collectionTemp[i] = cubeCollection[i+4];
                    if(i===2)
                        collectionTemp[i] = cubeCollection[i+6];
                    if(i===3)
                        collectionTemp[i] = cubeCollection[i-2];
                    if(i===4)
                        collectionTemp[i] = cubeCollection[i];
                    if(i===5)
                        collectionTemp[i] = cubeCollection[i+2];
                    if(i===6)
                        collectionTemp[i] = cubeCollection[i-6];
                    if(i===7)
                        collectionTemp[i] = cubeCollection[i-4];
                    if(i===8)
                        collectionTemp[i] = cubeCollection[i-2];
                }    
            }//end forward direction
            else//backward
            {
                for(i =0;i<27;i++)
                {
                    if(i===0)
                        collectionTemp[i] = cubeCollection[i+6];
                    if(i===1)
                        collectionTemp[i] = cubeCollection[i+2];
                    if(i===2)
                        collectionTemp[i] = cubeCollection[i-2];
                    if(i===3)
                        collectionTemp[i] = cubeCollection[i+4];
                    if(i===4)
                        collectionTemp[i] = cubeCollection[i];
                    if(i===5)
                        collectionTemp[i] = cubeCollection[i-4];
                    if(i===6)
                        collectionTemp[i] = cubeCollection[i+2];
                    if(i===7)
                        collectionTemp[i] = cubeCollection[i-2];
                    if(i===8)
                        collectionTemp[i] = cubeCollection[i-6];
                } 
            }//end backward direction
            break;
        }//end z_slice1 case 
//================================================================
//
//z_slice2 indices = [9 10 11 12 13 14 15 16 17]
//
//================================================================
        case "z_slice2":
        {          
            if(movDir === 1)//forward
            {         
                for(i =0;i<27;i++)
                {
                    if(i===9)
                        collectionTemp[i] = cubeCollection[i+2];
                    if(i===10)
                        collectionTemp[i] = cubeCollection[i+4];
                    if(i===11)
                        collectionTemp[i] = cubeCollection[i+6];
                    if(i===12)
                        collectionTemp[i] = cubeCollection[i-2];
                    if(i===13)
                        collectionTemp[i] = cubeCollection[i];
                    if(i===14)
                        collectionTemp[i] = cubeCollection[i+2];
                    if(i===15)
                        collectionTemp[i] = cubeCollection[i-6];
                    if(i===16)
                        collectionTemp[i] = cubeCollection[i-4];
                    if(i===17)
                        collectionTemp[i] = cubeCollection[i-2];
                }    
            }//end forward direction
            else//backward
            {
                for(i =0;i<27;i++)
                {
                    if(i===9)
                        collectionTemp[i] = cubeCollection[i+6];
                    if(i===10)
                        collectionTemp[i] = cubeCollection[i+2];
                    if(i===11)
                        collectionTemp[i] = cubeCollection[i-2];
                    if(i===12)
                        collectionTemp[i] = cubeCollection[i+4];
                    if(i===13)
                        collectionTemp[i] = cubeCollection[i];
                    if(i===14)
                        collectionTemp[i] = cubeCollection[i-4];
                    if(i===15)
                        collectionTemp[i] = cubeCollection[i+2];
                    if(i===16)
                        collectionTemp[i] = cubeCollection[i-2];
                    if(i===17)
                        collectionTemp[i] = cubeCollection[i-6];
                } 
            }//end backward direction
            break;
        }//end z_slice2 case
//================================================================
//
//z_slice3 indices = [18 19 20 21 22 23 24 25 26]
//
//================================================================
        case "z_slice3":
        {          
            if(movDir === 1)//forward
            {         
                for(i =0;i<27;i++)
                {
                    if(i===18)
                        collectionTemp[i] = cubeCollection[i+2];
                    if(i===19)
                        collectionTemp[i] = cubeCollection[i+4];
                    if(i===20)
                        collectionTemp[i] = cubeCollection[i+6];
                    if(i===21)
                        collectionTemp[i] = cubeCollection[i-2];
                    if(i===22)
                        collectionTemp[i] = cubeCollection[i];
                    if(i===23)
                        collectionTemp[i] = cubeCollection[i+2];
                    if(i===24)
                        collectionTemp[i] = cubeCollection[i-6];
                    if(i===25)
                        collectionTemp[i] = cubeCollection[i-4];
                    if(i===26)
                        collectionTemp[i] = cubeCollection[i-2];
                }    
            }//end forward direction
            else//backward
            {
                for(i =0;i<27;i++)
                {
                    if(i===18)
                        collectionTemp[i] = cubeCollection[i+6];
                    if(i===19)
                        collectionTemp[i] = cubeCollection[i+2];
                    if(i===20)
                        collectionTemp[i] = cubeCollection[i-2];
                    if(i===21)
                        collectionTemp[i] = cubeCollection[i+4];
                    if(i===22)
                        collectionTemp[i] = cubeCollection[i];
                    if(i===23)
                        collectionTemp[i] = cubeCollection[i-4];
                    if(i===24)
                        collectionTemp[i] = cubeCollection[i+2];
                    if(i===25)
                        collectionTemp[i] = cubeCollection[i-2];
                    if(i===26)
                        collectionTemp[i] = cubeCollection[i-6];
                } 
            }//end backward direction
            break;
        }//end z_slice3 case                                               
    }//end switch

    return collectionTemp;
}//end function

//updates the entire cubeCollection after a whole cube move
//based on direction and the axis the move took place
function updateSlicesMove(cubeCollection,direction,axis)
{
    var i;
    var collectionTemp = [];//temp array for updating slices

    //store real values to temp array
    for(i =0;i<27;i++)
    {
        collectionTemp[i] = cubeCollection[i];
    } 

    switch(axis)
    {
        case 0://xAxis
        {
            if(direction === 1){//forward
                for(i = 0;i<27;i++){
                    if((i === 0) || (i === 1) || (i === 2)){
                        collectionTemp[i] = cubeCollection[i+18];
                    }
                    if((i === 3) || (i === 4) || (i === 5)){
                        collectionTemp[i] = cubeCollection[i+6];
                    }
                    if((i === 6) || (i === 7) || (i === 8)){
                        collectionTemp[i] = cubeCollection[i-6];
                    }                                        
                    if((i === 9) || (i === 10) || (i === 11)){
                        collectionTemp[i] = cubeCollection[i+12];
                    }
                    if((i === 12) || (i === 13) || (i === 14)){
                        collectionTemp[i] = cubeCollection[i];
                    } 
                    if((i === 15) || (i === 16) || (i === 17)){
                        collectionTemp[i] = cubeCollection[i-12];
                    }                                                            
                    if((i === 18) || (i === 19) || (i === 20)){
                        collectionTemp[i] = cubeCollection[i+6];
                    }
                    if((i === 21) || (i === 22) || (i === 23)){
                        collectionTemp[i] = cubeCollection[i-6];
                    }
                    if((i === 24) || (i === 25) || (i === 26)){
                        collectionTemp[i] = cubeCollection[i-18];
                    }                                        
                }//end xAxis forward
            }
            else{//backward
                for(i = 0;i<27;i++){
                    if((i === 0) || (i === 1) || (i === 2)){
                        collectionTemp[i] = cubeCollection[i+6];
                    }
                    if((i === 3) || (i === 4) || (i === 5)){
                        collectionTemp[i] = cubeCollection[i+12];
                    }
                    if((i === 6) || (i === 7) || (i === 8)){
                        collectionTemp[i] = cubeCollection[i+18];
                    }                                        
                    if((i === 9) || (i === 10) || (i === 11)){
                        collectionTemp[i] = cubeCollection[i-6];
                    }
                    if((i === 12) || (i === 13) || (i === 14)){
                        collectionTemp[i] = cubeCollection[i];
                    } 
                    if((i === 15) || (i === 16) || (i === 17)){
                        collectionTemp[i] = cubeCollection[i+6];
                    }                                                            
                    if((i === 18) || (i === 19) || (i === 20)){
                        collectionTemp[i] = cubeCollection[i-18];
                    }
                    if((i === 21) || (i === 22) || (i === 23)){
                        collectionTemp[i] = cubeCollection[i-12];
                    }
                    if((i === 24) || (i === 25) || (i === 26)){
                        collectionTemp[i] = cubeCollection[i-6];
                    }                                        
                }//end xAxis backward                
            }
            break;
        }//end xAxis case
        case 1://yAxis
        {
            if(direction === 1){//forward
                for(i = 0;i<27;i++){
                    if((i === 0) || (i === 3) || (i === 6)){
                        collectionTemp[i] = cubeCollection[i+18];
                    }
                    if((i === 9) || (i === 12) || (i === 15)){
                        collectionTemp[i] = cubeCollection[i+10];
                    }
                    if((i === 18) || (i === 21) || (i === 24)){
                        collectionTemp[i] = cubeCollection[i+2];
                    }                                        
                    if((i === 1) || (i === 4) || (i === 7)){
                        collectionTemp[i] = cubeCollection[i+8];
                    }
                    if((i === 10) || (i === 13) || (i === 16)){
                        collectionTemp[i] = cubeCollection[i];
                    } 
                    if((i === 19) || (i === 22) || (i === 25)){
                        collectionTemp[i] = cubeCollection[i-8];
                    }                                                            
                    if((i === 2) || (i === 5) || (i === 8)){
                        collectionTemp[i] = cubeCollection[i-2];
                    }
                    if((i === 11) || (i === 14) || (i === 17)){
                        collectionTemp[i] = cubeCollection[i-10];
                    }
                    if((i === 20) || (i === 23) || (i === 26)){
                        collectionTemp[i] = cubeCollection[i-18];
                    }                                        
                }//end yAxis forward
            }
            else{//backward
                for(i = 0;i<27;i++){
                    if((i === 0) || (i === 3) || (i === 6)){
                        collectionTemp[i] = cubeCollection[i+2];
                    }
                    if((i === 9) || (i === 12) || (i === 15)){
                        collectionTemp[i] = cubeCollection[i-8];
                    }
                    if((i === 18) || (i === 21) || (i === 24)){
                        collectionTemp[i] = cubeCollection[i-18];
                    }                                        
                    if((i === 1) || (i === 4) || (i === 7)){
                        collectionTemp[i] = cubeCollection[i+10];
                    }
                    if((i === 10) || (i === 13) || (i === 16)){
                        collectionTemp[i] = cubeCollection[i];
                    } 
                    if((i === 19) || (i === 22) || (i === 25)){
                        collectionTemp[i] = cubeCollection[i-10];
                    }                                                            
                    if((i === 2) || (i === 5) || (i === 8)){
                        collectionTemp[i] = cubeCollection[i+18];
                    }
                    if((i === 11) || (i === 14) || (i === 17)){
                        collectionTemp[i] = cubeCollection[i+8];
                    }
                    if((i === 20) || (i === 23) || (i === 26)){
                        collectionTemp[i] = cubeCollection[i-2];
                    }                                        
                }//end yAxis backward                
            }
            break;
        }//end yAxis case
        case 2://zAxis
        {
            if(direction === 1){//forward
                for(i = 0;i<27;i++){
                    if((i === 0) || (i === 9) || (i === 18)){
                        collectionTemp[i] = cubeCollection[i+2];
                    }
                    if((i === 1) || (i === 10) || (i === 19)){
                        collectionTemp[i] = cubeCollection[i+4];
                    }
                    if((i === 2) || (i === 11) || (i === 20)){
                        collectionTemp[i] = cubeCollection[i+6];
                    }                                        
                    if((i === 3) || (i === 12) || (i === 21)){
                        collectionTemp[i] = cubeCollection[i-2];
                    }
                    if((i === 4) || (i === 13) || (i === 22)){
                        collectionTemp[i] = cubeCollection[i];
                    } 
                    if((i === 5) || (i === 14) || (i === 23)){
                        collectionTemp[i] = cubeCollection[i+2];
                    }                                                            
                    if((i === 6) || (i === 15) || (i === 24)){
                        collectionTemp[i] = cubeCollection[i-6];
                    }
                    if((i === 7) || (i === 16) || (i === 25)){
                        collectionTemp[i] = cubeCollection[i-4];
                    }
                    if((i === 8) || (i === 17) || (i === 26)){
                        collectionTemp[i] = cubeCollection[i-2];
                    }                                        
                }//end zAxis forward
            }
            else{//backward
                for(i = 0;i<27;i++){
                    if((i === 0) || (i === 9) || (i === 18)){
                        collectionTemp[i] = cubeCollection[i+6];
                    }
                    if((i === 1) || (i === 10) || (i === 19)){
                        collectionTemp[i] = cubeCollection[i+2];
                    }
                    if((i === 2) || (i === 11) || (i === 20)){
                        collectionTemp[i] = cubeCollection[i-2];
                    }                                        
                    if((i === 3) || (i === 12) || (i === 21)){
                        collectionTemp[i] = cubeCollection[i+4];
                    }
                    if((i === 4) || (i === 13) || (i === 22)){
                        collectionTemp[i] = cubeCollection[i];
                    } 
                    if((i === 5) || (i === 14) || (i === 23)){
                        collectionTemp[i] = cubeCollection[i-4];
                    }                                                            
                    if((i === 6) || (i === 15) || (i === 24)){
                        collectionTemp[i] = cubeCollection[i+2];
                    }
                    if((i === 7) || (i === 16) || (i === 25)){
                        collectionTemp[i] = cubeCollection[i-2];
                    }
                    if((i === 8) || (i === 17) || (i === 26)){
                        collectionTemp[i] = cubeCollection[i-6];
                    }                                        
                }//end zAxis backward                 
            }
            break;
        }//end zAxis case
    }//end switch

    return collectionTemp;    
}


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
function sliceArrayIndexs(sliceString)
{
    var sliceArr;
    switch(sliceString)
    {
        case "x_slice1":{
            sliceArr = [0, 3, 6, 9, 12, 15, 18, 21, 24];
            break;
        }//end x_slice1
        case "x_slice2":{
            sliceArr = [1, 4, 7, 10, 13, 16, 19, 22, 25];
            break;
        }//end x_slice2
        case "x_slice3":{
            sliceArr = [2, 5, 8, 11, 14, 17, 20, 23, 26];
            break;
        }//end x_slice3
        case "y_slice1":{
            sliceArr = [0, 1, 2, 9, 10, 11, 18, 19, 20];
            break;
        }//end y_slice1
        case "y_slice2":{
            sliceArr = [3, 4, 5, 12, 13, 14, 21, 22, 23];
            break;
        }//end y_slice2
        case "y_slice3":{
            sliceArr = [6, 7, 8, 15, 16, 17, 24, 25, 26];
            break;
        }//end y_slice3  
        case "z_slice1":{
            sliceArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            break;
        }//end z_slice1
        case "z_slice2":{
            sliceArr = [9, 10, 11, 12, 13, 14, 15, 16, 17];
            break;
        }//end z_slice2
        case "z_slice3":{
            sliceArr = [18, 19, 20, 21, 22, 23, 24, 25, 26];
            break;
        }//end z_slice3              
    }//end switch
    return sliceArr;
}

//axis to rotate based on slice of cube
//and the slice we are moving
function getAxis(sliceString)
{
    var axis;
    var xAxis = 0;
    var yAxis = 1;
    var zAxis = 2;
    //window.alert(sliceString);
    switch(sliceString)
    {
        //==============[x_slices]====================
        case "x_slice1":{
            axis = xAxis;
            break;
        }
        case "x_slice2":{
            axis = xAxis;
            break;
        }
        case "x_slice3":{
            axis = xAxis;
            break;
        }
        //==============[y_slices]====================
        case "y_slice1":{
            axis = yAxis;
            break;
        }
        case "y_slice2":{
            axis = yAxis;
            break;
        }
        case "y_slice3":{
            axis = yAxis;
            break;
        }
        //==============[z_slices]====================
        case "z_slice1":{
            axis = zAxis;
            break;
        }
        case "z_slice2":{
            axis = zAxis;
            break;
        }
        case "z_slice3":{
            axis = zAxis;
            break;
        }                    
    }//end switch

    return axis;
}