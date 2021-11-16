const Indice = require("../modelos/Indice")
const tipos = require("../modelos/Tipos")
const BasePreparedBoard = require("./basePreparedBoard")

function buscaAEstrela(board, indiceParaIr) {

    let robos = board.obterTodosRobos()
    let caminhos = []

    robos.forEach((indiceDoRobo) => {
        let result = BuscaAEstrelaIndividual(board, indiceDoRobo, indiceParaIr)
        caminhos.push(result)
    })

    let smallestIndex = 1000
    let smallestValue = smallestIndex
    caminhos.filter((value) => value.length != 0).forEach((value, index) => {
        if (value.length < smallestValue) {
            smallestIndex = index
            smallestValue = value.length
        }
    })
    return caminhos[smallestIndex]
}

function BuscaAEstrelaIndividual(board, indiceAtual, indiceParaIr) {

    let preparedBoard = new AStarPreparedBoard(board.board)

    var emObservacao = []
    var indicesJaObservados = []
    emObservacao.push(indiceParaIr)

    while (emObservacao.length != 0) {
        var lowInd = 0
        for (var i = 0; i < emObservacao.length; i++) {
            if (preparedBoard.getItem(emObservacao[i]).f < preparedBoard.getItem(emObservacao[lowInd]).f) {
                lowInd = i
            }
        }
        var currentNode = emObservacao[lowInd]
        // Encontrou
        if (currentNode.coordenadaX == indiceAtual.coordenadaX
            && currentNode.coordenadaY == indiceAtual.coordenadaY) {
            let curr = preparedBoard.getItem(currentNode)
            let ret = []
            while (curr.parent) {
                ret.push(curr.indice)
                curr = curr.parent
            }
            return ret.reverse()
        }

        const index = emObservacao.indexOf(currentNode)
        if (index > -1) {
            emObservacao.splice(index, 1)
        }
        indicesJaObservados.push(currentNode)

        let possiveis = preparedBoard.obterLocaisPossiveisParaIr(currentNode)
        for (let i = 0; i < possiveis.length; i++) {
            let vizinho = possiveis[i]
            if (temNaLista(indicesJaObservados, vizinho)) {
                // ja foi observado
                continue
            }

            let gScore = preparedBoard.getItem(currentNode).g + 1
            let gScoreIsBest = false

            if (!temNaLista(emObservacao, vizinho)) {

                gScoreIsBest = true
                preparedBoard.getItem(vizinho).h = heuristic(vizinho, indiceAtual)
                emObservacao.push(vizinho)
            }
            else if (gScore < preparedBoard.getItem(vizinho).g) {
                gScoreIsBest = true
            }

            if (gScoreIsBest) {
                //encontrou o melhor caminho entre os nodes
                preparedBoard.getItem(vizinho).parent = preparedBoard.getItem(currentNode)
                preparedBoard.getItem(vizinho).g = gScore
                preparedBoard.getItem(vizinho).f = preparedBoard.getItem(vizinho).g + preparedBoard.getItem(vizinho).h
            }

        }
    }
    return []
}

function temNaLista(lista, indice) {
    for (var i = 0; i < lista.length; i++) {
        var indiceLista = lista[i]
        if (indice.coordenadaX == indiceLista.coordenadaX
            && indice.coordenadaY == indiceLista.coordenadaY) {
            return true
        }
    }
    return false
}

function AStarPreparedBoard(board) {
    let prepBoard = Array(board.length).fill().map(() => Array(board[0].length).fill())
    board.forEach((element, linha) => {
        element.forEach((item, coluna) => {
            if (item == undefined) {
                prepBoard[linha][coluna] = {
                    f: 0,
                    g: 0,
                    h: 0,
                    tipo: tipos.CAMINHO,
                    indice: new Indice(linha, coluna),

                    getTipo() {
                        return this.tipo
                    }
                }
            } else {
                item.f = 0
                item.g = 0
                item.h = 0
                prepBoard[linha][coluna] = item
            }
        })
    })

    BasePreparedBoard.call(this, prepBoard)
}

//Calcula distância
function heuristic(pos0, pos1) {
    var d1 = Math.pow(pos1.coordenadaX - pos0.coordenadaY, 2)
    var d2 = Math.pow(pos1.coordenadaX - pos0.coordenadaY, 2)
    return Math.sqrt(d1 + d2)
}

module.exports = buscaAEstrela
