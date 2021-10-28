const Bloqueado = require("./Bloqueado.js")
const Indice = require("./Indice")
const Prateleira = require("./Prateleira.js")
const Robo = require("./Robo.js")
const tipos = require("./Tipos.js")

const quantidadeDeLinhas = 13
const quantidadeDeColunas = 15

class CentroDistribuicao {
    constructor(x, y) {
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
                    process.stdout.write(`${tipos.CAMINHO} |`)
                else
                    process.stdout.write(`${campo.getTipo()} |`)
            })
            console.log("")
        })
    }

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