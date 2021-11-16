const buscaAEstrela = require("./algoritmos/BuscaAEstrela")
const BuscaLargura = require("./algoritmos/EmLargura")
const CentroDistribuicao = require("./modelos/CentroDistribuicao")
const Indice = require("./modelos/Indice")
const Robo = require("./modelos/Robo")
const tipos = require("./modelos/Tipos")

let board = new CentroDistribuicao()
board.imprime()
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
board.imprime()