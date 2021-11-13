let Robo = require("../modelos/Robo")
let CentroDistribuicao = require("../modelos/CentroDistribuicao")
const Indice = require("../modelos/Indice");
const tipos = require("../modelos/Tipos");

function BuscaLargura(board, indiceParaIr) {

    let preparedBoard = new BuscaLarguraPreparedBoard(board.board)

    var fila = []
    fila.push(indiceParaIr)
    while (fila.length > 0) {
        let indice = fila.shift()
        let vizinhos = preparedBoard.obterLocaisPossiveisParaIr(indice)
        for (let i = 0; i < vizinhos.length; i++) {
            let vizinho = vizinhos[i]
            let item = preparedBoard.getItem(vizinho)
                if(item.getTipo() == tipos.ROBO) {
                    var curr = item
                    curr.parent = preparedBoard.getItem(indice);
                    var ret = [];
                    while (curr.parent) {
                        ret.push(curr.indice);
                        curr = curr.parent
                    }
                    return ret.reverse()
                }
            if(!item.visitado) {
                item.visitado = true
                item.parent = preparedBoard.getItem(indice)
                fila.push(vizinho)
            }
        }
        preparedBoard.getItem(indice).visitado = true
    }
    return []
}

class BuscaLarguraPreparedBoard {
    constructor(board) {
        this.board = Array(board.length).fill().map(() => Array(board[0].length).fill())
        board.forEach((element, linha) => {
            element.forEach((item, coluna) => {
                if (item == undefined) {
                    this.board[linha][coluna] = {
                        tipo: tipos.CAMINHO,
                        indice: new Indice(linha, coluna),
                        visitado : false,
                        distancia : 0,
                        getTipo() {
                            return this.tipo
                        }
                    }
                } else {
                    
                    this.board[linha][coluna] = item
                }
            }

            )
        });
    }

    obterLocaisPossiveisParaIr(posAtual) {
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
            if (indice.coordenadaX < 0 || indice.coordenadaX >= 13) {

            }
            else if (indice.coordenadaY < 0 || indice.coordenadaY >= 15) {

            }
            else {
                let item = this.board[indice.coordenadaX][indice.coordenadaY]
                if (item.getTipo() == tipos.CAMINHO || item.getTipo() == tipos.ROBO) {
                    pos.push(indice)
                }
            }
        })

        return pos
    }

    getItem(indice) {
        return this.board[indice.coordenadaX][indice.coordenadaY]
    }
}


module.exports = BuscaLargura
