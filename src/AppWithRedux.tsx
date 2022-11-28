import React, {useCallback, useReducer} from 'react';
import './App.css';
import {FilterButtonType, TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TodolistRedux} from "./TodolistRedux";
import {todolistsSelector} from "./store/selectors";

export type TodoListType = {
    id: string,
    title: string,
    filter: FilterButtonType,
}

export type TasksStateType = {
    [todoListId: string]: TaskType[],
}

function AppWithRedux() {
    //BLL
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(todolistsSelector)
    const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks)
    const dispatch = useDispatch()
    //BLL

    //Tasks
    //Delete:
    const removeTask = useCallback((taskId: string, todoListId: string) => {
        let action = removeTaskAC(taskId, todoListId)
        dispatch(action)
        // dispatchToTasks(removeTaskAC(taskId,todoListId))
    },[dispatch])
    //Create:
    const addTask = useCallback((newTitle: string, todoListId: string) => {
        let action = addTaskAC(newTitle, todoListId)
        dispatch(action)
    },[dispatch])
    //Update:
    const changeIsDone = useCallback((newId: string, newIsDone: boolean, todoListId: string) => {
        let action = changeTaskStatusAC(newId, newIsDone, todoListId)
        dispatch(action)
    },[dispatch])
    const changeTuskTitle = useCallback((taskId: string, title: string, todoListId: string) => {
        let action = changeTaskTitleAC(taskId, title, todoListId)
        dispatch(action)
    },[dispatch])

    //TodoLists
    //Delete:
    const removeTodoList = useCallback((todoListId: string) => {
        let action = RemoveTodoListAC(todoListId)
        dispatch(action)
    },[dispatch])
    //Create:
    const addTodoList = useCallback((title: string) => {
        let action = AddTodoListAC(title) // !!!
        dispatch(action)
    },[dispatch]);
    //Update:
    const changeTodoListFilter = useCallback((filter: FilterButtonType, todoListId: string) => {
        let action = ChangeTodoListFilterAC(filter, todoListId)
        dispatch(action)
    },[dispatch])
    const changeTodoListTitle = useCallback((title: string, todoListId: string) => {
        let action = ChangeTodoListTitleAC(title, todoListId)
        dispatch(action)
    },[dispatch])

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
                        changeIsDone={changeIsDone}
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
