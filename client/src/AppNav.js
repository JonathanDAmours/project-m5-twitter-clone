import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import HomeFeed from "./components/HomeFeed";
import Notifications from "./components/Notifications";
import Bookmarks from "./components/Bookmarks";
import TweetDetails from "./components/TweetDetails";
import Profile from "./components/Profile";
import GlobalStyles from "./GlobalStyles";
import Sidebar from "./components/SideBar";

const AppNav = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Wrapper>
        <div>
          <Sidebar />
        </div>
        <MainInteraction>
          <Switch>
            <Route path="/home">
              <HomeFeed />
            </Route>
            <Route path="/notifications">
              <Notifications />
            </Route>
            <Route path="/bookmarks">
              <Bookmarks />
            </Route>
            <Route path="/tweet/:tweetId">
              <TweetDetails />
            </Route>
            <Route exact path="/:profileId">
              <Profile />
            </Route>
          </Switch>
        </MainInteraction>
      </Wrapper>
    </BrowserRouter>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin: 3vh 10vw;
`;

const MainInteraction = styled.div`
  margin-right: 100px;
  border-left: 1px solid #f0f0f0;
  border-right: 1px solid #f0f0f0;
`;

export default AppNav;
