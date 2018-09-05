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
var bullets = []
var score = 0
var loose = 524
var pruebaloose=0 // no es necesario
var bool = true
var municiones = []
var x = 0
//clases

class Board {
  constructor(){
    this.x=0
    this.y=0
    this.w=canvas.width
    this.h=canvas.height
    this.image = new Image()
    this.image.src = 'backGround.png'
    /*this.image.onload = ()=>{
      this.draw()
    }*/
    this.music = new Audio()
    this.music.src = 'thiller.mp3'
    //this.music2 = new Audio()
    //this.music2.src = 'shots.mp3'
  }
  draw(){
    ctx.drawImage(this.image,this.x,this.y,this.w,this.h)
    ctx.fillStyle='black'
    ctx.font="80px Avenir"
    ctx.fillText(score,canvas.width-100,60,50)
  }
}//board

class Vampire{
  constructor(){
    this.x=Math.floor(Math.random()*canvas.width)
    this.y=400
    this.cachoX = 0
    this.w=255/4
    this.horizontal = bool
    bool = !bool
    this.vertical = false
    this.image = new Image()
    this.image.src='Thebat.png'
    this.h=this.image.naturalHeight
    //this.movimientos=[this.moveRight,this.moveLeft,this.moveDown,this.moveTop]
    //this.speed = Math.floor((Math.random()*5)+2)
  }
  draw(){
    if(this.vertical){this.moveDown()}
    else{this.moveTop()}
    if(this.horizontal){this.moveRight()}
    else{this.moveLeft()}

    //draw 
    if(frames%10==0) this.changeSprite()
    ctx.drawImage(this.image,this.cachoX,0,this.w,this.h,this.x,this.y,this.w,this.h)
  }

  changeSprite(){
    this.cachoX+=this.w
    if(this.cachoX>this.image.naturalWidth-this.w) this.cachoX=0
  }

  moveRight(){
    if(this.x<(canvas.width-this.w)){this.x+=2}
    else{this.horizontal=false}
  }
  moveLeft(){
    if(this.x>=0){this.x-=2}
    else{
        this.horizontal=true
    }
  }
  moveDown(){
    if(this.y<500){this.y+=2}
    else{this.vertical=false}
  }
  moveTop(){
    if(this.y>=0){this.y-=2}
    else{this.vertical=true}
  }
  crashWith(){
    return  (this.x<xClick)&&
            (this.x + this.w > xClick)&&
            (this.y < yClick)&&
            (this.y+this.h >yClick);
  }
  crashLoose(){
    return (this.y+this.h) === loose
  }
}//enemy

class Bullet{
  constructor(){
    this.x=0
    this.y=canvas.height
    this.w=50
    this.h=50
    this.image = new Image()
    this.image.src='img.png'
  }
  draw(){
    ctx.drawImage(this.image,this.x,this.y-60,this.w,this.h)
  }
}//bullet

class Municion{
  constructor(){
  this.x=250
  this.y=400
  this.w=50
  this.h=50
  this.vertical = false
  this.image = new Image()
  this.image.src='gun2.jpeg'
  }
  draw(){

    if(this.vertical){this.moveDown()}
    else{this.moveTop()}
    if(this.horizontal){this.moveRight()}
    else{this.moveLeft()}

    //dibuja
    ctx.drawImage(this.image,this.x,this.y,this.w,this.h)
  }
  moveRight(){
    if(this.x<(canvas.width-this.w)){this.x+=2}
    else{this.horizontal=false}
  }
  moveLeft(){
    if(this.x>=0){this.x-=2}
    else{
        this.horizontal=true
    }
  }
  moveDown(){
    if(this.y<500){this.y+=2}
    else{this.vertical=false}
  }
  moveTop(){
    if(this.y>=0){this.y-=2}
    else{this.vertical=true}
  }
  crashWith(){
    return  (this.x<xClick)&&
            (this.x + this.w > xClick)&&
            (this.y < yClick)&&
            (this.y+this.h >yClick);
  }
}

//objetos
var board = new Board()

//funciones principales

function start(){
  if(interval)return
  interval = setInterval(update,1000/60)
  enemies=[]
  municiones=[]
  frames = 0
}//start

function gameOver(){
  if(bullets.length===0){
  clearInterval(interval)
  ctx.fillStyle = "black"
  ctx.font="80px Avenir"
  ctx.fillText("Game Over",30,130)
  ctx.font="50px Avenir"
  ctx.fillText("Press esc to Start",40,180)
  interval=null
  frames = 0
  score = 0
  x=0
  createBullets()
  board.music.pause()
  board.music.currentTime=0
  }
} // gameOver

//funcion de iteracion
function update(){
  frames++
  ctx.clearRect(0,0,canvas.width,canvas.height)
  board.draw()  
  if(frames%100===0 && frames<1000){
    createEnemys()
    createEnemys()
  }
  if(frames%100===0 && frames>1000){
    createEnemys()
    createEnemys()
    createEnemys()
  //createEnemys()
    }
  if(frames%800===0){
    createMuniciones()
  }
  drawMuniciones()
  drawEnemys()
  checkCollision()
  checkReload()
  checkLoose()
  drawBullets()
  deleteMunition()
  gameOver()
  xClick=null
  yClick=null
} //update

//funciones auxilires
function createEnemys(){
  enemy = new Vampire()
  enemies.push(enemy)
}//create Enemy

function drawEnemys(){
  enemies.forEach(function(element){
    element.draw()
  }) 
} // drawEnemy

function checkCollision(){
  enemies.forEach(function(element){
    if(element.crashWith()){
      enemies.splice(enemies.indexOf(element),1)
      score++
    }
  })
}// checkCollision

function checkLoose(){
  enemies.forEach(function(element){
    if(element.crashLoose()){
      bullets.pop()
      enemies.splice(enemies.indexOf(element),1)
      pruebaloose++
      console.log(pruebaloose)
    }
  })
}//checkLoose 

function createMuniciones(){
  mun = new Municion()
  municiones.push(mun)
}//createMuniciones

function drawMuniciones(){
  municiones.forEach(function(element){
    element.draw()
  }) 
}//drawMuniciones

function checkReload(){
  municiones.forEach(function(element){
    if(element.crashWith()){
      municiones.splice(municiones.indexOf(element),1)
      var bullet = new Bullet()
      bullet.x=x
      x+=30
      bullets.push(bullet)
    }
  })
}

function createBullets(){
  for(i=0;i<3;i++){
    var bullet = new Bullet()
    if(i>0){
      bullet.x=x
      bullets.push(bullet)
      x += 30
    }else{
      bullets.push(bullet)
      x += 30
    }
  }
}// createBullets

function drawBullets(){
  bullets.forEach(function(element){
    element.draw()
  })
} //drawBullets

function deleteMunition(){
  if (frames ===1400){
    municiones.pop()
  }
}
createBullets()

//listenners
addEventListener("click",function(e){
  xClick = e.clientX-rect.left
  yClick = e.clientY-rect.top 
  //board.music2.play()
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
  if(e.keyCode===13){
    start()
    board.music.play()
    }
})

