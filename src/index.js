import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { reducer } from "./store";
import io from 'socket.io-client';

const localState = localStorage.getItem("state")
let store;
if (localState) store = createStore(reducer, JSON.parse(localState))
else store = createStore(reducer);
store.subscribe(() => localStorage.setItem("state", JSON.stringify(store.getState())));
const socket = io("http://localhost:9000");
socket.on("connect", () => console.log("connected"));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
