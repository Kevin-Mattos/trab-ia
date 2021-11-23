const Bloqueado = require("./Bloqueado.js")
const Indice = require("./Indice")
const Prateleira = require("./Prateleira.js")
const Robo = require("./Robo.js")
const tipos = require("./Tipos.js")

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

        let indicesRobos = [
            new Indice(0,0),
            // new Indice(0,4),
            new Indice(4,4),
            new Indice(6,7),
            new Indice(3,10),
        ]

        indicesRobos.forEach (indice => {
            this.board[indice.coordenadaX][indice.coordenadaY] = new Robo(new Indice(indice.coordenadaX, indice.coordenadaY))
        })

        let linhaDosRobos = quantidadeDeLinhas - 1
        for(let coluna = 6; coluna < quantidadeDeColunas; coluna++) {            
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
                    process.stdout.write(`${tipos.CAMINHO} |`)
                else
                    process.stdout.write(`${campo.getTipo()} |`)
            })
            console.log("")
        })
    }

    obterTodosRobos() {
        let indices = []
        this.board.forEach((linha, indiceLinha) => {
            linha.forEach((_, indiceColuna) => {
                let campo = this.board[indiceLinha][indiceColuna]
                if(campo instanceof Robo)
                    indices.push(campo.indice)
            })
        })
        return indices
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
        if(item.getTipo() != tipos.ROBO && item.getTipo() != tipos.ROBO_COM_PRATELEIRA)
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

module.exports = CentroDistribuicao