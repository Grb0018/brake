const canvas2 = document.getElementById('canvas2');
$(canvas2).attr('width',window.innerWidth)
$(canvas2).attr('height',window.innerHeight)
var ctx2 = canvas2.getContext('2d');

var width = parseInt($('#canvas2').css('width'));
var height = parseInt($('#canvas2').css('height'));
let vw = parseInt($('#canvas').css('width'))/100;
const downBrickImgs2  = document.getElementById('downBrick')
var gem1falls2 = false;
var gem1falles2 = true;
var gem2falls2 = false;
var gem2falles2 = true;
var gem3falls2 = false;
var gem3falles2 = true;

//////// paddle ///////
class Paddles2 {
    constructor(w,h){
     var img= new Image()
     img.src = "./img/brickPlate.png"
     this.image = img
     this.width = vw*6;
     this.height = vw*1.8;
     this.x = w/2 - this.width/2;
     this.y= h-this.height-vw*5;
     this.velocity = 1
     }
    draw(ctx2){
     ctx2.drawImage(this.image,this.x,this.y, this.width, this.height)
     //ctx1.fillRect(this.x,this.y, this.width, this.height) 
    }
    updatel(ctx2){
     
     this.velocity =(3*vw)
     this.x -= (this.velocity)
     paddles2.draw(ctx2)
    }
    updater(ctx2){
       
       this.velocity =(3*vw)
       this.x +=this.velocity
       paddles2.draw(ctx2) 
 }   
 }

 ///////// ball ///////
 class Balls2 {
    constructor(w,h){
      var img= new Image()
      img.src = "./img/snowball.png"
      this.image = img
      this.height = 1.3*vw;
      this.width = 1.3*vw;
      this.x=w/2 - this.width/2;
      this.y=h-this.height-vw*7;
      this.speed={x:(0.45*vw),y:(0.45*vw)}
    }
    draw(ctx2){
      ctx2.drawImage(this.image,this.x,this.y, this.width, this.height)
     }
    update(ctx2){
      this.x+=this.speed.x
      this.y+=this.speed.y
      if(this.y+this.height > paddles2.y && this.x+this.width > paddles2.x && this.x+this.width < paddles2.x+paddles2.width){
        this.speed.y = - this.speed.y;
        var a = ['l','r']
        var item = a[Math.floor(Math.random() * a.length)];
        if(item=='l'){
          this.speed.x = - this.speed.x;
        }else{
          this.speed.x = this.speed.x;
        }
        paddles2.y+=3
        paddles2.draw(ctx2)
        setTimeout(()=>{
          paddles2.y-=3
          paddles2.draw(ctx2)
        },80)
      }
      else if(this.y==0&& this.x==0){
        this.speed.x = -this.speed.x
        this.speed.y = -this.speed.y
      }
      else if(this.y+this.height > paddles2.y+paddles2.height-(2*vw)){
        this.x=parseInt($('#canvas2').css('width'))/2 - vw*2/2;
        this.y=parseInt($('#canvas2').css('height'))-vw*10.5;
        paddles2.x=parseInt($('#canvas2').css('width'))/2 - vw*10/2;
        paddles2.y=parseInt($('#canvas2').css('height'))-vw*8;
        this.speed.y = - this.speed.y
        clearInterval(rightgos2)
        clearInterval(leftgos2)
      }
      else if(this.x+this.width > width || this.x<0){
        this.speed.x = -this.speed.x
      }
      else if(this.y<0){
        this.speed.y = - this.speed.y
      }
    
      for (let i = 0; i < allbrickss2.length; i++) {
          if(balls2.y+balls2.height < (allbrickss2[i][0].y+allbrickss2[i][0].bheight) && balls2.y+balls2.height > allbrickss2[i][0].y || balls2.y<(allbrickss2[i][0].y+allbrickss2[i][0].bheight)&& balls2.y>allbrickss2[i][0].y){
           if(balls2.x<allbrickss2[i][0].x+allbrickss2[i][0].bwidth){
            if((allbrickss2[i][0].x)<balls2.x){
              this.speed.y = - this.speed.y
              if(allbrickss2[i]['name']==7 && gem1falles2==true){gem1falls2=true;gem1falles2=false}
              if(allbrickss2[i]['name']==8 && gem2falles2==true){gem2falls2=true;gem2falles2=false}
              if(allbrickss2[i]['name']==31 && gem3falles2==true){gem3falls2=true;gem3falles2=false}
              allbrickss2.splice(allbrickss2.indexOf(allbrickss2[i]),1)
            }
           }
           else{
            if(balls2.x+balls2.width>=allbrickss2[i][0].x &&(allbrickss2[i][0].x+allbrickss2[i][0].bwidth)>=balls2.x+balls2.width){
              this.speed.y = - this.speed.y
              if(allbrickss2[i]['name']==7 && gem1falles2==true){gem1falls2=true;gem1falles2=false}
              if(allbrickss2[i]['name']==8 && gem2falles2==true){gem2falls2=true;gem2falles2=false}
              if(allbrickss2[i]['name']==31 && gem3falles2==true){gem3falls2=true;gem3falles2=false}
              allbrickss2.splice(allbrickss2.indexOf(allbrickss2[i]),1)
            }}
          }
      }
      balls2.draw(ctx2)
    } 
  }
  var paddles2 = new Paddles2(width,height)
  var balls2 = new Balls2(width,height)
  paddles2.draw(ctx2)
  var leftgos2;
