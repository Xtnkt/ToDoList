import React, {ChangeEvent} from 'react';

type CheckBoxType ={
    checked:boolean,
    callBack:(isDone:boolean) => void
}

export const CheckBox = (props: CheckBoxType) => {
    const onChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
        props.callBack(event.currentTarget.checked)
    }
    return (
            <input type="checkbox"
                   checked={props.checked}
                   onChange={onChangeHandler}/>
    );
};

