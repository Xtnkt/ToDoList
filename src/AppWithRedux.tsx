import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {
    ChangeTodoListFilterAC,
    changeTodolistTitleTC, createTodolistTC, deleteTodolistTC, FilterButtonType, getTodoTC,
    TodolistDomainType,
} from "./store/todolists-reducer";
import {
    addTasksTC,
    changeTaskTitleAC,
    removeTaskTC, updateTaskTC
} from "./store/tasks-reducer";
import {AppDispatch, useAppSelector} from "./store/store";
import {ResponseTasksType, TaskStatuses} from "./api/todolist-api";

import Typography from "@material-ui/core/Typography";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import {Menu} from "@material-ui/icons";
import LinearProgress from "@material-ui/core/LinearProgress";


export type TasksStateType = {
    [todoListId: string]: ResponseTasksType[],
}

function AppWithRedux() {

    useEffect(() => {
        dispatch(getTodoTC())
    }, [])
    //BLL
    const todoLists = useAppSelector<Array<TodolistDomainType>>((state) => state.todolists)
    const tasks = useAppSelector<TasksStateType>((state) => state.tasks)
    const status = useAppSelector(state => state.app.status)
    const dispatch = AppDispatch()

    //BLL

    //Tasks
    //Delete:
    const removeTask = useCallback((taskId: string, todoListId: string) => {
        dispatch(removeTaskTC(todoListId, taskId))
    }, [])
    //Create:
    const addTask = useCallback((todoListId: string, newTitle: string) => {
        dispatch(addTasksTC(todoListId, newTitle))
    }, [])
    //Update:
    const changeTaskStatus = useCallback((todoListId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todoListId, taskId, status))
    }, [])
    const changeTuskTitle = useCallback((taskId: string, title: string, todoListId: string) => {
        let action = changeTaskTitleAC(taskId, title, todoListId)
        dispatch(action)
    }, [])

    //TodoLists
    //Delete:
    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(deleteTodolistTC(todoListId))
    }, [])
    //Create:
    const addTodoList = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, []);
    //Update:
    const changeTodoListFilter = useCallback((filter: FilterButtonType, todoListId: string) => {
        dispatch(ChangeTodoListFilterAC(filter, todoListId))
    }, [])
    const changeTodoListTitle = useCallback((title: string, todoListId: string) => {
        dispatch(changeTodolistTitleTC(todoListId, title))
    }, [])

    const todoListComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper
                    elevation={8}
                    style={{width: '290px', padding: '20px'}}>
                    <Todolist
                        todoListId={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={tasks[tl.id]}

                        addTask={addTask}
                        removeTask={removeTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTuskTitle={changeTuskTitle}
                        removeTodoList={removeTodoList}
                        changeTodoListFilter={changeTodoListFilter}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                    {/*<TodolistRedux*/}
                    {/*   todoList={tl}/>*/}
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            {
                status === 'loading' && <LinearProgress color="secondary"/>
            }

            <Container>
                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
