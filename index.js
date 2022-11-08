const canvas = document.getElementById('canvas');
$(canvas).attr('width',screen.availWidth*0.8)
$(canvas).attr('height',screen.availWidth*0.4)
const vw = parseInt($('#canvas').css('width'))/100;
var ctx = canvas.getContext('2d');
var width = parseInt($('#canvas').css('width'));
var height = parseInt($('#canvas').css('height'));
const downBrickImg  = document.getElementById('downBrick')
var gem1fall = false;
var gem1falle = true;
var gem2fall = false;
var gem2falle = true;
var gem3fall = false;
var gem3falle = true;

class Paddle {
   constructor(w,h){
    var img= new Image()
    img.src = "./img/brickPlate.png"
    this.image = img
    this.width = vw*10;
    this.height = vw*3;
    this.x = w/2 - this.width/2;
    this.y= h-this.height-vw*5;
    this.velocity = 1
    }
   draw(ctx){
    ctx.drawImage(this.image,this.x,this.y, this.width, this.height)
    //ctx.fillRect(this.x,this.y, this.width, this.height) 
   }
   updatel(ctx){
    
    this.velocity =(3*vw)
    this.x -= (this.velocity)
    paddle.draw(ctx)
   }
   updater(ctx){
      
      this.velocity =(3*vw)
      this.x +=this.velocity
      paddle.draw(ctx) 
}   
}
///////////// ball ////////////

class Ball {
  constructor(w,h){
    var img= new Image()
    img.src = "./img/lavaBall1.png"
    this.image = img
    this.height = 2*vw;
    this.width = 2*vw;
    this.x=w/2 - this.width/2;
    this.y=h-this.height-vw*7;
    this.speed={x:(0.45*vw),y:(0.45*vw)}
    this.rotate =1
  }
  draw(ctx){
    ctx.drawImage(this.image,this.x,this.y, this.width, this.height)
   }
  update(ctx){
    this.x+=this.speed.x
    this.y+=this.speed.y
    this.rotate+=1
    if(this.y+this.height > paddle.y && this.x+this.width > paddle.x && this.x+this.width < paddle.x+paddle.width){
      this.speed.y = - this.speed.y;
      var a = ['l','r']
      var item = a[Math.floor(Math.random() * a.length)];
      if(item=='l'){
        this.speed.x = - this.speed.x;
      }else{
        this.speed.x = this.speed.x;
      }
      paddle.y+=3
      paddle.draw(ctx)
      setTimeout(()=>{
        paddle.y-=3
        paddle.draw(ctx)
      },80)
    }
    else if(this.y==0&& this.x==0){
      this.speed.x = -this.speed.x
      this.speed.y = -this.speed.y
    }
    else if(this.y+this.height > paddle.y+paddle.height-(2*vw)){
      this.x=parseInt($('#canvas').css('width'))/2 - vw*2/2;
      this.y=parseInt($('#canvas').css('height'))-vw*10.5;
      paddle.x=parseInt($('#canvas').css('width'))/2 - vw*10/2;
      paddle.y=parseInt($('#canvas').css('height'))-vw*8;
      this.speed.y = - this.speed.y
      clearInterval(rightgo)
      clearInterval(leftgo)
    }
    else if(this.x+this.width > width || this.x<0){
      this.speed.x = -this.speed.x
    }
    else if(this.y<0){
      this.speed.y = - this.speed.y
    }
  
    for (let i = 0; i < allbricks.length; i++) {
        if(ball.y+ball.height < (allbricks[i][0].y+allbricks[i][0].bheight) && ball.y+ball.height > allbricks[i][0].y || ball.y<(allbricks[i][0].y+allbricks[i][0].bheight)&& ball.y>allbricks[i][0].y){
         if(ball.x<allbricks[i][0].x+allbricks[i][0].bwidth){
          if((allbricks[i][0].x)<ball.x){
            this.speed.y= - this.speed.y
            if(allbricks[i]['name']==3 && gem1falle==true){gem1fall=true;gem1falle=false}
            if(allbricks[i]['name']==14 && gem2falle==true){gem2fall=true;gem2falle=false}
            if(allbricks[i]['name']==17 && gem3falle==true){gem3fall=true;gem3falle=false}
            allbricks.splice(allbricks.indexOf(allbricks[i]),1)
          }
         }
         else{
          if(ball.x+ball.width>=allbricks[i][0].x &&(allbricks[i][0].x+allbricks[i][0].bwidth)>=ball.x+ball.width){
            this.speed.y= - this.speed.y
            if(allbricks[i]['name']==3 && gem1falle==true){gem1fall=true;gem1falle=false}
            if(allbricks[i]['name']==14 && gem2falle==true){gem2fall=true;gem2falle=false}
            if(allbricks[i]['name']==17 && gem3falle==true){gem3fall=true;gem3falle=false}
            allbricks.splice(allbricks.indexOf(allbricks[i]),1)
          }}
        }
    }
    ball.draw(ctx)
  } 
}
var paddle = new Paddle(width,height)
var ball = new Ball(width,height)
paddle.draw(ctx)
var leftgo;
var rightgo;


document.getElementById('left').onmousedown=(e)=>{
  clearInterval(rightgo)
 leftgo= setInterval(()=>{
    if(paddle.x> 0){
      paddle.updatel(ctx)}
      else{paddle.velocity=0}
  },50)
  document.getElementById('left').style.transform = 'scale(0.9)'
}
document.getElementById('left').onmouseup=(e)=>{
  clearInterval(leftgo)
  document.getElementById('left').style.transform = 'scale(1)'
}



