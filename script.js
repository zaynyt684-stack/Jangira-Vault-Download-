const API =
"https://api.github.com/repos/zaynyt684-stack/Jangira-Vault/releases/latest";

async function loadRelease(){

try{

const response=await fetch(API);

if(!response.ok){

throw new Error("Failed");

}

const release=await response.json();

const version=document.getElementById("version");
const apkSize=document.getElementById("apkSize");
const releaseDate=document.getElementById("releaseDate");
const changelog=document.getElementById("changelog");
const downloadBtn=document.getElementById("downloadBtn");

version.textContent=release.tag_name;

releaseDate.textContent=
new Date(release.published_at).toLocaleDateString(
"en-IN",
{
day:"numeric",
month:"long",
year:"numeric"
}
);

changelog.textContent=
release.body || "No changelog available.";

const apk=
release.assets.find(asset=>
asset.name.toLowerCase().endsWith(".apk")
);

if(apk){

downloadBtn.href=
apk.browser_download_url;

downloadBtn.target="_blank";

downloadBtn.textContent=
"Download Latest APK";

apkSize.textContent=
(apk.size/1024/1024).toFixed(1)+" MB";

}else{

downloadBtn.textContent=
"APK Not Available";

apkSize.textContent="-";

}

}catch(error){

console.log(error);

document.getElementById("version").textContent="-";

document.getElementById("apkSize").textContent="-";

document.getElementById("releaseDate").textContent="-";

document.getElementById("changelog").textContent=
"Unable to load latest release.";

}

}

loadRelease();


// Scroll Animation

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

},{
threshold:.15
});

document.querySelectorAll(
".info-card,.feature-card,.update-card"
).forEach(el=>{

el.style.opacity="0";

el.style.transform="translateY(40px)";

el.style.transition=".7s ease";

observer.observe(el);

});


// Floating Logo

const logo=document.querySelector(".app-logo");

if(logo){

let t=0;

(function animate(){

t+=0.02;

logo.style.transform=
`translateY(${Math.sin(t)*7}px)`;

requestAnimationFrame(animate);

})();

}


// Navbar Blur

window.addEventListener("scroll",()=>{

const nav=document.querySelector(".navbar");

if(window.scrollY>25){

nav.style.boxShadow=
"0 12px 30px rgba(0,0,0,.08)";

}else{

nav.style.boxShadow="none";

}

});
