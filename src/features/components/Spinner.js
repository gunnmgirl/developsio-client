import React from "react";
import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid ${(props) => props.theme.primary};
  border-right: 2px solid ${(props) => props.theme.primary};
  border-bottom: 2px solid ${(props) => props.theme.primary};
  border-left: 4px solid ${(props) => props.theme.onHover};
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  color: ${(props) => props.theme.onPrimary};
  justify-content: center;
  align-items: center;
`;

function Spinner() {
  return (
    <Container>
      <StyledSpinner />
    </Container>
  );
}

export default Spinner;
