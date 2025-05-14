const navigation = document.querySelector(".navigation");
const hamburgerButton = document.querySelector(".navigation__hamburger-button");
const hamburgerMenu = document.querySelector(".navigation__content");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navigation.classList.add("navigation--scrolled");
  } else {
    navigation.classList.remove("navigation--scrolled");
  }
});

if (hamburgerButton && hamburgerMenu) {
  hamburgerButton.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("navigation__content--active");
  });
}
