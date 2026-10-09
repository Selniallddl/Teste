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
/* =========================================
   BÔNUS: JOGO DA VELHA DO HENRIQUE
   Cole depois de mostrarCena("inicio");
   ========================================= */

// Coloca o botão do jogo na surpresa final.
cenas.final.botoes.unshift([
  "❌ DESAFIAR O COMPUTADOR ⭕",
  "jogoVelha"
]);

// Preserva o funcionamento original das cenas.
const mostrarCenaSemJogo = mostrarCena;

let tabuleiroVelha = Array(9).fill("");
let partidaTerminou = false;
let aguardandoComputador = false;
let timerComputador = null;
let vitoriasHenrique = 0;
let vitoriasComputador = 0;
let empatesVelha = 0;

// Combinações que vencem o jogo.
const combinacoesVelha = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Verifica vitória, empate ou partida em andamento.
function verificarResultado(tabuleiro) {
  for (const combinacao of combinacoesVelha) {
    const [a, b, c] = combinacao;

    if (
      tabuleiro[a] &&
      tabuleiro[a] === tabuleiro[b] &&
      tabuleiro[b] === tabuleiro[c]
    ) {
      return {
        vencedor: tabuleiro[a],
        casas: combinacao
      };
    }
  }

  if (tabuleiro.every(casa => casa !== "")) {
    return { vencedor: "empate", casas: [] };
  }

  return null;
}

// Inteligência do computador.
// X = Henrique | O = Computador
function calcularMelhorJogada(tabuleiro, jogador, profundidade) {
  const resultado = verificarResultado(tabuleiro);

  if (resultado) {
    if (resultado.vencedor === "O") {
      return 10 - profundidade;
    }

    if (resultado.vencedor === "X") {
      return profundidade - 10;
    }

    return 0;
  }

  const pontuacoes = [];

  for (let i = 0; i < 9; i++) {
    if (tabuleiro[i] !== "") continue;

    tabuleiro[i] = jogador;

    const pontos = calcularMelhorJogada(
      tabuleiro,
      jogador === "O" ? "X" : "O",
      profundidade + 1
    );

    tabuleiro[i] = "";
    pontuacoes.push(pontos);
  }

  if (jogador === "O") {
    return Math.max(...pontuacoes);
  }

  return Math.min(...pontuacoes);
}

function escolherJogadaComputador() {
  let melhorPontuacao = -Infinity;
  let melhoresCasas = [];

  for (let i = 0; i < 9; i++) {
    if (tabuleiroVelha[i] !== "") continue;

    tabuleiroVelha[i] = "O";

    const pontos = calcularMelhorJogada(
      tabuleiroVelha,
      "X",
      1
    );

    tabuleiroVelha[i] = "";

    if (pontos > melhorPontuacao) {
      melhorPontuacao = pontos;
      melhoresCasas = [i];
    } else if (pontos === melhorPontuacao) {
      melhoresCasas.push(i);
    }
  }

  // Entre jogadas igualmente boas, escolhe uma aleatória.
  return melhoresCasas[
    Math.floor(Math.random() * melhoresCasas.length)
  ];
}

// Modifica apenas a navegação para incluir o jogo.
mostrarCena = function(nome) {
  clearTimeout(timerComputador);
  aguardandoComputador = false;

  if (nome === "jogoVelha") {
    abrirJogoVelha();
    return;
  }

  document.body.classList.remove("jogando-velha");
  mostrarCenaSemJogo(nome);
};

function abrirJogoVelha() {
  document.body.classList.remove("alerta", "final");
  document.body.classList.add("jogando-velha");

  document.getElementById("simbolo").textContent = "🎮";

  document.getElementById("titulo").textContent =
    "HENRIQUE VS. COMPUTADOR";

  document.getElementById("mensagem").textContent =
    "ACHOU QUE TINHA ACABADO? KKKKK!\n\n" +
    "Agora quero ver se você consegue vencer " +
    "um jogo que eu mesma programei!";

  const area = document.getElementById("botoes");

  area.innerHTML = `
    <section class="jogo-velha">
      <div class="placar-velha">
        <div>
          <small>HENRIQUE</small>
          <strong id="placar-henrique">0</strong>
        </div>

        <div>
          <small>COMPUTADOR</small>
          <strong id="placar-computador">0</strong>
        </div>

        <div>
          <small>EMPATES</small>
          <strong id="placar-empates">0</strong>
        </div>
      </div>

      <p id="status-velha" class="status-velha">
        Sua vez, Henrique! ❌
      </p>

      <div id="tabuleiro-velha" class="tabuleiro"></div>

      <p class="dica-velha">
        Você é o X. O computador é o O.<br>
        Faça três símbolos em linha para ganhar!
      </p>

      <button id="reiniciar-velha">
        🔄 JOGAR NOVAMENTE
      </button>

      <button id="zerar-placar" class="secundario">
        🧹 ZERAR PLACAR
      </button>

      <button id="voltar-final" class="secundario">
        🎁 VOLTAR PARA A SURPRESA
      </button>
    </section>
  `;

  document.getElementById("reiniciar-velha")
    .addEventListener("click", iniciarPartidaVelha);

  document.getElementById("zerar-placar")
    .addEventListener("click", () => {
      vitoriasHenrique = 0;
      vitoriasComputador = 0;
      empatesVelha = 0;
      iniciarPartidaVelha();
    });

  document.getElementById("voltar-final")
    .addEventListener("click", () => {
      mostrarCena("final");
    });

  iniciarPartidaVelha();
  window.scrollTo(0, 0);
}

