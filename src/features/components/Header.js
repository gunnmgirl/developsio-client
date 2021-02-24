import React from "react";
import { Users, Book, Monitor, ChevronDown } from "react-feather";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Popover } from "@malcodeman/react-popover";

import { logout } from "../auth/actions/authActions";
import LogoIcon from "../../icons/LogoIcon";
import history from "../../routing/history";
import ToggleTheme from "./ToggleTheme";

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
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 999px;
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 6rem;
  min-height: 4rem;
  background-color: ${(props) => props.theme.secondaryLight};
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
    background-color: ${(props) =>
      props.noactivestyle ? "transparent" : props.theme.primary};
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
  const meId = useSelector((state) => state.auth.me.id);
  const { pathname } = useLocation();

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
        <PopoverItem
          onClick={() => {
            history.push(`/profile/${meId}`);
            setIsOpen(false);
          }}
        >
          Edit Profile
        </PopoverItem>
        <PopoverItem
          onClick={() => {
            history.push(`/change-password/${meId}`);
            setIsOpen(false);
          }}
        >
          Change Password
        </PopoverItem>
      </PopoverMainContainer>
    );
  };

  return (
    <MainContainer>
      <Wrapper>
        <StyledNavLink to="/people" noactivestyle>
          <LogoIcon />
        </StyledNavLink>
        <StyledNavLink
          to="/people"
          isActive={() => ["/people", "/"].includes(pathname)}
        >
          <Users />
          <StyledSpan>People</StyledSpan>
        </StyledNavLink>
        <StyledNavLink to="/notes" data-cy="notes-nav-link">
          <Book />
          <StyledSpan>Notes</StyledSpan>
        </StyledNavLink>
        <StyledNavLink to="/positions" data-cy="positions-nav-link">
          <Monitor />
          <StyledSpan>Positions</StyledSpan>
        </StyledNavLink>
      </Wrapper>
      <Wrapper>
        <ToggleTheme />
        <AdminImage imageUrl={imageUrl}></AdminImage>
        <Popover
          isOpen={isOpen}
          content={getPopoverContent}
          onClickOutside={() => setIsOpen(false)}
        >
          <StyledChevronDown onClick={() => setIsOpen(!isOpen)} />
        </Popover>
      </Wrapper>
    </MainContainer>
  );
};

export default Header;
