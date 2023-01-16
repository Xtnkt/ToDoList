import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, ButtonGroup, IconButton, List} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import Task from "./components/Task";
import {AppDispatch} from "./store/store";
import {getTasksTC} from "./store/tasks-reducer";
import {ResponseTasksType, TaskStatuses} from "./api/todolist-api";
import {FilterButtonType} from "./store/todolists-reducer";


export type TodolistProps = {
    todoListId: string
    title: string,
    filter: FilterButtonType,
    tasks: ResponseTasksType[],

    addTask: (todoListId: string, newTitle: string ) => void,
    removeTask: (taskId: string, todoListId: string) => void,
    changeTaskStatus: (todoListId: string, taskId: string, status: TaskStatuses ) => void,
    changeTuskTitle: (taskId: string, title: string, todoListId: string) => void,
    removeTodoList: (todoListId: string) => void
    changeTodoListFilter: (filterValue: FilterButtonType, todoListId: string) => void,
    changeTodoListTitle: (title: string, todoListId: string) => void
}

export const Todolist = React.memo((props: TodolistProps) => {
    console.log('todo')

    const dispatch = AppDispatch()

    useEffect(() => {
        dispatch(getTasksTC(props.todoListId))
    }, [])

    const tsarChangeFilter = useCallback((filterValue: FilterButtonType) =>
        () => props.changeTodoListFilter(filterValue, props.todoListId), [props.changeTodoListFilter, props.todoListId])

    let tasks = props.tasks

    if (props.filter === 'Active') {
        tasks = tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.filter === 'Completed') {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    const addTaskHandler = useCallback((title: string) => {
        props.addTask(props.todoListId, title)
    }, [props.addTask, props.todoListId]);

    const removeTodoListHandler = useCallback(() => {
        props.removeTodoList(props.todoListId)
    }, [props.removeTodoList, props.todoListId]);

    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.todoListId)
    }, [props.changeTodoListTitle, props.todoListId]);

    const mapTasks = tasks.map((t) => {
        // const changeTuskTitle = (title: string) => {
        //     props.changeTuskTitle(t.id, title, props.todoListId)
        // }
        return (
            <Task key={t.id}
                  task={t}
                  todoId={props.todoListId}
                  removeTask={props.removeTask}
                  changeTuskTitle={props.changeTuskTitle}
                  changeTaskStatus={props.changeTaskStatus}/>
            // <TaskWithRedux key={t.id} task={t} todolistId={props.todoListId}/>
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

{/*<Button*/
}
{/*    color={props.filter === 'All' ? "secondary" : 'primary'}*/
}
{/*    style={{marginRight: '5px'}}*/
}
{/*    // className={props.filter === 'All' ? styles.activeFilter : ''}*/
}
{/*    onClick={tsarChangeFilter('All')}*/
}
{/*>All</Button>*/
}
{/*<Button*/
}
{/*    color={props.filter === 'Active' ? "secondary" : 'primary'}*/
}
{/*    style={{marginRight: '5px'}}*/
}
{/*    // className={props.filter === 'Active' ? styles.activeFilter : ''}*/
}
{/*    onClick={tsarChangeFilter('Active')}*/
}
{/*>Active</Button>*/
}
{/*<Button*/
}
{/*    color={props.filter === 'Completed' ? "secondary" : 'primary'}*/
}
{/*    // className={props.filter === 'Completed' ? styles.activeFilter : ''}*/
}
{/*    onClick={tsarChangeFilter('Completed')}*/
}
{/*>Completed</Button>*/
}
