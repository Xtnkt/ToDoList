import {TasksStateType} from "../App";
import {TaskType} from "../Todolist";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";

type RemoveTaskAT = ReturnType<typeof removeTaskAC>
type AddTaskAT = ReturnType<typeof addTaskAC>
type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

type ActionType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT
    | ChangeTaskTitleAT | AddTodoListAT | RemoveTodoListAT

export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: "REMOVE-TASK", taskId, todolistId}) as const
export const addTaskAC = (title: string, todolistId: string) =>
    ({type: "ADD-TASK", title, todolistId}) as const
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) =>
    ({type: "CHANGE-TASK-STATUS", taskId, isDone, todolistId}) as const
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) =>
    ({type: "CHANGE-TASK-TITLE", taskId, title, todolistId}) as const


export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter((task) => task.id !== action.taskId)
            }
        }
        case "ADD-TASK" :
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
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
        default:
            return state
    }
}
