var BABA
var blackeye
var A1
var A2
var A3
var A4
var A5
var song
var music_btn
var say_btn
var touch_btn
var stop_btn
var about_btn
var muscp = false
var sayp = false
var touchp = false
var songp = false
var stopp = false
var sleepp = false
var aboutp = false
var amp
var vol = 0
var myRec = new p5.SpeechRec();
var result
let handpose;
let video;
let predictions = [];
let pointerX, pointerY, pointerZ;


function setup() {
	createCanvas(windowWidth,windowHeight);
	background(0);
	
	music_btn = createButton("放音樂讓BABA舞動")
  music_btn.position(10,10)
  music_btn.size(120,120);
  music_btn.style('background-color','white');
  music_btn.style('font-size','20px');
  music_btn.style('color','black');
  music_btn.mousePressed(music_btn_pressed)

  say_btn = createButton("語音命令BABA(跳舞/睡覺/停止)")
  say_btn.position(10,150)
  say_btn.size(120, 120);
  say_btn.style('background-color','white');
  say_btn.style('font-size','20px');
  say_btn.style('color','black');
  say_btn.mousePressed(say_btn_pressed)

  touch_btn = createButton("讓BABA看見你的手(影像識別)")
  touch_btn.position(10,290)
  touch_btn.size(120, 120);
  touch_btn.style('background-color','white');
  touch_btn.style('font-size','20px');
  touch_btn.style('color','black');
  touch_btn.mousePressed(touch_btn_pressed)

  stop_btn = createButton("停止BABA所有行動")
  stop_btn.position(10,430)
  stop_btn.size(120,120);
  stop_btn.style('background-color','white');
  stop_btn.style('font-size','20px');
  stop_btn.style('color','black');
  stop_btn.mousePressed(stop_btn_pressed)

  about_btn = createButton("如何操作跟說明(點我)")
  about_btn.position(10,570)
  about_btn.size(120,120);
  about_btn.style('background-color','white');
  about_btn.style('font-size','20px');
  about_btn.style('color','black');
  about_btn.mousePressed(about_btn_pressed)


  video = createCapture(VIDEO);
  video.size(width, height);

  handpose = ml5.handpose(video, modelReady);

  handpose.on("predict", (results) => {
    predictions = results;
  });

  video.hide();
}

function modelReady() {
  console.log("Model ready!");
}

function about_btn_pressed(){
  if(!aboutp){
    aboutp = true
    about_btn.style('background-color','pink');
    
  }
  else{
    aboutp = false 
    about_btn.style('background-color','white');
  }
}

function say_btn_pressed(){
  if(!sayp){
    sayp = true
    say_btn.style('background-color','pink');
    myRec.onResult = showResult;
    myRec.start(); 
  }
  else{
    sayp = false 
    say_btn.style('background-color','white');
  }
}

function touch_btn_pressed(){
  if(!touchp){
  music_btn.style('background-color','white');
  say_btn.style('background-color','white');
  touchp = true
  touch_btn.style('background-color','pink');
  song.pause()
  son.pause()
  sleepp = false
  muscp = false
  musicp = false
  }
  else{
  touchp = false 
  touch_btn.style('background-color','white');
  }
}
  function music_btn_pressed(){
  if(!songp){
  son.pause()
  touch_btn.style('background-color','white');
  say_btn.style('background-color','white');
  touchp = false
  muscp = false
  sleepp = false
  song.play()
  music_btn.style('background-color','pink');
  songp = true
  amp=new p5.Amplitude()
  }
  else{
  song.pause()
  songp = false
  music_btn.style('background-color','white'); 
 
}
  }
  function stop_btn_pressed(){
  if(!stopp){
  stop_btn.style('background-color','black');
  stopp = true
  sayp = false 
  say_btn.style('background-color','white');
  touchp = false 
  touch_btn.style('background-color','white');
  song.pause()
  songp = false
  music_btn.style('background-color','white');
  muscp = false
  son.pause()
  sleepp = false
  stop_btn.style('background-color','white');
  }
  else{ 
  stopp = false
}
  }




