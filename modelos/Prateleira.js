const tipos = require("./Tipos")

class Prateleira {
    constructor(indice) {
       this.indice = indice
    }

    getTipo() {
        return tipos.PRATELEIRA
    }

}

module.exports = Prateleira