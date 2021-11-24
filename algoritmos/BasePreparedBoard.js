const Indice = require("../modelos/Indice")
const tipos = require("../modelos/Tipos")

function BasePreparedBoard(board) {
    
    this.board = board

    this.obterLocaisPossiveisParaIr = (posAtual) => {
        let pos = []
        let possivelPos = [
            new Indice( //lado direito
                posAtual.coordenadaX + 1,
                posAtual.coordenadaY
            ),
            new Indice( // cima
                posAtual.coordenadaX,
                posAtual.coordenadaY + 1
            ),
            new Indice( // lado Esquerdo
                posAtual.coordenadaX - 1,
                posAtual.coordenadaY
            ),
            new Indice( // para baixo
                posAtual.coordenadaX,
                posAtual.coordenadaY - 1
            ),
        ]

        possivelPos.forEach((indice) => {
            if (this.posicaoEhValida(indice)) {
                let item = this.board[indice.coordenadaX][indice.coordenadaY]
                if (item.getTipo() == tipos.CAMINHO || item.getTipo() == tipos.ROBO) {
                    pos.push(indice)
                }
            }
        })
        return pos
    }

    this.posicaoEhValida = (indice) => {
        return !(indice.coordenadaX < 0 || indice.coordenadaX >= this.board.length ||
            indice.coordenadaY < 0 || indice.coordenadaY >= this.board[0].length)
    }

    this.getItem = (indice) => {
        return this.board[indice.coordenadaX][indice.coordenadaY]
    }
}

module.exports = BasePreparedBoard