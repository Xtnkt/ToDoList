import React, {useState} from 'react';
import './App.css';
import {FilterButtonType, TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type TodoListType = {
    id: string,
    title: string,
    filter: FilterButtonType,
}

type TasksStateType = {
    [todoListId: string]: TaskType[],
}

function App() {
    //BLL
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId_1, title: "What to learn", filter: 'All'},
        {id: todoListId_2, title: "What to buy", filter: 'All'},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "ReactJS", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Paper", isDone: false},
            {id: v1(), title: "Milk", isDone: false},
        ],
    })
    //BLL

    const removeTask = (taskId: string, todoListId: string) => {
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = copyTasks[todoListId].filter((t) => t.id !== taskId)
        // setTasks(copyTasks)
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter((t) => t.id !== taskId)})
    }

    const addTask = (newTitle: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: newTitle,
            isDone: false
        }

        setTasks({
            ...tasks,
            [todoListId]: [newTask, ...tasks[todoListId]]
        })
    }

    const changeIsDone = (newId: string, newIsDone: boolean, todoListId: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(t => t.id === newId
                ? {...t, isDone: newIsDone} : t)
        })
    }
    const changeTodoListFilter = (filter: FilterButtonType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }

    function getFilteredTasks(value: FilterButtonType, t: Array<TaskType>) {
        let tasksForToDoList = t;
        if (value === 'Active') {
            tasksForToDoList = t.filter(t => !t.isDone);
        }
        if (value === 'Completed') {
            tasksForToDoList = t.filter(t => t.isDone);
        }
        return tasksForToDoList
    }

    const todoListComponents = todoLists.map(tl => {

        const filteredTasks = getFilteredTasks(tl.filter, tasks[tl.id])

        return (
            <Todolist
                key={tl.id}
                todoListId={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={filteredTasks}

                addTask={addTask}
                removeTask={removeTask}
                changeIsDone={changeIsDone}
                removeTodoList={removeTodoList}
                changeTodoListFilter={changeTodoListFilter}
            />
        )
    })

    return (
        <div className="App">
            {todoListComponents}
        </div>
    );
}

export default App;
