import React, {useCallback, useEffect} from 'react';
import {
    ChangeTodoListFilterAC, changeTodolistTitleTC,
    createTodolistTC,
    deleteTodolistTC,
    FilterButtonType,
    getTodoTC,
    TodolistDomainType
} from "store/todolists-reducer";
import {AppDispatch, useAppSelector} from "store/store";
import {tasksSelector, todolistsSelector} from "store/selectors";
import {addTasksTC, changeTaskTitleAC, removeTaskTC, updateTaskTC} from "store/tasks-reducer";
import {ResponseTasksType, TaskStatuses} from "api/todolist-api";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist";
import {AddItemForm} from "components/AddItemForm";
import {Navigate} from "react-router-dom";

export type TasksStateType = {
    [todoListId: string]: ResponseTasksType[],
}

export const TodoListsList: React.FC = () => {
    //BLL
    const todoLists = useAppSelector<Array<TodolistDomainType>>(todolistsSelector)
    const tasks = useAppSelector<TasksStateType>(tasksSelector)
    const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn)
    const dispatch = AppDispatch()
    //BLL
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getTodoTC())
        }
    }, [])
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
                </Paper>
            </Grid>
        )
    })

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <Grid container style={{padding: '20px 0'}}>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={5}>
                {todoListComponents}
            </Grid>
        </>
    );
};

