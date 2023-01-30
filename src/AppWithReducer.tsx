import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC, FilterButtonType,
    RemoveTodoListAC,
    todolistsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";
import {ResponseTasksType, TaskStatuses} from "./api/todolist-api";

export type TodoListType = {
    id: string,
    title: string,
    filter: FilterButtonType,
}

export type TasksStateType = {
    [todoListId: string]: ResponseTasksType[],
}

function AppWithReducer() {
    //BLL
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer, [
        {id: todoListId_1, title: "What to learn", filter: 'All', addedDate: '', order: 0},
        {id: todoListId_2, title: "What to buy", filter: 'All', addedDate: '', order: 0},
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListId_1]: [
            {
                id: v1(), title: "HTML&CSS", description: '',
                status: 0, priority: 0, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''
            },
            {
                id: v1(), title: "JS", description: '',
                status: 0, priority: 0, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''
            },
            {
                id: v1(), title: "ReactJS", description: '',
                status: 0, priority: 0, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''
            },
            {
                id: v1(), title: "Redux", description: '',
                status: 0, priority: 0, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''
            },
        ],
        [todoListId_2]: [
            {
                id: v1(), title: "Water", description: '',
                status: 0, priority: 0, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''
            },
            {
                id: v1(), title: "Beer", description: '',
                status: 0, priority: 0, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''
            },
            {
                id: v1(), title: "Paper", description: '',
                status: 0, priority: 0, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''
            },
            {
                id: v1(), title: "Milk", description: '',
                status: 0, priority: 0, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''
            },
        ],
    })
    //BLL

    //Tasks
    //Delete:
    const removeTask = (taskId: string, todoListId: string) => {
        let action = removeTaskAC(taskId, todoListId)
        dispatchToTasks(action)
        // dispatchToTasks(removeTaskAC(taskId,todoListId))
    }
    //Create:
    const addTask = (todoListId: any, ) => {
        let action = addTaskAC(todoListId)
        dispatchToTasks(action)
    }
    //Update:
    const changeIsDone = (todolistId: any, status: any,taskId: any ) => {
        let action = changeTaskStatusAC(taskId, status, todolistId)
        dispatchToTasks(action)
    }
    const changeTuskTitle = (taskId: string, title: string, todoListId: string) => {
        let action = changeTaskTitleAC(taskId, title, todoListId)
        dispatchToTasks(action)
    }

    //TodoLists
    //Delete:
    const removeTodoList = (todoListId: string) => {
        let action = RemoveTodoListAC(todoListId)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }
    //Create:
    const addTodoList = (title: string) => {
        let action = AddTodoListAC(title) // !!!
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }
    //Update:
    const changeTodoListFilter = (filter: FilterButtonType, todoListId: string) => {
        let action = ChangeTodoListFilterAC(filter, todoListId)
        dispatchToTodoLists(action)
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        let action = ChangeTodoListTitleAC(title, todoListId)
        dispatchToTodoLists(action)
    }

    //Update:
    const getFilteredTasks = (value: FilterButtonType, t: Array<ResponseTasksType>) => {
        let tasksForToDoList = t;
        if (value === 'Active') {
            tasksForToDoList = t.filter(t => t.status === TaskStatuses.New);
        }
        if (value === 'Completed') {
            tasksForToDoList = t.filter(t => t.status === TaskStatuses.Completed);
        }
        return tasksForToDoList
    }

    const todoListComponents = todoLists.map(tl => {
        const filteredTasks = getFilteredTasks(tl.filter, tasks[tl.id])
        return (
            <Grid item key={tl.id}>
                <Paper
                    elevation={8}
                    style={{width: '290px', padding: '20px'}}>
                    <Todolist
                        todoListId={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={filteredTasks}

                        addTask={addTask}
                        removeTask={removeTask}
                        changeTaskStatus={changeIsDone}
                        changeTuskTitle={changeTuskTitle}
                        removeTodoList={removeTodoList}
                        changeTodoListFilter={changeTodoListFilter}
                        changeTodoListTitle={changeTodoListTitle}
                    />
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

export default AppWithReducer;
