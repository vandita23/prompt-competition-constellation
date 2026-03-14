// STAR BACKGROUND
const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i=0;i<1000;i++){
  stars.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, size:Math.random()*2, speed:Math.random()*0.3+0.05, depth:Math.random()*2});
}

let meteors = [];
function createMeteor() { meteors.push({x:Math.random()*canvas.width, y:0, speed:6, length:80}); }
setInterval(createMeteor,5000);

function drawMeteors(){
  meteors.forEach((m,i)=>{
    ctx.beginPath();
    ctx.moveTo(m.x,m.y);
    ctx.lineTo(m.x-40,m.y+m.length);
    ctx.strokeStyle="white";
    ctx.lineWidth=2;
    ctx.stroke();
    m.y+=m.speed; m.x-=2;
    if(m.y>canvas.height) meteors.splice(i,1);
  });
}

function animateStars(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  stars.forEach(s=>{
    s.y += s.speed * s.depth*0.3;
    if(s.y>canvas.height){s.y=0; s.x=Math.random()*canvas.width;}
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.size,0,Math.PI*2);
    ctx.fillStyle="white"; ctx.fill();
  });
  drawMeteors();
  requestAnimationFrame(animateStars);
}
animateStars();

// SOUND TOGGLE
const audio=document.getElementById("spaceAudio");
const button=document.getElementById("soundToggle");
let playing=false;
button.onclick=()=>{
  if(!playing){audio.volume=0.4; audio.play(); button.textContent="🔇 Disable Space Sound"; playing=true;}
  else{audio.pause(); button.textContent="🔊 Enable Space Sound"; playing=false;}
};

// GSAP SCRAMBLE TEXT
const text=document.getElementById("scrambleText");
const finalWord="URSA MAJOR";
const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
let frame=0;
function scramble(){
  let output="";
  for(let i=0;i<finalWord.length;i++){output += (i<frame)?finalWord[i]:chars[Math.floor(Math.random()*chars.length)];}
  text.textContent=output;
  if(frame<=finalWord.length){frame+=0.5; setTimeout(scramble,50);}
}
scramble();

// BIG DIPPER STARS & LINES
gsap.registerPlugin(ScrollTrigger);

// stars glow in one by one
gsap.to(".star",{
  scrollTrigger:{trigger:".constellation", start:"top 70%"},
  opacity:1, scale:1.5, duration:0.8, stagger:0.5
});

// constellation lines draw
gsap.from(".dipper line",{
  scrollTrigger:{trigger:".constellation", start:"top 70%"},
  duration:1.5, opacity:0, scaleX:0, transformOrigin:"left center", stagger:0.3, delay:3
});
