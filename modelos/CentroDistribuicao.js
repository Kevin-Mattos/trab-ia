// import Bloqueado from "./Bloqueado"
// import Indice from "./Indice"
// import Prateleira from "./Prateleira"
// import Robo from "./Robo"
// import Tipos from "./Tipos"

const quantidadeDeLinhas = 13
const quantidadeDeColunas = 15

class CentroDistribuicao {
    constructor() {
        this.board = Array(quantidadeDeLinhas).fill().map(() => Array(quantidadeDeColunas).fill())
        this._init()
    }

    _init() {
        let colunasComPrateleiras = [0, 2,3, 5,6, 8,9, 11,12, 14]
        for(let i=1; i<=10; i++) {
            colunasComPrateleiras.forEach((value) => {
                this.board[i][value] = new Prateleira(i, value)
            })            
        }

        let linhaDosRobos = 12
        for(let coluna = 0; coluna < 15; coluna++) {            
            if(coluna <= 5)
                this.board[linhaDosRobos][coluna] = new Robo(new Indice(linhaDosRobos, coluna))
            else
                this.board[linhaDosRobos][coluna] = new Bloqueado(new Indice(linhaDosRobos, coluna))
        }
    }

    imprime() {
        this.board.forEach((linha, indiceLinha) => {
            linha.forEach((coluna, indiceColuna) => {
                let campo = this.board[indiceLinha][indiceColuna]
                if(campo == undefined)
                    process.stdout.write(`${Tipos.CAMINHO} |`)
                else
                    process.stdout.write(`${campo.getTipo()} |`)
            })
            console.log("")
        })
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
                posAtual.coordenadaY +1
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
            
            if(indice.coordenadaX < 0 || indice.coordenadaX >= quantidadeDeLinhas) {

            }
            else if(indice.coordenadaY < 0 || indice.coordenadaY >= quantidadeDeColunas)
            {

            }
            else {
                let item = this.board[indice.coordenadaX][indice.coordenadaY]
                if(item == undefined) {
                    pos.push(indice)
                }
            }
        })

        return pos
    }

    //nao sei se precisa do mover
    mover(indiceAtual, indiceParaIr) {
        this.verificaPodeMover(indiceAtual, indiceParaIr)
    }

    verificaPodeMover(indiceAtual, indiceParaIr) {
        let item = this.board[indiceAtual.coordenadaX][indiceAtual.coordenadaY]
        if(item.getTipo() != Tipos.ROBO && item.getTipo() != Tipos.ROBO_COM_PRATELEIRA)
            throw `Tipo do item ${item.getTipo()} invalido para mover}`
        this.verificaIndiceMaiorQue1(indiceAtual.coordenadaX, indiceAtual.coordenadaX)
        this.verificaIndiceMaiorQue1(indiceAtual.coordenadaY, indiceAtual.coordenadaY)
        this.verificaDiagonal(indiceAtual, indiceParaIr)

        
        item.mover(indiceParaIr)
        this.board[indiceAtual.coordenadaX][indiceAtual.coordenadaY] = undefined
        this.board[indiceParaIr.coordenadaX][indiceParaIr.coordenadaY] = item
    }

    verificaIndiceMaiorQue1(atual, novo) {
        let diferenca = Math.abs(atual - novo)
        if(diferenca > 1)
            throw `Diferenca entre atual e novo não podem ser maior que um: ${diferenca}`
    }

    verificaDiagonal(indiceAtual, indiceParaIr) {
        if(indiceAtual.coordenadaX != indiceAtual.coordenadaX
            && indiceAtual.coordenaday != indiceAtual.coordenadaY)
            throw `Não pode andar na Diagonal!`
    }

}