var rightgos2;

  document.getElementById('left').onmousedown=(e)=>{
    clearInterval(rightgos2)
   leftgos2= setInterval(()=>{
      if(paddles2.x> 0){
        paddles2.updatel(ctx2)}
        else{paddles2.velocity=0}
    },50)
    document.getElementById('left').style.transform = 'scale(0.9)'
  }
  document.getElementById('left').onmouseup=(e)=>{
    clearInterval(leftgos2)
    document.getElementById('left').style.transform = 'scale(1)'
  }
  
  
  
  document.getElementById('right').onmousedown=()=>{
    clearInterval(leftgos2)
    rightgos2 = setInterval(()=>{
      if(paddles2.x+paddles2.width<width){
        paddles2.updater(ctx2) }
        else{paddles2.velocity=0}
       },50)
       document.getElementById('right').style.transform = 'scale(0.9)'
  
  }
  document.getElementById('right').onmouseup=(e)=>{
    clearInterval(rightgos2)
    document.getElementById('right').style.transform = 'scale(1)'
  }
  
  
  
  
  
  
  
  document.getElementById('left').ontouchstart=(e)=>{
    leftgos2= setInterval(()=>{
       if(paddles2.x> 0){
         paddles2.updatel(ctx2)}
         else{paddles2.velocity=0}
     },30)
   }
   document.getElementById('left').ontouchend=(e)=>{
    clearInterval(leftgos2)
  }
   document.getElementById('right').ontouchstart=()=>{
    rightgos2 = setInterval(()=>{
      if(paddles2.x+paddles2.width<width){
        paddles2.updater(ctx2) }
        else{paddles2.velocity=0}
       },30)
  }
  document.getElementById('right').ontouchend=(e)=>{
    clearInterval(rightgos2)
  }
  
  var keypress=0;
  document.onkeydown=(e)=>{
    if(e.key == "ArrowLeft" && keypress==0){
      clearInterval(rightgos2)
      keypress=1
      leftgos2= setInterval(()=>{
        if(paddles2.x> 0){
          paddles2.updatel(ctx2)}
          else{paddles2.velocity=0}
      },35)
    }
    else if(e.key == "ArrowRight" && keypress==0){
      clearInterval(leftgos2)
      keypress=1
      rightgos2 = setInterval(()=>{
        if(paddles2.x+paddles2.width<width){
          paddles2.updater(ctx2) }
          else{paddles2.velocity=0}
         },35)
     }
    }
  document.onkeyup=(e)=>{
    if(e.key == "ArrowLeft"){
      paddles2.velocity=0;
      keypress=0;
      clearInterval(leftgos2)
  
    }
    else if(e.key == "ArrowRight"){
      paddles2.velocity=0;
      clearInterval(rightgos2)
      keypress=0;
    }
  }

  ///////// down brick /////////////

