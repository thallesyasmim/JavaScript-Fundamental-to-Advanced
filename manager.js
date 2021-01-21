const Employee = require("./01/src/employee");
const Util = require("./01/src/util")


class Manager extends Employee {
    #bonuses = 2000

    get bonuses() {
        return Util.formatCurrency(this.#bonuses)
    } 

    
}

module.exports = Manager