
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

//meu
console.log("Iniciado.");

let Robo = require("../modelos/Robo")
let CentroDistribuicao = require("../modelos/CentroDistribuicao")
const Indice = require("../modelos/Indice");
const tipos = require("../modelos/Tipos");

//APAGAR DEPOIS
let a = require("./algoritmos/AprofundamentoIterativo")


let robo = new Robo(new Indice(0,0))
let board = new CentroDistribuicao(1, 2)
board.imprime()
let restults = BuscaAEstrela(board, robo.indice, new Indice(9, 13))
console.log(restults)
//

function AprofundamentoIterativo(board, indiceAtual, indiceParaIr) {
    //let preparedBoard = new aprofBoard(board.board)

    let fronteira = [];
    let atual;
    fronteira.push(indiceAtual); //coloca no final
    let explorado = [];
    profundidade = 1;
    
    while (fronteira.length != 0) { //enquanto tiver coisas na fronteira
        atual = fronteira.pop(); //tira do final, pilha
        explorado.push(atual); //marca os que já foram
        if (atual ==indiceParaIr) {
            //retornar caminho
        }

        acoes = board.obterLocaisPossiveisParaIr(atual); //checa pra onde pode ir
        acoes.forEach (acao => { 
            if ((temNaLista(acao.explorado)==false) && (temNaLista(acao,fronteira==false))) {
                fronteira.push(acao); //coloca no final
                testagem=acao
                let count = 1;
                while(testagem.parent!=null && count<profundidade)
                {testagem = testagem.parent
                count = count+1}

                acao.parent = atual;

            }
        })

        
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
    




}

