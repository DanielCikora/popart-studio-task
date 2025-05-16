const header = document.querySelector(".header");
const hamburgerButton = document.querySelector(".navigation__hamburger-button");
const hamburgerMenu = document.querySelector(".navigation__content");
const whyUsBoxes = document.querySelectorAll(".whyus__box");
const allContributors = document.querySelectorAll(".contributor");
const icons = document.querySelectorAll(".joinus__icon");
const video = document.querySelector(".video-player__video");
const playBtn = document.querySelector(".video-player__play-btn");

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

icons.forEach((icon, i) => {
  icon.style.setProperty("--delay", `${i * 0.2}s`);
});

const iconObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("joinus__icon--visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.3,
  }
);

icons.forEach((icon) => {
  iconObserver.observe(icon);
});

playBtn.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playBtn.style.opacity = 0;
  } else {
    video.pause();
    playBtn.style.opacity = 1;
  }
});
