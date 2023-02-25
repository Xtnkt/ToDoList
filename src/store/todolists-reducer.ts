import {ResponseTodoListType, todolistAPI} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setErrorAC, SetErrorAT, setLoadingStatusAC, SetLoadingStatusAT} from "./app-reducer";

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

export const getTodoTC = () => (dispatch: Dispatch<ActionType>) => {
    dispatch(setLoadingStatusAC('loading'))
    todolistAPI.getTodoLists()
        .then((res) => {
            dispatch(SeTodoListsAC(res))
        })
        .finally(() => {
            dispatch(setLoadingStatusAC('succeeded'))
        })
}
export const createTodolistTC = (title: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setLoadingStatusAC('loading'))
    todolistAPI.createTodoList(title)
        .then((res) => {
            dispatch(AddTodoListAC(res.data.item))
        })
        .finally(() => {
            dispatch(setLoadingStatusAC('succeeded'))
        })
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setLoadingStatusAC('loading'))
    dispatch(SeEntityStatusAC(todolistId, 'loading'))
    todolistAPI.deleteTodoList(todolistId)
        .then((res) => {
            dispatch(RemoveTodoListAC(todolistId))
        })
        .catch((error) => {
            dispatch(setErrorAC(error.message))
            dispatch(setLoadingStatusAC('failed'))
            dispatch(SeEntityStatusAC(todolistId, 'failed'))
        })
        .finally(() => {
            dispatch(setLoadingStatusAC('succeeded'))
        })
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setLoadingStatusAC('loading'))
    todolistAPI.updateTodolistTitle(todolistId, title)
        .then((res) => {
            dispatch(ChangeTodoListTitleAC(title, todolistId))
        })
        .finally(() => {
            dispatch(setLoadingStatusAC('succeeded'))
        })
}
