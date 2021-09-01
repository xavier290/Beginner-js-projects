menuActive = document.querySelectorAll(".menu-btn");

let active = false;

menuActive[0].addEventListener("click", () => {
  if (!active) {
    menuActive[0].classList.add("active");
    active = true;
  } else {
    active = false;
    menuActive[0].classList.remove("active");
  }
});
