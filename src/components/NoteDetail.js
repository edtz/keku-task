import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Text = styled.textarea`
    color: black;
    ${props => props.disabled && "color: grey"}
`;

const NoteDetail = ({ text }) => {
    return text ? <Text>{text}</Text> : null;
};

const mapStateToProps = state => {
    return {
        text: state.notes.items[state.notes.selectedNote],
    };
};

export default connect(
    mapStateToProps,
    null
)(NoteDetail);
