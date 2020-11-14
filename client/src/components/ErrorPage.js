import React from "react";
import styled from "styled-components";
import { MdErrorOutline } from "react-icons/md";

const ErrorPage = () => {
  return (
    <Wrapper>
      <StyledMdErrorOutline />
      <Error>An unknown error has occured.</Error>
      <Inst>
        Please try refreshing the page or contact our support team if the
        problem persists.
      </Inst>
    </Wrapper>
  );
};

const Inst = styled.p`
  font-size: 18px;
  text-align: center;
  font-family: sans-serif;
`;

const Error = styled.h1`
  font-size: 24px;
  font-family: sans-serif;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 800px;
  height: 200px;
  margin: 100px auto 0 auto;
`;

const StyledMdErrorOutline = styled(MdErrorOutline)`
  color: hsl(258deg, 100%, 50%);
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
`;

export default ErrorPage;
