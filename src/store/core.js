import { createAction, createReducer } from "redux-act";

export const setOfflineStatus = createAction();

export const core = createReducer(
    {
        [setOfflineStatus]: (state, status) => ({ offline: status }),
    },
    { offline: true }
);
