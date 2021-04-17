const { describe, it, beforeEach, afterEach } = require('mocha') // Mocha - nosso motor de renderização, não precisamos usar o Node em sí aqui
const { expect } = require('chai') // Chai - para fazer asserções, vimos o módulo Assert do Node.js também, porém vamos usar o Chai por ser algo mais facilmente visível
const Todo = require('../src/todo')
const { createSandbox } = require('sinon')


describe('todo', () => { // Vamos criando uma árvore aqui dentro...
	let sandBox
	beforeEach(() => {
		sandBox = createSandbox()
	})

	afterEach(() => sandBox.restore())

	describe('#isValid', () => { // Uma Switch de test
		it('should return invalid when creating an object without text', () => {
			const data = {
				text: '',
				when: new Date('2021-02-06')
			}

			const todo = new Todo(data)
			const result = todo.isValid() // Se o método "isValid()" retornar nulo, sabemos que ele não passou nas condições lá
			expect(result).to.be.not.ok // Asserção - Passa no teste porque realmente não está ok
		}) // Uma regra de négocio
		it('should return invalid when creating an object using the "when" property invalid', () => {
			const data = {
				text: 'Hello World',
				when: new Date('20-02-06') // O ano está errado, então dará inválido
			}

			const todo = new Todo(data)
			const result = todo.isValid() 
			expect(result).to.be.not.ok 
		}) // Outra regra de négocio
		it('should have "id", "text", "when" and "status" properties after creating object', () => {
			const data = {
				text: 'Hello World',
				when: new Date('2021-02-06') 
			}

			const expectedId = '00001'
			const uuid = require('uuid')
			const fakeUUID = sandBox.fake.returns(expectedId) 
			sandBox.replace(uuid, 'v4', fakeUUID)

			const todo = new Todo(data)
			const result = todo.isValid()
			
			const expected = {
				...data,
				status: '',
				id: expectedId
			}

			expect(result).to.be.ok 
			expect(uuid.v4.calledOnce).to.be.ok 
			expect(todo).to.be.deep.equal(expected) 
		}) // Verificando se o objeto todas as informações que precisamos
	})
})

/* Pensamento sobre TDD não tem nada haver com ferramenta, afinal, poderíamos usar TDD aqui somente com que existe no Node.js 
    O conceito é como que eu penso nas funcionalidades, o que há área de negócio me passou. As regras do sistema tem que ficar muito bem definidas antes de começar
    Ter um bloco de notas por exemplo com o que precisa ser entregue para depois ir implementando os testes

    O TDD normalmente fazemos o teste para falhar e arrumamos esse teste para passar depois, porém há alguns casos que não faz sentido
    como por exemplo: Testar se um método existe numa classe se nem criamos a classe ainda.
    Nesse caso, o Erick Wendel criaria a classe primeiro, a assinatura para depois fazer os testes. Acaba sendo mais produtivo!
    */