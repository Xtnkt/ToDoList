// import React, {useReducer} from 'react';
// import './App.css';
// import {FilterButtonType, TaskType, Todolist} from "./Todolist";
// import {v1} from "uuid";
// import {AddItemForm} from "./components/AddItemForm";
// import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
// import {Menu} from "@material-ui/icons";
// import {
//     AddTodoListAC,
//     ChangeTodoListFilterAC,
//     ChangeTodoListTitleAC,
//     RemoveTodoListAC,
//     todolistsReducer
// } from "./store/todolists-reducer";
// import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";
//
// export type TodoListType = {
//     id: string,
//     title: string,
//     filter: FilterButtonType,
// }
//
// export type TasksStateType = {
//     [todoListId: string]: TaskType[],
// }
//
// function AppWithReducer() {
//     //BLL
//     const todoListId_1 = v1()
//     const todoListId_2 = v1()
//     const [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer,[
//         {id: todoListId_1, title: "What to learn", filter: 'All'},
//         {id: todoListId_2, title: "What to buy", filter: 'All'},
//     ])
//     const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
//         [todoListId_1]: [
//             {id: v1(), title: "HTML&CSS", isDone: true},
//             {id: v1(), title: "JS", isDone: true},
//             {id: v1(), title: "ReactJS", isDone: false},
//             {id: v1(), title: "Redux", isDone: false},
//         ],
//         [todoListId_2]: [
//             {id: v1(), title: "Water", isDone: true},
//             {id: v1(), title: "Beer", isDone: true},
//             {id: v1(), title: "Paper", isDone: false},
//             {id: v1(), title: "Milk", isDone: false},
//         ],
//     })
//     //BLL
//
//     //Tasks
//     //Delete:
//     const removeTask = (taskId: string, todoListId: string) => {
//         let action = removeTaskAC(taskId,todoListId)
//         dispatchToTasks(action)
//         // dispatchToTasks(removeTaskAC(taskId,todoListId))
//     }
//     //Create:
//     const addTask = (newTitle: string, todoListId: string) => {
//         let action = addTaskAC(newTitle,todoListId)
//         dispatchToTasks(action)
//     }
//     //Update:
//     const changeIsDone = (newId: string, newIsDone: boolean, todoListId: string) => {
//         let action = changeTaskStatusAC(newId,newIsDone,todoListId)
//         dispatchToTasks(action)
//     }
//     const changeTuskTitle = (taskId: string, title: string, todoListId: string) => {
//         let action = changeTaskTitleAC(taskId,title,todoListId)
//         dispatchToTasks(action)
//     }
//
//     //TodoLists
//     //Delete:
//     const removeTodoList = (todoListId: string) => {
//         let action = RemoveTodoListAC(todoListId)
//         dispatchToTodoLists(action)
//         dispatchToTasks(action)
//     }
//     //Create:
//     const addTodoList = (title: string) => {
//         let action = AddTodoListAC(title) // !!!
//         dispatchToTodoLists(action)
//         dispatchToTasks(action)
//     }
//     //Update:
//     const changeTodoListFilter = (filter: FilterButtonType, todoListId: string) => {
//         let action = ChangeTodoListFilterAC(filter,todoListId)
//         dispatchToTodoLists(action)
//     }
//     const changeTodoListTitle = (title: string, todoListId: string) => {
//        let action = ChangeTodoListTitleAC(title,todoListId)
//         dispatchToTodoLists(action)
//     }
//
//     //Update:
//     const getFilteredTasks = (value: FilterButtonType, t: Array<TaskType>) => {
//         let tasksForToDoList = t;
//         if (value === 'Active') {
//             tasksForToDoList = t.filter(t => !t.isDone);
//         }
//         if (value === 'Completed') {
//             tasksForToDoList = t.filter(t => t.isDone);
//         }
//         return tasksForToDoList
//     }
//
//     const todoListComponents = todoLists.map(tl => {
//         const filteredTasks = getFilteredTasks(tl.filter, tasks[tl.id])
//         return (
//             <Grid item  key={tl.id}>
//                 <Paper
//                     elevation={8}
//                     style={{width: '290px', padding: '20px'}}>
//                     <Todolist
//                         todoListId={tl.id}
//                         title={tl.title}
//                         filter={tl.filter}
//                         tasks={filteredTasks}
//
//                         addTask={addTask}
//                         removeTask={removeTask}
//                         changeIsDone={changeIsDone}
//                         changeTuskTitle={changeTuskTitle}
//                         removeTodoList={removeTodoList}
//                         changeTodoListFilter={changeTodoListFilter}
//                         changeTodoListTitle={changeTodoListTitle}
//                     />
//                 </Paper>
//             </Grid>
//         )
//     })
//
//     return (
//         <div className="App">
//             <AppBar position="static">
//                 <Toolbar style={{justifyContent: 'space-between'}}>
//                     <IconButton edge="start" color="inherit" aria-label="menu">
//                         <Menu/>
//                     </IconButton>
//                     <Typography variant="h6">
//                         TodoLists
//                     </Typography>
//                     <Button color="inherit" variant={"outlined"}>Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container>
//                 <Grid container style={{padding:'20px 0'}}>
//                     <AddItemForm addItem={addTodoList}/>
//                 </Grid>
//                 <Grid container spacing={5}>
//                     {todoListComponents}
//                 </Grid>
//             </Container>
//         </div>
//     );
// }
//
// export default AppWithReducer;
