import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import { withRouter, Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { getAccessToken, ls } from "../utils";

class Header extends Component {
  logout = () => {
    ls.remove("accessToken");
    window.location.reload();
  };

  openProjects = () => {
    this.props.history.push("/projects");
  };

  render() {
    return (
      <AppBar
        style={{ color: "white" }}
        position="static"
        className="rct-header"
      >
        <Toolbar className="d-flex justify-content-between w-100 pl-0">
          <div className="d-flex align-items-center">
            <div className="site-logo">
              <Link to="/" className="logo-mini">
                <img
                  src={logo}
                  className="mr-15 logo"
                  alt="site logo"
                  width="125"
                  height="35"
                />
              </Link>
            </div>
          </div>
          {getAccessToken() ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end"
              }}
            >
              <Button
                onClick={() => this.openProjects()}
                variant="contained"
                className="upgrade-btn tour-step-4 text-white"
                color="primary"
                style={{ marginRight: 10 }}
              >
                Projects
              </Button>

              <Button
                onClick={() => this.logout()}
                variant="contained"
                className="upgrade-btn tour-step-4 text-white"
                color="secondary"
              >
                LOGOUT
              </Button>
            </div>
          ) : (
            <div />
          )}
        </Toolbar>
      </AppBar>
    );
  }
}
export default withRouter(Header);
