import {TasksStateType} from "../App";
import {TaskType} from "../Todolist";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT, SeTodoListsAC, SeTodoListsAT} from "./todolists-reducer";
import {ResponseTasksType, todolistAPI} from "../api/todolist-api";
import {Dispatch} from "redux";

type RemoveTaskAT = ReturnType<typeof removeTaskAC>
type AddTaskAT = ReturnType<typeof addTaskAC>
type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
type SetTasksAT = ReturnType<typeof setTasksAC>

type ActionType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT
    | ChangeTaskTitleAT | AddTodoListAT | RemoveTodoListAT | SeTodoListsAT | SetTasksAT

export const removeTaskAC = (todolistId: string, taskId: string) =>
    ({type: "REMOVE-TASK", todolistId, taskId}) as const
export const addTaskAC = (task:ResponseTasksType) =>
    ({type: "ADD-TASK",task}) as const
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) =>
    ({type: "CHANGE-TASK-STATUS", taskId, isDone, todolistId}) as const
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) =>
    ({type: "CHANGE-TASK-TITLE", taskId, title, todolistId}) as const
export const setTasksAC = (tasks: ResponseTasksType[], todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId}) as const


const initialState: TasksStateType = {}


export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter((task) => task.id !== action.taskId)
            }
        }
        case "ADD-TASK" :{
            return {
                ...state,
                [action.task.todoListId]: [...state[action.task.todoListId], action.task]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId
                    ? {...task, isDone: action.isDone} : task)
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
                [action.todoListId]: []
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

export const removeTaskTC = (todoId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todoId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(todoId, taskId))
        })
}

export const getTasksTC = (todoId: string) => (dispatch: Dispatch) => {
    todolistAPI.getTasks(todoId)
        .then((res) => {
            dispatch(setTasksAC(res.items, todoId))
        })
}
export const addTasksTC = (todoId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTask(todoId, title)
        .then((res) => {
            const item = res.data
            dispatch(addTaskAC(item))
        })
}
