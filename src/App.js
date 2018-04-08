import React, { Component } from 'react';
import db from './mockDB';

const toArray = obj => Object.keys(obj).map(key => ({ ...obj[key], id: key }));
const sortByTs = todos => toArray(todos).sort((a, b) => b.ts - a.ts);

class App extends Component {
  state = {
    todos: {},
    todoList: [],
    loaded: false
  };

  actions = {
    syncTodos: () => {
      db.syncTodos(todos => {
        this.setState({
          todos,
          loaded: true,
          todoList: sortByTs(todos)
        });
      });
    }
  };

  componentDidMount() {
    this.actions.syncTodos();
  }

  render() {
    if (!this.state.loaded) return <div>Loading...</div>;
    return (
      <div>
        <h1>Todos</h1>
        <Todos {...this.state} />
      </div>
    );
  }
}

const Todos = props => {
  return (
    <div>
      {props.todoList.map(todo => <div key={todo.id}>{todo.title}</div>)}
    </div>
  );
};

export default App;
