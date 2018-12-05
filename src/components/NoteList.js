import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { updateNote, openNote, filterBy } from "../store/notes";
import { createSelector } from "reselect";
import { ellipsis } from "polished";

const SearchInput = styled.input`
    border: none;
`;

const AddButton = styled.button`
    border: none;
`;
const Sidebar = styled.div`
    display: flex;
    flex-direction: column;
    flex: 2;
    max-width: 240px;
    min-height: 20vh;
    padding-right: 20px;
    border-right: 1px solid grey;
`;
const Controls = styled.div`
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 16px 0;
`;
const ListItem = styled.div`
    margin-top: 8px;
    user-select: none;
    cursor: pointer;
    ${ellipsis("180px")}
    ${props => props.selected && "font-weight: bold;"}
`;

const NoteList = ({
    items,
    filteredItems,
    updateNote,
    openNote,
    filterBy,
    selectedNote,
}) => (
    <Sidebar>
        <Controls>
            <SearchInput
                placeholder="Search"
                onChange={({ target: { value } }) => filterBy(value)}
            />
            <AddButton onClick={() => updateNote({ value: "New note" })}>
                +
            </AddButton>
        </Controls>
        {filteredItems.map(id => (
            <ListItem
                key={id}
                selected={id === selectedNote}
                onClick={() => openNote(id)}
            >
                {items[id] || "[empty]"}
            </ListItem>
        ))}
    </Sidebar>
);
const getFilteredItems = createSelector(
    state => state.notes.items,
    state => state.notes.noteIds,
    state => state.notes.searchField,
    (items, ids, searchField) => {
        const filterByString = searchString => input =>
            input.search(new RegExp(searchString), "i") > 0;
        const filterFn = filterByString(searchField);
        return searchField ? ids.filter(id => filterFn(items[id])) : ids;
    }
);

const mapStateToProps = state => {
    return { ...state.notes, filteredItems: getFilteredItems(state) };
};

export default connect(
    mapStateToProps,
    { updateNote, openNote, filterBy }
)(NoteList);
