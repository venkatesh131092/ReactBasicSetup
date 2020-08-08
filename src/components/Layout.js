import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { renderRoutes, matchRoutes } from "react-router-config";
import appRoutes from "../routes";
import Header from "./Header";
import { setSettings } from "../redux/css-actions";
import Snackbar from "./SnackBar";
import { getAccessToken } from "../utils";
import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontSize: 16,
    fontFamily: [
      '"Josefin Sans", cursive',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  }
});

class Layout extends React.Component {
  constructor(props) {
    super(props);
    // for first time visit to app, further if route changes it will called from componentDidUpdate
    this.checkRouteSettings();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.checkRouteSettings();
    }
  }

  checkRouteSettings() {
    const matched = matchRoutes(appRoutes, this.props.location.pathname)[0];
    if (matched && matched.route && matched.route.settings) {
      this.props.setSettings(matched.route.settings);
    }
  }

  render() {
    const { settings = {}, showMessage = {} } = this.props;
    const currentPath = this.props.location.pathname;
    return (
      <>
        {getAccessToken() && (
          <Header
            currentPath={currentPath}
            noLogout={settings.noLogout}
            noTabs={settings.noTabs}
          />
        )}

        {renderRoutes(appRoutes)}

        {/* Snackbar  if open=true(showMessage action in 'src/redux/cssActions') it will appear in top right corner, you can configure it with other settings */}
        <Snackbar
          open={showMessage.open}
          message={showMessage.message}
          variant={showMessage.variant}
        />
      </>
    );
  }
}

const mapDispatch = {
  setSettings
};
const mapProps = ({ cssReducer }) => ({
  settings: cssReducer.layoutSettings,
  showMessage: cssReducer.showMessage
});
export default withRouter(
  connect(
    mapProps,
    mapDispatch
  )(Layout)
);
