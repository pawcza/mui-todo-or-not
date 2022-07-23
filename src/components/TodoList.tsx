import List from '@mui/material/List';
import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";

import {Todo} from "../App";
import TodoItem from "./TodoItem";

interface TodoListType {
  todos: Todo[],
  updateItem: (id: number, title: string, completed: boolean) => void,
  removeItem: (id: number) => void
}

const TodoList = ({todos, updateItem, removeItem}: TodoListType) => {
  return (
    <List sx={{
      width: '100%',
      maxWidth: 420,
      bgcolor: 'background.paper',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <TransitionGroup>
        {todos
          .filter(({completed}) => !completed)
          .sort((a, b) => b.id - a.id)
          .map(({id, title, completed}) =>
            <Collapse key={`collapse-item-${id}`}>
              <TodoItem
                id={id}
                title={title}
                completed={false}
                labelId={`checkbox-list-label-${id}`}
                updateItem={updateItem}
                removeItem={removeItem}
              />
            </Collapse>
          )}
      </TransitionGroup>
      <TransitionGroup>
        {todos
          .filter(({completed}) => completed)
          .sort((a, b) => b.id - a.id)
          .map(({id, title, completed}) =>
            <Collapse key={`collapse-item-${id}`}>
              <TodoItem
                id={id}
                title={title}
                completed={true}
                labelId={`checkbox-list-label-${id}`}
                updateItem={updateItem}
                removeItem={removeItem}
              />
            </Collapse>
          )}
      </TransitionGroup>
    </List>
  )
}

export default TodoList;