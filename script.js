// GSAP SCRAMBLE TEXT

const textElement = document.getElementById("scrambleText");
const finalText = textElement.innerText;

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890#$%&*";

let progress = {value:0};

gsap.to(progress,{
value:1,
duration:2,
ease:"power2.out",
onUpdate:()=>{

let result="";

for(let i=0;i<finalText.length;i++){

if(i < progress.value * finalText.length){

result += finalText[i];

}else{

result += characters[Math.floor(Math.random()*characters.length)];

}

}

textElement.innerText = result;

}
});



// STARFIELD BACKGROUND

const canvas=document.getElementById("universe");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let stars=[];

for(let i=0;i<1200;i++){

stars.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*2,
speed:Math.random()*0.2 + 0.05
});

}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

stars.forEach(star=>{

star.y+=star.speed;

if(star.y>canvas.height){
star.y=0;
star.x=Math.random()*canvas.width;
}

ctx.beginPath();
ctx.arc(star.x,star.y,star.size,0,Math.PI*2);
ctx.fillStyle="white";
ctx.fill();

});

requestAnimationFrame(animate);

}

animate();



// METEORS

function meteor(){

let x=Math.random()*canvas.width;
let y=0;

let length=100;
let speed=4;
let opacity=1;

function shoot(){

ctx.beginPath();
ctx.moveTo(x,y);
ctx.lineTo(x+length,y+length);
ctx.strokeStyle="rgba(255,255,255,"+opacity+")";
ctx.stroke();

x+=speed;
y+=speed;
opacity-=0.02;

if(opacity>0){
requestAnimationFrame(shoot);
}

}

shoot();

}

setInterval(meteor,6000);

const textCanvas = document.getElementById("textStars");
const tctx = textCanvas.getContext("2d");

textCanvas.width = window.innerWidth;
textCanvas.height = window.innerHeight;

let particles = [];

const text = "URSA MAJOR";

tctx.font = "bold 120px monospace";
tctx.fillStyle = "white";
tctx.fillText(text, 200, 200);

const imageData = tctx.getImageData(0,0,textCanvas.width,textCanvas.height);

for(let y=0;y<imageData.height;y+=6){
for(let x=0;x<imageData.width;x+=6){

const index = (y*imageData.width + x)*4;

if(imageData.data[index+3] > 128){

particles.push({
x:Math.random()*textCanvas.width,
y:Math.random()*textCanvas.height,
targetX:x,
targetY:y
});

}

}
}

tctx.clearRect(0,0,textCanvas.width,textCanvas.height);

particles.forEach(p=>{

gsap.to(p,{
x:p.targetX,
y:p.targetY,
duration:2,
ease:"power3.out"
});

});

function render(){

tctx.clearRect(0,0,textCanvas.width,textCanvas.height);

particles.forEach(p=>{

tctx.beginPath();
tctx.arc(p.x,p.y,1.5,0,Math.PI*2);
tctx.fillStyle="white";
tctx.fill();

});

requestAnimationFrame(render);

}

render();


// CONSTELLATION SCROLL REVEAL

const starsConst=document.querySelectorAll(".star");
const lines=document.querySelector(".dipper-lines");

window.addEventListener("scroll",()=>{

const trigger=document.querySelector(".constellation").offsetTop-400;

if(window.scrollY>trigger){

starsConst.forEach((star,i)=>{

setTimeout(()=>{
star.classList.add("visible");
},i*400);

});

setTimeout(()=>{
lines.classList.add("visible");
},2000);

}

});



// RESPONSIVE CANVAS

window.addEventListener("resize",()=>{

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

});
