import {Dispatch} from 'redux'
import {authAPI, ResultCode} from "../api/todolist-api";
import {FormDataType} from "../features/Login/Login";
import {AppActionsType, setLoadingStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState = {
    isLoggedIn: false,
    isInitialised: false,
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'login/SET-IS-INITIALISED':
            return {...state, isInitialised: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const setIsInitialisedAC = (value: boolean) =>
    ({type: 'login/SET-IS-INITIALISED', value} as const)

// thunks
export const loginTC = (data: FormDataType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setLoadingStatusAC('loading'))
    try {
        const result = await authAPI.login(data)
        if (result.resultCode === ResultCode.SUCCEEDED) {
            dispatch(setIsLoggedInAC(true))
        } else {
            handleServerAppError(dispatch, result)
        }
    } catch (error: any) {
        handleServerNetworkError(dispatch, error)
    } finally {
        dispatch(setLoadingStatusAC('succeeded'))
    }
}
export const logOutTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setLoadingStatusAC('loading'))
    try {
        const result = await authAPI.logOut()
        if (result.resultCode === ResultCode.SUCCEEDED) {
            dispatch(setIsLoggedInAC(false))
        } else {
            handleServerAppError(dispatch, result)
        }
    } catch (error: any) {
        handleServerNetworkError(dispatch, error)
    } finally {
        dispatch(setLoadingStatusAC('succeeded'))
    }
}
export const meTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setLoadingStatusAC('loading'))
    try {
        const result = await authAPI.me()
        if (result.resultCode === ResultCode.SUCCEEDED) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setIsInitialisedAC(true))
        } else {
            dispatch(setIsInitialisedAC(true))
            handleServerAppError(dispatch, result)
        }
    } catch (error: any) {
        handleServerNetworkError(dispatch, error)
    } finally {
        dispatch(setLoadingStatusAC('succeeded'))
    }

}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setIsInitialisedAC>
    | AppActionsType
