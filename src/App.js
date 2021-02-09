import React from "react";
import styled from "styled-components";
import { Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import history from "./routing/history";
import GlobalStyle from "./GlobalStyle";
import defaultTheme from "./themes/defaultTheme";
import Login from "./features/auth/components/Login";
import People from "./features/people/components/People";
import Notes from "./features/notes/components/Notes";
import Positions from "./features/positions/components/Positions";
import Header from "./features/components/Header";
import PersonDetails from "./features/people/components/PersonDetails";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <ToastContainer
        position="top-center"
        autoClose={false}
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
              <Route path="/people" component={People} />
              <Route path="/notes" component={Notes} />
              <Route path="/positions" component={Positions} />
              <Route path="/:personId" component={PersonDetails} />
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
