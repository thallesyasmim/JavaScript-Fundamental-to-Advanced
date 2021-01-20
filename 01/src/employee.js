const EntityBase = require("./entityBase")
const Util = require("./util")
class Employee extends EntityBase { // Herança
    static #TAXES_PERCENTUAL = 0.2 // Privado mesmo que seja um membro estático
    #grossPay = 5000.40

    get grossPay() {
        return Util.formatCurrency(this.#grossPay)
    }

    get netPay() { // Neste caso: Employee.#TAXES_PERCENTUAL, o membro estático pode ser acessado assim
        const result = this.#grossPay - (this.#grossPay * Employee.#TAXES_PERCENTUAL) // Dependendo da maneira que você chamar suas funções, os membros estarão lá dentro ou não
        return Util.formatCurrency(result)
    }
}

module.exports = Employee