class downbricks2{
    constructor(){
      var img = new Image();
      img.src = './img/bricksWallnight.png'
      this.image = img
      this.height=(vw*5);
      this.width = parseInt($('#canvas2').css('width'))
      this.y=height-this.height;
      this.x=0;
    }
    draw(ctx2){
      ctx2.drawImage(this.image , this.x, this.y,this.width,this.height)
    }
  }
  
  var downBricks2 = new downbricks2();
  
  
  ///////// bricks /////////////

  class brickss2{
    constructor(t,src){
      var img = new Image();
      img.src = src
      this.image = img
      this.height=vw*1
      this.y=(2*vw)+this.height+t
      this.x=vw*2;
      this.bwidth = vw*4.5
      this.bheight = vw*3
    }
    draw(ctx2){
      ctx2.drawImage(this.image , this.x, this.y,this.bwidth,this.bheight)
    }
  }
  class bricks2s2{
    constructor(t,src){
      var img = new Image();
      img.src = src
      this.image = img
      this.height= vw*1
      this.y=(2*vw)+this.height+t
      this.x=(25*vw);
      this.bwidth = vw*4.5
      this.bheight = vw*3
    }
    draw(ctx2){
      ctx2.drawImage(this.image , this.x, this.y,this.bwidth,this.bheight)
    }
  }
  class bricks3s2{
    constructor(t,src){
      var img = new Image();
      img.src = src
      this.image = img
      this.height= vw*1
      this.y=(1*vw)+this.height+t
      this.x=(85*vw);
      this.bwidth = vw*4.5
      this.bheight = vw*3
    }
    draw(ctx2){
      ctx2.drawImage(this.image , this.x, this.y,this.bwidth,this.bheight)
    }
  }
  class bricks4s2{
    constructor(t,src){
      var img = new Image();
      img.src = src
      this.image = img
      this.height= vw*1
      this.y=(1*vw)+this.height+t
      this.x=(75*vw);
      this.bwidth = vw*4.5
      this.bheight = vw*3
    }
    draw(ctx2){
      ctx2.drawImage(this.image , this.x, this.y,this.bwidth,this.bheight)
    }
  }
  class bricks5s2{
    constructor(t,src){
      var img = new Image();
      img.src = src
      this.image = img
      this.height= vw*1
      this.y=(2*vw)+this.height+t
      this.x=(15*vw);
      this.bwidth = vw*4.5
      this.bheight = vw*3
    }
    draw(ctx2){
      ctx2.drawImage(this.image , this.x, this.y,this.bwidth,this.bheight)
    }
  }
  class bricks6s2{
    constructor(t,src){
      var img = new Image();
      img.src = src
      this.image = img
      this.height= vw*1
      this.y=(22*vw)+this.height
      this.x=(15*vw)+t
      this.bwidth = vw*3.5
      this.bheight = vw*2
    }
    draw(ctx2){
      ctx2.drawImage(this.image , this.x, this.y,this.bwidth,this.bheight)
    }
  }
  class cmbricks{
    constructor(x,y){
        var img = new Image();
        img.src = './img/bricks2N.png'
        this.image = img
        this.height= vw*1
        this.y=y
        this.x=x
        this.bwidth = vw*4.5
        this.bheight = vw*3
      }
      draw(ctx2){
        ctx2.drawImage(this.image , this.x, this.y,this.bwidth,this.bheight)
      }
  }
  
  var allbrickss2=[]
  var allbricks1s2=[]
  for (let i = 0; i < 6; i++) {
    var src;
    if(i %2 ==0){
     src='./img/bricks2N.png'
    }else{src='./img/bricks1N.png'}
    allbrickss2.push({0:new brickss2((vw*3)*i,src),'name':allbrickss2.length+1})
  }
  allbrickss2.push({0:new cmbricks((vw*8.5),(vw*10)),'name':allbrickss2.length+1})
  allbrickss2.push({0:new cmbricks((vw*8.5),(vw*18)),'name':allbrickss2.length+1})
  for (let i = 0; i < 6; i++) {
    var src;
    if(i %2 ==0){
     src='./img/bricks2N.png'
    }else{src='./img/bricks1N.png'}
    allbrickss2.push({0:new bricks5s2((vw*3)*i,src),'name':allbrickss2.length+1})
  }
  
  for (let i = 0; i < 3; i++) {
    var src;
    if(i %2 ==0){
     src='./img/bricks2N.png'
    }else{src='./img/bricks1N.png'}
    allbrickss2.push({0:new bricks2s2((vw*3.2)*i,src),'name':allbrickss2.length+1})
  }
  for (let i = 0; i < 6; i++) {
    var src;
    if(i %2 ==0){
     src='./img/bricks2N.png'
    }else{src='./img/bricks1N.png'}
    allbrickss2.push({0:new bricks3s2((vw*3)*i,src),'name':allbrickss2.length+1})
  }
  for (let i = 0; i < 6; i++) {
    var src;
    if(i %2 ==0){
     src='./img/bricks2N.png'
    }else{src='./img/bricks1N.png'}
    allbrickss2.push({0:new bricks4s2((vw*3)*i,src),'name':allbrickss2.length+1})
  }
  allbrickss2.push({0:new cmbricks((vw*80),(vw*2)),'name':allbrickss2.length+1})
  allbrickss2.push({0:new cmbricks((vw*80),(vw*10)),'name':allbrickss2.length+1})
  allbrickss2.push({0:new cmbricks((vw*80),(vw*17)),'name':allbrickss2.length+1})
  for (let i = 0; i < 20; i++) {
    var src;
    if(i %2 ==0){
     src='./img/bricks2N.png'
    }else{src='./img/bricks1N.png'}
    allbrickss2.push({0:new bricks6s2((vw*3)*i,src),'name':allbrickss2.length+1})
  }
  
  

  class gemss2{
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
    draw(ctx2){
      ctx2.drawImage(this.image , this.x, this.y,this.bwidth,this.bheight)
    }
    update(ctx2){
      this.velocity +=0.32
      this.y+=0+this.velocity
      ctx2.drawImage(this.image , this.x, this.y,this.bwidth,this.bheight)
    }
  }
  var gem1s2 = new gemss2((vw*9),(vw*8))
  var gem2s2= new gemss2((vw*9),(vw*16.2))
  var gem3s2 = new gemss2((vw*81),(vw*8.1))
  
