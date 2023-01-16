import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox} from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';
import {TaskStatuses} from "../api/todolist-api";

type CheckBoxType = {
    checked: boolean,
    callBack: (status:TaskStatuses) => void
}

export const CheckBox = memo((props: CheckBoxType) => {
    const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        props.callBack(event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
    },[props.callBack])
    return (
        <Checkbox
            checkedIcon={<DoneIcon />}
            color={"primary"}
            size={'small'}
            style={{padding: '0px'}}
            checked={props.checked}
            onChange={onChangeHandler}/>
    );
});

