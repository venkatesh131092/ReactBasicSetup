import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { Layout } from "./components";
import store from "./redux/index";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./components/Layout";

const browserHistory = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <MuiThemeProvider theme={theme}>
        <Layout />
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
