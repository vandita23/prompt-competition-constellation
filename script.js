
// STAR BACKGROUND

const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars=[];

for(let i=0;i<800;i++){

stars.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*2,
speed:Math.random()*0.4+0.1
});

}

function animateStars(){

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

drawMeteors();

requestAnimationFrame(animateStars);

}

animateStars();


// METEORS

let meteors=[];

function createMeteor(){

meteors.push({
x:Math.random()*canvas.width,
y:0,
speed:6,
length:80
});

}

setInterval(createMeteor,5000);

function drawMeteors(){

meteors.forEach((meteor,index)=>{

ctx.beginPath();
ctx.moveTo(meteor.x,meteor.y);
ctx.lineTo(meteor.x-40,meteor.y+meteor.length);
ctx.strokeStyle="white";
ctx.lineWidth=2;
ctx.stroke();

meteor.y+=meteor.speed;
meteor.x-=2;

if(meteor.y>canvas.height){
meteors.splice(index,1);
}

});

}


// SOUND BUTTON

const audio=document.getElementById("spaceAudio");
const button=document.getElementById("soundToggle");

let playing=false;

button.addEventListener("click",()=>{

if(!playing){
audio.volume=0.4;
audio.play();
button.textContent="🔇 Disable Space Sound";
playing=true;
}else{
audio.pause();
button.textContent="🔊 Enable Space Sound";
playing=false;
}

});


// SCRAMBLE TITLE

const text=document.getElementById("scrambleText");
const finalWord="URSA MAJOR";
const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

let frame=0;

function scramble(){

let output="";

for(let i=0;i<finalWord.length;i++){

if(i<frame){
output+=finalWord[i];
}else{
output+=chars[Math.floor(Math.random()*chars.length)];
}

}

text.textContent=output;

if(frame<=finalWord.length){
frame+=0.5;
setTimeout(scramble,50);
}

}

scramble();


// CONSTELLATION SCROLL ANIMATION

gsap.registerPlugin(ScrollTrigger);


// STARS APPEAR ONE BY ONE

gsap.to(".star",{

scrollTrigger:{
trigger:".constellation",
start:"top 70%"
},

opacity:1,
scale:1.6,
duration:0.8,
stagger:0.4,
ease:"power2.out"

});


// LINES DRAW AFTER STARS

gsap.from(".dipper-lines line",{

scrollTrigger:{
trigger:".constellation",
start:"top 70%"
},

duration:1.2,
opacity:0,
scaleX:0,
transformOrigin:"left center",
stagger:0.3,
delay:2.5

});
});
