import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox} from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';

type CheckBoxType = {
    checked: boolean,
    callBack: (isDone: boolean) => void
}

export const CheckBox = memo((props: CheckBoxType) => {
    const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        props.callBack(event.currentTarget.checked)
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

