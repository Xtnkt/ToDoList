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

import Typography from "@mui/material/Typography";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material//Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Menu from "@mui/icons-material/Menu";
import LinearProgress from "@mui/material/LinearProgress";
import {ErrorSnackbar} from "./components/ErrorSnackbar";


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
                        entityStatus={tl.entityStatus}

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
            <ErrorSnackbar/>
        </div>
    );
}

export default AppWithRedux;
