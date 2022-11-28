import React, {useCallback} from "react";
import styles from './TodoList.module.css'
import {CheckBox} from "./components/CheckBox";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, ButtonGroup, IconButton, List, ListItem} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import Task from "./components/Task";
import {TaskWithRedux} from "./components/TaskWithRedux";


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

export const Todolist = React.memo((props: TodolistProps) => {
    console.log('todo')

    const tsarChangeFilter = useCallback((filterValue: FilterButtonType) =>
        () => props.changeTodoListFilter(filterValue, props.todoListId), [props.changeTodoListFilter, props.todoListId])

    let tasks = props.tasks
    if (props.filter === 'Active') {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (props.filter === 'Completed') {
        tasks = tasks.filter(t => t.isDone);
    }

    const addTaskHandler = useCallback((title: string) => {
        props.addTask(title, props.todoListId)
    }, [props.addTask, props.todoListId]);

    const removeTodoListHandler = useCallback(() => {
        props.removeTodoList(props.todoListId)
    }, [props.removeTodoList, props.todoListId]);

    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.todoListId)
    }, [props.changeTodoListTitle, props.todoListId]);

    // const removeTaskHandler = useCallback((tId: string) => {
    //     props.removeTask(tId, props.todoListId)
    // }, [props.removeTask, props.todoListId]);
    //
    // const changeIsDoneHandler = useCallback((tId: string, isDone: boolean) => {
    //     props.changeIsDone(tId, isDone, props.todoListId)
    // }, [props.changeIsDone, props.todoListId]);
    //
    // const changeTuskTitle = useCallback((taskId: string, title: string) => {
    //     props.changeTuskTitle(taskId, title, props.todoListId)
    // }, [props.changeTuskTitle, props.todoListId]);

    const mapTasks = tasks.map((t) => {
        // const changeTuskTitle = (title: string) => {
        //     props.changeTuskTitle(t.id, title, props.todoListId)
        // }
        return (
            // <Task key={t.id}
            //       task={t}
            //       removeTask={removeTaskHandler}
            //       changeTuskTitle={changeTuskTitle}
            //       changeIsDone={changeIsDoneHandler}/>
            <TaskWithRedux key={t.id} task={t} todolistId={props.todoListId}/>
            // <ListItem key={t.id}
            //           className={t.isDone ? styles.isDone : ''}
            //           style={{padding: '0px'}}>
            //     <IconButton aria-label="delete" color="default" onClick={() => removeTaskHandler(t.id)} size={'small'}>
            //         <DeleteIcon/>
            //     </IconButton>
            //     <CheckBox checked={t.isDone}
            //               callBack={(isDone) => changeIsDoneHandler(t.id, isDone)}
            //     />
            //     <EditableSpan title={t.title} changeTitle={changeTuskTitle}/>
            // </ListItem>
        )
    })

    return (
        <div>
            <h3 style={{marginTop: '0px'}}>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
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
                <ButtonWithMemo
                    onClick={tsarChangeFilter('All')}
                    color={props.filter === 'All' ? "secondary" : 'primary'}
                    title={'All'}
                />
                <ButtonWithMemo
                    onClick={tsarChangeFilter('Active')}
                    color={props.filter === 'Active' ? "secondary" : 'primary'}
                    title={'Active'}
                />
                <ButtonWithMemo
                    onClick={tsarChangeFilter('Completed')}
                    color={props.filter === 'Completed' ? "secondary" : 'primary'}
                    title={'Completed'}
                />
                {/*<Button*/}
                {/*    color={props.filter === 'All' ? "secondary" : 'primary'}*/}
                {/*    style={{marginRight: '5px'}}*/}
                {/*    // className={props.filter === 'All' ? styles.activeFilter : ''}*/}
                {/*    onClick={tsarChangeFilter('All')}*/}
                {/*>All</Button>*/}
                {/*<Button*/}
                {/*    color={props.filter === 'Active' ? "secondary" : 'primary'}*/}
                {/*    style={{marginRight: '5px'}}*/}
                {/*    // className={props.filter === 'Active' ? styles.activeFilter : ''}*/}
                {/*    onClick={tsarChangeFilter('Active')}*/}
                {/*>Active</Button>*/}
                {/*<Button*/}
                {/*    color={props.filter === 'Completed' ? "secondary" : 'primary'}*/}
                {/*    // className={props.filter === 'Completed' ? styles.activeFilter : ''}*/}
                {/*    onClick={tsarChangeFilter('Completed')}*/}
                {/*>Completed</Button>*/}
            </ButtonGroup>
        </div>
    )
})

type ButtonWithMemoPropsType = {
    color: 'inherit' | 'primary' | 'secondary' | 'default',
    onClick: () => void,
    title: string
}
const ButtonWithMemo = React.memo((props: ButtonWithMemoPropsType) => {
    return (
        <Button
            size={'small'}
            fullWidth
            disableElevation
            variant={'contained'}
            color={props.color}
            style={{marginRight: '5px'}}
            // className={props.filter === 'Active' ? styles.activeFilter : ''}
            onClick={props.onClick}
        >{props.title}</Button>
    )
})
