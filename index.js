var linhas, colunas, bombas, matriz, tabela;
function criarMatriz(a, o) {
    matriz = [];
    for (var i = 0; i < a; i++) {
        matriz[i] = new Array(o).fill(0);
    }
    console.log(matriz);
}
function criarTabela(a, o) {
    criarMatriz(a, o)
    var str = "";
    for (var i = 0; i < a; i++) {
        str += "<tr>";
        for (var j = 0; j < o; j++) {
            str += "<td class='blocked'></td>";
        }
        str += "</tr>";
    }
    tabela.innerHTML = str;
}
function mostrarMatriz() {
    for (var i = 0; i < linhas; i++) {
        for (var j = 0; j < colunas; j++) {
            if (matriz[i][j] === -1) {
                tabela.rows[i].cells[j].innerHTML = "&#128163;";
            } else {
                tabela.rows[i].cells[j].innerHTML = matriz[i][j];
            }
        }
    }
}
function bandeira(event) {
    var cell = event.target;
    var linha = cell.parentNode.rowIndex;
    var coluna = cell.cellIndex;
    if (cell.className === "blocked") {
        cell.className = "flag";
        cell.innerHTML = "&#128681;";//&#9873;
    } else if (cell.className === "flag") {
        cell.className = "blocked";
        cell.innerHTML = "";
    }
    return false;
}
function init() {
    tabela = document.getElementById("tabela");
    tabela.onclick = verificar;
    tabela.oncontextmenu = bandeira;
    var diff = document.getElementById("dificuldade");
    switch (parseInt(diff.value)) {
        case 0:
            linhas = 10;
            colunas = 10;
            bombas = 12;
            break;
        case 1:
            linhas = 16;
            colunas = 16;
            bombas = 40;
            break;
        default:
            linhas = 16;
            colunas = 30;
            bombas = 99;
            break;
    }
    criarTabela(linhas, colunas);
    gerarBombas();
    gerarNumeros();
    //    mostrarMatriz();
}
function verificar(event) {
    var cell = event.target;
    if (cell.className !== "flag") {
        var linha = cell.parentNode.rowIndex;
        var coluna = cell.cellIndex;
        switch (matriz[linha][coluna]) {
            case -1:
                mostrarBombas();
                cell.style.backgroundColor = "red";
                tabela.onclick = undefined;
                tabela.oncontextmenu = undefined;
                alert("Você perdeu!");
                break;
            case 0:
                limparCelulas(linha, coluna);
                break;
            default:
                cell.innerHTML = matriz[linha][coluna];
                cell.className = "n" + matriz[linha][coluna];
        }
        fimDeJogo();
    }
}function registerEvents() {
    init();
    var diff = document.getElementById("dificuldade");
    diff.onchange = init;
}
onload = registerEvents;