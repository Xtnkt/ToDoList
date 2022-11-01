import {TodoListType} from "../App";
import {FilterButtonType} from "../Todolist";
import {v1} from "uuid";

type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST',
    todoListId: string
}
type AddTodoListAT = {
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

type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListFilterAT | ChangeTodoListTitleAT

export const RemoveTodoListAC = (id: string): RemoveTodoListAT =>
    ({type: "REMOVE-TODOLIST", todoListId: id})

export const ChangeTodoListFilterAC = (newFilter: FilterButtonType, id: string): ChangeTodoListFilterAT =>
    ({type: "CHANGE-TODOLIST-FILTER", filter: newFilter, todoListId: id})

export const AddTodoListAC = (newTodolistTitle: string): AddTodoListAT =>
    ({type: "ADD-TODOLIST", title: newTodolistTitle, todoListId: v1()})

export const ChangeTodoListTitleAC = (newTodolistTitle: string, newTodolistId: string): ChangeTodoListTitleAT =>
    ({type: "CHANGE-TODOLIST-TITLE", title: newTodolistTitle, todoListId: newTodolistId})

export const todolistsReducer = (todolists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.todoListId)
        case "ADD-TODOLIST" :
            // const newTodoListId: string = v1();
            const newTodoList: TodoListType = {
                id: action.todoListId,
                title: action.title,
                filter: 'All',
            }
            return [...todolists, newTodoList]
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
        default:
            return todolists
    }
}
