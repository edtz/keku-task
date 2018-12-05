import React from 'react';
import NoteList from "./components/NoteList";
import NoteDetail from "./components/NoteDetail";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2em 5% 0;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const App = () => <Layout>
  <NoteList />
  <NoteDetail />
</Layout>;

export default App;
