const EntityBase = require("./entityBase")

class Employee extends EntityBase { // Herança
    static #TAXES_PERCENTUAL = 0.2 // Privado mesmo que seja um membro estático
    #grossPay = 5000.40

    get grossPay() {
        return Intl.NumberFormat('en', {
            currency: 'USD',
            style: 'currency'
        }).format(this.#grossPay)
    }
}

module.exports = Employee