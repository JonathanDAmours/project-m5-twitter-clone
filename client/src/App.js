import React from "react";
import AppNav from "./AppNav";
import styled from "styled-components";

const App = () => {
  return (
    <Main>
      <AppNav />
    </Main>
  );
};

const Main = styled.div`
  display: flex;
`;

export default App;
