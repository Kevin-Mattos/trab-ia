const tipos = require("./Tipos")

class Bloqueado {
    constructor(indice) {
        this.indice = indice
     }

    getTipo() {
        return tipos.BLOQUEADO
    }

}

module.exports = Bloqueado