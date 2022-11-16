import React, {useReducer} from 'react';
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

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>((state) => state.todolists)
    //const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks)
    const dispatch = useDispatch()
    //BLL

    //Tasks
    //Delete:
    const removeTask = (taskId: string, todoListId: string) => {
        let action = removeTaskAC(taskId, todoListId)
        dispatch(action)
        // dispatchToTasks(removeTaskAC(taskId,todoListId))
    }
    //Create:
    const addTask = (newTitle: string, todoListId: string) => {
        let action = addTaskAC(newTitle, todoListId)
        dispatch(action)
    }
    //Update:
    const changeIsDone = (newId: string, newIsDone: boolean, todoListId: string) => {
        let action = changeTaskStatusAC(newId, newIsDone, todoListId)
        dispatch(action)
    }
    const changeTuskTitle = (taskId: string, title: string, todoListId: string) => {
        let action = changeTaskTitleAC(taskId, title, todoListId)
        dispatch(action)
    }

    //TodoLists
    //Delete:
    const removeTodoList = (todoListId: string) => {
        let action = RemoveTodoListAC(todoListId)
        dispatch(action)
    }
    //Create:
    const addTodoList = (title: string) => {
        let action = AddTodoListAC(title) // !!!
        dispatch(action)
    }
    //Update:
    const changeTodoListFilter = (filter: FilterButtonType, todoListId: string) => {
        let action = ChangeTodoListFilterAC(filter, todoListId)
        dispatch(action)
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        let action = ChangeTodoListTitleAC(title, todoListId)
        dispatch(action)
    }

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
                    {/*<Todolist*/}
                    {/*    todoListId={tl.id}*/}
                    {/*    title={tl.title}*/}
                    {/*    filter={tl.filter}*/}
                    {/*    tasks={filteredTasks}*/}

                    {/*    addTask={addTask}*/}
                    {/*    removeTask={removeTask}*/}
                    {/*    changeIsDone={changeIsDone}*/}
                    {/*    changeTuskTitle={changeTuskTitle}*/}
                    {/*    removeTodoList={removeTodoList}*/}
                    {/*    changeTodoListFilter={changeTodoListFilter}*/}
                    {/*    changeTodoListTitle={changeTodoListTitle}*/}
                    {/*/>*/}
                    <TodolistRedux
                       todoList={tl}/>
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
