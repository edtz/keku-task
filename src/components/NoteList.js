import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { addNote, openNote } from "../store/notes";

const SearchInput = styled.input`
    border: none;
`;

const AddButton = styled.button`
    border: none;
`;

const NoteList = ({ items, noteIds, addNote, openNote }) => (
    <React.Fragment>
        <SearchInput placeholder="Search" />
        <AddButton onClick={addNote}>+</AddButton>
        {noteIds.map(id => (
            <div key={id} onClick={() => openNote(id)}>{items[id]}</div>
        ))}
    </React.Fragment>
);

const mapStateToProps = state => {
    return state.notes;
};

export default connect(
    mapStateToProps,
    { addNote, openNote }
)(NoteList);
