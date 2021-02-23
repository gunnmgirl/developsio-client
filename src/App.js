import React from "react";
import styled from "styled-components";
import { Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import history from "./routing/history";
import GlobalStyle from "./GlobalStyle";
import Login from "./features/auth/components/Login";
import People from "./features/people/components/People";
import Notes from "./features/notes/components/Notes";
import Positions from "./features/positions/components/Positions";
import Header from "./features/components/Header";
import PersonDetails from "./features/people/components/PersonDetails";
import EditProfile from "./features/people/components/EditProfile";
import ChangePassword from "./features/people/components/ChangePassword";
import themes from "./themes";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.onPrimary};
`;

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentTheme = useSelector((state) => state.theme.theme);
  const theme = currentTheme === "dark" ? themes.dark : themes.light;
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
      <Router history={history}>
        {isLoggedIn ? (
          <Container>
            <Header />
            <Switch>
              <Route path="/people/:personId" component={PersonDetails} />
              <Route
                path="/change-password/:personId"
                component={ChangePassword}
              />
              <Route path="/profile/:personId" component={EditProfile} />
              <Route path="/people" component={People} />
              <Route path="/notes" component={Notes} />
              <Route path="/positions" component={Positions} />
              <Route path="/" exact component={People} />
            </Switch>
          </Container>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
          </Switch>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;
