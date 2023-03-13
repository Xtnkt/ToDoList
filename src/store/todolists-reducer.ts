import {ResponseTodoListType, ResultCode, todolistAPI} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, SetErrorAT, setLoadingStatusAC, SetLoadingStatusAT} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import axios from "axios";

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST',
    todoListId: string
}
export type AddTodoListAT = {
    type: 'ADD-TODOLIST',
    todolist: ResponseTodoListType
}
type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER',
    filter: FilterButtonType,
    todoListId: string,
}
type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string,
    todoListId: string
}
export type SeTodoListsAT = ReturnType<typeof SeTodoListsAC>
export type SeEntityStatusAT = ReturnType<typeof SeEntityStatusAC>

type ActionType = RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListFilterAT
    | ChangeTodoListTitleAT
    | SeTodoListsAT
    | SetLoadingStatusAT
    | SeEntityStatusAT
    | SetErrorAT

export type FilterButtonType = 'All' | 'Active' | 'Completed'
export type TodolistDomainType = ResponseTodoListType & {
    filter: FilterButtonType,
    entityStatus: RequestStatusType
}

export const RemoveTodoListAC = (id: string): RemoveTodoListAT =>
    ({type: "REMOVE-TODOLIST", todoListId: id})
export const ChangeTodoListFilterAC = (newFilter: FilterButtonType, id: string): ChangeTodoListFilterAT =>
    ({type: "CHANGE-TODOLIST-FILTER", filter: newFilter, todoListId: id})
export const AddTodoListAC = (todolist: ResponseTodoListType): AddTodoListAT =>
    ({type: "ADD-TODOLIST", todolist})
export const ChangeTodoListTitleAC = (newTodolistTitle: string, newTodolistId: string): ChangeTodoListTitleAT =>
    ({type: "CHANGE-TODOLIST-TITLE", title: newTodolistTitle, todoListId: newTodolistId})
export const SeTodoListsAC = (todos: ResponseTodoListType[]) => {
    return {type: 'SET-TODOS', todos} as const
}
export const SeEntityStatusAC = (todoListId: string, entityStatus: RequestStatusType) => {
    return {type: 'SET-ENTITY-STATUS', todoListId, entityStatus} as const
}

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (todolists = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.todoListId)
        case "ADD-TODOLIST" :
            return [{...action.todolist, filter: 'All', entityStatus: "idle"}, ...todolists]
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
        case "SET-TODOS":
            return action.todos.map(el => ({...el, filter: 'All', entityStatus: "idle"}))
        case "SET-ENTITY-STATUS":
            return todolists.map(tl => tl.id === action.todoListId ? {...tl, entityStatus: action.entityStatus} : tl)
        default:
            return todolists
    }
}

export const getTodoTC = () => async (dispatch: Dispatch<ActionType>) => {
    dispatch(setLoadingStatusAC('loading'))
    try {
        const result = await todolistAPI.getTodoLists()
        dispatch(SeTodoListsAC(result))
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(dispatch, error)
        }
    } finally {
        dispatch(setLoadingStatusAC('succeeded'))
    }
}
export const createTodolistTC = (title: string) => async (dispatch: Dispatch<ActionType>) => {
    dispatch(setLoadingStatusAC('loading'))
    try {
        const result = await todolistAPI.createTodoList(title)
        if (result.resultCode === ResultCode.SUCCEEDED) {
            dispatch(AddTodoListAC(result.data.item))
        } else {
            handleServerAppError(dispatch, result)
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(dispatch, error)
        }
    } finally {
        dispatch(setLoadingStatusAC('succeeded'))
    }
}
export const deleteTodolistTC = (todolistId: string) => async (dispatch: Dispatch<ActionType>) => {
    dispatch(setLoadingStatusAC('loading'))
    dispatch(SeEntityStatusAC(todolistId, 'loading'))

    try {
        const result = await todolistAPI.deleteTodoList(todolistId)
        if (result.resultCode === ResultCode.SUCCEEDED) {
            dispatch(RemoveTodoListAC(todolistId))
        } else {
            handleServerAppError(dispatch, result)
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(dispatch, error)
            dispatch(SeEntityStatusAC(todolistId, 'failed'))
        }
    } finally {
        dispatch(setLoadingStatusAC('succeeded'))
    }
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => async (dispatch: Dispatch<ActionType>) => {
    dispatch(setLoadingStatusAC('loading'))
    dispatch(SeEntityStatusAC(todolistId, 'loading'))
    try {
        const result = await todolistAPI.updateTodolistTitle(todolistId, title)
        if (result.resultCode === ResultCode.SUCCEEDED) {
            dispatch(ChangeTodoListTitleAC(title, todolistId))
            dispatch(SeEntityStatusAC(todolistId, 'idle'))
        } else {
            handleServerAppError(dispatch, result)
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(dispatch, error)
            dispatch(SeEntityStatusAC(todolistId, 'failed'))
        }
    } finally {
        dispatch(setLoadingStatusAC('succeeded'))
    }
}
