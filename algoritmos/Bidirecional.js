let Robo = require("../modelos/Robo")
let CentroDistribuicao = require("../modelos/CentroDistribuicao")
const Indice = require("../modelos/Indice");
const tipos = require("../modelos/Tipos");
const BasePreparedBoard = require("./basePreparedBoard");

function Bidirecional(board, indiceAtual, indiceParaIr) {
    let preparedBoard = new BidirecionalPreparedBoard(board.board)
    let fila = []
    let pilha = []
    fila.push(indiceParaIr)
    pilha.push(indiceAtual)
    while (true) {
        let indiceAPartirDestino = fila.shift()
        let indiceAPartirInicio = pilha.pop()
        let vizinhosDestino = preparedBoard.obterLocaisPossiveisParaIr(indiceAPartirDestino)
        .filter((value) => !(preparedBoard.getItem(value) instanceof Robo))
        let vizinhosInicio = preparedBoard.obterLocaisPossiveisParaIr(indiceAPartirInicio)
        .filter((value) => !(preparedBoard.getItem(value) instanceof Robo))

        iteracao(fila, vizinhosDestino, preparedBoard, indiceAPartirDestino)
        iteracao(pilha, vizinhosInicio, preparedBoard, indiceAPartirInicio)


        let vizinhos = temVizinhos(vizinhosDestino, vizinhosInicio)
        if(vizinhos.length > 0)
            return juntarCaminhos(vizinhos[0], vizinhos[1])
    }
    preparedBoard.imprime()
    return []
}

function temVizinhos(vizinhosDestino, vizinhosInicio) {
    for(let i = 0; i< vizinhosDestino.length; i++) {
        for(let j = 0; j < vizinhosInicio.length; j++) {
            let vizinhoDestino = vizinhosDestino[i]
            let vizinhoInicio = vizinhosInicio[j]
            if (saoVizinhos(vizinhoDestino, vizinhoInicio))
                return [vizinhoDestino, vizinhoInicio]
        }
    }
    return []
}

function saoVizinhos(vizinhoDestino, vizinhoInicio) {
    if (vizinhoDestino.coordenadaX + 1 == vizinhoInicio.coordenadaX && vizinhoDestino.coordenadaY == vizinhoInicio.coordenadaY)
        return true
    if (vizinhoDestino.coordenadaX - 1 == vizinhoInicio.coordenadaX && vizinhoDestino.coordenadaY == vizinhoInicio.coordenadaY)
        return true
    if (vizinhoDestino.coordenadaX == vizinhoInicio.coordenadaX && vizinhoDestino.coordenadaY + 1 == vizinhoInicio.coordenadaY)
        return true
    if (vizinhoDestino.coordenadaX == vizinhoInicio.coordenadaX && vizinhoDestino.coordenadaY -1 == vizinhoInicio.coordenadaY)
        return true
    return false
}

function iteracao(lista, vizinhos, preparedBoard, parent) {
    for (let i = 0; i < vizinhos.length; i++) {
        let vizinho = vizinhos[i]
        // let item = preparedBoard.getItem(vizinho)
        if (!vizinho.visitado) {
            vizinho.visitado = true
            vizinho.parent = parent
            lista.push(vizinho)
        }
    }
}

function juntarCaminhos(vizinho1, vizinho2) {
    let resultado = getParents(vizinho1)
    let resultado2 = getParents(vizinho2).reverse()

    return resultado.concat(resultado2) 
}

function getParents(vizinho) {
    var resultado = []
    let atual = vizinho
    while (atual.parent != null) {
        resultado.push(atual)
        atual = atual.parent
    }
    return resultado
}

function BidirecionalPreparedBoard(board) {
    let prepBoard = Array(board.length).fill().map(() => Array(board[0].length).fill())
    board.forEach((element, linha) => {
        element.forEach((item, coluna) => {
            if (item == undefined) {
                prepBoard[linha][coluna] = {
                    tipo: tipos.CAMINHO,
                    visitadoAlgo1: false,
                    visitadoAlgo2: false,
                    indice: new Indice(linha, coluna),
                    getTipo() {
                        return this.tipo
                    }
                }
            } else {
                item.visitadoAlgo1 = false
                item.visitadoAlgo2 = false
                prepBoard[linha][coluna] = item
            }
        })
    })

    BasePreparedBoard.call(this, prepBoard)
}


module.exports = Bidirecional