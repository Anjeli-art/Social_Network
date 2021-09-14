import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {App} from "./App";
import {BrowserRouter} from "react-router-dom";
import {store} from "./redux/redux-store";
import {Provaider, StoreContext} from './StoreContext';


export let rerenderEntireThree = () => {
    console.log(store)

    ReactDOM.render(
        <BrowserRouter>
            <Provaider store={store}>
                <App />
                {/*store={store}*/}
            </Provaider>
        </BrowserRouter>, document.getElementById('root')
    )
};

store.subscribe(rerenderEntireThree)
rerenderEntireThree()


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
