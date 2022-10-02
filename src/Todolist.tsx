import React, {ChangeEvent, KeyboardEvent,useState} from "react";
import {Button} from "./components/Button";

export type TodolistProps = {
    title: string,
    tasks: TaskType[],
    removeTask: (taskId: string) => void,
    changeFilter: (filterValue: FilterButtonType) => void,
    addTask: (taskId: string) => void,
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type FilterButtonType = 'All' | 'Active' | 'Completed'

export const Todolist = (props: TodolistProps) => {

    const [title, setTitle] = useState('');// переписать в useRef

    const addTaskHandler =() => {
        props.addTask(title)
        setTitle('')
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyPressHandler =(event:KeyboardEvent<HTMLInputElement>) => {
        if( event.key === 'Enter'){
            addTaskHandler()
        }
    }

    const tsarChangeFilter = (filterValue:FilterButtonType) => {
        props.changeFilter(filterValue)
    }

    const removeTaskHandler = ( tId : string) => {
        props.removeTask(tId)
    }

    const mapTasks = props.tasks.map( (t) => {
            return (
                <li key={t.id}>
                    <Button name={'x'} callBack={()=>removeTaskHandler(t.id)} />
                    {/*<button onClick={()=>removeTaskHandler(t.id)}>x</button>*/}
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                </li>
            )
        })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler} onKeyDown={onKeyPressHandler}/>
                <Button name={'+'} callBack={()=>addTaskHandler()} />
                {/*<button onClick={addTaskHandler} >+</button>*/}
            </div>
            <ul>
                {mapTasks}
            </ul>
            <div>
                <Button name={'All'} callBack={()=>tsarChangeFilter('All')} />
                <Button name={'Active'} callBack={()=>tsarChangeFilter('Active')} />
                <Button name={'Completed'} callBack={()=>tsarChangeFilter('Completed')} />
            </div>
        </div>
    )
}