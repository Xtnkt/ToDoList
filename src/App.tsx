import React, {useState} from 'react';
import './App.css';
import {FilterButtonType, TaskType, Todolist} from "./Todolist";

function App() {

    const title1 = "What to learn 1";

    const [tasks1, setTasks1] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true, newValue: true},
        {id: 2, title: "JS", isDone: true, newValue: true},
        {id: 3, title: "ReactJS", isDone: false, newValue: true},
        {id: 4, title: "ReactJS", isDone: false, newValue: true},
    ]);

    const [filteredTask, setFilteredTask] = useState<TaskType[]>(tasks1)

    const removeTask = (taskId: number) => {
        setFilteredTask(filteredTask.filter(f => f.id !== taskId))
        setTasks1(tasks1.filter(el => el.id !== taskId))
    };

    const changeFilter = (filterValue: FilterButtonType) => {
        if (filterValue === 'Completed') {
            setFilteredTask(tasks1.filter(el => !el.isDone))
        }
        if (filterValue === 'Active') {
            setFilteredTask(tasks1.filter(el => el.isDone))
        }
        if (filterValue === 'All') {
            setFilteredTask(tasks1)
        }
    }

    return (
        <div className="App">
            <Todolist
                title={title1}
                tasks={filteredTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}
export default App;

// const [durshlakValue, setDurshlakValue] = useState<FilterButtonType>('All')
//
// let durshlak = tasks1;
//
// if (durshlakValue === 'Active') {
//     durshlak = tasks1.filter(el => !el.isDone)
// }
// if (durshlakValue === 'Completed') {
//     durshlak = tasks1.filter(el => el.isDone)
// };
//
// const changeFilter = (nameButton: FilterButtonType) => {
//     setDurshlakValue(nameButton)
// }
//     return (
//         <div className="App">
//             <Todolist
//                 title={title1}
//                 tasks={tasks1}
//                 removeTask={removeTask}/>
//         </div>
//     );
// }