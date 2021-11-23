

//meu
console.log("Iniciado.");

let Robo = require("../modelos/Robo")
let CentroDistribuicao = require("../modelos/CentroDistribuicao")
const Indice = require("../modelos/Indice");
const tipos = require("../modelos/Tipos");
const BasePreparedBoard = require("./basePreparedBoard");



function Aprofundamentoiterativo(board, indiceParaIr) {


    let preparedBoard = new AprofundamentoIterativoPreparedBoard(board.board)
    let profundidade = 30;
    while (profundidade < 31) {

        console.log("Buscando...")
        let fronteira = [];
        let atual;
        fronteira.push(indiceParaIr); //coloca no final
        let explorado = [];
        profundidade = profundidade + 1;

        while (fronteira.length != 0) { //enquanto tiver coisas na fronteira
            atual = fronteira.pop(); //tira do final, pilha
            explorado.push(atual); //marca os que já foram
            console.log(atual)
            console.log(preparedBoard.getItem(atual) instanceof Robo)
            console.log(atual.coordenadaX)
            console.log(atual.coordenadaY)

            if (preparedBoard.getItem(atual) instanceof Robo) { //se encontra
                var resultado = [];
                console.log("ENTROU NA ÁREA DO RESULTADO")
                while (atual.parent != null) {
                    resultado.push(atual);
                    atual = atual.parent;
                }
                return resultado.reverse();
            }

            acoes = preparedBoard.obterLocaisPossiveisParaIr(atual); //checa pra onde pode ir
            console.log(acoes);
            acoes.forEach(acao => {
                if (temNaLista(explorado, acao) == false && (temNaLista(fronteira, acao)) == false) {
                    acao.parent = atual;
                    testagem = acao
                    let count = 0;
                    let pode = true;
                    while (testagem.parent != null && pode == true) {
                        if (count > profundidade) {
                            pode = false;
                            console.log("OPS")
                        }
                        testagem = testagem.parent
                        count = count + 1
                    }
                    if (pode == true) {
                        fronteira.push(acao);
                    }//coloca no final}

                    pode = true;
                    count = 0;
                }
            })
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

function AprofundamentoIterativoPreparedBoard(board) {
    let prepBoard = Array(board.length).fill().map(() => Array(board[0].length).fill())
    board.forEach((element, linha) => {
        element.forEach((item, coluna) => {
            if (item == undefined) {
                prepBoard[linha][coluna] = {
                    tipo: tipos.CAMINHO,
                    indice: new Indice(linha, coluna),
                    getTipo() {
                        return this.tipo
                    }
                }
            } else {
                prepBoard[linha][coluna] = item
            }
        })
    })

    BasePreparedBoard.call(this, prepBoard)
}



//}

module.exports = Aprofundamentoiterativo

