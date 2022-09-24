import React from "react";

export type TodolistProps = {
    title: string,
    tasks: TaskType[],
    removeTask: (taskId: number) => void,
    changeFilter: (filterValue: FilterButtonType) => void,
}

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
    newValue: boolean,
}

export type FilterButtonType = 'All' | 'Active' | 'Completed'

export const Todolist = (props: TodolistProps) => {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((objectsFromTasksArray, index) => {
                    return (
                        <li key={objectsFromTasksArray.id}>
                            <button onClick={() => {props.removeTask(objectsFromTasksArray.id)}}>x</button>
                            <input type="checkbox" checked={objectsFromTasksArray.isDone}/>
                            <span>{objectsFromTasksArray.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => {props.changeFilter('All')}}>All</button>
                <button onClick={() => {props.changeFilter('Active')}}>Active</button>
                <button onClick={() => {props.changeFilter('Completed')}}>Completed</button>
            </div>
        </div>
    )
}