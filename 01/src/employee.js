const EntityBase = require("./entityBase")
const Util = require("./util")
class Employee extends EntityBase { // Herança
    static #TAXES_PERCENTUAL = 0.2 // Privado mesmo que seja um membro estático
    #grossPay = 5000.40

    get grossPay() {
        return Util.formatCurrency(this.#grossPay)
}

module.exports = Employee