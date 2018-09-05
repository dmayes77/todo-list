$(document).ready(function() {
	$.getJSON('/api/todos').then(addTodos);

	$('#todoInput').keypress(function(event) {
		if (event.which == 13) {
			createTodo();
		}
	});

	$('.list').on('click', 'li', function() {
		updateTodo($(this));
	});

	$('.list').on('click', 'span', function(e) {
		e.stopPropagation();
		removeTodo($(this).parent());
	});
});

function addTodos(todos) {
	//add todos to page here
	todos.forEach(function(todo) {
		addTodo(todo);
	});
}

function addTodo(todo) {
	let newTodo = $(`<li class="task">${todo.name}<span>X</span></li>`);
	newTodo.data('id', todo._id);
	newTodo.data('completed', todo.completed);
	if (todo.completed) {
		newTodo.addClass('done');
	}
	$('.list').append(newTodo);
}

function createTodo() {
	let userInput = $('#todoInput').val();
	$.post('api/todos', { name: userInput })
		.then(function(newTodo) {
			$('#todoInput').val('');
			addTodo(newTodo);
		})
		.catch(function(err) {
			console.log(err);
		});
}

function removeTodo(todo) {
	let clickedId = todo.data('id');
	let deleteUrl = `api/todos/${clickedId}`;
	// $(this).parent().remove();
	$.ajax({
		method: 'DELETE',
		url: deleteUrl
	})
		.then(function(data) {
			todo.remove();
		})
		.catch(function(err) {
			console.log(err);
		});
}

function updateTodo(todo) {
	let updateUrl = `api/todos/${todo.data}('id')`;
	let isDone = !todo.data('completed');
	let updateData = { completed: isDone };
	$.ajax({
		method: 'PUT',
		url: updateUrl,
		data: updateData
	}).then(function(updatedTodo) {
		todo.toggleClass('done');
		todo.data('completed', isDone);
	});
}
