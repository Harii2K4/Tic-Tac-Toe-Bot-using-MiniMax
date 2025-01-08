let board=[
    ['','',''],
    ['','',''],
    ['','',''],
];
/*let players= ['X','O'];*/
let human='O';
let ai='X';
let currentPlayer;
let available=[];
let w, h;
let count=0;
function bestMove(){
    let bestScore=-Infinity;
    let Move;
    for(let j=0;j<3;j++){
        for(let i=0;i<3;i++){
            if(board[i][j]==''){
                board[i][j]=ai;
                let score=minimax(board,0,false);
                board[i][j]='';
                if(score>bestScore){
                    bestScore=score;
                    Move={i,j};
                }
            }
        }
    }
    board[Move.i][Move.j]=ai;
    currentPlayer=human;
    count++;
    
}
let scores={ X:10,O:-10,t:0};
function minimax(board,depth,isMaximizing){
    let result=checkWinner();
    if(result!=null){
        return scores[result];
        
    }
    if(isMaximizing){
        let bestScore=-Infinity;
        for(let j=0;j<3;j++){
            for(let i=0;i<3;i++){
                if(board[i][j]==''){
                    board[i][j]=ai;
                    let score=minimax(board,depth+1,false);
                    board[i][j]='';
                    bestScore=max(score,bestScore);
                }
            }
        }
        return bestScore-depth;
    }
    else{
        let bestScore=Infinity;
        for(let j=0;j<3;j++){
            for(let i=0;i<3;i++){
                if(board[i][j]==''){
                    board[i][j]=human;
                    let score=minimax(board,depth+1,true);
                    board[i][j]='';
                    bestScore=min(score,bestScore);
                }
            }
        }
        return bestScore+depth;
    }
}
function setup() {
  createCanvas(400, 400);
  
  w=width/3;
  h =height/3;
  currentPlayer=human;
  /*bestMove();*/
 
  
}

function checkWinner(){
  let winner=null;
  for(let i =0 ;i<3;i++){
    if(board[i][0]==board[i][1] && board[i][1]==board[i][2] && board[i][0]!=''){
      winner=board[i][0];
    }
  }
  for(let i =0 ;i<3;i++){
    if(board[0][i]==board[1][i] && board[1][i]==board[2][i] && board[0][i]!=''){
      winner=board[0][i];
    }
  }
  
  if(board[0][0]==board[1][1] && board[1][1]==board[2][2] && board[0][0]!=''){
      winner=board[1][1];
    }
  if(board[2][0]==board[1][1] && board[1][1]==board[0][2] && board[2][0]!=''){
      winner=board[1][1];
    }
  if (winner!=null){
    return winner;
  }
  else if(count==9){
    return "t";
  }
  else{
    return null;
  }
  
}
function mousePressed(){
    let i;
    let j;
    if(currentPlayer==human){
        i= floor(mouseX/w);
        j=floor(mouseY/h);
    }
    if(board[i][j]==''){
        board[i][j]=human;
        currentPlayer=ai;
        count++;
        bestMove();
    }
}

function draw() {
  background(255);
  w=width/3;
  h =height/3;
  line(w,0,w,height);
  line(w*2,0,w*2,height);
  line(w,0,w,height);
  line(0,h,width,h);
  line(0,h*2,width,h*2);
  for(let j=0;j<3;j++){
        for(let i=0;i<3;i++){
          let x=w*i+w/2;
          let y=h*j+h/2;        
          let spot=board[i][j];
          textSize(32);
          strokeWeight(4)
          if(spot==human){
            noFill();
            ellipse(x,y,w/2);
          }
          else if(spot==ai){
            let xr=w/4;
            line(x-xr,y-xr,x+xr,y+xr);
            line(x+xr,y-xr,x-xr,y+xr);
          }
          
        }
    }
  let next=checkWinner();
  if(next=="t"){
    noLoop();
    createP("Tie").style('color','blue')
    console.log("Tie");
    return;
  }
  else if(next=="X" || next=="O"){
           noLoop();
           console.log("Winner ",next);
           createP("Winner:"+next).style('color','red');
           return;
  }
  
}