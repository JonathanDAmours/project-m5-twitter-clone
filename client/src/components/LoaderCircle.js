import React from "react";
import styled, { keyframes } from "styled-components";

const LoaderCircle = () => {
  return (
    <DivLoader>
      <Loader></Loader>
    </DivLoader>
  );
};

const DivLoader = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-width: 800px;
  height: 200px;
  margin: 100px auto 0 auto;
`;

const Spin = keyframes`
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }`;

const Loader = styled.div`
  margin: 0 auto;
  border: 1rem solid "hsl(258deg, 100%, 50%)";
  border-radius: 50%;
  border-top: 1rem solid #eee8fe;
  width: 4rem;
  height: 4rem;
  animation: ${Spin} 2s linear infinite;
`;

export default LoaderCircle;
