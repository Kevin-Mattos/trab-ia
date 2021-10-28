
let Robo = require("../modelos/Robo")
let CentroDistribuicao = require("../modelos/CentroDistribuicao")
const Indice = require("../modelos/Indice")

function BuscaAEstrela() {

    let robo = new Robo(1,2)
    let board = new CentroDistribuicao(1, 2)
    board.imprime()

    mover(board, new Indice(12,0), new Indice(11, 0))
    mover(board, new Indice(11,0), new Indice(11, 1))
    

}

function mover(board, atual, novo) {   

    board.mover(atual, novo)
    board.imprime()
}

module.exports = BuscaAEstrela
