const uuid = require('uuid') // Uma das nossas dependências já instalou essa LIB

class Todo {
    constructor({ text, when }) {
        this.text = text
        this.when = when

        this.status = ''
        this.id = uuid.v4()
    }

    isValid() {
        return null
    }
}

module.exports = Todo