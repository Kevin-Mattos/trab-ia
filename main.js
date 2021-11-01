let a = require("./algoritmos/BuscaAEstrela")
const CentroDistribuicao = require("./modelos/CentroDistribuicao")
const Indice = require("./modelos/Indice")
const Robo = require("./modelos/Robo")

let robo = new Robo(new Indice(4,10))
let board = new CentroDistribuicao(1, 2)
console.log(board.board[9] [11])
let teste = a(board, robo.indice, new Indice(9, 13))
teste.forEach((v => {
   
    board.board[v.indice.coordenadaX][ v.indice.coordenadaY] = new Robo(v)
}))
board.imprime()

//console.log(teste)