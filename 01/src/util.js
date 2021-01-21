class Util { // Também chamado de 'Helped'
    static #defaultFormat = Intl.NumberFormat('pt-br', {
        currency: 'BRL',
        style: 'currency'
    })
    // Como ambos são estáticos, conseguimos acessar a prop com o 'this'
    static formatCurrency(value) {
        return this.#defaultFormat.format(value)
    }

    // R$ 1000,10 - 1000.10
    static unFormatCurrency(value) {
        return Number(value.replace(/\D/g, '')) / 100 // Deve tirar tudo o que é ponto, espaço, 'R$', mas ainda respeitando a vírgula. 
        // Tudo que for digíto e não for digíto será tirado
    }
}

module.exports = Util