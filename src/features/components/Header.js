import React from "react";
import { Users, Book, Monitor, ChevronDown } from "react-feather";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Popover } from "@malcodeman/react-popover";

import { logout } from "../auth/actions/authActions";
import LogoIcon from "../../icons/LogoIcon";

const AdminImage = styled.div`
  height: 3rem;
  width: 3rem;
  background: ${(props) =>
    props.imageUrl
      ? `url(${props.imageUrl})`
      : `url(https://res.cloudinary.com/hfgn9mp1b/image/upload/v1611752813/user_i07dfu.svg)`};
  background-size: cover;
  background-position: center;
  background-color: ${(props) => props.theme.primary};
  border: 1px solid ${(props) => props.theme.onPrimary};
  border-radius: 999px;
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 6rem;
  height: 4rem;
  background: ${(props) => props.theme.secondaryLight};
  align-items: center;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${(props) => props.theme.onPrimary};
  height: 100%;
  padding: 0 1rem;
  margin: 0 3rem;
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

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

const StyledChevronDown = styled(ChevronDown)`
  size: 1.2rem;
  color: ${(props) => props.theme.onActive};
  cursor: pointer;
`;

const PopoverMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.ternary};
  border-radius: 8px;
  color: ${(props) => props.theme.onSecondary};
  padding: 1rem 0;
`;

const PopoverItem = styled.div`
  padding: 0.2rem 0.6rem;
  &:hover {
    background-color: ${(props) => props.theme.ternaryLight};
  }
  cursor: pointer;
`;

const Header = () => {
  const imageUrl = useSelector((state) => state.auth.me.imageUrl);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);

  const getPopoverContent = () => {
    return (
      <PopoverMainContainer>
        <PopoverItem
          onClick={() => {
            dispatch(logout());
          }}
        >
          Log out
        </PopoverItem>
        <PopoverItem>Edit Profile</PopoverItem>
      </PopoverMainContainer>
    );
  };

  return (
    <MainContainer>
      <Wrapper>
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
      </Wrapper>
      <Wrapper>
        <AdminImage imageUrl={imageUrl}></AdminImage>
        <Popover isOpen={isOpen} content={getPopoverContent}>
          <StyledChevronDown onClick={() => setIsOpen(!isOpen)} />
        </Popover>
      </Wrapper>
    </MainContainer>
  );
};

export default Header;
