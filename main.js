const buscaAEstrela = require("./algoritmos/BuscaAEstrela")
const BuscaLargura = require("./algoritmos/EmLargura")
const CentroDistribuicao = require("./modelos/CentroDistribuicao")
const Indice = require("./modelos/Indice")
const Robo = require("./modelos/Robo")
const tipos = require("./modelos/Tipos")

let board = new CentroDistribuicao()
board.imprime()
let results = BuscaLargura(board, new Indice(5, 14))
// let results = buscaAEstrela(board, new Indice(5, 14))
console.log(results)
results.forEach((v => {
    board.board[v.coordenadaX][v.coordenadaY] = {
        getTipo(){return tipos.X}
    }
}))
board.imprime()