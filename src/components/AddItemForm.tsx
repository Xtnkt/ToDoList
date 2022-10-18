import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from "../TodoList.module.css";
import {Button} from "./Button";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<null | string>(null)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(null)
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }
    const addItemHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            props.addItem(trimmedTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <div>
            <input value={title}
                   className={error ? styles.error : ''}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}/>
            <Button name={'+'}
                    callBack={() => addItemHandler()}
            />
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
};

