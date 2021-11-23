

//meu
console.log("Iniciado.");

let Robo = require("../modelos/Robo")
let CentroDistribuicao = require("../modelos/CentroDistribuicao")
const Indice = require("../modelos/Indice");
const tipos = require("../modelos/Tipos");
const BasePreparedBoard = require("./basePreparedBoard");



function Aprofundamentoiterativo(board, indiceParaIr) {


    let preparedBoard = new AprofundamentoIterativoPreparedBoard(board.board)
    let profundidade = 0; //inicializa variável que vai contar o quão fundo pode ir
    while (profundidade <60) { //limite máximo de 60 de profundidade

        console.log("Buscando...")
        let fronteira = []; //lista de onde ainda vai procurar
        let atual; //o que estiver sendo observado no momento
        fronteira.push(indiceParaIr); //coloca no final da fronteira
        let explorado = []; //lugares já passados pra não repetir
        profundidade = profundidade + 1; //aumenta a profundidade dessa iteração em 1

        while (fronteira.length != 0) { //enquanto tiver coisas na fronteira
            atual = fronteira.pop(); //tira do final, pilha
            explorado.push(atual); //marca os que já foram
            if (preparedBoard.getItem(atual) instanceof Robo) { //se encontra
                var resultado = []; //cria lista com o caminho
                console.log("ENTROU NA ÁREA DO RESULTADO")
                while (atual.parent != null) { //repete enquanto tiver pai
                    resultado.push(atual);
                    atual = atual.parent;
                }
                return resultado.reverse(); //inverte resultado e manda
            }

            acoes = preparedBoard.obterLocaisPossiveisParaIr(atual); //checa pra onde pode ir
            acoes.forEach(acao => { //repete pra cada caminho possível
                if (temNaLista(explorado, acao) == false && (temNaLista(fronteira, acao)) == false) { //checa se não é repetido
                    acao.parent = atual; //coloca o atual como pai
                    testagem = acao //cria variável para testar profundidade
                    let count = 0;
                    let pode = true; //se torna false se passa do limite de profundidade
                    while (testagem.parent != null && pode == true) { //vai até o começo
                        if (count > profundidade) { //entra caso passe da profundidade máxima
                            pode = false;
                            console.log(profundidade)
                        }
                        testagem = testagem.parent
                        count = count + 1
                    }
                    if (pode == true) { //caso não tenha passado da profundidade máxima coloca na fronteira
                        fronteira.push(acao);
                    }//coloca no final}

                    pode = true; //reseta as variáveis de teste
                    count = 0;
                }
            })
        }
    }
    return [] //caso não encontre
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

