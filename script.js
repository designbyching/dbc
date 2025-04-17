// Navbar Toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    navToggle.classList.toggle("active");
  });

  // Close mobile nav on link click
  const navLinksItems = document.querySelectorAll(".nav-links a");
  navLinksItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      navToggle.classList.remove("active");
    });
  });
}

// Portfolio Toggle and Slideshow
const gridItems = document.querySelectorAll(".grid-item");

gridItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (link) {
      event.stopPropagation(); // Prevent card toggle when clicking links
      return; // Allow link navigation
    }

    // Toggle expanded state
    gridItems.forEach((i) => i !== item && i.classList.remove("expanded"));
    item.classList.toggle("expanded");

    // Start or stop slideshow
    const slideshow = item.querySelector(".slideshow");
    if (item.classList.contains("expanded")) {
      startSlideshow(slideshow);
    } else {
      stopSlideshow(slideshow);
    }
  });
});

// Slideshow Functionality
function startSlideshow(slideshow) {
  if (!slideshow) return;
  const slides = slideshow.querySelectorAll(".slide");
  let current = 0;

  // Show first slide
  slides[current].classList.add("active");

  // Start interval
  slideshow.dataset.interval = setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }, 3000);
}

function stopSlideshow(slideshow) {
  if (!slideshow) return;
  const slides = slideshow.querySelectorAll(".slide");
  slides.forEach((slide) => slide.classList.remove("active"));
  clearInterval(slideshow.dataset.interval);
}

// Back to Top Smooth Scroll
const backToTopLink = document.querySelector(".back-to-top");
if (backToTopLink) {
  backToTopLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
