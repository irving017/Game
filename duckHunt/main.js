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
var dir = true

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
    this.x=Math.floor(Math.random()*canvas.width)
    this.y=Math.floor(Math.random()*canvas.height)
    this.w=50
    this.h=50
    this.horizontal = true
    this.vertical = true
    //this.movimientos=[this.moveRight,this.moveLeft,this.moveDown,this.moveTop]
    //this.speed = Math.floor((Math.random()*5)+2)
    console.log(this.horizontal)
  }
  draw(){
    /*if(frames%100 === 0){
      enemies.forEach(function(element){
        var random = Math.floor(Math.random()*(this.movimientos.length-1))
        var movimiento = this.movimientos[random]
        element.movimiento()
      })
    }*/
    if(this.horizontal){this.moveRight()}
    else{this.moveLeft()}
    if(this.vertical){this.moveDown()}
    else{this.moveTop()}

    //draw 
    ctx.fillStyle='black'
    ctx.fillRect(this.x,this.y,this.w,this.h)
  }
  moveRight(){
    if(this.x<(canvas.width-this.w)){this.x+=4}
    else{this.horizontal=false}
  }
  moveLeft(){
    if(this.x>=0){this.x-=4}
      else{this.horizontal=true}
  }
  moveDown(){
    if(this.y<canvas.height-this.h){this.y+=4}
    else{this.vertical=false}
  }
  moveTop(){
    if(this.y>=0){this.y-=4}
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
function start(){
  if(interval)return
  interval = setInterval(update,1000/60)
}//start

//funcion de iteracion
function update(){
  frames++
  ctx.clearRect(0,0,canvas.width,canvas.height)
  board.draw()
  if(frames%200===0)createEnemys()
  drawEnemys()
  checkCollections()
  xClick=null
  yClick=null
}
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

/*addEventListener('keydown',function(e){
  if(e.keyCode===32){
    xClick = e.clientX-rect.left
    yClick = e.clientY-rect.top 
    console.log(xClick)
    console.log(yClick)
    }
})*/

addEventListener('keydown',function(e){
  if(e.keyCode===27){
    start()
    }
})

