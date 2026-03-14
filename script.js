// SOUND BUTTON

const audio = document.getElementById("spaceAudio");
const button = document.getElementById("soundToggle");

button.onclick = () => {

if(audio.paused){
audio.play();
button.innerText="🔊 Sound Enabled";
}else{
audio.pause();
button.innerText="🔊 Enable Space Sound";
}

};



// GSAP GLITCH TEXT

const textElement = document.getElementById("scrambleText");
const finalText = textElement.innerText;

const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";

let progress={value:0};

gsap.to(progress,{
value:1,
duration:2,
ease:"power2.out",
onUpdate:()=>{

let result="";

for(let i=0;i<finalText.length;i++){

if(i<progress.value*finalText.length){
result+=finalText[i];
}else{
result+=chars[Math.floor(Math.random()*chars.length)];
}

}

textElement.innerText=result;

}
});






// STARFIELD WITH SCROLL SPACE EFFECT

const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
const STAR_COUNT = 900;

for(let i = 0; i < STAR_COUNT; i++){

stars.push({
x: Math.random() * canvas.width,
y: Math.random() * canvas.height,
size: Math.random() * 2 + 0.5
});

}

// track scroll
let scrollSpeed = 0;

window.addEventListener("scroll", () => {

scrollSpeed = window.scrollY * 0.02;

});


const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

for(let i=0;i<600;i++){

stars.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*2,
speed:Math.random()*0.4 + 0.1
});

}

function animateStars(){

ctx.clearRect(0,0,canvas.width,canvas.height);

stars.forEach(star=>{

star.y += star.speed;

if(star.y > canvas.height){
star.y = 0;
star.x = Math.random()*canvas.width;
}

ctx.beginPath();
ctx.arc(star.x,star.y,star.size,0,Math.PI*2);
ctx.fillStyle="white";
ctx.fill();

});

requestAnimationFrame(animateStars);

}

animateStars();


// METEORS

function meteor(){

let x=Math.random()*canvas.width;
let y=0;

let length=100;
let speed=5;
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

setInterval(meteor,7000);



// CONSTELLATION REVEAL

const starsConst=document.querySelectorAll(".star");
const lines=document.querySelector(".dipper-lines");

window.addEventListener("scroll",()=>{

const trigger=document.querySelector(".constellation").offsetTop-400;

if(window.scrollY>trigger){

starsConst.forEach((star,i)=>{

setTimeout(()=>{
star.classList.add("visible");
},i*300);

});

setTimeout(()=>{
lines.classList.add("visible");
},1500);

}

});
