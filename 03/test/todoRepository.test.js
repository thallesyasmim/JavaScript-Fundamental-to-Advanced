const { describe, it, before, afterEach } = require('mocha')
const { expect } = require('chai')
const TodoRepository = require('../src/todoRepository')
const { createSandbox } = require('sinon')

describe('todoRepository', () => {
	let todoRepository
	let sandBox
	before(() => {
		todoRepository = new TodoRepository()
		sandBox = createSandbox()
	})
	afterEach(() => { // Executado após cada it()
		sandBox.restore() // Restaurar instância do TodoRepository
	})
	describe('methods signature', () => {
		it('should call find from lokijs', () => {
			const mockDatabase = [
				{
					name: 'Yasmim',
					age: 17,
					meta: { revision: 0, created: 1618598872772, version: 0 },
					'$loki': 1
				}
			]

			const functionName = 'find' // lokijs - find: () => {} | sem prop name // todoRepository - list() | com prop name
			const expectedReturn = mockDatabase
			sandBox.stub( // substituir o comportamento de uma função ou uma propriedade
				todoRepository.schedule, // Chamado o schedule...
				functionName // ...na função find()
			).returns(expectedReturn)

			const result = todoRepository.list() // Retorna os nossos dados mockados
			expect(result).to.be.deep.equal(expectedReturn) // Verificação profunda de igualdade
		})
		it('should call insertOne from lokijs')
	})
})


/* Quando temos coisas externas (banco de dados, API's, arquivos) usamos dados mockados, partimos
do princípio que o nosso código está funcionando até aqui, e vamos daí em diante. Por exemplo, 
se nossa switch depende de uma API e ela estiver indisponível, não saberemos se é o nosso código
ou a própria API.
*/
