import React from "react";
import styles from './TodoList.module.css'
import {CheckBox} from "./components/CheckBox";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, ButtonGroup, IconButton, List, ListItem} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

export type TodolistProps = {
    todoListId: string
    title: string,
    filter: FilterButtonType,
    tasks: TaskType[],

    addTask: (newTitle: string, todoListId: string) => void,
    removeTask: (taskId: string, todoListId: string) => void,
    changeIsDone: (id: string, newIsDone: boolean, todoListId: string) => void,
    changeTuskTitle: (taskId: string, title: string, todoListId: string) => void,
    removeTodoList: (todoListId: string) => void
    changeTodoListFilter: (filterValue: FilterButtonType, todoListId: string) => void,
    changeTodoListTitle: (title: string, todoListId: string) => void
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type FilterButtonType = 'All' | 'Active' | 'Completed'

export const Todolist = (props: TodolistProps) => {

    const tsarChangeFilter = (filterValue: FilterButtonType) =>
        () => props.changeTodoListFilter(filterValue, props.todoListId)

    const addTaskHandler = (title: string) => {
        props.addTask(title, props.todoListId)
    }
    const removeTaskHandler = (tId: string) => {
        props.removeTask(tId, props.todoListId)
    }
    const changeIsDoneHandler = (tId: string, isDone: boolean) => {
        props.changeIsDone(tId, isDone, props.todoListId)
    }
    const removeTodoListHandler = () => {
        props.removeTodoList(props.todoListId)
    }
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListId)
    }

    const mapTasks = props.tasks.map((t) => {

        const changeTuskTitle = (title: string) => {
            props.changeTuskTitle(t.id, title, props.todoListId)
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
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton  aria-label="delete" color="default" onClick={removeTodoListHandler} size={'small'}>
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
                    color={props.filter === 'All' ? "secondary" : 'primary'}
                    style={{marginRight: '5px'}}
                    // className={props.filter === 'All' ? styles.activeFilter : ''}
                    onClick={tsarChangeFilter('All')}
                >All</Button>
                <Button
                    color={props.filter === 'Active' ? "secondary" : 'primary'}
                    style={{marginRight: '5px'}}
                    // className={props.filter === 'Active' ? styles.activeFilter : ''}
                    onClick={tsarChangeFilter('Active')}
                >Active</Button>
                <Button
                    color={props.filter === 'Completed' ? "secondary" : 'primary'}
                    // className={props.filter === 'Completed' ? styles.activeFilter : ''}
                    onClick={tsarChangeFilter('Completed')}
                >Completed</Button>
            </ButtonGroup>
        </div>
    )
}
