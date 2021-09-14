import React from 'react';
import {Store} from 'redux';
import {ActionValuesType, RootStateType} from './redux/redux-store';


type ProviderType = {
    store: Store<RootStateType, ActionValuesType>
    children: React.ReactNode
}

export const StoreContext = React.createContext({} as Store<RootStateType, ActionValuesType>)

export const Provaider = (props:ProviderType) => {

    return <StoreContext.Provider value={props.store}>
        {props.children}
    </StoreContext.Provider>
}