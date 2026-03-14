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



// SPACE WARP STARFIELD

const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
const STAR_COUNT = 900;

for (let i = 0; i < STAR_COUNT; i++) {

stars.push({
x: Math.random() * canvas.width,
y: Math.random() * canvas.height,
z: Math.random() * canvas.width
});

}

function animateStars(){

ctx.fillStyle = "black";
ctx.fillRect(0,0,canvas.width,canvas.height);

for(let i = 0; i < STAR_COUNT; i++){

let star = stars[i];

star.z -= 1.5;

if(star.z <= 0){

star.x = Math.random() * canvas.width;
star.y = Math.random() * canvas.height;
star.z = canvas.width;

}

let k = 128.0 / star.z;

let px = star.x * k + canvas.width / 2;
let py = star.y * k + canvas.height / 2;

if(px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height){

let size = (1 - star.z / canvas.width) * 3;

ctx.beginPath();
ctx.arc(px, py, size, 0, Math.PI * 2);
ctx.fillStyle = "white";
ctx.fill();

}

}

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
