const canvas1 = document.getElementById('canvas1');
$(canvas1).attr('width',screen.availWidth*0.8)
$(canvas1).attr('height',screen.availWidth*0.4)
var ctx1 = canvas1.getContext('2d');
var width = parseInt($('#canvas1').css('width'));
var height = parseInt($('#canvas1').css('height'));
const downBrickImgs  = document.getElementById('downBrick')
var gem1falls = false;
var gem1falles = true;
var gem2falls = false;
var gem2falles = true;
var gem3falls = false;
var gem3falles = true;

//////// paddle ///////
class Paddles {
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
     //ctx1.fillRect(this.x,this.y, this.width, this.height) 
    }
    updatel(ctx1){
     
     this.velocity =(3*vw)
     this.x -= (this.velocity)
     paddles.draw(ctx1)
    }
    updater(ctx1){
       
       this.velocity =(3*vw)
       this.x +=this.velocity
       paddles.draw(ctx1) 
 }   
 }

 ///////// ball ///////
 class Balls {
    constructor(w,h){
      var img= new Image()
      img.src = "./img/snowball.png"
      this.image = img
      this.height = 2*vw;
      this.width = 2*vw;
      this.x=w/2 - this.width/2;
      this.y=h-this.height-vw*7;
      this.speed={x:(0.45*vw),y:(0.45*vw)}
    }
    draw(ctx1){
      ctx1.drawImage(this.image,this.x,this.y, this.width, this.height)
     }
    update(ctx1){
      this.x+=this.speed.x
      this.y+=this.speed.y
      if(this.y+this.height > paddles.y && this.x+this.width > paddles.x && this.x+this.width < paddles.x+paddles.width){
        this.speed.y = - this.speed.y;
        var a = ['l','r']
        var item = a[Math.floor(Math.random() * a.length)];
        if(item=='l'){
          this.speed.x = - this.speed.x;
        }else{
          this.speed.x = this.speed.x;
        }
        paddles.y+=3
        paddles.draw(ctx1)
        setTimeout(()=>{
          paddles.y-=3
          paddles.draw(ctx1)
        },80)
      }
      else if(this.y==0&& this.x==0){
        this.speed.x = -this.speed.x
        this.speed.y = -this.speed.y
      }
      else if(this.y+this.height > paddles.y+paddles.height-(2*vw)){
        this.x=parseInt($('#canvas').css('width'))/2 - vw*2/2;
        this.y=parseInt($('#canvas').css('height'))-vw*10.5;
        paddles.x=parseInt($('#canvas').css('width'))/2 - vw*10/2;
        paddles.y=parseInt($('#canvas').css('height'))-vw*8;
        this.speed.y = - this.speed.y
        clearInterval(rightgos)
        clearInterval(leftgos)
      }
      else if(this.x+this.width > width || this.x<0){
        this.speed.x = -this.speed.x
      }
      else if(this.y<0){
        this.speed.y = - this.speed.y
      }
    
      for (let i = 0; i < allbrickss.length; i++) {
          if(balls.y+balls.height < (allbrickss[i][0].y+allbrickss[i][0].bheight) && balls.y+balls.height > allbrickss[i][0].y || balls.y<(allbrickss[i][0].y+allbrickss[i][0].bheight)&& balls.y>allbrickss[i][0].y){
           if(balls.x<allbrickss[i][0].x+allbrickss[i][0].bwidth){
            if((allbrickss[i][0].x)<balls.x){
              this.speed.x= - this.speed.x
              if(allbrickss[i]['name']==2 && gem1falles==true){gem1falls=true;gem1falles=false}
              if(allbrickss[i]['name']==7 && gem2falles==true){gem2falls=true;gem2falles=false}
              if(allbrickss[i]['name']==11 && gem3falles==true){gem3falls=true;gem3falles=false}
              allbrickss.splice(allbrickss.indexOf(allbrickss[i]),1)
            }
           }
           else{
            if(balls.x+balls.width>=allbrickss[i][0].x &&(allbrickss[i][0].x+allbrickss[i][0].bwidth)>=balls.x+balls.width){
              this.speed.x= - this.speed.x
              if(allbrickss[i]['name']==2 && gem1falles==true){gem1falls=true;gem1falles=false}
              if(allbrickss[i]['name']==7 && gem2falles==true){gem2falls=true;gem2falles=false}
              if(allbrickss[i]['name']==11 && gem3falles==true){gem3falls=true;gem3falles=false}
              allbrickss.splice(allbrickss.indexOf(allbrickss[i]),1)
            }}
          }
      }
      balls.draw(ctx1)
    } 
  }
  var paddles = new Paddles(width,height)
  var balls = new Balls(width,height)
  paddles.draw(ctx1)
  var leftgos;
