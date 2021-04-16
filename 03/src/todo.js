const uuid = require('uuid') // Uma das nossas dependências já instalou essa LIB

class Todo {
	constructor({ text, when }) {
		this.text = text
		this.when = when

		this.status = ''
		this.id = uuid.v4()
	}

	isValid() {
		// 0 - '' - null - false = false
		return !!this.text && !isNaN(this.when.valueOf()) // !! - Transforma o valor em booleano mantendo se ele é true ou false
		// valueOf() - Retorna o valor com typeof number, no caso da data retorna em milisegundos | isNan() - Verifica se não é um número
	}
}

module.exports = Todo