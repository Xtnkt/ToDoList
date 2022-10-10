import React, {ChangeEvent, KeyboardEvent,useState} from "react";
import {Button} from "./components/Button";
import styles from './TodoList.module.css'
import {CheckBox} from "./components/CheckBox";

export type TodolistProps = {
    title: string,
    tasks: TaskType[],
    removeTask: (taskId: string) => void,
    changeFilter: (filterValue: FilterButtonType) => void,
    addTask: (taskId: string) => void,
    changeIsDone:(id:string, newIsDone:boolean)=>void,
    nameButton:FilterButtonType
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type FilterButtonType = 'All' | 'Active' | 'Completed'

export const Todolist = (props: TodolistProps) => {

    const [title, setTitle] = useState('');// переписать в useRef

    const [error,setError]=useState<null | string>(null)

    //const[nameButton, setNameButton]=useState<FilterButtonType>('All')

    const addTaskHandler =() => {
        if(title.trim()!==''){
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is requred')
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(event.currentTarget.value)

    }

    const onKeyPressHandler =(event:KeyboardEvent<HTMLInputElement>) => {
        if( event.key === 'Enter'){
            addTaskHandler()
        }
    }

    const tsarChangeFilter = (filterValue:FilterButtonType) => {
        props.changeFilter(filterValue)
        //setNameButton('All' )
    }


    const removeTaskHandler = ( tId : string) => {
        props.removeTask(tId)
    }


    const changeIsDoneHandler = (tId:string,isDone: boolean) => {
        props.changeIsDone(tId, isDone)
    }
    const mapTasks = props.tasks.map( (t) => {
            return (
                <li key={t.id} className={t.isDone ? styles.isDone : ''}>
                    <Button name={'x'} callBack={()=>removeTaskHandler(t.id)} />
                    <CheckBox checked={t.isDone} callBack={(isDone)=>changeIsDoneHandler(t.id, isDone)} />
                    {/*<button onClick={()=>removeTaskHandler(t.id)}>x</button>*/}
                    {/*<input type="checkbox"*/}
                    {/*       checked={t.isDone}*/}
                    {/*       onChange={(event: ChangeEvent<HTMLInputElement>)=>changeIsDoneHandler(t.id, event.currentTarget.checked)}/>*/}
                    <span>{t.title}</span>
                </li>
            )
        })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input className={error ? styles.error : ''} value={title} onChange={onChangeHandler} onKeyDown={onKeyPressHandler}/>
                <Button name={'+'} callBack={()=>addTaskHandler()} />
                {/*<button onClick={addTaskHandler} >+</button>*/}
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}
            <ul>
                {mapTasks}
            </ul>
            <div>
                <Button className={props.nameButton==='All'? styles.activeFilter: ''} name={'All'} callBack={()=>tsarChangeFilter('All')} />
                <Button className={props.nameButton==='Active'? styles.activeFilter: ''} name={'Active'} callBack={()=>tsarChangeFilter('Active')} />
                <Button className={props.nameButton==='Completed'? styles.activeFilter: ''} name={'Completed'} callBack={()=>tsarChangeFilter('Completed')} />
            </div>
        </div>
    )
}

//className={nameButton==='All'? styles.activeFilter: ''}