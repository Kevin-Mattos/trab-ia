// import Tipos from "./Tipos"


 class Robo {
    constructor(indice) {
       this.indice = indice
    }

    getTipo() {
        if(this.prateleira == null)
            return Tipos.ROBO
        else
            return Tipos.ROBO_COM_PRATELEIRA
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