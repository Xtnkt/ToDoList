import {AppActionsType, setErrorAC, setLoadingStatusAC} from "../store/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolist-api";

type ErrorUtilsDispatchType = Dispatch<AppActionsType>

export const handleServerNetworkError = (dispatch: ErrorUtilsDispatchType, error: { message: string }) => {
    dispatch(setErrorAC(error.message))
    dispatch(setLoadingStatusAC('failed'))
}
export const handleServerAppError = <T>(dispatch: ErrorUtilsDispatchType, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some error'))
    }
    dispatch(setLoadingStatusAC('failed'))
}