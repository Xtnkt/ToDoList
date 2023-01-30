import React, {memo} from 'react';
import {IconButton, ListItem} from "@material-ui/core";
import styles from "../TodoList.module.css";
import DeleteIcon from "@material-ui/icons/Delete";
import {CheckBox} from "./CheckBox";
import {EditableSpan} from "./EditableSpan";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../store/tasks-reducer";
import {ResponseTasksType} from "../api/todolist-api";

export type TaskPropsType = {
    task: ResponseTasksType,
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
    const changeIsDoneHandler = (taskId:any, status:any, todolistId:any) => {
        dispatch(changeTaskStatusAC(taskId, status, todolistId))
    }
    return (
        <ListItem key={task.id}
                  style={{padding: '0px'}}>
            <IconButton aria-label="delete" color="default" onClick={removeTaskHandler} size={'small'}>
                <DeleteIcon/>
            </IconButton>
            {/*<CheckBox checked={task.isDone}*/}
            {/*          callBack={(isDone) => changeIsDoneHandler(status)}*/}
            {/*/>*/}
            <EditableSpan title={task.title} changeTitle={changeTuskTitleHandler}/>
        </ListItem>
    )
});
