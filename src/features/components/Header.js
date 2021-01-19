import React from "react";
import { Users, Book, Monitor } from "react-feather";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import LogoIcon from "../../icons/LogoIcon";

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 6rem;
  height: 4rem;
  background: ${(props) => props.theme.quaternary};
  align-items: center;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${(props) => props.theme.onPrimary};
  height: 100%;
  padding: 0 1rem;
  &.active {
    color: ${(props) =>
      props.noactivestyle ? props.theme.onPrimary : props.theme.onActive};
    background-color: ${(props) => props.theme.primary};
  }
`;

const StyledSpan = styled.span`
  font-size: 1.4rem;
  margin: 0 0.6rem;
`;

const Header = () => {
  return (
    <MainContainer>
      <LogoIcon />
      <StyledNavLink to="/people">
        <Users />
        <StyledSpan>People</StyledSpan>
      </StyledNavLink>
      <StyledNavLink to="/notes">
        <Book />
        <StyledSpan>Notes</StyledSpan>
      </StyledNavLink>
      <StyledNavLink to="/positions">
        <Monitor />
        <StyledSpan>Positions</StyledSpan>
      </StyledNavLink>
    </MainContainer>
  );
};

export default Header;
