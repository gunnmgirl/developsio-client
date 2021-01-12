import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import history from "./routing/history";
import GlobalStyle from "./GlobalStyle";
import defaultTheme from "./themes/defaultTheme";
import Login from "./features/auth/components/Login";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
