const { describe, it, before, beforeEach } = require('mocha')
const { expect } = require('chai')
const TodoService = require('../src/todoService')
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
})

/* Partimos na suposição que nosso todoRepository está funcionando (até porque não queremos testá-lo novamente), testando
o todoService */