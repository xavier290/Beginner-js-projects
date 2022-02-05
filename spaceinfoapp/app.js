const api = {
    key: "sVnX9NHXldDYvSO9i4jFg45LyL60u5003Y1RToOw",
    base: "https://api.nasa.gov/",
    snap: "planetary/apod",
};

const title = document.querySelector(".title")
const details = document.querySelector(".details")
const menu = document.querySelector(".menu-btn")

menu.addEventListener("click", function() {
    this.classList.toggle('open')
})

window.addEventListener("load", () => {
    fecthingData()
})

function fecthingData() {
    fetch(`${api.base}${api.snap}?api_key=${api.key}`)
    .then((data) => {
        return data.json();
    })
    .then(displayingData)
}

function displayingData(data) {
    const iframe = document.querySelector(".iframe-container")
    const copyright = document.querySelector(".copyright")

    iframe.innerHTML = data.media_type == "image" ? `<img src=${data.url}>` : `<iframe src=${data.url} frameborder=0 allowfullscreen>`
    
    title.innerHTML = data.title 
    details.innerHTML = `<div>${data.explanation}</div>`
    copyright.textContent = "@COPYRIGHT: " + data.copyright
}

const moreInfo = document.querySelector(".moreInfo")
moreInfo.addEventListener("click", () => {
    details.classList.toggle('showing')
})