import React, {useCallback, useEffect} from 'react';
import './App.css';
import { Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC, FilterButtonType, getTodoTC,
    RemoveTodoListAC, TodolistDomainType,
} from "./store/todolists-reducer";
import {
    addTasksTC,
    changeTaskTitleAC,
    removeTaskTC, updateTaskTC
} from "./store/tasks-reducer";
import {AppDispatch, useAppSelector} from "./store/store";
import {ResponseTasksType, TaskStatuses} from "./api/todolist-api";


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
    const dispatch = AppDispatch()

    //BLL

    //Tasks
    //Delete:
    const removeTask = useCallback((taskId: string, todoListId: string) => {
        dispatch(removeTaskTC(todoListId, taskId))
    }, [])
    //Create:
    const addTask = useCallback((todoListId: string, newTitle: string ) => {
        dispatch(addTasksTC(todoListId,newTitle))
    }, [])
    //Update:
    const changeTaskStatus = useCallback(( todoListId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todoListId,taskId, status))
    }, [dispatch])
    const changeTuskTitle = useCallback((taskId: string, title: string, todoListId: string) => {
        let action = changeTaskTitleAC(taskId, title, todoListId)
        dispatch(action)
    }, [dispatch])

    //TodoLists
    //Delete:
    const removeTodoList = useCallback((todoListId: string) => {
        let action = RemoveTodoListAC(todoListId)
        dispatch(action)
    }, [dispatch])
    //Create:
    const addTodoList = useCallback((title: string) => {
        let action = AddTodoListAC(title) // !!!
        dispatch(action)
    }, [dispatch]);
    //Update:
    const changeTodoListFilter = useCallback((filter: FilterButtonType, todoListId: string) => {
        let action = ChangeTodoListFilterAC(filter, todoListId)
        dispatch(action)
    }, [dispatch])
    const changeTodoListTitle = useCallback((title: string, todoListId: string) => {
        let action = ChangeTodoListTitleAC(title, todoListId)
        dispatch(action)
    }, [dispatch])

    //Update:
    // const getFilteredTasks = (value: FilterButtonType, t: Array<TaskType>) => {
    //     let tasksForToDoList = t;
    //     if (value === 'Active') {
    //         tasksForToDoList = t.filter(t => !t.isDone);
    //     }
    //     if (value === 'Completed') {
    //         tasksForToDoList = t.filter(t => t.isDone);
    //     }
    //     return tasksForToDoList
    // }

    const todoListComponents = todoLists.map(tl => {
        // const filteredTasks = getFilteredTasks(tl.filter, tasks[tl.id])
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
