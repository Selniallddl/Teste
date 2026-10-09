let etapa = 0;

function proximaEtapa() {
    etapa++;

    const pergunta = document.getElementById("pergunta");
    const mensagem = document.getElementById("mensagem");
    const botoes = document.getElementById("botoes");

    if (etapa === 1) {
        pergunta.innerText = "Então presta atenção...";

        mensagem.innerText =
            "Eu aprendi a programar só para criar essa pequena perturbação na sua vida.";

        mensagem.classList.remove("escondido");

        botoes.innerHTML =
            '<button onclick="proximaEtapa()">Continuar</button>';
    }

    else if (etapa === 2) {
        pergunta.innerText = "Surpresaaaa!";

        mensagem.innerText =
            "Você acaba de entrar no meu primeiro site. E ainda teve a honra de ser minha cobaia oficial! ❤️";

        botoes.innerHTML =
            '<button class="secundario" onclick="reiniciar()">Ver novamente</button>';
    }
}

function reiniciar() {
    etapa = 0;

    document.getElementById("pergunta").innerText =
        "Você confia em mim? 👀";

    document.getElementById("mensagem").classList.add("escondido");

    document.getElementById("botoes").innerHTML = `
        <button onclick="proximaEtapa()">
            Confio, por quê?
        </button>

        <button class="secundario" onclick="proximaEtapa()">
            Já tô desconfiado KKKK
        </button>
    `;
}