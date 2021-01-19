class EntityBase {
    #name // # - Podem ser acessadas somente dentro da classe (À partir do Node.js 14.3 && >= 15)...
    #age // ...através dos métodos acessórios (getters && setters).
    #gender

    constructor({ name, age, gender }) {
        this.#name = name
        this.#age = age
        this.#gender = gender
    }

    // getters
    get name() {
        const prefix = this.#gender === 'male' ? 'Mr.' : 'Ms.' // Mister && Miss
        return `${prefix} ${this.#name}`
    }

    get birthYear() {
        if(!this.#age) {
            throw new Error('you must define age first!!')
        }

        return new Date().getFullYear() - this.#age // getFullYear() = 2021, 2021 - Idade = Ano de Nascimento
    }

    set age(value) {
        this.#age = value
    }

    get gender() {
        return this.#gender
    }
}

module.exports = EntityBase