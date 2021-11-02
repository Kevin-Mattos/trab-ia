let a = require("./algoritmos/BuscaAEstrela")
const BuscaLargura = require("./algoritmos/EmLargura")
const CentroDistribuicao = require("./modelos/CentroDistribuicao")
const Indice = require("./modelos/Indice")
const Robo = require("./modelos/Robo")

let robo = new Robo(new Indice(0,0))
let board = new CentroDistribuicao(1, 2)
board.imprime()
let restults = BuscaLargura(board, robo.indice, new Indice(9, 13))
console.log(restults)
// console.log(board.board[9] [11])
// let teste = a(board, robo.indice, new Indice(9, 13))
// teste.forEach((v => {
//     board.board[v.indice.coordenadaX][v.indice.coordenadaY] = new Robo(v)
// }))
// board.imprime()

//console.log(teste)