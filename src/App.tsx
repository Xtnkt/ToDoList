import React, {useState} from 'react';
import './App.css';
import {FilterButtonType, TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

function App() {

    const title = "What to learn 1";

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "ReactJS", isDone: false},
    ]);

    const addTask = (newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const removeTask = (taskId: string) => {
        let filteredTasks = tasks.filter(t => t.id !== taskId)
        setTasks(filteredTasks)
    };

    let [filter, setFilter] = useState<FilterButtonType>('All')

    let tasksForToDoList = tasks;

    if (filter === 'Active') {
        tasksForToDoList = tasks.filter(t => !t.isDone );
    }
    if (filter === 'Completed') {
        tasksForToDoList = tasks.filter(t => t.isDone );
    }

    function changeFilter(value: FilterButtonType) {
        setFilter(value)
    }


    return (
        <div className="App">
            <Todolist
                title={title}
                tasks={tasksForToDoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;


// let [filter, setFilter] = useState<TaskType[]>(task)
//
// const changeFilter = (filterValue: FilterButtonType) => {
//     if (filterValue === 'Completed') {
//         setFilter(task.filter(el => !el.isDone))
//     }
//     if (filterValue === 'Active') {
//         setFilter(task.filter(el => el.isDone))
//     }
//     if (filterValue === 'All') {
//         setFilter(task)
//     }
// }

