import React, { Component } from 'react';
import db from './mockDB';

const toArray = obj => Object.keys(obj).map(key => ({ ...obj[key], id: key }));
const sortByTs = todos => toArray(todos).sort((a, b) => b.ts - a.ts);

class App extends Component {
  state = {
    todos: {},
    todoList: [],
    loaded: false,
    newTitle: ''
  };

  actions = {
    changeTitleInput: title => {
      this.setState({
        newTitle: title
      });
    },
    submit: () => {
      db.addTodo({
        title: this.state.newTitle
      });
      this.setState({
        newTitle: ''
      });
    },
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
        <Form {...this.state} {...this.actions} />
        <Todos {...this.state} />
      </div>
    );
  }
}

const Form = ({ newTitle, changeTitleInput, submit }) => (
  <form
    onSubmit={e => {
      e.preventDefault();
      submit();
    }}
  >
    <input
      type="text"
      value={newTitle}
      onChange={e => {
        changeTitleInput(e.target.value);
      }}
    />
    <button disabled={!newTitle}>Submit</button>
  </form>
);

const Todos = props => {
  const { todoList } = props;
  return (
    <div>{todoList.map(({ id, title }) => <div key={id}>{title}</div>)}</div>
  );
};

export default App;
