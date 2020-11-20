let speedInput=document.getElementById("speed-input");//getting the speed input element
let shapeSpeedButton=document.getElementById("shape-speed-button");//getting the shape speed button
let selectShapeList=document.getElementById("select-shape-list")//getting the select shape list
let change=1;//distance to move when a valid button is pressed once

let shape=document.getElementById("shape");//getting the shape
let parentEle=shape.offsetParent;//getting the parent element of the shape i.e. the shape container

shapeSpeedButton.addEventListener("click", function(){//handling the event when the shape speed button is pressed  

    let speed=speedInput.value;//obtaining the speed value(distance in px to move per key press)

    if(speed!="" && speed<=0){//handling the case when the user enters a negative speed and we simply display an alert message and return in this case

        alert("Enter a positive value");
        return ;

    }

    change=parseInt(speed);//getting the change value in number form
    let shape=selectShapeList.selectedOptions[0].value;//to get the option which is selected from the dropdown for the shape
    
    if(shape=="circle"){//when the shape selected is circle

        shape.setAttribute("style", "");//removing any previous styling
        shape.setAttribute("style", "top: 1; left: 1; height: 100px; width: 100px; border-radius: 50%;");//adding circle styling

    }
    else if(shape=="square"){//shape selected is square

        shape.setAttribute("style", "");
        shape.setAttribute("style", "top: 1; left: 1; height: 100px; width: 100px;");//square styling

    }
    else if(shape=="rectangle"){//shape selected is rectangle

        shape.setAttribute("style", "");
        shape.setAttribute("style", "top: 1; left: 1; height: 100px; width: 150px;");//rectangle styling

    }
    else{//shape selected is ecplise

        shape.setAttribute("style", "");
        shape.setAttribute("style", "top: 1; left: 1; height: 100px; width: 150px; border-radius: 50%;");//ecplise styling

    }

});

let count=0;//to handle the case of alternate displaying and hiding of the instructions message when the instructions button is pressed

let instructionsButton=document.getElementById("instructions-button");//getting the instructions button
let instructions=document.getElementById("instructions");//getting the instructions list

instructionsButton.addEventListener("click", function(){//handling the event when the instructions button is cliecked

    if(count%2==0){//showing the instructions when we have even count

        instructions.style.display="block";
        instructions.style.opacity="1";    

    }
    else{//hinding the instructions when we have odd count
        instructions.setAttribute("style", "");
    }

    count++;//increasing the count with each instructions button click

});

document.addEventListener("keydown", function(event){//handling the keydown event in the entire document

    let keyValue=event.code.slice(3, 4);//obtaining the value of the key i.e. pressed      

    let lenT=shape.style.top.length;//getting the top value for the shape
    let top=parseInt(shape.style.top.slice(0, lenT-2));//obtaining the numeric part i.e. excluding "px"

    let lenL=shape.style.left.length;//getting the left value for the shape
    let left=parseInt(shape.style.left.slice(0, lenL-2));    

    if(keyValue=="W"){//when the up key is pressed according to the instructions
                
        top-=change;//since we have to move up, so top will decrease

        if(top<=0){//if we go out of range during this move 

            top+=change;//bring top back to the previous value and display an alert message and return 
            alert("Cannot go out of range");
            return ;

        }

        shape.style.top=(top+"px");//in case the new top is a valid value, so we reset the top value of the shape

    }
    else if(keyValue=="S"){//down key is pressed
        
        top+=change;//top distance will increase

        if((top+shape.offsetHeight)>=(parentEle.offsetHeight-8)){//if we go out of range, i.e. top value + height of shape is greater than the available space in the shape container excluding the border

            top-=change;//bring top back to previous value and display an alert message and return 
            alert("Cannot go out of range");
            return ;

        }

        shape.style.top=(top+"px");//change the top value in case the new top is a valid value    

    }
    else if(keyValue=="D"){//right key is pressed

        left+=change;//left distance will increase

        if((left+shape.offsetWidth)>=(parentEle.offsetWidth-8)){//if we go out of range, i.e. the left value + width of the shape is more than the available space inside the shape container

            left-=change;//bring left back to previous value and display an alert message and return 
            alert("Cannot go out of range");
            return ;

        }

        shape.style.left=(left+"px");//update the left value in case of a valid move

    }
    else if(keyValue=="A"){//left key is pressed

        left-=change;//left distance will decrease

        if(left<=0){//if we go out of the range

            left+=change;//bring left back to previous value and display an alert message and return 
            alert("Cannot go out of range");
            return ;

        }

        shape.style.left=(left+"px");//update the left value in case of a valid move

    }

});

shapeSpeedButton.addEventListener("mousedown", function(){//to change the shape speed button background color in case the button is pressed down
    shapeSpeedButton.style.backgroundColor="#84eb84";
});

shapeSpeedButton.addEventListener("mouseup", function(){//bring the button background color back to previous value when the button is released
    shapeSpeedButton.setAttribute("style", "");
});

instructionsButton.addEventListener("mousedown", function(){//similar as above for the instructions button
    instructionsButton.style.backgroundColor="#eb9676";
});

instructionsButton.addEventListener("mouseup", function(){
    instructionsButton.setAttribute("style", "");
});