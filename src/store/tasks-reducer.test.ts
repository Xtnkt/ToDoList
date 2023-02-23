import {TasksStateType} from "../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {AddTodoListAC, RemoveTodoListAC} from "./todolists-reducer";
import {TaskStatuses} from "../api/todolist-api";

let startState: TasksStateType

beforeEach(()=> {
     startState = {
        'todolistId1': [
            {id: '1', title: 'CSS', description: '',
                status: TaskStatuses.New, priority: 0, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''},
            {id: '2', title: 'JS', description: '',
                status: TaskStatuses.Completed, priority: 0, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''},
            {id: '3', title: 'React',description: '',
                status: TaskStatuses.New, priority: 0, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', description: '',
                status: TaskStatuses.New, priority: 0, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''},
            {id: '2', title: 'milk', description: '',
                status:  TaskStatuses.Completed, priority: 0, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''},
            {id: '3', title: 'tea',description: '',
                status:  TaskStatuses.New, priority: 0, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''}
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('todolistId2', '2')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', description: '',
                status: TaskStatuses.New, priority: 0, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''},
            {id: '2', title: 'JS', description: '',
                status: TaskStatuses.Completed, priority: 0, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''},
            {id: '3', title: 'React',description: '',
                status: TaskStatuses.New, priority: 0, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', description: '',
                status: TaskStatuses.New, priority: 0, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''},
            {id: '3', title: 'tea',description: '',
                status:  TaskStatuses.New, priority: 0, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''}
        ]
    })
})
test('correct task should be added to correct array', () => {

    const action = addTaskAC({id: '4', title: 'juce',description: '',
        status: TaskStatuses.New, priority: 0, startDate: '', deadline: '',
        todoListId: '', order: 0, addedDate: ''})

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})
test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC('todolistId2', '2', TaskStatuses.New)

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
})
test('title of specified task should be changed', () => {

    const action = changeTaskTitleAC('1', 'NativeTS', 'todolistId1')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][0].title).toBe('NativeTS')
    expect(endState['todolistId2'][0].title).toBe('bread')
})
test('new array should be added when new todolist is added', () => {

    const newTodo = {
        id: 'string',
        title: 'string',
        addedDate: 'string',
        order: 0
    }
    const action = AddTodoListAC(newTodo)

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test('property with todolistId should be deleted', () => {

    const action = RemoveTodoListAC('todolistId2')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})