document.getElementById('right').onmousedown=()=>{
  clearInterval(leftgo)
  rightgo = setInterval(()=>{
    if(paddle.x+paddle.width<width){
      paddle.updater(ctx) }
      else{paddle.velocity=0}
     },50)
     document.getElementById('right').style.transform = 'scale(0.9)'

}
document.getElementById('right').onmouseup=(e)=>{
  clearInterval(rightgo)
  document.getElementById('right').style.transform = 'scale(1)'
}







document.getElementById('left').ontouchstart=(e)=>{
  leftgo= setInterval(()=>{
     if(paddle.x> 0){
       paddle.updatel(ctx)}
       else{paddle.velocity=0}
   },30)
 }
 document.getElementById('left').ontouchend=(e)=>{
  clearInterval(leftgo)
}
 document.getElementById('right').ontouchstart=()=>{
  rightgo = setInterval(()=>{
    if(paddle.x+paddle.width<width){
      paddle.updater(ctx) }
      else{paddle.velocity=0}
     },30)
}
document.getElementById('right').ontouchend=(e)=>{
  clearInterval(rightgo)
}

var keypress=0;
document.onkeydown=(e)=>{
  if(e.key == "ArrowLeft" && keypress==0){
    clearInterval(rightgo)
    keypress=1
    leftgo= setInterval(()=>{
      if(paddle.x> 0){
        paddle.updatel(ctx)}
        else{paddle.velocity=0}
    },35)
  }
  else if(e.key == "ArrowRight" && keypress==0){
    clearInterval(leftgo)
    keypress=1
    rightgo = setInterval(()=>{
      if(paddle.x+paddle.width<width){
        paddle.updater(ctx) }
        else{paddle.velocity=0}
       },35)
   }
  }
document.onkeyup=(e)=>{
  if(e.key == "ArrowLeft"){
    paddle.velocity=0;
    keypress=0;
    clearInterval(leftgo)

  }
  else if(e.key == "ArrowRight"){
    paddle.velocity=0;
    clearInterval(rightgo)
    keypress=0;
  }
}


///////// down brick /////////////

class downbrick{
  constructor(){
    var img = new Image();
    img.src = './img/bricks wall.png'
    this.image = img
    this.height=50;
    this.y=height-this.height;
    this.x=0;
  }
  draw(ctx){
    ctx.drawImage(this.image , this.x, this.y)
  }
}

var downBrick = new downbrick();


///////// bricks /////////////

class bricks{
  constructor(t,src){
    var img = new Image();
    img.src = src
    this.image = img
    this.height=50
    this.y=(6*vw)+this.height;
    this.x=10+t;
    this.bwidth = vw*8
    this.bheight = vw*4
  }
  draw(ctx){
    ctx.drawImage(this.image , this.x, this.y,this.bwidth,this.bheight)
  }
}
class bricks2{
  constructor(t,src){
    var img = new Image();
    img.src = src
    this.image = img
    this.height=50
    this.y=(2*vw)+this.height;
    this.x=(25*vw+t);
    this.bwidth = vw*5
    this.bheight = vw*3
  }
  draw(ctx){
    ctx.drawImage(this.image , this.x, this.y,this.bwidth,this.bheight)
  }
}

var allbricks=[]
var allbricks1=[]
for (let i = 0; i < 12; i++) {
  var src;
  if(i %2 ==0){
   src='./img/bricks1.png'
  }else{src='./img/bricks2.png'}
  allbricks.push({0:new bricks((vw*8)*i,src),'name':allbricks.length+1})
}
for (let i = 0; i < 6; i++) {
  var src;
  if(i %2 ==0){
   src='./img/bricks1.png'
  }else{src='./img/bricks2.png'}
  allbricks.push({0:new bricks2((vw*16)*i,src),'name':allbricks.length+1})
}
console.log(allbricks[2]['name'])
class gems{
  constructor(x,y){
    var img = new Image();
    img.src = './img/gems1.png'
    this.image = img
    this.height=50
    this.velocity=0
    this.y= y;
    this.x=x;
    this.bwidth = vw*2
    this.bheight = vw*2

  }
  draw(ctx){
    ctx.drawImage(this.image , this.x, this.y,this.bwidth,this.bheight)
  }
  update(ctx){
    this.velocity +=0.32
    this.y+=0+this.velocity
    ctx.drawImage(this.image , this.x, this.y,this.bwidth,this.bheight)
  }
}
var gem1 = new gems((vw*20),(vw*9))
var gem2 = new gems((vw*42),(vw*5))
var gem3 = new gems((vw*90),(vw*4.8))

function gameloop(){
  ctx.clearRect(0,0,width,height)
  var image = new Image()
  image.src= './img/5386360.jpg'
  ctx.drawImage(image,0,0,width,height)
  paddle.draw(ctx)
  allbricks.forEach(element => {
    element[0].draw(ctx)
  });
  ball.update(ctx)
  if(gem1fall==true){
    gem1.update(ctx)
    setTimeout(()=>{gem1fall=1},2000)
  }else if(gem1fall==false){
    gem1.draw(ctx)
  }
  if(gem2fall==true){
    gem2.update(ctx)
    setTimeout(()=>{gem2fall=1},2000)
  }else if(gem2fall==false){
    gem2.draw(ctx)
  }
  if(gem3fall==true){
    gem3.update(ctx)
    setTimeout(()=>{gem3fall=1},2000)
  }else if(gem3fall==false){
    gem3.draw(ctx)
  }
  downBrick.draw(ctx)
  requestAnimationFrame(gameloop)
}
gameloop()