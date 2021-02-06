const loki = require('lokijs') // Não vamos utilizar PostgreSQL ou mySQL, mas sim um banco de dados de memória. O lokijs entre nesse contexto para coisas mais simples (não em produção)

class TodoRepository {
    constructor() {
        const db = new loki('todo', {}) // Instanciando nosso banco de dados
        this.schedule = db.addCollection('schedule') // Adicionando uma nova tabela "schedule"
    }

    list() { // Listagem das tarefas
        return this.schedule.find()
    }

    create(data) { // Criação de novos dados 
        return this.schedule.insertOne(data)
    }
}

module.exports = TodoRepository