function iniciarPartidaVelha() {
  clearTimeout(timerComputador);

  tabuleiroVelha = Array(9).fill("");
  partidaTerminou = false;
  aguardandoComputador = false;

  document.getElementById("status-velha").textContent =
    "Sua vez, Henrique! ❌";

  const area = document.getElementById("tabuleiro-velha");
  area.replaceChildren();

  for (let i = 0; i < 9; i++) {
    const casa = document.createElement("button");

    casa.className = "casa";
    casa.type = "button";
    casa.setAttribute(
      "aria-label",
      "Casa " + (i + 1)
    );

    casa.addEventListener("click", () => {
      jogarComoHenrique(i);
    });

    area.appendChild(casa);
  }

  atualizarPlacarVelha();
  desenharTabuleiroVelha();
}

function jogarComoHenrique(posicao) {
  if (
    partidaTerminou ||
    aguardandoComputador ||
    tabuleiroVelha[posicao] !== ""
  ) {
    return;
  }

  tabuleiroVelha[posicao] = "X";
  desenharTabuleiroVelha();

  if (conferirFimDaPartida()) return;

  aguardandoComputador = true;

  document.getElementById("status-velha").textContent =
    "O computador está pensando... 🤔";

  // Pequena pausa para parecer que o computador pensa.
  timerComputador = setTimeout(() => {
    const posicaoComputador = escolherJogadaComputador();

    if (posicaoComputador === undefined) return;

    tabuleiroVelha[posicaoComputador] = "O";
    aguardandoComputador = false;

    desenharTabuleiroVelha();

    if (!conferirFimDaPartida()) {
      document.getElementById("status-velha").textContent =
        "Sua vez, Henrique! ❌";
    }
  }, 450);
}

function desenharTabuleiroVelha(casasVencedoras = []) {
  const casas = document.querySelectorAll(
    "#tabuleiro-velha .casa"
  );

  casas.forEach((casa, indice) => {
    const simbolo = tabuleiroVelha[indice];

    casa.textContent = simbolo;
    casa.className = "casa";

    if (simbolo === "X") {
      casa.classList.add("x");
    }

    if (simbolo === "O") {
      casa.classList.add("o");
    }

    if (casasVencedoras.includes(indice)) {
      casa.classList.add("vencedora");
    }

    casa.disabled =
      simbolo !== "" ||
      partidaTerminou ||
      aguardandoComputador;
  });
}

function conferirFimDaPartida() {
  const resultado = verificarResultado(tabuleiroVelha);

  if (!resultado) return false;

  partidaTerminou = true;
  aguardandoComputador = false;

  const status = document.getElementById("status-velha");

  if (resultado.vencedor === "X") {
    vitoriasHenrique++;

    status.textContent =
      "🏆 MILAGRE! HENRIQUE VENCEU! KKKKK!";

    soltarConfetes();
  } else if (resultado.vencedor === "O") {
    vitoriasComputador++;

    status.textContent =
      "😂 HENRIQUE, VOCÊ PERDEU PRA UM SITE " +
      "QUE A GABI FEZ KKKKKKK!";
  } else {
    empatesVelha++;

    status.textContent =
      "🤝 DEU VELHA! PELO MENOS VOCÊ NÃO PERDEU KKKK!";
  }

  desenharTabuleiroVelha(resultado.casas);
  atualizarPlacarVelha();

  return true;
}

function atualizarPlacarVelha() {
  document.getElementById("placar-henrique").textContent =
    vitoriasHenrique;

  document.getElementById("placar-computador").textContent =
    vitoriasComputador;

  document.getElementById("placar-empates").textContent =
    empatesVelha;
}
