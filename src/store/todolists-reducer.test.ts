import {v1} from "uuid";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC, FilterButtonType,
    RemoveTodoListAC, TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";


let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = []

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn",filter:"All" ,addedDate: '', order: 0, entityStatus:"idle"},
        {id: todolistId2, title: "What to buy",filter:"All",addedDate: '', order: 0, entityStatus:"idle"}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState,
        RemoveTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {

    const newTodo = {
        id: 'string',
        title: 'string',
        addedDate: 'string',
        order: 0
    }

    const endState = todolistsReducer(startState,
        AddTodoListAC(newTodo))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodo.title);
});
test('correct filter of todolist should be changed', () => {

    let newFilter: FilterButtonType = "Completed";

    const endState = todolistsReducer(startState,
        ChangeTodoListFilterAC(newFilter, todolistId2));

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});
test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState,
        ChangeTodoListTitleAC(newTodolistTitle, todolistId2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});




