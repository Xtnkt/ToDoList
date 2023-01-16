import React, {memo, useCallback} from 'react';
import {IconButton, ListItem} from "@material-ui/core";
import styles from "../TodoList.module.css";
import DeleteIcon from "@material-ui/icons/Delete";
import {CheckBox} from "./CheckBox";
import {EditableSpan} from "./EditableSpan";
import {ResponseTasksType, TaskStatuses} from "../api/todolist-api";

export type TaskPropsType = {
    task: ResponseTasksType,
    todoId: string
    removeTask: (taskId: string, todoListId: string) => void,
    changeTuskTitle: (taskId: string, title: string, todoListId: string) => void,
    changeTaskStatus: (todoListId: string, taskId: string, status: TaskStatuses) => void,
}

export const Task = memo(({task, todoId, removeTask, changeTuskTitle, changeTaskStatus}: TaskPropsType) => {

    const removeTaskHandler = useCallback(() => {
        removeTask(task.id, todoId)
    }, [task.id, todoId]);
    const changeTuskTitleHandler = useCallback((newTitle: string) => {
        changeTuskTitle(task.id, newTitle, todoId)
    }, [task.id, todoId]);

    const changeIsDoneHandler = useCallback((status: TaskStatuses) => {
        changeTaskStatus(todoId, task.id, status )
    }, [task.id, todoId]);


    // const changeIsDoneHandler = (tId: string, isDone: boolean) => {
    //     changeIsDone(tId, isDone)
    // }
    return (
        <ListItem key={task.id}
                  className={task.status === TaskStatuses.Completed ? styles.isDone : ''}
                  style={{padding: '0px'}}>
            <IconButton aria-label="delete" color="default" onClick={removeTaskHandler} size={'small'}>
                <DeleteIcon/>
            </IconButton>
            <CheckBox checked={task.status === TaskStatuses.Completed}
                      callBack={(status) => changeIsDoneHandler(status)}
            />
            <EditableSpan title={task.title} changeTitle={changeTuskTitleHandler}/>
        </ListItem>
    )
});

export default Task;