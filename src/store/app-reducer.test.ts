import {AppInitialStateType, appReducer, appActions} from "store/app-reducer";

let startState: AppInitialStateType;

beforeEach(() => {
    startState = {
        error: null,
        status: "idle",
    }
})
test('correct error message should be set', () => {
    const endState = appReducer(startState, appActions.setError({error: 'some error'}))
    expect(endState.error).toBe('some error');
})
test('correct status should be set', () => {
    const endState = appReducer(startState, appActions.setLoadingStatus({status: 'loading'}))
    expect(endState.status).toBe('loading');
})