let Robo = require("../modelos/Robo")
let CentroDistribuicao = require("../modelos/CentroDistribuicao")
const Indice = require("../modelos/Indice");
const tipos = require("../modelos/Tipos");

function BuscaAEstrela(board, indiceAtual, indiceParaIr) {

    let preparedBoard = new AStarPreparedBoard(board.board)

    var emObservacao = [];
    var indicesJaObservados = [];
    emObservacao.push(indiceAtual);


    while (emObservacao.length != 0) {
        var lowInd = 0;
        for (var i = 0; i < emObservacao.length; i++) {
            if (preparedBoard.getItem(emObservacao[i]).f < preparedBoard.getItem(emObservacao[lowInd]).f) {
                lowInd = i
            }
        }
        var currentNode = emObservacao[lowInd]

        // Encontrou
        if (currentNode.coordenadaX == indiceParaIr.coordenadaX
            && currentNode.coordenadaY == indiceParaIr.coordenadaY) {
            var curr = preparedBoard.getItem(currentNode);
            var ret = [];
            while (curr.parent) {
                ret.push(curr);
                console.log(curr.indice)
                curr = curr.parent;
            }
            return ret.reverse();
        }

        const index = emObservacao.indexOf(currentNode);
        if (index > -1) {
            emObservacao.splice(index, 1);
        }
        indicesJaObservados.push(currentNode)

        let possiveis = preparedBoard.obterLocaisPossiveisParaIr(currentNode)
        for (var i = 0; i < possiveis.length; i++) {
            var vizinho = possiveis[i];
            if (temNaLista(indicesJaObservados, vizinho)) {
                // ja foi observado
                continue;
            }

            var gScore = preparedBoard.getItem(currentNode).g + 1;
            var gScoreIsBest = false;


            if (!temNaLista(emObservacao, vizinho)) {

                gScoreIsBest = true;
                preparedBoard.getItem(vizinho).h = heuristic(vizinho, indiceParaIr);
                emObservacao.push(vizinho);
            }
            else if (gScore < preparedBoard.getItem(vizinho).g) {
                gScoreIsBest = true;
            }

            if (gScoreIsBest) {
                //encontrou o melhor caminho entre os nodes
                preparedBoard.getItem(vizinho).parent = preparedBoard.getItem(currentNode);
                preparedBoard.getItem(vizinho).g = gScore;
                preparedBoard.getItem(vizinho).f = preparedBoard.getItem(vizinho).g + preparedBoard.getItem(vizinho).h;
                preparedBoard.getItem(vizinho).debug = "F: " + preparedBoard.getItem(vizinho).f + "<br />G: " + preparedBoard.getItem(vizinho).g + "<br />H: " + preparedBoard.getItem(vizinho).h;
            }

        }
    }
    return []
}

function temNaLista(lista, indice) {
    for (var i = 0; i < lista.length; i++) {
        var indiceLista = lista[i];
        if (indice.coordenadaX == indiceLista.coordenadaX
            && indice.coordenadaY == indiceLista.coordenadaY) {
            return true
        }
    }
    return false
}

class AStarPreparedBoard {
    constructor(board) {
        this.board = Array(board.length).fill().map(() => Array(board[0].length).fill())
        board.forEach((element, linha) => {
            element.forEach((item, coluna) => {
                if (item == undefined) {
                    this.board[linha][coluna] = {
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
                if (item.getTipo() == tipos.CAMINHO) {
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


function heuristic(pos0, pos1) {
    // This is the Manhattan distance
    var d1 = Math.abs(pos1.coordenadaX - pos0.coordenadaY);
    var d2 = Math.abs(pos1.coordenadaX - pos0.coordenadaY);
    return d1 + d2;
}

module.exports = BuscaAEstrela
