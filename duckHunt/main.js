//canvas confiuration
var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');
//var rect = canvas.getBoundingClientRect()
var rect = canvas.getBBox()
var boton2 = document.getElementById('player2')

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
var bosses = []
var reds = []
var contador=0
var player2 = false

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
    this.cachoXE = 0
    this.w=255/4
    this.wE=242/7 
    this.horizontal = bool
    bool = !bool
    this.vertical = false
    this.image = new Image()
    this.image.src='Red.png'
    this.h=this.image.naturalHeight
    this.image2 = new Image()
    this.image2.src = 'explosion.png'
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
  changeSpriteE(){
  this.cachoXE+=this.wE
  if(this.cachoXE>this.image2.naturalWidth-this.wE) this.cachoXE=0
  }
  deathAnimation(){
      if(frames%60===0)this.changeSpriteE()
      ctx.drawImage(this.image2,this.cachoXE,0,this.wE,this.image2.naturalHeight,this.x,this.y,this.wE,this.image2.naturalHeight)
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
    return  (this.x-10<xClick)&&
            (this.x + this.w+10> xClick)&&
            (this.y-10< yClick)&&
            (this.y+this.h+10 >yClick);
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
  this.x=Math.floor(Math.random()*700)
  this.y=Math.floor(Math.random()*400)
  this.w=50
  this.h=50
  this.vertical = false
  this.image = new Image()
  this.image.src='gun.png'
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
            (this.y+this.h >yClick)
  }
}//municion

class Boss{
  constructor(){
  this.x = 350
  this.y = 400  
  this.w = 132
  this.cachoX=0
  this.vertical = true
  this.horizontal = true
  this.life = 30
  this.image = new Image()
  this.image.src='boss2.png'
  this.h = 100
  }
  draw(){
    if(this.vertical === true){
      this.moveTop()
    }
    if(this.vertical === false){
      if(this.horizontal){this.moveRight()}
      else{this.moveLeft()}
    }
    //Draw
    if(frames%15==0) this.changeSprite()
    ctx.drawImage(this.image,this.cachoX,0,this.w,this.h,this.x,this.y,this.w,this.h)
  }
  changeSprite(){
    this.cachoX+=this.w
    if(this.cachoX>this.image.naturalWidth-this.w) this.cachoX=0
  }
  moveTop(){
    if(this.y>=30)this.y-=5
    else this.vertical=false
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
  crashWith(){
    return  (this.x<xClick)&&
            (this.x + this.w > xClick)&&
            (this.y < yClick)&&
            (this.y+this.h >yClick)
  }

} // Boss

class redVamp{
  constructor(x,y){
    this.x = x
    this.y = y
    this.w = 255/4
    this.cachoX = 0
    this.horizontal=bool
    bool=!bool
    this.image = new Image()
    this.image.src='Thebat.png'
    this.h=this.image.naturalHeight
  }
  draw(){
    this.moveDown()
    if(this.horizontal){
      this.moveLeft()
    }else{this.moveRight()}
    
    //draw
    if(frames%10==0) this.changeSprite()
    ctx.drawImage(this.image,this.cachoX,0,this.w,this.h,this.x,this.y,this.w,this.h)    
    //ctx.fillStyle='red'
    //ctx.fillRect(this.x,this.y,this.w,this.h)
  }
  changeSprite(){
    this.cachoX+=this.w
    if(this.cachoX>this.image.naturalWidth-this.w) this.cachoX=0
  }
  moveDown(){
    this.y+=2
  }
  moveLeft(){
    if(this.x>=0)this.x-=3
    else this.horizontal=false
  }
  moveRight(){
    if(this.x<(canvas.width-this.w)) this.x+=3
    else this.horizontal=true
  }
  crashWith(){
    return  (this.x-10<xClick)&&
            (this.x + this.w+10> xClick)&&
            (this.y-10< yClick)&&
            (this.y+this.h+10>yClick)
  }
  crashLoose(){
    return this.y > loose
  }
} // redVamp

class Mira{
  constructor(){
    this.x=300
    this.y=400
    this.w=30
    this.h=30
    this.image = new Image()
    this.image.src='mira.png'
  }
  draw(){
    //draw
    ctx.drawImage(this.image,this.x,this.y,this.w,this.h)
  }
  moveLeft(){
    this.x-=50
  }
  moveRight(){
    this.x+=50
  }
  moveDown(){
    this.y+=50
  }
  moveTop(){
    this.y-=50
  }
  crashWith(item){
    return  (this.x < item.x + item.w)&&
            (this.x + this.w > item.x)&&
            (this.y < item.y + item.h)&&
            (this.y+this.h >item.y)
  }

} // Mira

//objetos
var board = new Board()
var mira = new Mira()
var boss = new Boss()
bosses.push(boss)


//funciones principales
function start(){
  if(interval)return
  interval = setInterval(update,1000/60)
  enemies=[]
  municiones=[]
  frames = 0
}//start

function win(){
  if(bosses[0].life===0){
  clearInterval(interval)
  ctx.fillStyle = "black"
  ctx.font="80px Avenir"
  ctx.fillText("Ganaste Perro",30,130)
  ctx.font="50px Avenir"
  ctx.fillText("Press enter to Start",40,180)
  interval=null
  frames = 0
  score = 0
  x=0
  bosses[0].life=30
  reds=[]
  createBullets()
  board.music.pause()
  board.music.currentTime=0
  }
}// win

function gameOver(){
  if(bullets.length===0){
  clearInterval(interval)
  ctx.fillStyle = "black"
  ctx.font="80px Avenir"
  ctx.fillText("Game Over",30,130)
  ctx.font="50px Avenir"
  ctx.fillText("Press enter to Start",40,180)
  interval=null
  frames = 0
  score = 0
  x=0
  bosses[0].life=30
  reds=[]
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
  if(frames%100===0 && score<20 && player2===false){
    createEnemys()
    createEnemys()
  }
  if(frames%100===0 && score<20 && player2===true){
    createEnemys()
    createEnemys()
    createEnemys()
    createEnemys()
  }
  if(frames%100===0 && score>19 && score<50 && player2 === false){
    createEnemys()
    createEnemys()
    createEnemys()
    }
  if(frames%100===0 && score>19 && score<50 && player2 === true){
    createEnemys()
    createEnemys()
    createEnemys()
    createEnemys()
    createEnemys()
    }
  if(frames%800===0){
    createMuniciones()
  }
  if(frames%90 === 0 && score>50 && player2===false){
    createRed()
    createRed()
  }
  if(frames%70 === 0 && score>50 && player2===true){
    createRed()
    createRed()
    createRed()
  }
  if(score>49)drawBoss()
  if(player2)mira.draw()
  drawReds()
  drawMuniciones()
  drawEnemys()
  checkCollision()
  checkCollisionRed()
  checkCollisionBoss()
  checkReload()
  checkLoose()
  checkLooseRed()
  drawBullets()
  deleteMunition()
  gameOver()
  win()
  xClick=null
  yClick=null
  //console.log(frames)
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
      element.deathAnimation()
      enemies.splice(enemies.indexOf(element),1)
      score++
    }
  })
}// checkCollision

