function createTodo(todo) {
  const id = Math.floor(Math.random() * Math.floor(999999)) + '';
  return {
    [id]: {
      ...todo,
      done: false,
      ts: Date.now()
    }
  };
}

// our mock DB initiated with 2 todos
let db = {
  todos: {
    ...createTodo({ title: 'learn react' }),
    ...createTodo({ title: 'master react' })
  }
};

let refreshTodos = () => {};

function syncTodos(cb) {
  refreshTodos = (delay = 0) => {
    setTimeout(() => {
      cb(db.todos);
    }, delay);
  };
  refreshTodos(500);
}

function addTodo(todo) {
  db.todos = {
    ...db.todos,
    ...createTodo(todo)
  };
  refreshTodos();
}

function updateTodo(id, changes) {
  db.todos = {
    ...db.todos,
    [id]: {
      ...db.todos[id],
      ...changes
    }
  };
  refreshTodos();
}

function deleteTodo(id) {
  const { [id]: value, ...todos } = db.todos;
  db.todos = todos;
  refreshTodos();
}

export default {
  syncTodos,
  addTodo,
  updateTodo,
  deleteTodo
};
