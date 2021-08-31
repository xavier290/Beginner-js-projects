const menuActive = document.querySelector(".menu-btn");
const effect = document.querySelectorAll(".one, .two, .navbar, .menu-btn");

let menuOpen = false;

menuActive.addEventListener("click", () => {
  if (!menuOpen) {
    for (let j = 0; j < 4; j++) {
      effect[j].classList.add("active");
    }
    menuOpen = true;
  } else {
    for (let j = 0; j < 4; j++) {
      effect[j].classList.remove("active");
    }
    menuOpen = false;
  }
});
