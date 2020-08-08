import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { creds } from "../../../../config/cred";
import { Form } from "react-final-form";
import TextField from "../../../../components/TextField";
import {
  required,
  isEmail,
  composeValidators
} from "../../../../utils/form-validations";
import { setAccessToken } from "../../../../utils";
import { showMessage } from "../../../../redux/css-actions";
import { connect } from "react-redux";

class Login extends Component {
  state = {
    email: "",
    password: "",
    snackbar: false,
    snackbarMessage: ""
  };

  handleSubmit = values => {
    const isValid = creds.filter(
      ({ email, password }) =>
        values.email === email && values.password === password
    ).length;
    if (isValid) {
      setAccessToken("believemethisisaccesstoken");
      this.props.history.push("/projects");
    } else {
      this.props.showMessage("Please enter valid credentials.");
    }
  };

  handleOnChange = name => e => this.setState({ [name]: e.target.value });

  render() {
    return (
      <div>
        <h2 className="login-header">Email Template CRUD App</h2>
        <div className="login-view">
          <Form
            onSubmit={values => {
              const error = {};
              this.handleSubmit(values);
              // if values.name has problem set errors.name the error and return
              // here you can handle all onSubmit validation you can throw promise to show spinner till result comes
              // you will get submitting in render func below true till this promise resoves
            }}
            validate={values => {
              // same as onSubmit ,you will get validating as true till promise resoves,but called on every input
            }}
            render={({ handleSubmit, submitting, values, validating }) => (
              <>
                <form onSubmit={handleSubmit}>
                  <TextField
                    type="email"
                    name="email"
                    placeholder="Enter Email Address"
                    fullWidth
                    validate={composeValidators(required, isEmail)}
                  />
                  <TextField
                    type="Password"
                    name="password"
                    placeholder="Password"
                    fullWidth
                    validate={required}
                  />
                  <Button
                    type="submit"
                    color="primary"
                    className="btn-block text-white w-100"
                    variant="contained"
                  >
                    LOGIN
                  </Button>
                </form>
              </>
            )}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { showMessage }
)(Login);
