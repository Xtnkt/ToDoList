import {AddTodoListAT, RemoveTodoListAT, SeEntityStatusAC, SeEntityStatusAT, SeTodoListsAT} from "./todolists-reducer";
import {ResponseTasksType, ResultCode, TaskStatuses, todolistAPI, UpdateTaskType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {SetErrorAT, setLoadingStatusAC, SetLoadingStatusAT} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import axios from "axios";
import {TasksStateType} from "../features/Todolist/TodolistsList";

type RemoveTaskAT = ReturnType<typeof removeTaskAC>
type AddTaskAT = ReturnType<typeof addTaskAC>
type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
type SetTasksAT = ReturnType<typeof setTasksAC>

type ActionsType = RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodoListAT
    | RemoveTodoListAT
    | SeTodoListsAT
    | SetTasksAT
    | SetLoadingStatusAT
    | SetErrorAT
    | SeEntityStatusAT

export const removeTaskAC = (todolistId: string, taskId: string) =>
    ({type: "REMOVE-TASK", todolistId, taskId}) as const
export const addTaskAC = (task: ResponseTasksType) =>
    ({type: "ADD-TASK", task}) as const
export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) =>
    ({type: "CHANGE-TASK-STATUS", taskId, status, todolistId}) as const
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) =>
    ({type: "CHANGE-TASK-TITLE", taskId, title, todolistId}) as const
export const setTasksAC = (tasks: ResponseTasksType[], todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId}) as const

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter((task) => task.id !== action.taskId)
            }
        }
        case "ADD-TASK" : {
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId
                    ? {...task, status: action.status} : task)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId
                    ? {...task, title: action.title} : task)
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.todoListId]
            return copyState
        }
        case "SET-TODOS":
            const copyState = {...state}
            action.todos.forEach((tl) => {
                copyState[tl.id] = []
            })
            return copyState
        case "SET-TASKS": {
            return {
                ...state,
                [action.todolistId]: action.tasks.map(el => ({...el, isDone: false}))
            }
        }
        default:
            return state
    }
}

export const getTasksTC = (todoId: string) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setLoadingStatusAC('loading'))
    try {
        const result = await todolistAPI.getTasks(todoId)
        dispatch(setTasksAC(result.items, todoId))
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(dispatch, error)
        }
    } finally {
        dispatch(setLoadingStatusAC('succeeded'))
    }
}
export const removeTaskTC = (todoId: string, taskId: string) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setLoadingStatusAC('loading'))
    dispatch(SeEntityStatusAC(todoId, 'loading'))
    try {
        const result = await todolistAPI.deleteTask(todoId, taskId)
        if (result.resultCode === ResultCode.SUCCEEDED) {
            dispatch(removeTaskAC(todoId, taskId))
            dispatch(SeEntityStatusAC(todoId, 'idle'))
        } else {
            handleServerAppError(dispatch, result)
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(dispatch, error)
            dispatch(SeEntityStatusAC(todoId, 'failed'))
        }
    } finally {
        dispatch(setLoadingStatusAC('succeeded'))
    }
}
export const addTasksTC = (todoId: string, title: string) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setLoadingStatusAC('loading'))
    dispatch(SeEntityStatusAC(todoId, 'loading'))
    try {
        const result = await todolistAPI.createTask(todoId, title)
        if (result.data.resultCode === ResultCode.SUCCEEDED) {
            const item = result.data.data.item
            dispatch(addTaskAC(item))
            dispatch(SeEntityStatusAC(todoId, 'idle'))
        } else {
            handleServerAppError(dispatch, result.data)
            dispatch(SeEntityStatusAC(todoId, 'idle'))
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(dispatch, error)
            dispatch(SeEntityStatusAC(todoId, 'failed'))
        }
    } finally {
        dispatch(setLoadingStatusAC('succeeded'))
    }
}
export const updateTaskTC = (todoId: string, taskId: string, status: TaskStatuses) =>
    async (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {

        const tasks = getState().tasks
        const task = tasks[todoId].find((t) => t.id === taskId)

        if (task) {
            const model: UpdateTaskType = {
                title: task.title,
                deadline: task.deadline,
                startDate: task.startDate,
                description: task.description,
                priority: task.priority,
                status,
                completed: false
            }

            dispatch(setLoadingStatusAC('loading'))
            dispatch(SeEntityStatusAC(todoId, 'loading'))

            try {
                const result = await todolistAPI.updateTask(todoId, taskId, model)
                if (result.resultCode === ResultCode.SUCCEEDED) {
                    dispatch(changeTaskStatusAC(todoId, taskId, status))
                    dispatch(SeEntityStatusAC(todoId, 'idle'))
                } else {
                    handleServerAppError(dispatch, result)
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    handleServerNetworkError(dispatch, error)
                    dispatch(SeEntityStatusAC(todoId, 'failed'))
                }
            } finally {
                dispatch(setLoadingStatusAC('succeeded'))
            }
        }
    }
