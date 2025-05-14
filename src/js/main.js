const hamburgerButton = document.querySelector(".hamburger-btn");
const hamburgerMenu = document.querySelector(".hamburger-menu");

if (hamburgerButton && hamburgerMenu) {
  hamburgerButton.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("hamburger-menu--opened");
  });
}
