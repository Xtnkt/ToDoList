export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type ActionsType = SetLoadingStatusAT | SetErrorAT
type InitialStateType = typeof initialState
export type SetLoadingStatusAT = ReturnType<typeof setLoadingStatusAC>
export type SetErrorAT = ReturnType<typeof setErrorAC>

export const setLoadingStatusAC = (status: RequestStatusType) =>
    ({type: 'APP/SET-STATUS', status} as const)
export const setErrorAC = (error: null | string) =>
    ({type: 'APP/SET-ERROR', error} as const)

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

