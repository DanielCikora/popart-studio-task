const header = document.querySelector(".header");
const hamburgerButton = document.querySelector(".navigation__hamburger-button");
const hamburgerMenu = document.querySelector(".navigation__content");
const whyUsBoxes = document.querySelectorAll(".whyus__box");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("header--scrolled");
  } else {
    header.classList.remove("header--scrolled");
  }
});

if (hamburgerButton && hamburgerMenu) {
  hamburgerButton.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("navigation__content--active");
    document.body.classList.toggle("no-scroll");
  });
}

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const box = entry.target;
      const delay = box.dataset.index * 400;
      if (entry.isIntersecting) {
        setTimeout(() => {
          box.classList.add("whyus__box--visible");
        }, delay);
      } else {
        box.classList.remove("whyus__box--visible");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

whyUsBoxes.forEach((box, i) => {
  box.dataset.index = i;
  intersectionObserver.observe(box);
});
