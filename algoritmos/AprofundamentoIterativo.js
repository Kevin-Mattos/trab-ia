

//meu
console.log("Iniciado.");

let Robo = require("../modelos/Robo")
let CentroDistribuicao = require("../modelos/CentroDistribuicao")
const Indice = require("../modelos/Indice");
const tipos = require("../modelos/Tipos");

/*APAGAR DEPOIS
let a = require("./algoritmos/AprofundamentoIterativo")


let robo = new Robo(new Indice(0,0))
let board = new CentroDistribuicao(1, 2)
board.imprime()
let restults = BuscaAEstrela(board, robo.indice, new Indice(9, 13))
console.log(restults)
*/

function Aprofundamentoiterativo(board, indiceAtual, indiceParaIr) {
    //let preparedBoard = new aprofBoard(board.board)
    let profundidade = 20;
    while (profundidade < 21) {

        console.log("Buscando...")
        let fronteira = [];
        let atual;
        fronteira.push(indiceAtual); //coloca no final
        let explorado = [];
        console.log(indiceAtual)
        profundidade = profundidade + 1;
        console.log(profundidade)

        //while (fronteira.length != 0) { //enquanto tiver coisas na fronteira
        atual = fronteira.pop(); //tira do final, pilha
        //console.log(atual)
        explorado.push(atual); //marca os que já foram
        if (atual == indiceParaIr) {
            var resultado = [];
            while (atual.parent != null) {
                resultado.push(atual);
                console.log(atual)
                atual = atual.parent;
            }
            return resultado.reverse();
        }

        acoes = board.obterLocaisPossiveisParaIr(atual); //checa pra onde pode ir
        acoes.forEach(acao => {
            if (temNaLista(explorado, acao) == false && (temNaLista(fronteira, acao)) == false) {
                console.log("aqui")
                acao.parent = atual;
                testagem = acao
                let count = 0;
                let pode = true;
                while (testagem.parent != null && pode == true) {
                    if (count < profundidade) {
                        pode = false;
                    }
                    console.log("entro")
                    testagem = testagem.parent
                    count = count + 1
                    console.log(count)


                }
                if (pode == true) {
                    fronteira.push(acao); //coloca no final}
                    pode = true;



                }
            }


    })

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
}


}


//}

module.exports = Aprofundamentoiterativo