var rightgos;

  document.getElementById('left').onmousedown=(e)=>{
    clearInterval(rightgos)
   leftgos= setInterval(()=>{
      if(paddles.x> 0){
        paddles.updatel(ctx1)}
        else{paddles.velocity=0}
    },50)
    document.getElementById('left').style.transform = 'scale(0.9)'
  }
  document.getElementById('left').onmouseup=(e)=>{
    clearInterval(leftgos)
    document.getElementById('left').style.transform = 'scale(1)'
  }
  
  
  
  document.getElementById('right').onmousedown=()=>{
    clearInterval(leftgos)
    rightgos = setInterval(()=>{
      if(paddles.x+paddles.width<width){
        paddles.updater(ctx1) }
        else{paddles.velocity=0}
       },50)
       document.getElementById('right').style.transform = 'scale(0.9)'
  
  }
  document.getElementById('right').onmouseup=(e)=>{
    clearInterval(rightgos)
    document.getElementById('right').style.transform = 'scale(1)'
  }
  
  
  
  
  
  
  
  document.getElementById('left').ontouchstart=(e)=>{
    leftgos= setInterval(()=>{
       if(paddles.x> 0){
         paddles.updatel(ctx1)}
         else{paddles.velocity=0}
     },30)
   }
   document.getElementById('left').ontouchend=(e)=>{
    clearInterval(leftgos)
  }
   document.getElementById('right').ontouchstart=()=>{
    rightgos = setInterval(()=>{
      if(paddles.x+paddles.width<width){
        paddles.updater(ctx1) }
        else{paddles.velocity=0}
       },30)
  }
  document.getElementById('right').ontouchend=(e)=>{
    clearInterval(rightgos)
  }
  
  var keypress=0;
  document.onkeydown=(e)=>{
    if(e.key == "ArrowLeft" && keypress==0){
      clearInterval(rightgos)
      keypress=1
      leftgos= setInterval(()=>{
        if(paddles.x> 0){
          paddles.updatel(ctx1)}
          else{paddles.velocity=0}
      },35)
    }
    else if(e.key == "ArrowRight" && keypress==0){
      clearInterval(leftgos)
      keypress=1
      rightgos = setInterval(()=>{
        if(paddles.x+paddles.width<width){
          paddles.updater(ctx1) }
          else{paddles.velocity=0}
         },35)
     }
    }
  document.onkeyup=(e)=>{
    if(e.key == "ArrowLeft"){
      paddles.velocity=0;
      keypress=0;
      clearInterval(leftgos)
  
    }
    else if(e.key == "ArrowRight"){
      paddles.velocity=0;
      clearInterval(rightgos)
      keypress=0;
    }
  }

  ///////// down brick /////////////

