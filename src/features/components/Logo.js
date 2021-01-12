import React from "react";
import styled from "styled-components";

import LogoIcon from "../../icons/LogoIcon";

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.onPrimary};
  margin-bottom: 2rem;
`;

const StyledSpan = styled.span`
  font-size: 2.4rem;
  margin: 0 0.4rem;
`;

const Logo = () => {
  return (
    <LogoWrapper>
      <LogoIcon />
      <StyledSpan>Developsio</StyledSpan>
    </LogoWrapper>
  );
};

export default Logo;
