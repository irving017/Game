//canvas confiuration
var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');
var rect = canvas.getBoundingClientRect()

//test
//ctx.fillRect(0,0,canvas.width,canvas.height)

// variables globales
var enemies = []
var interval
var frames = 0
var xClick
var yClick

//clases
class Board {
  constructor(){
    this.x=0
    this.y=0
    this.w=canvas.width
    this.h=canvas.height
  }
  draw(){
    ctx.fillStyle='white'
    ctx.fillRect(this.x,this.y,this.w,this.h)
  }
}//board

class Enemy{
  constructor(){
    this.x=0
    this.y=0
    this.w=50
    this.h=50
    this.horizontal = true
    this.vertical = true
    this.contador = 0
    //this.speed = Math.floor((Math.random()*5)+2)
  }
  draw(){
    
    if(this.horizontal){
    this.moveRight()
    }else{this.moveLeft()}
    if(this.vertical){this.moveDown()}
    else{this.moveTop()}

    //draw 
    this.contador++
    ctx.fillStyle='black'
    ctx.fillRect(this.x,this.y,this.w,this.h)
  }
  moveRight(){
    if(this.x<(canvas.width-this.w)){this.x+=3}
    else{this.horizontal=false}
  }
  moveLeft(){
    if(this.x>=0){this.x-=3}
      else{this.horizontal=true}
  }
  moveDown(){
    if(this.y<canvas.height-this.h){this.y+=3}
    else{this.vertical=false}
  }
  moveTop(){
    if(this.y>=0){this.y-=3}
    else{this.vertical=true}
  }
  crashWith(){
    return  (this.x<xClick)&&
            (this.x + this.w > xClick)&&
            (this.y < yClick)&&
            (this.y+this.h >yClick);
  }
}//enemy

//objetos
var board = new Board()
//enemy = new Enemy() 

//funciones principales

//funcion de iteracion
interval = setInterval(function(){
  frames++
  ctx.clearRect(0,0,canvas.width,canvas.height)
  board.draw()
  if(frames%200===0)createEnemys()
  drawEnemys()
  checkCollections()
},1000/60)

//funciones auxilires
//function del(){
  //if(frames%2000===0){delete enemy}
//}
function createEnemys(){
  enemy = new Enemy()
  enemies.push(enemy) 
}

function drawEnemys(){
  enemies.forEach(function(element){
    element.draw()
  }) 
}
function checkCollections(){
  enemies.forEach(function(element){
    if(element.crashWith()){
      enemies.splice(enemies.indexOf(element),1)
    }
  })
}

//listenners
addEventListener("click",function(e){
  xClick = e.clientX-rect.left
  yClick = e.clientY-rect.top 
  console.log(xClick)
  console.log(yClick)
})