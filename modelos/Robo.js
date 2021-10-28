const tipos = require("./Tipos")

class Robo {
    constructor(indice) {
       this.indice = indice
    }

    getTipo() {
        if(this.prateleira == null)
            return tipos.ROBO
        else
            return tipos.ROBO_COM_PRATELEIRA
    }

    mover(indice) {
        this.indice = indice
        if(this.prateleira != null)
            this.prateleira.indice = indice
    }

    carregarPrateleira(prateleira) {
        this.prateleira = prateleira
    }

    soltarPrateleira() {
        this.prateleira = null
    }

}

module.exports = Robo