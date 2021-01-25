const Employee = require("./employee");
const Util = require("./util")


class Manager extends Employee {
    #bonuses = 2000

    get bonuses() {
        return Util.formatCurrency(this.#bonuses)
    } 

    get netPay() { // Transformação - netPay + bonuses
        return Util.formatCurrency(Util.unFormatCurrency(super.netPay) + Util.unFormatCurrency(this.bonuses)) // super - Para acessar atributos, getters, setters da classe pai (Se utilizassemos o this, nos retornaria o método que usamos com polimorfismo)
    }
}

module.exports = Manager