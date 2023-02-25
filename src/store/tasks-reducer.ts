import {AddTodoListAT, RemoveTodoListAT, SeTodoListsAT} from "./todolists-reducer";
import {ResponseTasksType, ResultCode, TaskStatuses, todolistAPI, UpdateTaskType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {TasksStateType} from "../AppWithRedux";
import {AppRootStateType} from "./store";
import {setErrorAC, SetErrorAT, setLoadingStatusAC, SetLoadingStatusAT} from "./app-reducer";

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

export const removeTaskTC = (todoId: string, taskId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setLoadingStatusAC('loading'))
    todolistAPI.deleteTask(todoId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(todoId, taskId))
        })
        .finally(() => {
            dispatch(setLoadingStatusAC('succeeded'))
        })
}
export const getTasksTC = (todoId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setLoadingStatusAC('loading'))
    todolistAPI.getTasks(todoId)
        .then((res) => {
            dispatch(setTasksAC(res.items, todoId))
        })
        .finally(() => {
            dispatch(setLoadingStatusAC('succeeded'))
        })
}
export const addTasksTC = (todoId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setLoadingStatusAC('loading'))
    todolistAPI.createTask(todoId, title)
        .then((res) => {
            if (res.data.resultCode === ResultCode.SUCCEEDED) {
                const item = res.data.data.item
                dispatch(addTaskAC(item))
            } else {
                if (res.data.messages.length) {
                    dispatch(setErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setErrorAC('Some error'))
                }
                dispatch(setLoadingStatusAC('failed'))
            }
        })
        .finally(() => {
            dispatch(setLoadingStatusAC('succeeded'))
        })
}
export const updateTaskTC = (todoId: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
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
            todolistAPI.updateTask(todoId, taskId, model)
                .then((res) => {
                    dispatch(changeTaskStatusAC(todoId, taskId, status))
                })
                .finally(() => {
                    dispatch(setLoadingStatusAC('succeeded'))
                })
        }
    }
