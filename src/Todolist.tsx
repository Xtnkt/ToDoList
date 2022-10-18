import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./components/Button";
import styles from './TodoList.module.css'
import {CheckBox} from "./components/CheckBox";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";

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
            <li key={t.id} className={t.isDone ? styles.isDone : ''}>
                <Button name={'x'}
                        callBack={() => removeTaskHandler(t.id)}
                />
                <CheckBox checked={t.isDone}
                          callBack={(isDone) => changeIsDoneHandler(t.id, isDone)}
                />
                <EditableSpan title={t.title} changeTitle={changeTuskTitle}/>
            </li>
        )
    })

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <Button name={'X'} callBack={removeTodoListHandler}/>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            <ul>
                {mapTasks}
            </ul>
            <div>
                <Button className={props.filter === 'All' ? styles.activeFilter : ''}
                        name={'All'}
                        callBack={tsarChangeFilter('All')}
                />
                <Button className={props.filter === 'Active' ? styles.activeFilter : ''}
                        name={'Active'}
                        callBack={tsarChangeFilter('Active')}
                />
                <Button className={props.filter === 'Completed' ? styles.activeFilter : ''}
                        name={'Completed'}
                        callBack={tsarChangeFilter('Completed')}
                />
            </div>
        </div>
    )
}