function showResult()
{
	if(myRec.resultValue==true) {
	     result = myRec.resultString
         if(myRec.resultString==="停止")
            {
                stop_btn_pressed()
                
             }
         if(myRec.resultString==="跳舞")
            {
                song.pause()
                music_btn.style('background-color','white');
                touch_btn.style('background-color','white');
                touchp = false
                musicp = false
                sleepp = false
                muscp = true
                son.play()
                amp=new p5.Amplitude()
                say_btn_pressed()
                
                
             }

             if(myRec.resultString==="睡覺")
             {
             
                 sleepp = true
                 music_btn.style('background-color','white');
                 touch_btn.style('background-color','white');
                 touchp = false
                 say_btn_pressed()
                 song.pause()
                 son.pause()
                 muscp = false
                 musicp = false
                 
              }
	}
}

function preload(){
   BABA = loadImage('01.png')
   A1 = loadImage('02.png')
   A2 = loadImage('03.png')
   A3 = loadImage('04.png')
   A4 = loadImage('05.png')
   A5 = loadImage('06.png')
   blackeye = loadImage('black.png')
   song = loadSound('song.mp3')
   son = loadSound('27.ogg')


}

function draw() {
  translate(width, 0);
  scale(-1, 1);
  drawKeypoints();
}


function draw() { 
  background(0);
  noStroke()
  if(!muscp&!songp){
    image(BABA,windowWidth/2,windowHeight/2-150)
    image(blackeye,windowWidth/2+map(mouseX,0,width,-10,10),windowHeight/2-150+map(mouseY,0,height,-10,10))

  }
  else{ 
    vol = amp.getLevel()
    image(A3,windowWidth/2,windowHeight/2-150)
    image(A2,windowWidth/2+map(vol,0,1,-10,20),windowHeight/2-150)
    image(A1,windowWidth/2+map(vol,0,1,-10,20),windowHeight/2-150+map(vol,0,1,-10,20))
    image(blackeye,windowWidth/2+map(vol,0,1,-10,10),windowHeight/2-150+map(vol,0,1,-10,10))
  }

  if(!sleepp){

  }
  else{
    background(0)
    image(A5,windowWidth/2,windowHeight/2-150)
  }
  if(!touchp){
  }
  else{
    push()
    background(0)
    translate(width, 0);
    scale(-1, 1);
    pop()
    image(BABA,windowWidth/2,windowHeight/2-150)
    image(A4,windowWidth/2,windowHeight/2-150)
    drawKeypoints();
  }
  if(!aboutp){
}
  else{
    push()
    rect(140,575,300,300)
    textSize(15);
    text("這隻吸血兔子(?)是BABA",140,605);
    text("你可以用上面的按鈕跟他互動有以下選擇",140,635);
    text("1.放音樂讓牠跳舞，再次點擊取消",140,665);
    text("2.語音命令牠跳舞或睡覺，當你執行一次命令",140,695);
    text("後要再執行別的，記得在點一次按鈕開啟語音",140,725);
    text("3.開啟影像辨識跟BABA見面，讓牠看到",140,755);
    text("你五根手指，牠會回到吸血兔子的本性",140,785);
    text("盯著你的手指看，等待你不注意吃掉手指",140,815);
    text("4.停止BABA所有互動，包括音樂等",140,845);
    pop()



  }
}
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(255,0,0);
      noStroke();
      if (j == 8) {				
    pointerX = map(keypoint[0],0,640,0,width)
    pointerY = map(keypoint[1],0,480,0,height)
    ellipse(1288+map(pointerX,0,width,-10,10),548+map(pointerY,0,height,-10,10),35);
      }  else
      if (j == 20) {
      
    fill(255,0,0)
        pointerX = map(keypoint[0],0,640,0,width)
        pointerY = map(keypoint[1],0,480,0,height)
        ellipse(1223+map(pointerX,0,width,-10,10),588+map(pointerY,0,height,-10,10),40);
      }
    
    }
  }
}
