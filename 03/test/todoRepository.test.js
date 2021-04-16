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
			expect(todoRepository.schedule[functionName].calledOnce).to.be.ok // Verificar quantas vezes a nossa função foi chamada, para que não tenha nenhum loop interno.
			// o stub mudou o comportamento do método, espionando (espionage) os seus parâmetros e ações | calledOnce irá verificar se a função foi chamada uma vez
		})

		it('should call insertOne from lokijs', () => {
			const functionName = 'insertOne' 
			const expectedReturn = true
			sandBox.stub(  
				todoRepository.schedule, 
				functionName
			).returns(expectedReturn)

			const data = { name: 'Yasmim', age: 17 }

			const result = todoRepository.create(data) // Lembrando que isto não tem nada haver com o nosso Todo por enquanto
			expect(result).to.be.ok 
			expect(todoRepository.schedule[functionName].calledOnceWithExactly(data)).to.be.ok // Esperamos que ele chame exatamente com o 'data'
		})
	})
})


/* Quando temos coisas externas (banco de dados, API's, arquivos) usamos dados mockados, partimos
do princípio que o nosso código está funcionando até aqui, e vamos daí em diante. Por exemplo, 
se nossa switch depende de uma API e ela estiver indisponível, não saberemos se é o nosso código
ou a própria API.
*/
