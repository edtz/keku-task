import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { reducer } from "./store";
import io from "socket.io-client";
import { loadNotes } from "./store/notes";
import { setOfflineStatus } from "./store/core";

const emit = msg => socket.send(msg);

// tbh better done via saga but I'm running out of time
const mirrorToSocket = store => next => action => {
    if (action.type.includes("updateNote") && !action.fromSocket) emit(action);
    return next(action);
};
const middleware = applyMiddleware(mirrorToSocket);

// init store from localstorage for offline + subscribe to store updates
let store;
const localState = localStorage.getItem("state");
localState
    ? (store = createStore(reducer, JSON.parse(localState), middleware))
    : (store = createStore(reducer, middleware));
store.subscribe(() =>
    localStorage.setItem("state", JSON.stringify(store.getState()))
);

const socket = io("/");
socket.on("connect", async () => {
    const resp = await fetch("/api/notes/getAll");
    const serverState = await resp.json();
    store.dispatch(loadNotes(serverState));
    store.dispatch(setOfflineStatus(false));
});
socket.on("message", action => {
    store.dispatch({...action, fromSocket: true});
});
socket.on("disconnect", async () => {
    store.dispatch(setOfflineStatus(true));
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

// makes app available offline
serviceWorker.register();
