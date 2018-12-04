import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { updateNote } from "../store/notes";

const Text = styled.textarea`
    color: black;
    ${props => props.disabled && "color: grey"}
`;

const NoteDetail = ({ text, id, updateNote }) => {
    const changeHandler = ({ target: { value } }) => updateNote({id, value});
    return text ? <Text onChange={changeHandler} value={text} /> : null;
};

const mapStateToProps = state => {
    return {
        text: state.notes.items[state.notes.selectedNote],
        id: state.notes.selectedNote,
    };
};

export default connect(
    mapStateToProps,
    { updateNote }
)(NoteDetail);
