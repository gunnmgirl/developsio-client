import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import history from "./routing/history";
import GlobalStyle from "./GlobalStyle";
import defaultTheme from "./themes/defaultTheme";
import Login from "./features/auth/components/Login";
import People from "./features/people/components/People";
import Notes from "./features/notes/components/Notes";
import Positions from "./features/positions/components/Positions";
import Header from "./features/components/Header";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          <Header />
          <Route path="/people" component={People} />
          <Route path="/notes" component={Notes} />
          <Route path="/positions" component={Positions} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
