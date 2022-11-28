import React, {FC} from 'react';
import { TodoListType} from "./AppWithRedux";
import {Button, ButtonGroup, IconButton, List, ListItem} from "@material-ui/core";
import styles from "./TodoList.module.css";
import DeleteIcon from "@material-ui/icons/Delete";
import {CheckBox} from "./components/CheckBox";
import {EditableSpan} from "./components/EditableSpan";
import {AddItemForm} from "./components/AddItemForm";
import {FilterButtonType, TaskType} from "./Todolist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC} from "./store/todolists-reducer";

export type TodolistReduxPropsType = {
    todoList: TodoListType
}

export const TodolistRedux: FC<TodolistReduxPropsType> = ({todoList}) => {

    const {id, title, filter} = todoList

    let tasks = useSelector<AppRootStateType, TaskType[]>((state) => state.tasks[id])
    const dispatch = useDispatch()

    const tsarChangeFilter = (filterValue: FilterButtonType) =>
        () => dispatch(ChangeTodoListFilterAC(filterValue, id))

    if (filter === 'Active') {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (filter === 'Completed') {
        tasks = tasks.filter(t => t.isDone);
    }

    const addTaskHandler = (title: string) => {
        let action = addTaskAC(title, id)
        dispatch(action)
    }
    const removeTaskHandler = (tId: string) => {
        let action = removeTaskAC(tId, id)
        dispatch(action)
    }
    const changeIsDoneHandler = (tId: string, isDone: boolean) => {
        let action = changeTaskStatusAC(tId, isDone, id)
        dispatch(action)
    }
    const removeTodoListHandler = () => {
        let action = RemoveTodoListAC(id)
        dispatch(action)
    }
    const changeTodoListTitle = (title: string) => {
        let action = ChangeTodoListTitleAC(title, id)
        dispatch(action)
    }

    const mapTasks = tasks.map((t) => {

        const changeTuskTitle = (title: string) => {
            let action = changeTaskTitleAC(t.id, title, id)
            dispatch(action)
        }
        return (
            <ListItem key={t.id}
                      className={t.isDone ? styles.isDone : ''}
                      style={{padding: '0px'}}>
                <IconButton aria-label="delete" color="default" onClick={() => removeTaskHandler(t.id)} size={'small'}>
                    <DeleteIcon/>
                </IconButton>
                <CheckBox checked={t.isDone}
                          callBack={(isDone) => changeIsDoneHandler(t.id, isDone)}
                />
                <EditableSpan title={t.title} changeTitle={changeTuskTitle}/>
            </ListItem>
        )
    })

    return (
        <div>
            <h3 style={{marginTop: '0px'}}>
                <EditableSpan title={title} changeTitle={changeTodoListTitle}/>
                <IconButton aria-label="delete" color="default" onClick={removeTodoListHandler} size={'small'}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            <List>
                {mapTasks}
            </List>
            <ButtonGroup
                fullWidth
                disableElevation
                variant={'contained'}
                size={'small'}
            >
                <Button
                    color={filter === 'All' ? "secondary" : 'primary'}
                    style={{marginRight: '5px'}}
                    // className={props.filter === 'All' ? styles.activeFilter : ''}
                    onClick={tsarChangeFilter('All')}
                >All</Button>
                <Button
                    color={filter === 'Active' ? "secondary" : 'primary'}
                    style={{marginRight: '5px'}}
                    // className={props.filter === 'Active' ? styles.activeFilter : ''}
                    onClick={tsarChangeFilter('Active')}
                >Active</Button>
                <Button
                    color={filter === 'Completed' ? "secondary" : 'primary'}
                    // className={props.filter === 'Completed' ? styles.activeFilter : ''}
                    onClick={tsarChangeFilter('Completed')}
                >Completed</Button>
            </ButtonGroup>
        </div>
    )
};
