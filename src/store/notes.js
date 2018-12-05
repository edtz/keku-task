import { createAction, createReducer } from "redux-act";

export const openNote = createAction();
export const updateNote = createAction("updateNote");
export const filterBy = createAction();
export const loadNotes = createAction();

export const notes = createReducer(
    {
        [openNote]: (state, id) => {
            return { ...state, selectedNote: id };
        },
        [updateNote]: (state, { id, value }) => {
            const key = id || state.noteIds.length + 1;
            const ids = id ? state.noteIds : [...state.noteIds, key];
            return { ...state, noteIds: ids, items: { ...state.items, [key]: value } };
        },
        [filterBy]: (state, payload) => {
            return { ...state, searchField: payload };
        },
        [loadNotes]: (state, notes) => {
            return { noteIds: Object.keys(notes).map(id => Number(id)), items: notes, selectedNote: null, searchField: null }
        }
    },
    { noteIds: [], items: {}, selectedNote: null, searchField: null }
);
