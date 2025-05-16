const header = document.querySelector(".header");
const hamburgerButton = document.querySelector(".navigation__hamburger-button");
const hamburgerMenu = document.querySelector(".navigation__content");
const whyUsBoxes = document.querySelectorAll(".whyus__box");
const allContributors = document.querySelectorAll(".contributor");
const icons = document.querySelectorAll(".icon-wrapper");

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

const whyUsObserver = new IntersectionObserver(
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
  whyUsObserver.observe(box);
});

const contributorObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const box = entry.target;
      if (entry.isIntersecting) {
        const index = parseInt(box.dataset.index);
        const directionClass = index < 3 ? "slide-in-left" : "slide-in-right";
        box.classList.add("contributor--visible", directionClass);
      }
    });
  },
  { threshold: 0.2 }
);

allContributors.forEach((box, i) => {
  box.dataset.index = i;
  contributorObserver.observe(box);
});

icons.forEach((icon) => {
  const range = 10;
  let x = 0;
  let y = 0;
  function float() {
    x = Math.random() * range - range / 2;
    y = Math.random() * range - range / 2;
    icon.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    setTimeout(float, 2000 + Math.random() * 1000);
  }
  float();
});
