import React, {ReactNode, useState} from 'react';
import {Provider} from "react-redux";
import {AppRootStateType, store} from "./store";
import {combineReducers, createStore, legacy_createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {v1} from "uuid";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0,entityStatus:"idle"},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0,entityStatus:"idle"}
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(), title: 'HTML&CSS', description: '',
                status: 0, priority: 0, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''
            },
            {
                id: v1(), title: 'JS', description: '',
                status: 0, priority: 0, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''
            }
        ],
        ['todolistId2']: [
            {
                id: v1(), title: 'Milk', description: '',
                status: 0, priority: 0, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''
            },
            {
                id: v1(), title: 'React Book', description: '',
                status: 0, priority: 0, startDate: '', deadline: '',
                todoListId: '', order: 0, addedDate: ''
            }
        ]
    },
    app:{
        status: 'loading',
        error:null
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: () => ReactNode) => {
    return (
        <Provider store={storyBookStore}>
            {storyFn()}
        </Provider>
    );
};

