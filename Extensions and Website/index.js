var sideFavNav = {
    open: () => { // Pop out side Fav nav
        document.querySelector('#side-fav-nav').style.width = '350px';
        document.querySelector('#fav-nav-overlay').style.display = 'block';
    },
    close: () => { // Reset side fav nav
        document.querySelector('#side-fav-nav').style.width = '0px';
        document.querySelector('#fav-nav-overlay').style.display = 'none';
    },
};
let timeClicked = false;

function setTime() {
    const d = new Date();
    const h = (d.getHours() + "").padStart(2, "0");
    const m = (d.getMinutes() + "").padStart(2, "0");
    const s = (d.getSeconds() + "").padStart(2, "0");
    document.querySelector("#time").innerText = `${h}:${m}`;
    if (timeClicked) {
        document.querySelector("#time").innerText = `${h}:${m}:${s}`
    }
    let greeting = "";

    if(h < 12){
        greeting = "Morning";
    }else if(h < 17){
        greeting = "Afternoon";
    }else if(h < 21){
        greeting = "Evening";
    }else{
        greeting = "Night";
    }

    document.querySelector("#greeting").innerText = `Good ${greeting}!`
}
setTime();
setInterval(setTime, 1000);

const searchBox = document.querySelector("#search-box");
searchBox.addEventListener("keydown", (e) => {
    if (e.keyCode == 13) {
        searchSomething(e.target.value);
        e.target.setAttribute("placeholder", "Loading...");
        e.target.value = "";
        e.target.setAttribute("readonly", true);
    }
});
document.querySelector("#search-box").value = '';
var search = {
    google: (q) => {
        let query = q.replace(/ /g, "+");
        location.href = `https://www.google.com/search?q=${query}`;
    },
    googleImages: (q) => {
        let query = q.replace(/ /g, "+");
        location.href = `https://www.google.com/search?q=${query}&tbm=isch`;
    },
    mdn: (q) => {
        let query = q.replace(/ /g, "+");
        location.href = `https://developer.mozilla.org/en-US/search?q=${query}`;
    },
    youtube: (q) => {
        let query = q.replace(/ /g, "+");
        location.href = `https://www.youtube.com/results?q=${query}`;
    },
    wikipedia: (q) => {
        let query = q.replace(/ /g, "_");
        location.href = `https://en.wikipedia.org/wiki/${query}`;
    },
    mcwiki: (q) => {
        let query = q.replace(/ /g, "+");
        location.href = `https://minecraft.gamepedia.com/index.php?search=${query}`
    }
};

function searchSomething(query) {
    q = query.toLowerCase()
    if (q.startsWith("!g ")) {
        search.google(query.substring(3));
    } else if (q.startsWith("!gi ")) {
        search.googleImages(query.substring(4));
    } else if (q.startsWith("!mdn ")) {
        search.mdn(query.substring(5));
    } else if (q.startsWith("!yt ")) {
        search.youtube(query.substring(4));
    } else if (q.startsWith("!wiki ")) {
        search.wikipedia(query.substring(6));
    } else if (q.startsWith("!mcwiki ")) {
        search.mcwiki(query.substring(8));
    } else {
        search.google(query);
    }
}



const time = document.querySelector("#time")
document.querySelector("#fav-nav-overlay").addEventListener("click", sideFavNav.close);
document.querySelector("#close-side-fav-nav").addEventListener("click", sideFavNav.close);
time.addEventListener("mousedown", () => {timeClicked=true; setTime();});
time.addEventListener("mouseup", () => {timeClicked = false; setTime();});
time.addEventListener("mouseout", () => {timeClicked = false; setTime();});
document.querySelector("#fav-button").addEventListener("click", sideFavNav.open);
searchBox.addEventListener("focus", () => {searchBox.placeholder = ''});
searchBox.addEventListener("blur", () => {searchBox.placeholder = '\uF002'});