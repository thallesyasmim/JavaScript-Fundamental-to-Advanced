const { describe, it, before, beforeEach, afterEach } = require('mocha')
const { expect } = require('chai')
const TodoService = require('../src/todoService')
const Todo = require('../src/todo')
const { createSandbox } = require('sinon')

describe('todoService', () => {
	let sandBox
	before(() => {
		sandBox = createSandbox()
	})
	describe('#list', () => {
		const mockDatabase = [
			{
				name: 'Yasmim',
				age: 17,
				meta: { revision: 0, created: 1618598872772, version: 0 },
				'$loki': 1
			}
		]

		let todoService
		beforeEach(() => {
			const dependencies = {
				todoRepository: {
					list: sandBox.stub().returns(mockDatabase)
				}
			}

			todoService = new TodoService(dependencies)
		})

		it('should return data on a specific format', () => {
			const result = todoService.list()
			const [{ meta, $loki, ...expected }] = mockDatabase
			expect(result).to.be.deep.equal([expected])
		})
	})

	describe('#create', () => {
		let todoService
		beforeEach(() => {
			const dependencies = {
				todoRepository: {
					create: sandBox.stub().returns(true)
				}
			}

			todoService = new TodoService(dependencies)
		})

		afterEach(() => sandBox.restore())

		it('shouldn\'t save todo item with invalid data', () => {
			const data = new Todo({
				text: '',
				when: ''
			})

			// delete data.id | Horrível para performance
			Reflect.deleteProperty(data, 'id') // Reflect - Substituir objetos respeitando o clico de vida do JS, sem prejudicar a performance
			const expected = {
				error: {
					message: 'Invalid data',
					data
				}
			}

			const result = todoService.create(data)
			expect(result).to.be.deep.equal(expected)

		})
		it('should save todo item with late status when the property is further then today', () => {
			const properties = {
				text: 'I must walk my dog',
				when: new Date('2020-12-01 12:00:00 GMT-0') // Conclusão da tarefa
			}
	
			const expectedId = '00001'
			const uuid = require('uuid')
			const fakeUUID = sandBox.fake.returns(expectedId) 
			sandBox.replace(uuid, 'v4', fakeUUID) // V4 é uma função nomeada, quando for chamada retornará um dado fake
			
			const data = new Todo(properties)
			const today = new Date('2020-12-02')
			sandBox.useFakeTimers(today.getTime()) // Não vai dar problema no nosso teste, não importa quanto tempo passe

			todoService.create(data)

			const expectedCallWith = {
				...data,
				status: 'late'
			}

			expect(todoService.todoRepository.create.calledOnceWithExactly(expectedCallWith)).to.be.ok
		})

		it('should save todo item with pending status', () => {
			const properties = {
				text: 'I must walk my dog',
				when: new Date('2020-12-10 12:00:00 GMT-0') // Conclusão da tarefa
			}
	
			const expectedId = '00001'
			const uuid = require('uuid')
			const fakeUUID = sandBox.fake.returns(expectedId) 
			sandBox.replace(uuid, 'v4', fakeUUID) // V4 é uma função nomeada, quando for chamada retornará um dado fake
			
			const data = new Todo(properties)
			const today = new Date('2020-12-02')
			sandBox.useFakeTimers(today.getTime()) // Não vai dar problema no nosso teste, não importa quanto tempo passe

			todoService.create(data)

			const expectedCallWith = {
				...data,
				status: 'pending'
			}

			expect(todoService.todoRepository.create.calledOnceWithExactly(expectedCallWith)).to.be.ok
		})
	})
})

/* Partimos da suposição que nosso todoRepository está funcionando (até porque não queremos testá-lo novamente), testando
o todoService */