const BuscaAEstrela = require("./algoritmos/BuscaAEstrela")
let a = require("./algoritmos/BuscaAEstrela")
const BuscaLargura = require("./algoritmos/EmLargura")
const CentroDistribuicao = require("./modelos/CentroDistribuicao")
const Indice = require("./modelos/Indice")
const Robo = require("./modelos/Robo")

let robo = new Robo(new Indice(0,0))
let board = new CentroDistribuicao(1, 2)
board.imprime()
let resultsBuscaLargura = BuscaLargura(board, robo.indice, new Indice(9, 13))
// let resultsBuscaAEstrela = BuscaAEstrela(board, robo.indice, new Indice(9, 13))
console.log(resultsBuscaLargura)
// console.log(board.board[9] [11])
// let teste = a(board, robo.indice, new Indice(9, 13))
resultsBuscaLargura.forEach((v => {
    board.board[v.coordenadaX][v.coordenadaY] = new Robo(v)
}))
board.imprime()