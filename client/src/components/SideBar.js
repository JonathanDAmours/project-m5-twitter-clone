import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { COLORS } from "../constants";
import { FiHome } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FiBell } from "react-icons/fi";
import { FiBookmark } from "react-icons/fi";
import { CurrentUserContext } from "./CurrentUserContext";

const SideBar = () => {
  const { currentUser, status } = useContext(CurrentUserContext);

  let history = useHistory();

  const handleHome = (e) => {
    e.stopPropagation();
    history.push(`/home`);
  };

  const handleUser = (e) => {
    e.stopPropagation();
    history.push(`/${currentUser}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      handleHome(e);
    }
  };

  const handleKeyDown2 = (e) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      handleUser(e);
    }
  };

  return (
    <Main>
      <Wrapper>
        <StyledLogo />
      </Wrapper>
      <StyledNavLink onKeyDown={handleKeyDown} tabIndex="0" to="/home">
        <Div>
          <StyledFiHome />
          <Span>Home</Span>
        </Div>
      </StyledNavLink>
      <StyledNavLink
        onKeyDown={handleKeyDown2}
        tabIndex="0"
        exact
        to={status === "idle" ? `/${currentUser}` : "loading"}
      >
        <Div>
          <StyledFiUser />
          <Span>Profile</Span>
        </Div>
      </StyledNavLink>
      <StyledNavLink to="/Notifications">
        <Div>
          <StyledFiBell />
          <Span>Notifications</Span>
        </Div>
      </StyledNavLink>
      <StyledNavLink to="/bookmarks">
        <Div>
          <StyledFiBookmark />
          <Span>Bookmarks</Span>
        </Div>
      </StyledNavLink>
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div``;

const Div = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  margin: 5px 0;

  &:hover {
    color: ${COLORS.primary};
    background-color: ${COLORS.active};
    border-radius: 25px;
  }
`;

const StyledLogo = styled(Logo)`
  height: 3em;
  width: 3em;
  margin: 0 0 10px 5px;
`;

const StyledFiHome = styled(FiHome)`
  height: 1.5em;
  width: 1.5em;
`;

const StyledFiUser = styled(FiUser)`
  height: 1.5em;
  width: 1.5em;
`;

const StyledFiBell = styled(FiBell)`
  height: 1.5em;
  width: 1.5em;
`;

const StyledFiBookmark = styled(FiBookmark)`
  height: 1.5em;
  width: 1.5em;
`;

const StyledNavLink = styled(NavLink)`
  color: black;
  text-decoration: none;

  &.active {
    color: ${COLORS.primary};
  }
`;

const Span = styled.span`
  padding: 5px 10px;
  font-size: 22px;
  font-weight: bold;
  margin-left: 10px;
`;

export default SideBar;
