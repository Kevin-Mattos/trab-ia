const buscaAEstrela = require("./algoritmos/BuscaAEstrela")
const BuscaLargura = require("./algoritmos/EmLargura")
const b = require("./algoritmos/Aprofundamentoiterativo")
const Bidirecional = require("./algoritmos/Bidirecional.js")
const CentroDistribuicao = require("./modelos/CentroDistribuicao")
const Indice = require("./modelos/Indice")
const Robo = require("./modelos/Robo")
const tipos = require("./modelos/Tipos")

let board = new CentroDistribuicao()
board.imprime()

function IterativoOuBidirecional() {
    let restults = b(board, new Indice(1, 4))
    console.log(restults)
    // console.log(board.board[9] [11])
    // let teste = a(board, robo.indice, new Indice(9, 13))
    // teste.forEach((v => {
    //     board.board[v.indice.coordenadaX][v.indice.coordenadaY] = new Robo(v)
    // }))
    // board.imprime()

    //console.log(teste)
}

function aEstrelaOuLargura() {
// let indicePrateleira = new Indice(5, 14)
// let indicePrateleira = new Indice(7, 11)
// let indicePrateleira = new Indice(9, 12)
// let indicePrateleira = new Indice(2, 0)
let indicePrateleira = new Indice(9, 8)
// let results = BuscaLargura(board, indicePrateleira)
let results = buscaAEstrela(board, indicePrateleira)
console.log(results)
results.forEach((v => {
    board.board[v.coordenadaX][v.coordenadaY] = {
        getTipo(){return tipos.X}
    }
}))
}

IterativoOuBidirecional()

board.imprime()