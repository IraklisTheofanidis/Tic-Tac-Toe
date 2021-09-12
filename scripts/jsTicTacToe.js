 

let classSquareName = document.querySelectorAll(".square");

for (let i = 0; i < classSquareName.length; i++) {   
  
    classSquareName[i].addEventListener('click', myFunction);
    
}

function myFunction(e){
    document.getElementById("PvPorPvC").textContent=="PvP" ?pvc(e): pvp(e);
    checkWinner();
}

let helpingVariable=1;
let helpingVariable2=0;

function pvp(e){
    
    let img = document.createElement('img');
    if(helpingVariable2!=9){
        if(helpingVariable==1 ){   
            addO(e,img,"player");
            helpingVariable=2;
            helpingVariable2+=1;
            
        }
        else if(helpingVariable==2){
            addX(e,img,"player")
            helpingVariable=1; 
            helpingVariable2+=1;
        }   
    }  
}


function pvc(e){
 
    let img = document.createElement('img');
    let img2 =document.createElement('img');

    let squares = document.querySelectorAll(".square")
    let random = Math.floor(Math.random() * 9);

    addO(e,img,"player");


    if(helpingVariable2!=4){
        while(squares[random].childNodes.length>1){
            random = Math.floor(Math.random() * 9);
        }
        helpingVariable2+=1;
        addX(squares[random],img2,"computer");
    }
    else{
       
    }

}

function addX(e,img,type){
    img.setAttribute('class', 'X');
    img.setAttribute('src','images/xImage.png');
    
    if(type=="player"){
        e.target.appendChild(img);
        e.target.style.pointerEvents = 'none';
    }
    else{
        e.appendChild(img);
        e.style.pointerEvents = 'none';
    }
}

function addO(e,img,type){
    img.setAttribute('class', 'O');
    img.setAttribute('src','images/oImage.png');
    
    if(type=="player"){
        e.target.appendChild(img);
        e.target.style.pointerEvents = 'none';
    }
    else{
        e.appendChild(img);
        e.style.pointerEvents = 'none';
    }
}


function checkWinner(){
    let check=["top","mid","bottom","left","right","midVertical","firstDiagonal","secondDiagonal"];
    
    
    let shouldSkip = false;
    check.forEach(element => {
        if (shouldSkip) {
            return;
          }
        let same =[];
        let checkWinner= document.querySelectorAll("."+element);
        

        for(i=0;i<checkWinner.length;i++){
            
            if(checkWinner[i].childNodes.length>1){ //epeidi sta childnodes metreaei kai ta textnodes. Dld to keno to metraei san childnode.
                same.push(checkWinner[i].childNodes[1].className);
            }
        }

        
        if(allEqual(same)){
            whoGetThePoints(same);
            shouldSkip = true;
            return;   
        }
       
    });

    let allSquaresToCheckTie=document.querySelectorAll(".square");
    let sum=0;
    for(i=0;i<allSquaresToCheckTie.length;i++){
        if(allSquaresToCheckTie[i].childNodes.length>1){
            sum+=1;
        }
        
    }
   
    if(!shouldSkip && sum==9){
        let tie=parseFloat(document.getElementById("tieScore").textContent);
        tie+=1;
        document.getElementById('tieScore').textContent=tie;
        addAnimationOnBorders("O");
        addAnimationOnBorders("X");
        setTimeout(Time, 3000);
    }
  
}

//check if all the values of the array are equal
function allEqual(arr) {
  if(arr.length==3){
    return new Set(arr).size == 1;}
    return false;
  }

function whoGetThePoints(same){
    let winner ="";
    if(same[0]=="O"){
        let firstPlayer=parseFloat(document.getElementById("playerScore").textContent);
        firstPlayer+=1;
        document.getElementById('playerScore').textContent=firstPlayer;
       
       winner="O";
       }
       else{
         let secondPlayer=parseFloat(document.getElementById("computerScoreOrPlayer2Score").textContent);
         secondPlayer+=1;
         document.getElementById('computerScoreOrPlayer2Score').textContent=secondPlayer;
         winner="X";
       }
       addAnimationOnBorders(winner);
       let pointerEventsAuto= document.querySelectorAll(".square");
            for(i=0;i<pointerEventsAuto.length;i++){
                pointerEventsAuto[i].style.pointerEvents="none";
            }
        
        document.getElementById("PvPorPvC").style.pointerEvents="none";
        document.getElementById("refresh").style.pointerEvents="none";

        
       setTimeout(Time, 3000);
       //showWinner(winner);
}

function Time(){
    Refresh();
}

function addAnimationOnBorders(winner){
    let shapes= document.querySelectorAll("."+winner);
    shapes.forEach(shape => {
        shape.style.animation="shape 1.5s 2";
    });

}

let refresh = document.getElementById("refresh"); 
refresh.addEventListener('click', Refresh);

document.getElementById("PvPorPvC").addEventListener('click',function(e){
    e.target.textContent=="PvP" ? e.target.textContent="PvC" : e.target.textContent="PvP";
    e.target.textContent=="PvP" ? document.getElementById("h2computerOrPlayer2").textContent="Computer" : document.getElementById("h2computerOrPlayer2").textContent="Player2";
    document.getElementById('playerScore').textContent=0;
    document.getElementById('computerScoreOrPlayer2Score').textContent=0;
    document.getElementById('tieScore').textContent=0;
    Refresh();
});

function Refresh(){

    removeOImage();
    removeXImage();
    
    helpingVariable=1;
    helpingVariable2=0;


    let pointerEventsAuto= document.querySelectorAll(".square");
    for(i=0;i<pointerEventsAuto.length;i++){
        pointerEventsAuto[i].style.pointerEvents="auto";
    }

    document.getElementById("PvPorPvC").style.pointerEvents="auto";
    document.getElementById("refresh").style.pointerEvents="auto";
}
    
function removeOImage(){
    let element = document.querySelectorAll(".O");
  

    for(i=0;i<element.length;i++)
    {
        element[i].parentNode.removeChild(element[i]);
    }
}

function removeXImage(){
    element = document.querySelectorAll(".X");
  

    for(i=0;i<element.length;i++)
    {
        element[i].parentNode.removeChild(element[i]);
    }
}