class snow2{
    constructor(x,y,r){
      this.velocity=0
      this.x=x
      this.y= y
      this.radius = r
    }
    update(ctx2){
        this.velocity +=0.005
        this.y += this.velocity
        ctx2.beginPath();
        ctx2.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx2.fillStyle = "white"
        ctx2.fill()
    }
}
var allsnows2 = []
var snowfall2 = true;


  function gameloops2(){
    if(snowfall2 !== false && allsnows2.length<25){
      snowfall2 = false
      setTimeout(()=>{snowfall2=true},1000)
    for (let index = 0; index < 1; index++) {
      var x = Math.random()*width
      var y = Math.random()*(vw*2)
      var r = Math.random()*(vw*0.3)
      if(r<1){r=1}
      allsnows2.push({0: new snow2(x,-y,r),name: allsnows2.length })
    }}
    ctx2.clearRect(0,0,width,height)
    var image = new Image()
    image.src= './img/NIGHT.png'
    ctx2.drawImage(image,0,0,width,height)
    paddles2.draw(ctx2)
    allbrickss2.forEach(element => {
      element[0].draw(ctx2)
    });
    if(gem1falls2==true){
      gem1s2.update(ctx2)
      setTimeout(()=>{gem1falls2=1},2000)
    }else if(gem1falls2==false){
      gem1s2.draw(ctx2)
    }
    if(gem2falls2==true){
      gem2s2.update(ctx2)
      setTimeout(()=>{gem2falls2=1},2000)
    }else if(gem2falls2==false){
      gem2s2.draw(ctx2)
    }
    if(gem3falls2==true){
      gem3s2.update(ctx2)
      setTimeout(()=>{gem3falls2=1},2000)
    }else if(gem3falls2==false){
      gem3s2.draw(ctx2)
    }
    allsnows2.forEach(element => {
      if(element[0].y>parseInt(screen.availWidth)){
        element[0].velocity=0;
        element[0].y=0
        var x = Math.random()*width
        element[0].x = x
       }
      element[0].update(ctx2)
    });
    downBricks2.draw(ctx2)
    balls2.update(ctx2)
    requestAnimationFrame(gameloops2)
  }
  gameloops2()
