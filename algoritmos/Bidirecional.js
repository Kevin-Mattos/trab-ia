let Robo = require("../modelos/Robo")
let CentroDistribuicao = require("../modelos/CentroDistribuicao")
const Indice = require("../modelos/Indice");
const tipos = require("../modelos/Tipos");
const BasePreparedBoard = require("./basePreparedBoard");

const Algoritimos = {
    LARGURA: 'L',
    PROFUNDIDADE: 'P',
    NENHUM: 'N'
}

function Bidirecional(board, indiceParaIr) {

    let robos = board.obterTodosRobos()
    let caminhos = []

    robos.forEach((indiceDoRobo) => {
        let result = BidirecionalIndividual(board, indiceDoRobo, indiceParaIr)
        caminhos.push(result)
    })

    let smallestIndex = 0
    let smallestValue = caminhos[0].length
    caminhos.filter((value) => value.length != 0).forEach((value, index) => {
        if (value.length < smallestValue) {
            smallestIndex = index
            smallestValue = value.length
        }
    })
    return caminhos[smallestIndex]
}

function BidirecionalIndividual(board, indiceAtual, indiceParaIr) {
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
        .map(value => preparedBoard.getItem(value).indice)
        let vizinhosInicio = preparedBoard.obterLocaisPossiveisParaIr(indiceAPartirInicio)
        .filter((value) => !(preparedBoard.getItem(value) instanceof Robo))
        .map(value => preparedBoard.getItem(value).indice)

        let vizinhos = temVizinhos(indiceAPartirDestino, vizinhosDestino)
        if(vizinhos.length > 0)
            return juntarCaminhos(vizinhos[0], vizinhos[1])

        vizinhos = temVizinhos(indiceAPartirInicio, vizinhosInicio)
        if(vizinhos.length > 0)
            return juntarCaminhos(vizinhos[0], vizinhos[1])

        iteracao(fila, vizinhosDestino, indiceAPartirDestino, Algoritimos.LARGURA)
        iteracao(pilha, vizinhosInicio, indiceAPartirInicio, Algoritimos.PROFUNDIDADE)
    }
}

function temVizinhos(indice, vizinhosDestino) {
    for(let i = 0; i< vizinhosDestino.length; i++) {
        let vizinho = vizinhosDestino[i]
        if (saoVizinhosComAlgoritmosDiferentes(vizinho, indice))
                return [vizinho, indice]        
    }
    return []
}

function saoVizinhosComAlgoritmosDiferentes(vizinhoDestino, vizinhoInicio, alg) {
    if(!vizinhoDestino.visitado || !vizinhoInicio.visitado)
        return false

    return vizinhoDestino.alg != vizinhoInicio.alg
}

function iteracao(lista, vizinhos, parent, tipo) {
    for (let i = 0; i < vizinhos.length; i++) {
        let vizinho = vizinhos[i]
        if (!vizinho.visitado) {
            vizinho.visitado = true
            vizinho.alg = tipo
            vizinho.parent = parent
            lista.push(vizinho)
        }
    }
}

function juntarCaminhos(vizinho1, vizinho2) {
    let resultado = getParents(vizinho1).reverse()
    let resultado2 = getParents(vizinho2)
    return resultado.concat(resultado2) 
}

function getParents(vizinho) {
    var resultado = []
    let atual = vizinho
    while (atual.parent != null) {
        resultado.push(new Indice(atual.coordenadaX, atual.coordenadaY))
        atual = atual.parent
    }
    return resultado
}

function BidirecionalPreparedBoard(board) {
    let prepBoard = Array(board.length).fill().map(() => Array(board[0].length).fill())
    board.forEach((element, linha) => {
        element.forEach((item, coluna) => {
            if (item == undefined) {
                let indic2e = new Indice(linha, coluna)
                indic2e.alg = Algoritimos.NENHUM
                indic2e.visitado = false
                prepBoard[linha][coluna] = {
                    tipo: tipos.CAMINHO,
                    indice: indic2e,
                    getTipo() {
                        return this.tipo
                    }
                }
            } else {
                item.indice.alg = Algoritimos.NENHUM
                item.indice.visitado = false
                prepBoard[linha][coluna] = item
            }
        })
    })

    BasePreparedBoard.call(this, prepBoard)
}


module.exports = Bidirecional