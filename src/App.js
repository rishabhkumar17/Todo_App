import './App.css'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { db } from './firebase_config'
import firebase from 'firebase/compat/app'
import TodoListItem from './todo'
import { Margin } from '@mui/icons-material'

function App() {
  const [todos, setTodos] = useState([])
  const [todoInput, setTodoInput] = useState('')

  useEffect(() => {
    getTodos()
  }, []) // blank to run only on first launch

  const getTodos = () => {
    db.collection('todos').onSnapshot((querySnapshot) => {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          inprogress: doc.data().inprogress,
        }))
      )
    })
  }
  const addTodo = (e) => {
    e.preventDefault()
    db.collection('todos').add({
      inprogress: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: todoInput,
    })
    setTodoInput('')
  }
  return (
    <div className="App">
      <h1>Rishabh's Todo App</h1>
      <div className="container">
        <div>
          {todos.map((todo, index) => (
            <TodoListItem
              todo={todo.todo}
              inprogress={todo.inprogress}
              id={todo.id}
              index={index}
              List={todos}
            />
          ))}
          <form className="textBox">
            <TextField
              fullWidth
              style={{ backgroundColor: '#eef2ff' }}
              sx={{ mr: 2 }}
              size="small"
              id="fullWidth"
              variant="outlined"
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
            />
            <Button
              style={{ backgroundColor: '#4711de' }}
              size="small"
              type="submit"
              variant="contained"
              onClick={addTodo}
            >
              Add
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
