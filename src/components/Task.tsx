import React, {memo} from 'react';
import {IconButton, ListItem} from "@material-ui/core";
import styles from "../TodoList.module.css";
import DeleteIcon from "@material-ui/icons/Delete";
import {CheckBox} from "./CheckBox";
import {EditableSpan} from "./EditableSpan";
import {TaskType} from "../Todolist";

export type TaskPropsType = {
    task:TaskType,
    removeTask: (taskId: string) => void,
    changeTuskTitle: (taskId: string, title: string) => void,
    changeIsDone: (id: string, newIsDone: boolean) => void,
}

export const Task = memo(({task,removeTask,changeTuskTitle,changeIsDone}:TaskPropsType) => {

    const changeTuskTitleHandler = (title: string) => {
        changeTuskTitle(task.id, title)
    }
    const removeTaskHandler = () => {
        removeTask(task.id)
    }
    const changeIsDoneHandler = (tId: string, isDone: boolean) => {
        changeIsDone(tId, isDone)
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

export default Task;