class downbricks{
    constructor(){
      var img = new Image();
      img.src = './img/snowStone.png'
      this.image = img
      this.height=50;
      this.y=height-this.height;
      this.x=0;
    }
    draw(ctx1){
      ctx1.drawImage(this.image , this.x, this.y)
    }
  }
  
  var downBricks = new downbricks();
  
  
  ///////// bricks /////////////

  class brickss{
    constructor(t,src){
      var img = new Image();
      img.src = src
      this.image = img
      this.height=vw*2
      this.y=(2*vw)+this.height+t
      this.x=10;
      this.bwidth = vw*9
      this.bheight = vw*4
    }
    draw(ctx1){
      ctx1.drawImage(this.image , this.x, this.y,this.bwidth,this.bheight)
    }
  }
  class bricks2s{
    constructor(t,src){
      var img = new Image();
      img.src = src
      this.image = img
      this.height=50
      this.y=(2*vw)+this.height+t
      this.x=(25*vw);
      this.bwidth = vw*9
      this.bheight = vw*4
    }
    draw(ctx1){
      ctx1.drawImage(this.image , this.x, this.y,this.bwidth,this.bheight)
    }
  }
  class bricks3s{
    constructor(t,src){
      var img = new Image();
      img.src = src
      this.image = img
      this.height= vw*1
      this.y=(1*vw)+this.height+t
      this.x=(85*vw);
      this.bwidth = vw*9
      this.bheight = vw*4
    }
    draw(ctx1){
      ctx1.drawImage(this.image , this.x, this.y,this.bwidth,this.bheight)
    }
  }
  
  var allbrickss=[]
  var allbricks1s=[]
  for (let i = 0; i < 6; i++) {
    var src;
    if(i %2 ==0){
     src='./img/bricks1.png'
    }else{src='./img/snowbrick.png'}
    allbrickss.push({0:new brickss((vw*6)*i,src),'name':allbrickss.length+1})
  }
  for (let i = 0; i < 3; i++) {
    var src;
    if(i %2 ==0){
     src='./img/bricks1.png'
    }else{src='./img/snowbrick.png'}
    allbrickss.push({0:new bricks2s((vw*8)*i,src),'name':allbrickss.length+1})
  }
  for (let i = 0; i < 6; i++) {
    var src;
    if(i %2 ==0){
     src='./img/bricks1.png'
    }else{src='./img/snowbrick.png'}
    allbrickss.push({0:new bricks3s((vw*6)*i,src),'name':allbrickss.length+1})
  }

  class gemss{
    constructor(x,y){
      var img = new Image();
      img.src = './img/gems2.png'
      this.image = img
      this.height=50
      this.velocity=0
      this.y= y;
      this.x=x;
      this.bwidth = vw*2
      this.bheight = vw*2
  
    }
    draw(ctx1){
      ctx1.drawImage(this.image , this.x, this.y,this.bwidth,this.bheight)
    }
    update(ctx1){
      this.velocity +=0.32
      this.y+=0+this.velocity
      ctx1.drawImage(this.image , this.x, this.y,this.bwidth,this.bheight)
    }
  }
  var gem1s = new gemss((vw*6),(vw*8))
  var gem2s = new gemss((vw*30),(vw*5))
  var gem3s = new gemss((vw*90),(vw*6.2))
  
class snow{
    constructor(x,y,r){
      this.velocity=0
      this.x=x
      this.y= y
      this.radius = r
      
    }

    update(ctx1){
        this.velocity +=0.005
        this.y += this.velocity
        ctx1.beginPath();
        ctx1.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx1.fillStyle = "white"
        ctx1.fill()
       
    }
}
var allsnows = []
var snowfall = true;


  function gameloops(){
    if(snowfall !== false && allsnows.length<25){
      snowfall = false
      setTimeout(()=>{snowfall=true},1000)
    for (let index = 0; index < 1; index++) {
      var x = Math.random()*width
      var y = Math.random()*(vw*2)
      var r = Math.random()*(vw*1)
      if(r<5){r=5}
      allsnows.push({0: new snow(x,-y,r),name: allsnows.length })
    }}
    ctx1.clearRect(0,0,width,height)
    var image = new Image()
    image.src= './img/16633.jpg'
    ctx1.drawImage(image,0,0,width,height)
    paddles.draw(ctx1)
    allbrickss.forEach(element => {
      element[0].draw(ctx1)
    });
    if(gem1falls==true){
      gem1s.update(ctx1)
      setTimeout(()=>{gem1falls=1},2000)
    }else if(gem1falls==false){
      gem1s.draw(ctx1)
    }
    if(gem2falls==true){
      gem2s.update(ctx1)
      setTimeout(()=>{gem2falls=1},2000)
    }else if(gem2falls==false){
      gem2s.draw(ctx1)
    }
    if(gem3falls==true){
      gem3s.update(ctx1)
      setTimeout(()=>{gem3falls=1},2000)
    }else if(gem3falls==false){
      gem3s.draw(ctx1)
    }
    allsnows.forEach(element => {
      if(element[0].y>parseInt(screen.availWidth)){
        element[0].velocity=0;
        element[0].y=0
        var x = Math.random()*width
        element[0].x = x
       }
      element[0].update(ctx1)
    });
    downBricks.draw(ctx1)
    balls.update(ctx1)
    requestAnimationFrame(gameloops)
  }
  gameloops()