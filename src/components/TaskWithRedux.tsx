import React, {memo} from 'react';
import {IconButton, ListItem} from "@material-ui/core";
import styles from "../TodoList.module.css";
import DeleteIcon from "@material-ui/icons/Delete";
import {CheckBox} from "./CheckBox";
import {EditableSpan} from "./EditableSpan";
import {TaskType} from "../Todolist";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../store/tasks-reducer";

export type TaskPropsType = {
    task: TaskType,
    todolistId: string
}

export const TaskWithRedux = memo(({task, todolistId}: TaskPropsType) => {

    const dispatch = useDispatch()

    const changeTuskTitleHandler = (title: string) => {
        dispatch(changeTaskTitleAC(task.id, title, todolistId))
    }
    const removeTaskHandler = () => {
        dispatch(removeTaskAC(task.id, todolistId))
    }
    const changeIsDoneHandler = (tId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(tId, isDone, todolistId))
    }
    return (
        <ListItem key={task.id}
                  className={task.isDone ? styles.isDone : ''}
                  style={{padding: '0px'}}>
            <IconButton aria-label="delete" color="default" onClick={removeTaskHandler} size={'small'}>
                <DeleteIcon/>
            </IconButton>
            <CheckBox checked={task.isDone}
                      callBack={(isDone) => changeIsDoneHandler(task.id, isDone)}
            />
            <EditableSpan title={task.title} changeTitle={changeTuskTitleHandler}/>
        </ListItem>
    )
});
