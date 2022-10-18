import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string,
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState(props.title);
    const onEditMode = () => {
        setIsEditMode(true)
    }
    const offEditMode = () => {
        setIsEditMode(false)
        props.changeTitle(title)
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    return (
        isEditMode
            ? <input
                value={title}
                autoFocus
                onBlur={offEditMode}
                onChange={onChangeHandler}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};

