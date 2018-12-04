import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { addNote, openNote, filterBy } from "../store/notes";
import { createSelector } from "reselect";

const SearchInput = styled.input`
    border: none;
`;

const AddButton = styled.button`
    border: none;
`;

const NoteList = ({ items, filteredItems, addNote, openNote, filterBy }) => (
    <React.Fragment>
        <SearchInput
            placeholder="Search"
            onChange={({ target: { value } }) => filterBy(value)}
        />
        <AddButton onClick={addNote}>+</AddButton>
        {filteredItems.map(id => (
            <div key={id} onClick={() => openNote(id)}>
                {items[id]}
            </div>
        ))}
    </React.Fragment>
);
const getFilteredItems = createSelector(
    state => state.notes.items,
    state => state.notes.noteIds,
    state => state.notes.searchField,
    (items, ids, searchField) => {
        const filterByString = searchString => input =>
            input.search(new RegExp(searchString), "i") > 0;
        const filterFn = filterByString(searchField);
        return searchField
            ? ids.filter(id => filterFn(items[id]))
            : ids;
    }
);

const mapStateToProps = state => {
    return {...state.notes, filteredItems: getFilteredItems(state)};
};

export default connect(
    mapStateToProps,
    { addNote, openNote, filterBy }
)(NoteList);
