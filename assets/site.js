const pages = [
  ["inicio", "Início", "index.html"],
  ["fundamentos", "Fundamentos", "fundamentos.html"],
  ["ferramentas", "Ferramentas e contexto", "ferramentas-contexto.html"],
  ["seguranca", "Segurança", "seguranca-controle.html"],
  ["operacao", "Operação", "operacao-duravel.html"],
  ["avaliacao", "Avaliação", "avaliacao.html"],
  ["producao", "Produção", "guia-producao.html"],
  ["referencias", "Referências", "referencias.html"],
];

const current = document.body.dataset.page || "inicio";
const navItems = pages.map(([id, label, href]) =>
  `<li><a href="${href}"${id === current ? ' aria-current="page"' : ""}>${label}</a></li>`
).join("");

const header = document.querySelector("[data-site-header]");
if (header) {
  header.innerHTML = `
    <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header class="site-header">
      <div class="header-inner">
        <a class="brand" href="index.html" aria-label="Engenharia de Harness — início">
          <span class="brand-mark" aria-hidden="true">H×</span>
          <span>Engenharia de Harness</span>
        </a>
        <button class="icon-button menu-button" type="button" aria-label="Abrir menu" aria-expanded="false">☰</button>
        <nav class="main-nav" aria-label="Navegação principal"><ul>${navItems}</ul></nav>
        <button class="icon-button theme-button" type="button" aria-label="Alternar tema" title="Alternar tema">◐</button>
      </div>
    </header>`;
}

const footer = document.querySelector("[data-site-footer]");
if (footer) {
  footer.innerHTML = `
    <footer class="site-footer">
      <div class="footer-inner">
        <p>Guia didático em português baseado em <em>Understanding Harness Engineering</em>, de @techNmak.</p>
        <p><a href="referencias.html">Fontes e notas editoriais</a> · Conteúdo educacional</p>
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
  event.currentTarget.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

document.querySelectorAll('.toc a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => history.replaceState(null, "", link.getAttribute("href")));
});
