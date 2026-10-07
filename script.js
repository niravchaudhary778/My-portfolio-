/* =========================================================
   PERSONAL PORTFOLIO — script.js
   Simple beginner-friendly JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navigationItems = document.querySelectorAll(".nav-links a");

  /* Mobile navigation */
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("active");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    });

    /* Close menu after selecting a navigation link */
    navigationItems.forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      });
    });
  }

  /* Active navigation highlighting */
  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navigationItems.forEach(function (link) {
              link.classList.remove("active");

              if (link.getAttribute("href") === "#" + entry.target.id) {
                link.classList.add("active");
              }
            });
          }
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
      }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* Simple scroll-reveal effect */
  const revealElements = document.querySelectorAll(
    ".section-heading, .about-content, .education-card, " +
    ".interest-card, .strength-card, .career-content, .contact-card"
  );

  revealElements.forEach(function (element) {
    element.classList.add("reveal");
  });

  if (
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add("visible");
    });
  }
});
