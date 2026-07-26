const API =
"https://api.github.com/repos/zaynyt684-stack/Jangira-Vault/releases/latest";


async function loadRelease(){


const downloadBtn =
document.getElementById("downloadBtn");


try{


downloadBtn.classList.add("loading");

downloadBtn.textContent="Checking Release";


const response = await fetch(API,{
cache:"no-store"
});


if(!response.ok){

throw new Error("GitHub API Error");

}



const release = await response.json();



const version =
document.getElementById("version");


const apkSize =
document.getElementById("apkSize");


const releaseDate =
document.getElementById("releaseDate");


const changelog =
document.getElementById("changelog");




version.textContent =
release.tag_name || "Unknown";



releaseDate.textContent =
new Date(release.published_at)
.toLocaleDateString(
"en-IN",
{
day:"numeric",
month:"long",
year:"numeric"
}
);



changelog.textContent =
release.body ||
"No changelog available.";




const apk =
release.assets.find(file =>
file.name.toLowerCase().endsWith(".apk")
);



if(apk){


downloadBtn.href =
apk.browser_download_url;


downloadBtn.target="_blank";


downloadBtn.textContent =
"Download Latest APK";



apkSize.textContent =
formatSize(apk.size);



}
else{


downloadBtn.textContent =
"APK Not Available";


apkSize.textContent="-";


}



}

catch(error){


console.error(error);



document.getElementById("version")
.textContent="-";


document.getElementById("apkSize")
.textContent="-";


document.getElementById("releaseDate")
.textContent="-";


document.getElementById("changelog")
.textContent=
"Unable to load latest release.";


downloadBtn.textContent=
"Download Unavailable";


}


finally{


downloadBtn.classList.remove("loading");


}


}




function formatSize(bytes){


if(!bytes) return "0 MB";


const mb =
bytes / 1024 / 1024;


return mb.toFixed(1)+" MB";


}





// Scroll Animation


const observer =
new IntersectionObserver(
(entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.classList.add("show");


}


});


},
{
threshold:.15
}
);



document
.querySelectorAll(
".info-card,.feature-card,.update-card"
)
.forEach(card=>{


observer.observe(card);


});







// Navbar shadow


window.addEventListener(
"scroll",
()=>{


const nav =
document.querySelector(".navbar");


if(window.scrollY>25){


nav.style.boxShadow =
"0 12px 30px rgba(0,0,0,.08)";


}

else{


nav.style.boxShadow="none";


}


});






loadRelease();
