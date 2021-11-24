const Indice = require("../modelos/Indice")
const tipos = require("../modelos/Tipos")
const BasePreparedBoard = require("./basePreparedBoard")

function BuscaProfundidade(board, indiceParaIr) {

    let preparedBoard = new BuscaProfundidadePreparedBoard(board.board)

    let fila = []
    fila.push(indiceParaIr)
    while (fila.length > 0) {
        let indice = fila.pop()
        let vizinhos = preparedBoard.obterLocaisPossiveisParaIr(indice)
        for (let i = 0; i < vizinhos.length; i++) {
            let vizinho = vizinhos[i]
            let item = preparedBoard.getItem(vizinho)
            if (item.getTipo() == tipos.ROBO) {
                let curr = item
                curr.parent = preparedBoard.getItem(indice)
                let ret = []
                while (curr.parent) {
                    ret.push(curr.indice)
                    curr = curr.parent
                }
                return ret
            }
            if (!item.visitado) {
                item.visitado = true
                item.parent = preparedBoard.getItem(indice)
                fila.push(vizinho)
            }
        }
        preparedBoard.getItem(indice).visitado = true
    }
    return []
}

function BuscaProfundidadePreparedBoard(board) {

    let prepBoard = Array(board.length).fill().map(() => Array(board[0].length).fill())
    board.forEach((element, linha) => {
        element.forEach((item, coluna) => {
            if (item == undefined) {
                prepBoard[linha][coluna] = {
                    tipo: tipos.CAMINHO,
                    indice: new Indice(linha, coluna),
                    visitado: false,
                    getTipo() {
                        return this.tipo
                    }
                }
            } else {
                item.visitado = false
                prepBoard[linha][coluna] = item
            }
        })
    })
    BasePreparedBoard.call(this, prepBoard)
}

module.exports = BuscaProfundidade
