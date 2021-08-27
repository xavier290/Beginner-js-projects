const menuBtn = document.querySelector(".menu-btn");
const MenuActive = document.querySelector(".navbar");

let menuOpen = false;

menuBtn.addEventListener("click", () => {
  if (!menuOpen) {
    menuBtn.classList.add("open");
    MenuActive.classList.add("active");
    menuOpen = true;
  } else {
    menuBtn.classList.remove("open");
    MenuActive.classList.remove("active");
    menuOpen = false;
  }
});
