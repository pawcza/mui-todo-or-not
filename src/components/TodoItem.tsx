import React, {useState, useEffect} from 'react';
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";

import { Todo } from '../App';

interface TodoItemType extends Todo {
  updateItem: (id: number, title: string, completed: boolean) => void,
  removeItem: (id: number) => void,
  labelId: string
}

const TodoItem = ({id, title, completed, updateItem, removeItem, labelId}: TodoItemType) => {
  const [editMode, setEditMode] = useState(false);
  const [fieldValue, setFieldValue] = useState(title);
  
  useEffect(() => {
    setFieldValue(title)
  }, [title])
  
  const handleBlur = () => {
    updateItem(id, fieldValue, completed);
    setEditMode(false)
  }
  
  return (
    <ListItem
      key={id}
      secondaryAction={
        <>
          <IconButton edge="end" aria-label="comments" onClick={() => setEditMode(!editMode)}>
            <EditIcon sx={{fontSize: 16, marginRight: 1}}/>
          </IconButton>
          <IconButton edge="end" aria-label="comments" onClick={() => removeItem(id)}>
            <DeleteForeverIcon sx={{fontSize: 16}}/>
          </IconButton>
        </>
      }
      disablePadding
      sx={{order: 1,
        '& .MuiListItemButton-root': {
          paddingRight: 8
        }}}
    >
      <ListItemButton
        role={undefined}
        dense
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={completed}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
            onClick={() => updateItem(id, title, !completed)}
          />
        </ListItemIcon>
        {editMode ?
          <TextField
            value={fieldValue}
            onChange={e => setFieldValue(e.target.value)}
            onBlur={() => handleBlur()}
            variant="standard"
            autoFocus
            multiline
            InputProps={{sx: {
                fontSize: 14,
                paddingRight: 0
              }}}
            sx={{width: '100%'}}
          />
        :
          <ListItemText
            id={labelId}
            primary={title}
            sx={{
              textDecoration: completed ? 'line-through' : 'none',
              marginBottom: '5px'
            }}
          />
        }
      </ListItemButton>
    </ListItem>
  );
};

export default TodoItem;