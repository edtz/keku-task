import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { updateNote } from "../store/notes";

const Text = styled.textarea`
    color: black;
    flex: 6;
    border: none;
    font-size: 18px;
    margin: 12px 0 0 20px;
    ${props =>
        props.disabled &&
        `
        user-select: none;
        color: grey;
    `}
`;

const NoteDetail = ({ text, id, updateNote, offline }) => {
    const changeHandler = ({ target: { value } }) => updateNote({ id, value });
    return (
        <Text disabled={offline || !id} onChange={changeHandler} value={text} />
    );
};

const mapStateToProps = state => {
    return {
        text: state.notes.items[state.notes.selectedNote],
        id: state.notes.selectedNote,
        offline: state.core.offline,
    };
};

export default connect(
    mapStateToProps,
    { updateNote }
)(NoteDetail);
