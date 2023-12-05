// main.js
const novaNota = document.getElementById("nova-nota");
const adicionarNota = document.getElementById("adicionar-nota");
const limparNotas = document.getElementById("limpar-notas");
const notasSalvas = document.getElementById("notas-salvas");

if (localStorage.getItem("notas")) {
    const notas = JSON.parse(localStorage.getItem("notas"));

    notas.forEach(function (nota, index) {
        criarNota(nota, index);
    });
}

adicionarNota.addEventListener("click", function () {
    const textoNota = novaNota.value.trim();
    if (textoNota !== "") {
        criarNota(textoNota);
        salvarNota();
        novaNota.value = "";
    }
});

limparNotas.addEventListener("click", function () {
    notasSalvas.innerHTML = "";
    localStorage.removeItem("notas");
});

function criarNota(texto, index) {
    const div = document.createElement("div");
    const p = document.createElement("p");
    const botaoEditar = document.createElement("button");
    const botaoExcluir = document.createElement("button");
    const inputCor = document.createElement("input");
    inputCor.type = "color";
    inputCor.value = "#ffffff"; // Define a cor branca como padrão para o fundo.

    const inputCorFonte = document.createElement("input");
    inputCorFonte.type = "color";
    inputCorFonte.value = "#000000"; // Define a cor preta como padrão para a fonte.

    p.textContent = texto;
    botaoEditar.textContent = "Editar";
    botaoExcluir.textContent = "Excluir";

    botaoEditar.className = "botao-editar";
    botaoExcluir.className = "botao-excluir";

    div.appendChild(p);
    div.appendChild(botaoEditar);
    div.appendChild(botaoExcluir);
    div.appendChild(inputCor);
    div.appendChild(inputCorFonte);

    div.className = "nota";

    if (index !== undefined) {
        const notas = JSON.parse(localStorage.getItem("notas"));
        inputCor.value = notas[index].cor;
        inputCorFonte.value = notas[index].corFonte; // Carrega a cor da fonte da nota.
        div.style.backgroundColor = notas[index].cor;
        p.style.color = notas[index].corFonte; // Define a cor da fonte do texto.
    }
    notasSalvas.appendChild(div);

    botaoEditar.addEventListener("click", function () {
        editarNota(p, div, inputCor, inputCorFonte);
    });

    botaoExcluir.addEventListener("click", function () {
        if (confirm("Tem certeza que deseja excluir essa nota?")) {
            div.remove();
            salvarNota();
        }
    });
}

function editarNota(p, div, inputCor, inputCorFonte) {
    const textareaEdicao = document.createElement("textarea");
    textareaEdicao.value = p.textContent;
    div.replaceChild(textareaEdicao, p);

    const botaoSalvar = document.createElement("button");
    botaoSalvar.textContent = "Salvar";
    div.appendChild(botaoSalvar);

    botaoSalvar.addEventListener("click", function () {
        p.textContent = textareaEdicao.value;
        div.replaceChild(p, textareaEdicao);
        div.removeChild(botaoSalvar);
        div.style.backgroundColor = inputCor.value;
        p.style.color = inputCorFonte.value; // Define a cor da fonte do texto.
        salvarNota();
    });
}

function salvarNota() {
    const notas = [];
    const divsNotas = notasSalvas.querySelectorAll(".nota");

    divsNotas.forEach(function (div) {
        const p = div.querySelector("p");
        const inputCor = div.querySelector("input");
        const inputCorFonte = div.querySelector("input:nth-child(4)"); // Seleciona o input da cor da fonte
        notas.push({
            texto: p.textContent,
            cor: inputCor.value,
            corFonte: inputCorFonte.value // Salva a cor da fonte da nota.
        });
    });

    localStorage.setItem("notas", JSON.stringify(notas));
}
