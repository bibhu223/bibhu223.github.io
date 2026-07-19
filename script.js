const root = document.documentElement;
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function applyTheme(theme) {
  root.dataset.theme = theme;

  if (themeIcon) {
    themeIcon.textContent = theme === "dark" ? "☀" : "◐";
  }

  localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

applyTheme(savedTheme || (systemPrefersDark ? "dark" : "light"));

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme =
      root.dataset.theme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);
  });
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const yearElement = document.querySelector("#current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
