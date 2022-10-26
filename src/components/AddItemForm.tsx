import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from "../TodoList.module.css";
import {IconButton, TextField} from "@material-ui/core";
import {AddBoxRounded} from "@material-ui/icons";


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
            <TextField variant="outlined"
                       size={'small'}
                       label={'New task'}
                       value={title}
                       onKeyDown={onKeyPressHandler}
                       onChange={onChangeHandler}
                       error={!!error}
            />
            <IconButton color={"primary"} size={'medium'} onClick={() => addItemHandler()}>
                <AddBoxRounded/>
            </IconButton>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
};

