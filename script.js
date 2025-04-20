// Navbar Toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const toggleText = document.querySelector(".toggle-text");

if (navToggle && navLinks && toggleText) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    navToggle.classList.toggle("active");
    // Swap MENU/CLOSE text
    toggleText.textContent = navLinks.classList.contains("active")
      ? "CLOSE MENU"
      : "MENU";
  });

  // Close mobile nav on link click
  const navLinksItems = document.querySelectorAll(".nav-links a");
  navLinksItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      navToggle.classList.remove("active");
      toggleText.textContent = "MENU";
    });
  });
}

// Slideshow Functionality
function startSlideshow(slideshow, slideSelector = ".slide") {
  if (!slideshow) {
    console.error("Slideshow element not found");
    return;
  }
  const slides = slideshow.querySelectorAll(slideSelector);
  if (slides.length === 0) {
    console.error("No slides found in slideshow");
    return;
  }
  let current = 0;

  // Show first slide
  slides[current].classList.add("active");
  console.log("First slide activated:", slides[current].src);

  // Start interval
  const intervalId = setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
    console.log("Switched to slide:", slides[current].src);
  }, 3000);
  slideshow.dataset.interval = intervalId.toString();
}

function stopSlideshow(slideshow, slideSelector = ".slide") {
  if (!slideshow) {
    console.error("Slideshow element not found");
    return;
  }
  const slides = slideshow.querySelectorAll(slideSelector);
  if (slideshow.dataset.interval) {
    clearInterval(Number(slideshow.dataset.interval));
    delete slideshow.dataset.interval;
  }
  slides.forEach((slide) => slide.classList.remove("active"));
  console.log("Slideshow stopped");
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

    const slideshow = item.querySelector(".slideshow");
    if (!slideshow) {
      console.log("No slideshow found for", item.dataset.project);
      return; // Skip if no slideshow
    }

    // Toggle expanded state
    gridItems.forEach((i) => i !== item && i.classList.remove("expanded"));
    item.classList.toggle("expanded");

    // Start or stop slideshow
    if (item.classList.contains("expanded")) {
      console.log("Starting slideshow for", item.dataset.project);
      startSlideshow(slideshow, ".slide");
    } else {
      console.log("Stopping slideshow for", item.dataset.project);
      stopSlideshow(slideshow, ".slide");
    }
  });
});

// Project Page Slideshow
document.addEventListener("DOMContentLoaded", () => {
  const projectSlideshow = document.querySelector(".project-slideshow");
  if (projectSlideshow) {
    console.log("Initializing project slideshow");
    startSlideshow(projectSlideshow, ".project-slide");
  }
});

// Smooth Scroll for Back to Top
const backToTop = document.querySelector(".back-to-top");
if (backToTop) {
  backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Form Validation (Optional)
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    const name = contactForm.querySelector("#name").value.trim();
    const email = contactForm.querySelector("#email").value.trim();
    const message = contactForm.querySelector("#message").value.trim();

    if (!name || !email || !message) {
      e.preventDefault();
      alert("Please fill out all fields.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      e.preventDefault();
      alert("Please enter a valid email address.");
    }
  });
}
