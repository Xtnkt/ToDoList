import React from "react";

type TodolistProps = {
    title: string,
    xz?: number,
    tasks: Array<TasksType>,
}

type TasksType = {
    id: number,
    title: string,
    isDone: boolean,
    newValue:boolean,
}


export const Todolist = (props: TodolistProps) => {

    let arrOfTasks = props.tasks.map( (objectsFromTasksArray, index)=> {
            return (
                <li><input type="checkbox" key={objectsFromTasksArray.id}
                           checked={objectsFromTasksArray.isDone}/>
                    <span>{objectsFromTasksArray.title}</span>
                </li>
            );
        });

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {arrOfTasks}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}