// Premium Scroll Reveal

const revealElements = document.querySelectorAll(
".hero,.info-card,.feature-card"
);

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";
entry.target.style.transform="translateY(0)";

}

});

},{
threshold:.15
});

revealElements.forEach(el=>{

el.style.opacity="0";
el.style.transform="translateY(40px)";
el.style.transition="all .8s ease";

observer.observe(el);

});


// Floating Logo

const logo=document.querySelector(".app-logo");

let t=0;

function floatLogo(){

t+=0.02;

logo.style.transform=`translateY(${Math.sin(t)*8}px)`;

requestAnimationFrame(floatLogo);

}

floatLogo();


// Navbar Blur

window.addEventListener("scroll",()=>{

const nav=document.querySelector(".navbar");

if(window.scrollY>30){

nav.style.background="rgba(255,255,255,.82)";
nav.style.boxShadow="0 15px 40px rgba(0,0,0,.08)";

}else{

nav.style.background="rgba(255,255,255,.65)";
nav.style.boxShadow="none";

}

});


// Button Ripple

document.querySelectorAll("a").forEach(button=>{

button.addEventListener("click",function(e){

const ripple=document.createElement("span");

const size=Math.max(this.clientWidth,this.clientHeight);

ripple.style.width=size+"px";
ripple.style.height=size+"px";

ripple.style.position="absolute";
ripple.style.borderRadius="50%";
ripple.style.background="rgba(255,255,255,.45)";
ripple.style.transform="scale(0)";
ripple.style.left=e.offsetX-size/2+"px";
ripple.style.top=e.offsetY-size/2+"px";
ripple.style.pointerEvents="none";
ripple.style.animation="ripple .6s linear";

this.style.position="relative";
this.style.overflow="hidden";

this.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});

});


// Smooth Loading

window.addEventListener("load",()=>{

document.body.style.opacity="1";

});

document.body.style.opacity="0";
document.body.style.transition="opacity .7s ease";
