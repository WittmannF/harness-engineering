const isEnglish = document.documentElement.lang.toLowerCase().startsWith("en");
const current = document.body.dataset.page || "inicio";

const pages = [
  { id: "inicio", pt: ["Início", "index.html"], en: ["Home", "index.html"] },
  { id: "fundamentos", pt: ["Fundamentos", "fundamentos.html"], en: ["Fundamentals", "fundamentals.html"] },
  { id: "ferramentas", pt: ["Ferramentas e contexto", "ferramentas-contexto.html"], en: ["Tools & context", "tools-context.html"] },
  { id: "seguranca", pt: ["Segurança", "seguranca-controle.html"], en: ["Security", "security-control.html"] },
  { id: "operacao", pt: ["Operação", "operacao-duravel.html"], en: ["Operations", "durable-operations.html"] },
  { id: "avaliacao", pt: ["Avaliação", "avaliacao.html"], en: ["Evaluation", "evaluation.html"] },
  { id: "producao", pt: ["Produção", "guia-producao.html"], en: ["Production", "production-guide.html"] },
  { id: "referencias", pt: ["Referências", "referencias.html"], en: ["References", "references.html"] },
];

const locale = isEnglish ? "en" : "pt";
const counterpart = isEnglish ? "pt" : "en";
const currentPage = pages.find((page) => page.id === current) || pages[0];
const counterpartPrefix = isEnglish ? "../" : "en/";
const navItems = pages.map((page) => {
  const [label, href] = page[locale];
  return `<li><a href="${href}"${page.id === current ? ' aria-current="page"' : ""}>${label}</a></li>`;
}).join("");

const ui = isEnglish ? {
  brand: "Harness Engineering",
  nav: "Main navigation",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  theme: "Toggle theme",
  skip: "Skip to content",
  switchLabel: "Ver esta página em português",
  switchText: "PT",
  footer: "A visual English guide based on <em>Understanding Harness Engineering</em>, by @techNmak.",
  sources: "Sources and editorial notes",
  educational: "Educational content",
} : {
  brand: "Engenharia de Harness",
  nav: "Navegação principal",
  openMenu: "Abrir menu",
  closeMenu: "Fechar menu",
  theme: "Alternar tema",
  skip: "Pular para o conteúdo",
  switchLabel: "View this page in English",
  switchText: "EN",
  footer: "Guia didático em português baseado em <em>Understanding Harness Engineering</em>, de @techNmak.",
  sources: "Fontes e notas editoriais",
  educational: "Conteúdo educacional",
};

const header = document.querySelector("[data-site-header]");
if (header) {
  header.innerHTML = `
    <a class="skip-link" href="#conteudo">${ui.skip}</a>
    <header class="site-header">
      <div class="header-inner">
        <a class="brand" href="${pages[0][locale][1]}" aria-label="${ui.brand}">
          <span class="brand-mark" aria-hidden="true">H×</span>
          <span class="brand-text">${ui.brand}</span>
        </a>
        <button class="icon-button menu-button" type="button" aria-label="${ui.openMenu}" aria-expanded="false">☰</button>
        <nav class="main-nav" aria-label="${ui.nav}"><ul>${navItems}</ul></nav>
        <a class="language-link" href="${counterpartPrefix}${currentPage[counterpart][1]}" lang="${counterpart === "en" ? "en" : "pt-BR"}" hreflang="${counterpart === "en" ? "en" : "pt-BR"}" aria-label="${ui.switchLabel}">${ui.switchText}</a>
        <button class="icon-button theme-button" type="button" aria-label="${ui.theme}" title="${ui.theme}">◐</button>
      </div>
    </header>`;
}

const footer = document.querySelector("[data-site-footer]");
if (footer) {
  const referencesHref = pages.find((page) => page.id === "referencias")[locale][1];
  footer.innerHTML = `
    <footer class="site-footer">
      <div class="footer-inner">
        <p>${ui.footer}</p>
        <p><a href="${referencesHref}">${ui.sources}</a> · ${ui.educational}</p>
      </div>
    </footer>`;
}

const root = document.documentElement;
const savedTheme = localStorage.getItem("harness-theme");
if (savedTheme === "dark" || (!savedTheme && matchMedia("(prefers-color-scheme: dark)").matches)) {
  root.dataset.theme = "dark";
}

document.querySelector(".theme-button")?.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("harness-theme", root.dataset.theme);
});

document.querySelector(".menu-button")?.addEventListener("click", (event) => {
  const nav = document.querySelector(".main-nav");
  const isOpen = nav.classList.toggle("is-open");
  event.currentTarget.setAttribute("aria-expanded", String(isOpen));
  event.currentTarget.setAttribute("aria-label", isOpen ? ui.closeMenu : ui.openMenu);
});

document.querySelectorAll('.toc a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => history.replaceState(null, "", link.getAttribute("href")));
});