function checkCollisionRed(){
  reds.forEach(function(element){
    if(element.crashWith()){
      reds.splice(reds.indexOf(element),1)
      score++
    }
  })
} // checkCollisionRed

function checkCollisionBoss(){
  if(bosses[0].crashWith()){
    bosses[0].life--
  }
}

function checkCollisionMira(){
    enemies.forEach(function(element){
      if(mira.crashWith(element)){
        element.deathAnimation()
        enemies.splice(enemies.indexOf(element),1)
        score++
      }
    })
    municiones.forEach(function(element){
      if(mira.crashWith(element)){
        municiones.splice(municiones.indexOf(element),1)
        var bullet = new Bullet()
        bullet.x=x
        x+=30
        bullets.push(bullet)
      }
    })
    reds.forEach(function(element){
      if(mira.crashWith(element)){
        reds.splice(reds.indexOf(element),1)
        score++
      }
    })
    bosses.forEach(function(element){
      if(mira.crashWith(element)){
        bosses[0].life--
      }
    })

}

function checkLoose(){
  enemies.forEach(function(element){
    if(element.crashLoose()){
      bullets.pop()
      enemies.splice(enemies.indexOf(element),1)
      pruebaloose++
    }
  })
}//checkLoose 

function checkLooseRed(){
  reds.forEach(function(element){
    if(element.crashLoose()){
      bullets.pop()
      reds.splice(reds.indexOf(element),1)
    }
  })
} // cheackLooseRed

function createMuniciones(){
  mun = new Municion()
  municiones.push(mun)
}//createMuniciones

function drawMuniciones(){
  municiones.forEach(function(element){
    contador++
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
} // checkReload

function createBullets(){
  for(i=0;i<4;i++){
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
  if (contador===600){
    municiones.pop()
    contador = 0
  }
}//deleteMunition

function drawBoss(){
  bosses.forEach(function(element){
  element.draw()
  })
} // drawBoss

function createRed(){
  red = new redVamp((bosses[0].x+(bosses[0].w)/2),(bosses[0].y+70))
  reds.push(red)
}//creatRed

function drawReds(){
  reds.forEach(function(element){
  element.draw()
  })
}

createBullets() // Inicia la instancias de las balas iniciales

//listenners
addEventListener("click",function(e){
  xClick = e.clientX-rect.left
  yClick = e.clientY-rect.top 
  console.log(xClick)
  console.log(yClick)
})

addEventListener('keydown',function(e){
  e.preventDefault()
  switch (e.keyCode) {
    case 87:
      mira.moveTop()
    break
    case 83:
      mira.moveDown()
    break
    case 65:
      mira.moveLeft()
    break
    case 68:
      mira.moveRight()
    break
    case 32:
      checkCollisionMira()
    break
  }
})

addEventListener('keydown',function(e){
  if(e.keyCode===13){
    start()
    board.music.play()
    }
})
boton2.onclick=function(){
  console.log('pA2')
  player2=true
}
