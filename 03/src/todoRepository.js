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

// const test = new TodoRepository()

// test.create({ name: 'Yasmim', age: 17 })
// test.create({ name: 'Thalles', age: 17 })

// console.log('test database', test.list());

// [
//     {
//       name: 'Yasmim',
//       age: 17,
//       meta: { revision: 0, created: 1612649121174, version: 0 },    '$loki': 1
//     },
//     {
//       name: 'Thalles',
//       age: 17,
//       meta: { revision: 0, created: 1612649121174, version: 0 },    '$loki': 2
//     }
//   ]