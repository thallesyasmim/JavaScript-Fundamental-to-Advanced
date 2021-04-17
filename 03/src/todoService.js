// Estamos usando o padrão de projeto "layers" (N camadas)
class TodoService {
	constructor({ todoRepository }) {
		this.todoRepository =  todoRepository // Dependency Injection (Injeção de dependência)
	}

	create(todoItem) {
		if(!todoItem.isValid()) {
			return {
				error: {
					message: 'Invalid data',
					data: todoItem
				}
			}
		}

		const { when } = todoItem
		const today = new Date()

		const todo = {
			...todoItem,
			status: when > today ? 'pending' : 'late'
		}

		return this.todoRepository.create(todo)
	}

	list(query) {
		return this.todoRepository.list()
			.map(({ meta, $loki, ...result }) => result)
	}
}

module.exports = TodoService