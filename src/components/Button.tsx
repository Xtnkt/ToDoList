import React, {useState} from 'react';
import styles from '../TodoList.module.css'
import {FilterButtonType} from "../Todolist";

type ButtonType = {
    name: string,
    callBack: () => void
    className?: string
}

export const Button = (props:ButtonType) => {

    const onClickHandler = () => {
        props.callBack()
    }


    return (
        <button className={props.className} onClick={onClickHandler}>{props.name}</button>
    );
};

