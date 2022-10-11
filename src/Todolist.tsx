import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./components/Button";
import styles from './TodoList.module.css'
import {CheckBox} from "./components/CheckBox";

export type TodolistProps = {
    todoListId: string
    title: string,
    tasks: TaskType[],
    filter: FilterButtonType
    removeTask: (taskId: string, todoListId: string) => void,
    changeTodoListFilter: (filterValue: FilterButtonType, todoListId: string) => void,
    addTask: (taskId: string, todoListId: string) => void,
    changeIsDone: (id: string, newIsDone: boolean, todoListId: string) => void,
    removeTodoList: (todoListId: string) => void
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type FilterButtonType = 'All' | 'Active' | 'Completed'

export const Todolist = (props: TodolistProps) => {

    const [title, setTitle] = useState('');// переписать в useRef
    const [error, setError] = useState<null | string>(null)

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim(), props.todoListId)
            setTitle('')
        } else {
            setError('Title is requred')
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const tsarChangeFilter = (filterValue: FilterButtonType) => {
        props.changeTodoListFilter(filterValue, props.todoListId)
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

    const mapTasks = props.tasks.map((t) => {
        return (
            <li key={t.id} className={t.isDone ? styles.isDone : ''}>
                <Button name={'x'}
                        callBack={() => removeTaskHandler(t.id)}
                />
                <CheckBox checked={t.isDone}
                          callBack={(isDone) => changeIsDoneHandler(t.id, isDone)}
                />
                <span>{t.title}</span>
            </li>
        )
    })

    return (
        <div>
            <h3>
                {props.title}
                <Button name={'X'} callBack={removeTodoListHandler}/>
            </h3>
            <div>
                <input className={error ? styles.error : ''}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}/>
                <Button name={'+'}
                        callBack={() => addTaskHandler()}
                />
            </div>
            {error && <div className={styles.errorMessage}>{error}</div>}
            <ul>
                {mapTasks}
            </ul>
            <div>
                <Button className={props.filter === 'All' ? styles.activeFilter : ''}
                        name={'All'}
                        callBack={() => tsarChangeFilter('All')}
                />
                <Button className={props.filter === 'Active' ? styles.activeFilter : ''}
                        name={'Active'}
                        callBack={() => tsarChangeFilter('Active')}
                />
                <Button className={props.filter === 'Completed' ? styles.activeFilter : ''}
                        name={'Completed'}
                        callBack={() => tsarChangeFilter('Completed')}
                />
            </div>
        </div>
    )
}
