const buscaAEstrela = require("./algoritmos/BuscaAEstrela")
const BuscaLargura = require("./algoritmos/EmLargura")
const b = require("./algoritmos/Aprofundamentoiterativo")
const Bidirecional = require("./algoritmos/Bidirecional.js")
const BuscaProfundidade = require("./algoritmos/EmProfundidade")
const CentroDistribuicao = require("./modelos/CentroDistribuicao")
const Indice = require("./modelos/Indice")
const tipos = require("./modelos/Tipos")

let board = new CentroDistribuicao()
board.imprime()

function Iterativo() {
    let results = b(board, new Indice(9, 13))
    console.log(results)
    // console.log(board.board[9] [11])
    // let teste = a(board, robo.indice, new Indice(9, 13))
    fillResults(board, results)
    // board.imprime()

    //console.log(teste)
}

function bidirecional() {
    let results = Bidirecional(board, new Indice(9, 12))
    console.log(results)
    fillResults(board, results)
}

function aEstrelaOuLarguraOuProfundidade() {
    // let indicePrateleira = new Indice(5, 14)
    // let indicePrateleira = new Indice(7, 11)
    let indicePrateleira = new Indice(9, 12)
    // let indicePrateleira = new Indice(2, 0)
    // let indicePrateleira = new Indice(9, 8)
    // let results = BuscaLargura(board, indicePrateleira)
    // let results = buscaAEstrela(board, indicePrateleira)
    let results = BuscaProfundidade(board, indicePrateleira)
    console.log(results)
    fillResults(board, results)
}

function fillResults(board, results) {
    results.forEach(((v, index) => {
        board.board[v.coordenadaX][v.coordenadaY] = {
            getTipo() { return index }
        }
    }))
}

Iterativo()

board.imprime()