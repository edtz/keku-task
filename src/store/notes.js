import { createAction, createReducer } from "redux-act";

export const addNote = createAction();
export const openNote = createAction();

export const notes = createReducer(
    {
        [addNote]: (state, payload) => {
            const newId = state.noteIds.length;
            return {
                ...state,
                noteIds: [...state.noteIds, newId],
                items: { ...state.items, [newId]: "New note" },
            };
        },
        [openNote]: (state, id) => {
            return {...state, selectedNote: id}
        }
    },
    { noteIds: [], items: {}, selectedNote: null }
);
