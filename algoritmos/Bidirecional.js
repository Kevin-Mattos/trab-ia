//meu

//meu
console.log("Iniciado.");

let Robo = require("../modelos/Robo")
let CentroDistribuicao = require("../modelos/CentroDistribuicao")
const Indice = require("../modelos/Indice");
const tipos = require("../modelos/Tipos");

function Bidirecional(board, indiceAtual, indiceParaIr) {
    //let preparedBoard = new aprofBoard(board.board)

    let fronteira = [];
    let atual;
    fronteira.push(indiceAtual); //coloca no final
    let explorado = [];

    while (fronteira.length != 0) {
        atual = fronteira.pop(); //tira do final
        explorado.push(atual);
        if (atual ==indiceParaIr) {
            //retornar caminho
        }
        acoes = board.obterLocaisPossiveisParaIr(atual);
        acoes.forEach (acao => {
            if ((temNaLista(acao.explorado)==false) && (temNaLista(acao,fronteira==false))) {
                fronteira.push(acao); //coloca no final
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

