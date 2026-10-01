// Para adicionar um novo projeto, basta incluir um item na lista.
const projetos = [
  {
    titulo: "Fluxoly",
    imagem: "img/fluxoly.jpg",
    ano: "2026",
    descricao: "Plataforma de gestão para lojas de dispositivos móveis premium: vendas, estoque, tabela de preços, assistência técnica, garantias e relatórios em um único fluxo.",
    tecnologias: ["React", "Vite", "Tailwind CSS", "Python", "Flask", "SQLite"],
    demo: "https://assistencia-system.vercel.app",
    codigo: "https://github.com/TaldoDustin/assistencia_system",
  },
  {
    titulo: "Meu Sabor",
    imagem: "",
    ano: "2026",
    descricao: "ERP interno e enxuto para uma distribuidora de temperos: o vendedor tira o pedido no celular, a separação vê a demanda consolidada dos pedidos contra o estoque e o gerente acompanha o dia.",
    tecnologias: ["Next.js", "React", "Prisma", "PostgreSQL"],
    demo: "",
    codigo: "",
  },
  {
    titulo: "BeKind",
    imagem: "img/bekind.jpg",
    ano: "2023",
    descricao: "Projeto de TCC do curso técnico na ETEC Guarulhos. 3º melhor projeto na FECEG e semifinalista na FEBRACE.",
    tecnologias: ["HTML", "CSS", "JavaScript"],
    demo: "",
    codigo: "https://github.com/TaldoDustin/TCC-Bekind",
  },
];

const tecnologias = [
  "React", "Next.js", "Python", "Flask", "PHP", "HTML", "CSS", "Tailwind CSS",
  "SQL", "PostgreSQL", "MySQL", "SQLite", "Prisma", "APIs REST", "Git", "GitHub",
];

function criarElemento(tag, classe, texto) {
  const el = document.createElement(tag);
  if (classe) el.className = classe;
  if (texto) el.textContent = texto;
  return el;
}

function criarLink(texto, href) {
  const a = criarElemento("a", "", texto);
  a.href = href;
  if (href.startsWith("http")) {
    a.target = "_blank";
    a.rel = "noopener";
  }
  return a;
}

function renderizarProjetos() {
  const lista = document.getElementById("lista-projetos");

  for (const projeto of projetos) {
    const card = criarElemento("article", "project reveal");

    const topo = criarElemento("div", "project-top");
    topo.append(criarElemento("h3", "", projeto.titulo), criarElemento("span", "project-year", projeto.ano));

    const tags = criarElemento("ul", "tags");
    for (const tec of projeto.tecnologias) tags.append(criarElemento("li", "", tec));

    const links = criarElemento("div", "project-links");
    if (projeto.demo) links.append(criarLink("Ver demo ↗", projeto.demo));
    if (projeto.codigo) links.append(criarLink("Código ↗", projeto.codigo));

    // Sem imagem, o card mostra o nome do projeto no lugar da captura
    const capa = criarElemento("div", "project-cover");
    if (projeto.imagem) {
      const img = criarElemento("img");
      img.src = projeto.imagem;
      img.alt = `Tela do projeto ${projeto.titulo}`;
      img.loading = "lazy";
      capa.append(img);
    } else {
      capa.append(criarElemento("span", "", projeto.titulo));
    }

    const corpo = criarElemento("div", "project-body");
    corpo.append(topo, criarElemento("p", "", projeto.descricao), tags, links);
    card.append(capa, corpo);
    lista.append(card);
  }
}

function renderizarFaixa() {
  const faixa = document.getElementById("faixa-tecnologias");
  // Lista duplicada para o loop da animação ficar contínuo
  for (const tec of [...tecnologias, ...tecnologias]) faixa.append(criarElemento("span", "", tec));
}

function iniciarTema() {
  const raiz = document.documentElement;
  document.querySelector(".theme-toggle").addEventListener("click", () => {
    const tema = raiz.dataset.theme === "dark" ? "light" : "dark";
    raiz.dataset.theme = tema;
    try {
      localStorage.setItem("tema", tema);
    } catch (e) {}
  });
}

function iniciarAnimacoes() {
  const itens = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    itens.forEach((el) => el.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          observer.unobserve(entrada.target);
        }
      }
    },
    { threshold: 0.1 }
  );
  itens.forEach((el) => observer.observe(el));
}

function iniciarMenu() {
  const header = document.querySelector(".site-header");
  const botao = document.querySelector(".nav-toggle");
  const nav = document.getElementById("menu");
  const links = nav.querySelectorAll("a");

  const fechar = () => {
    nav.classList.remove("open");
    botao.setAttribute("aria-expanded", "false");
  };

  botao.addEventListener("click", () => {
    const aberto = nav.classList.toggle("open");
    botao.setAttribute("aria-expanded", String(aberto));
  });
  links.forEach((link) => link.addEventListener("click", fechar));

  window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 8), { passive: true });

  // Destaca no menu a seção visível
  const observer = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        links.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entrada.target.id}`));
      }
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  document.querySelectorAll("main section[id]").forEach((secao) => observer.observe(secao));
}

renderizarProjetos();
renderizarFaixa();
iniciarTema();
iniciarAnimacoes();
iniciarMenu();
document.getElementById("ano").textContent = new Date().getFullYear();
