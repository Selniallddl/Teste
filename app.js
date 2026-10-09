const cenas = {
  inicio: {
    titulo: "Ei, Henrique... 👀",
    mensagem: "Antes de qualquer coisa, preciso saber de uma coisa...\n\nVocê confia em mim?",
    opcoes: [
      ["Confio, por quê? 😏", "preparado"],
      ["Já tô desconfiado KKKK", "desconfiado"]
    ]
  },

  desconfiado: {
    titulo: "OXEEEE 🤨",
    mensagem: "Já tá desconfiado de mim? Eu nem fiz nada ainda KKKKK.\n\nVou te dar outra chance.",
    opcoes: [
      ["Tá bom, eu confio 😂", "preparado"],
      ["Continuo desconfiado", "teimoso"]
    ]
  },

  teimoso: {
    titulo: "QUE HOMEM DIFÍCIL 😭",
    mensagem: "Henrique, eu fiz um site inteiro e você já começou a dificultar meu trabalho KKKKK.",
    opcoes: [
      ["Tá bom, vai KKKK", "preparado"]
    ]
  },

  preparado: {
    titulo: "Tá preparado? ",
    mensagem: "Pensa bem antes de responder.\n\nDepois não diga que não avisei...",
    opcoes: [
      ["SIM, BORA!", "vamos"],
      ["Não 😭", "nao"]
    ]
  },

  nao: {
    titulo: "UÉEEEE 🤨",
    mensagem: "COMO ASSIM NÃO???\n\nNão confia em mim, Henrique? Depois de tudo que a gente passou? Pipipipopopó KKKKK.",
    opcoes: [
      ["Tá, agora tô preparado 😂", "vamos"],
      ["Ainda não", "insiste"]
    ]
  },

  insiste: {
    titulo: "HENRIQUEEEEE 😭",
    mensagem: "Meu querido, colabora comigo! Eu tô tentando criar um clima de suspense aqui KKKKK.",
    opcoes: [
      ["TÁ BOM, VAMOS!", "vamos"]
    ]
  },

  vamos: {
    titulo: "Então vamos nessa... 👀",
    mensagem: "A partir de agora, você está entrando em território desconhecido.\n\nTem certeza de que quer continuar?",
    opcoes: [
      ["Continuar...", "segredo"],
      ["Quero voltar 😭", "voltar"]
    ]
  },

  voltar: {
    titulo: "AGORA NÃO, MEU FILHO 😂",
    mensagem: "Você já chegou até aqui e quer desistir na melhor parte? KKKKK.",
    opcoes: [
      ["Tá bom, continuar", "segredo"]
    ]
  },

  segredo: {
    titulo: "Tenho uma informação... 🤫",
    mensagem: "Descobri uma coisa sobre você.\n\nUma coisa que talvez você nem saiba que eu sei...",
    opcoes: [
      ["O QUE VOCÊ SABE???", "alerta"],
      ["Prefiro não saber", "curioso"]
    ]
  },

  curioso: {
    titulo: "AH, TÁ BOM KKKKK 🤨",
    mensagem: "Agora vai fingir que não tá morrendo de curiosidade? Sei...",
    opcoes: [
      ["TÁ, ME CONTA!", "alerta"]
    ]
  },

  alerta: {
    titulo: "⚠️ ALERTA MÁXIMO ⚠️",
    mensagem: "Uma informação extremamente comprometedora foi descoberta...\n\nPreparando revelação...",
    opcoes: [
      ["MEU DEUS, O QUÊ???", "pegadinha"]
    ]
  },

  pegadinha: {
    titulo: "DESCOBRIMOS QUE... 🚨",
    mensagem: "VOCÊ É MUITO FOFOQUEIRO KKKKKKKKK!\n\nCalma, homem! Era só uma pegadinha.\n\nMas agora vem a verdadeira surpresa...",
    opcoes: [
      ["Revelar surpresa 🎁", "final"]
    ]
  },

  final: {
    titulo: "PARABÉÉÉÉNS!!! 🎉",
    mensagem: "HENRIQUEEEEE!\n\nVOCÊ FOI A PRIMEIRA PESSOA A ENTRAR EM UM SITE QUE EU FIZZZZZ!!!\n\nObrigada por ser minha cobaia oficial de programação KKKKK ❤️",
    foto: true,
    opcoes: [
      ["Ver tudo de novo 🔄", "inicio"]
    ]
  }
};

function mostrarCena(nome) {
  const cena = cenas[nome];

  document.body.classList.toggle("alerta", nome === "alerta");

  const cartao = document.querySelector(".cartao");
  cartao.style.animation = "none";
  void cartao.offsetWidth;
  cartao.style.animation = "aparecer .5s ease";

  document.getElementById("titulo").textContent = cena.titulo;
  document.getElementById("mensagem").textContent = cena.mensagem;

  const areaFoto = document.getElementById("foto-area");
  areaFoto.replaceChildren();

  const areaBotoes = document.getElementById("botoes");
  areaBotoes.replaceChildren();

  cena.opcoes.forEach(([texto, destino], indice) => {
    const botao = document.createElement("button");
    botao.textContent = texto;

    if (indice > 0) {
      botao.classList.add("secundario");
    }

    botao.addEventListener("click", () => mostrarCena(destino));
    areaBotoes.appendChild(botao);
  });

  if (nome === "final") {
    soltarConfetes();
  }

  window.scrollTo(0, 0);
}

function soltarConfetes() {
  const area = document.getElementById("confetes");
  area.replaceChildren();

  const cores = ["#ff8ac5", "#ffd166", "#a78bfa", "#8be9fd"];

  for (let i = 0; i < 70; i++) {
    const confete = document.createElement("span");
    confete.className = "confete";
    confete.style.left = Math.random() * 100 + "%";
    confete.style.backgroundColor = cores[i % cores.length];
    confete.style.animationDelay = Math.random() * 2 + "s";

    area.appendChild(confete);
  }

  setTimeout(() => area.replaceChildren(), 6000);
}

mostrarCena("inicio");
