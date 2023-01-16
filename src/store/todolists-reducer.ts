import {v1} from "uuid";
import {ResponseTodoListType, todolistAPI} from "../api/todolist-api";
import {TodoListType} from "../App";
import {Dispatch} from "redux";

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST',
    todoListId: string
}
export type AddTodoListAT = {
    type: 'ADD-TODOLIST',
    title: string,
    todoListId: string
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

type ActionType = RemoveTodoListAT | AddTodoListAT
    | ChangeTodoListFilterAT | ChangeTodoListTitleAT | SeTodoListsAT

export type FilterButtonType = 'All' | 'Active' | 'Completed'
export type TodolistDomainType = ResponseTodoListType &{
    filter: FilterButtonType
}

export const RemoveTodoListAC = (id: string): RemoveTodoListAT =>
    ({type: "REMOVE-TODOLIST", todoListId: id})

export const ChangeTodoListFilterAC = (newFilter: FilterButtonType, id: string): ChangeTodoListFilterAT =>
    ({type: "CHANGE-TODOLIST-FILTER", filter: newFilter, todoListId: id})

export const AddTodoListAC = (newTodolistTitle: string): AddTodoListAT =>
    ({type: "ADD-TODOLIST", title: newTodolistTitle, todoListId: v1()})

export const ChangeTodoListTitleAC = (newTodolistTitle: string, newTodolistId: string): ChangeTodoListTitleAT =>
    ({type: "CHANGE-TODOLIST-TITLE", title: newTodolistTitle, todoListId: newTodolistId})

export const SeTodoListsAC = (todos: ResponseTodoListType[]) => {
    return {type: 'SET-TODOS', todos} as const
}

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (todolists = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.todoListId)
        case "ADD-TODOLIST" :
            // const newTodoListId: string = v1();
            const newTodoList: TodolistDomainType = {
                id: action.todoListId,
                title: action.title,
                filter: 'All',
                addedDate:'',
                order:0
            }
            return [newTodoList, ...todolists]
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
        case "SET-TODOS":
            return action.todos.map(el => ({...el, filter: 'All'}))
        default:
            return todolists
    }
}

export const getTodoTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodoLists()
        .then((res) => {
            dispatch(SeTodoListsAC(res))
        })
}
