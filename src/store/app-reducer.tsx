export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type ActionsType = any
type InitialStateType = typeof initialState

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        default:
            return state
    }
}
