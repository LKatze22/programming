document.addEventListener("DOMContentLoaded", function () {
  const openButton = document.getElementById("open-sidebar-button");
  const navbar = document.getElementById("navbar");
  const media = window.matchMedia("(max-width: 700px)");
  const themeToggleBtn = document.getElementById("themeToggleBtn");

  // Initialize theme
  applyStoredTheme();

  // Add theme toggle event listener
  themeToggleBtn.addEventListener("click", toggleTheme);

  media.addEventListener("change", (e) => updateNavbar(e));

  function updateNavbar(e) {
    const isMobile = e.matches;
    console.log(isMobile);
    if (isMobile) {
      navbar.setAttribute("inert", "");
    } else {
      navbar.removeAttribute("inert");
    }
  }

  function openSidebar() {
    navbar.classList.add("show");
    openButton.setAttribute("aria-expanded", "true");
    navbar.removeAttribute("inert");
  }

  function closeSidebar() {
    navbar.classList.remove("show");
    openButton.setAttribute("aria-expanded", "false");
    navbar.setAttribute("inert", "");
  }

  // Export functions to global scope for HTML onclick
  window.openSidebar = openSidebar;
  window.closeSidebar = closeSidebar;

  updateNavbar(media);
});

function toggleTheme() {
  const isDark = document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  document.getElementById("themeToggleBtn").textContent = isDark ? "☀️" : "🌙";
}

function applyStoredTheme() {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
    document.getElementById("themeToggleBtn").textContent = "☀️";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  applyStoredTheme();
  notes = loadNotes();
  renderNotes();

  document.getElementById("noteForm").addEventListener("submit", saveNote);
  document
    .getElementById("themeToggleBtn")
    .addEventListener("click", toggleTheme);

  document
    .getElementById("noteDialog")
    .addEventListener("click", function (event) {
      if (event.target === this) {
        closeNoteDialog();
      }
    });
});
