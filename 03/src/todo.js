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
        return !!this.text // !! - Transforma o valor em booleano mantendo se ele é true ou false
    }
}

module.exports = Todo