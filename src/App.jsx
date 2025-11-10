import { useEffect, useState } from 'react'

import './App.css'

const styles = {
  container: {
    maxWidth: 400,
    margin: '50px auto',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: 16,
  },
  button: {
    padding: '10px 15px',
    marginLeft: 10,
    fontSize: 16,
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#f9f9f9',
    padding: '10px 15px',
    marginBottom: 10,
    borderRadius: 5,
  },
  todoText: {
    cursor: 'pointer',
    flex: 1,
    textAlign: 'left',
  },
  delete: {
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: 18,
  },
};

function App() {
  const [todos, setTodos] = useState( () => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState('');
  useEffect(() => {
    localStorage.setItem('todos',JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) =>{
    e.preventDefault();
    if(!input.trim()) return;
    const newTodo = { id:Date.now(), text: input.trim(), done: false};
    setTodos([...todos, newTodo]);
    setInput('');
  }

  const deleteTodo = (id) =>{
    setTodos(todos.filter((todo) => todo.id !== id));
  };
console.log("Hi",todos, input )

  return (
    <div style = {styles.container}>
      <h1>Todo List</h1>

      <form onSubmit={addTodo} style={styles.form}>
        <input style={styles.input} value={input} onChange={(e) => setInput(e.target.value)}
        placeholder='Add a new task'
        />
      <button style={styles.button}>Add</button>
      </form>

      <ul style={styles.list}>

        {todos.map((todo) => (
          <li key = {todo.id} style = {styles.listItem}>
            <span onClick={() => toggleTodo(todo.id)} style={{
                ...styles.todoText,
                textDecoration: todo.done ? 'line-through' : 'none',
                color: todo.done ? '#999' : '#000',
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)} style = {styles.delete}> Delete </button>
          </li>
        ))}
      </ul>
    </div>
  )

}

export default App;
