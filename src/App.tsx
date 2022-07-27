import React, {FormEvent, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import TodoList from './components/TodoList';
import TextField from "@mui/material/TextField";

export interface Todo {
  id: number,
  title: string,
  completed: boolean
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState('');
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(json => setTodos(json.filter((todo: { id: number }) => todo.id < 15)))
  }, [])
  
  const updateItem = (id: number, title: string, completed: boolean) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? {id, title, completed} : todo
    )

    setTodos(updatedTodos)
  }

  const addItem = (title: string) => {
    let updatedTodos = todos;
    const id = todos.length;
    
    updatedTodos.push({id, title, completed: false});

    setTodos(updatedTodos)
  }
  
  const removeItem = (id: number) =>
    setTodos(todos.filter(todo => todo.id !== id))
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addItem(value);
    setValue('');
  }
  
  return (
    <Box sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
      <Typography variant='h4' sx={{py: 2}}>To do or not to do list</Typography>
      <Paper>
        <form onSubmit={e => handleSubmit(e)}>
          <TextField
            value={value}
            onChange={e => setValue(e.target.value)}
            variant="standard"
            placeholder="Type your new todo idea here..."
            InputProps={{sx: {
                fontSize: 14,
                p: 2
              }}}
            sx={{width: '100%'}}
          />
        </form>
        <TodoList
          todos={todos}
          updateItem={updateItem}
          removeItem={removeItem}
        />
      </Paper>
    </Box>
  );
};

export default App;
