// Estamos usando o padrão de projeto "layers" (N camadas)
class TodoService {
	constructor({ todoRepository }) {
		this.todoRepository =  todoRepository // Dependency Injection (Injeção de dependência)
	}

	create(todoItem) {

	}

	list(query) {

	}
}

module.exports = TodoService