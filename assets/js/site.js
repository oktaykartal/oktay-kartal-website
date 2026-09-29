const content = window.PORTFOLIO_CONTENT;
const grid = document.querySelector("#projects-grid");
const researchList = document.querySelector("#research-list");
const dialog = document.querySelector("#project-dialog");
const dialogContent = document.querySelector("#dialog-content");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");

const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
}[char]));

content.projects.forEach((project, index) => {
  const card = document.createElement("button");
  card.className = "project-card observe";
  card.type = "button";
  card.setAttribute("aria-label", `Open ${project.title}`);
  card.innerHTML = `
    <span class="project-image"><img src="${project.cover}" alt="${escapeHtml(project.title)} project presentation" loading="${index < 2 ? "eager" : "lazy"}"></span>
    <span class="project-meta">
      <span class="project-title">${escapeHtml(project.title)}</span>
      <span class="project-index">${String(index + 1).padStart(2, "0")}</span>
      <span class="project-details"><span>${escapeHtml(project.type)}</span><span>${project.year}</span></span>
    </span>`;
  card.addEventListener("click", () => openProject(project));
  grid.append(card);
});

content.research.forEach((item) => {
  const article = document.createElement("article");
  article.className = "research-item observe";
  article.innerHTML = `<p class="research-year">${escapeHtml(item.year)}</p><h3>${escapeHtml(item.title)}</h3><p class="research-type">${escapeHtml(item.type)}</p>`;
  researchList.append(article);
});

function openProject(project) {
  dialogContent.innerHTML = `
    <article class="dialog-project">
      <header class="dialog-head">
        <h2 id="dialog-title">${escapeHtml(project.title)}</h2>
        <div class="dialog-info"><p>${escapeHtml(project.type)}</p><p>${escapeHtml(project.location)}</p><p>${project.year}</p></div>
        <p class="dialog-description">${escapeHtml(project.description)}</p>
      </header>
      <div class="dialog-gallery">${project.gallery.map((image, index) => `<img src="${image}" alt="${escapeHtml(project.title)} presentation ${index + 1}" loading="lazy">`).join("")}</div>
    </article>`;
  dialog.showModal();
  document.body.style.overflow = "hidden";
}

function closeDialog() {
  dialog.close();
  document.body.style.overflow = "";
}

document.querySelector(".dialog-close").addEventListener("click", closeDialog);
dialog.addEventListener("click", (event) => { if (event.target === dialog) closeDialog(); });
dialog.addEventListener("close", () => { document.body.style.overflow = ""; });

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.textContent = open ? "CLOSE" : "MENU";
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "MENU";
  }));
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } });
}, { threshold: .12 });
document.querySelectorAll(".observe").forEach((element) => observer.observe(element));

document.querySelector("#year").textContent = new Date().getFullYear();
const header = document.querySelector("[data-header]");
if (header) window.addEventListener("scroll", () => header.classList.toggle("is-scrolled", window.scrollY > 20), { passive: true });
