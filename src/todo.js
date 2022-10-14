import { Button, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import { db } from './firebase_config'
import './todo.css'
import ClearIcon from '@mui/icons-material/Clear'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { pink } from '@mui/material/colors'

export default function TodoListItem({ todo, inprogress, id, index, List }) {
  const deleteTodo = () => {
    db.collection('todos').doc(id).delete()
  }

  const upTodo = () => {
    let currentTodo = todo
    let previousId = List[index - 1].id
    db.collection('todos')
      .doc(id)
      .update({
        todo: List[index - 1].todo,
      })
    db.collection('todos').doc(previousId).update({
      todo: currentTodo,
    })
  }
  const downTodo = () => {
    let currentTodo = todo
    let nextId = List[index + 1].id
    db.collection('todos')
      .doc(id)
      .update({
        todo: List[index + 1].todo,
      })
    db.collection('todos').doc(nextId).update({
      todo: currentTodo,
    })
  }
  return (
    <div className="todoItem">
      <p>{todo}</p>
      <div className="buttons">
        <Button onClick={upTodo}>
          <ArrowDropUpIcon
            fontSize="large"
            style={{ color: index == 0 ? '#d4d4fc' : '#4711de' }}
          />
        </Button>
        <Button onClick={downTodo}>
          <ArrowDropDownIcon
            fontSize="large"
            style={{ color: List.length == index + 1 ? '#d4d4fc' : '#4711de' }}
          />
        </Button>
        <Button onClick={deleteTodo}>
          <ClearIcon sx={{ color: pink[500] }} />
        </Button>
      </div>
    </div>
  )
}
