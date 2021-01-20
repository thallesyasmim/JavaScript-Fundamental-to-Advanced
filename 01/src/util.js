class Util { // Também chamado de 'Helped'
    static #defaultFormat = Intl.NumberFormat('pt-br', {
        currency: 'BRL',
        style: 'currency'
    })
    // Como ambos são estáticos, conseguimos acessar a prop com o 'this'
    static formatCurrency(value) {
        return this.#defaultFormat.format(value)
    }
}

module.exports = Util