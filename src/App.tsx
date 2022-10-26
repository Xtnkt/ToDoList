import React, {useState} from 'react';
import './App.css';
import {FilterButtonType, TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TodoListType = {
    id: string,
    title: string,
    filter: FilterButtonType,
}

type TasksStateType = {
    [todoListId: string]: TaskType[],
}

function App() {
    //BLL
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId_1, title: "What to learn", filter: 'All'},
        {id: todoListId_2, title: "What to buy", filter: 'All'},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "ReactJS", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Paper", isDone: false},
            {id: v1(), title: "Milk", isDone: false},
        ],
    })
    //BLL

    //Delete:
    const removeTask = (taskId: string, todoListId: string) => {
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = copyTasks[todoListId].filter((t) => t.id !== taskId)
        // setTasks(copyTasks)
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter((t) => t.id !== taskId)})
    }
    //Create:
    const addTask = (newTitle: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: newTitle,
            isDone: false
        }
        setTasks({
            ...tasks,
            [todoListId]: [newTask, ...tasks[todoListId]]
        })
    }
    //Update:
    const changeIsDone = (newId: string, newIsDone: boolean, todoListId: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(t => t.id === newId
                ? {...t, isDone: newIsDone} : t)
        })
    }
    const changeTuskTitle = (taskId: string, title: string, todoListId: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(t => t.id === taskId
                ? {...t, title: title}
                : t)
        })
    }
    //Update:
    const changeTodoListFilter = (filter: FilterButtonType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title: title} : tl))
    }
    //Delete:
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }
    //Create:
    const addTodoList = (title: string) => {
        const newTodoListId: string = v1();
        const newTodoList: TodoListType = {
            id: newTodoListId,
            title: title,
            filter: 'All',
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListId]: []})
    }
    //Update:
    const getFilteredTasks = (value: FilterButtonType, t: Array<TaskType>) => {
        let tasksForToDoList = t;
        if (value === 'Active') {
            tasksForToDoList = t.filter(t => !t.isDone);
        }
        if (value === 'Completed') {
            tasksForToDoList = t.filter(t => t.isDone);
        }
        return tasksForToDoList
    }

    const todoListComponents = todoLists.map(tl => {
        const filteredTasks = getFilteredTasks(tl.filter, tasks[tl.id])
        return (
            <Grid item  key={tl.id}>
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
                        changeIsDone={changeIsDone}
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
                <Grid container style={{padding:'20px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
