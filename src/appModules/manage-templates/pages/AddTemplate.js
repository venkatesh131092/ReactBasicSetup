import React, { Component } from "react";
import { Button, Collapse, withStyles } from "@material-ui/core";
import * as Actions from "../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Editor from "./Editor";
import { Form } from "react-final-form";
import { required } from "../../../utils/form-validations";
import TextField from "../../../components/TextField";
import { showMessage } from "../../../redux/css-actions";
import { diffPlease, getNested } from "../../../utils";
import FormWrapper from "../../../components/FormWrapper";

const styles = () => ({
  main: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "1fr",
    padding: 20,
    height: "calc(100vh - 80px)"
    // justifyContent: "space-between",
  },
  preview: {
    height: 50,
    padding: 10,
    textAlign: "center"
  },
  partOne: {
    gridArea: "1 / 1 / 2 / 2"
  },
  partTwo: {
    gridArea: "1 / 2 / 2 / 3"
  },

  toggleBtn: {
    marginBottom: 20
  },
  btnsDiv: {
    height: 50,
    display: "flex",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "baseline"
  },
  marginBottom: {
    marginBottom: 10
  }
});

class Add extends Component {
  state = {
    template: ""
  };

  handleSubmit = values => {
    const projectId = this.props.match.params.projectId;
    if (this.state.template === "") {
      this.props.showMessage("Add Code for the template");
      return undefined;
    }
    values.substitutions =
      typeof values.substitutions === "string"
        ? values.substitutions && values.substitutions.split(",")
        : values.substitutions || [];

    if (this.state.isEditing) {
      values.projectId = projectId;
      this.props.editTemplate(values);
    } else {
      values.projectId = projectId;
      this.props.addTemplate(values);
    }
  };

  handleTemplateAddedSuccess = message => {
    const projectId = this.props.match.params.projectId;
    this.props.showMessage(message);
    this.props.history.push(`/projects/${projectId}/templates`);
  };

  handleAddingTemplateFailed = message => {
    this.props.showMessage(
      message || "Some error occured while adding template."
    );
  };

  componentDidUpdate(prevProps, prevState) {
    const addTemplateRes = diffPlease(
      ["addTemplateRes.success", "addTemplateRes.message"],
      prevProps,
      this.props
    );

    addTemplateRes
      .isSuccess(this.handleTemplateAddedSuccess)
      .isFailed(this.handleAddingTemplateFailed);

    // addTemplateRes.isFailed(this.handleAddingTemplateFailed);
  }

  componentDidMount() {
    const data = getNested("history.location.state.data", this.props);
    if (data) {
      data.substitutions = data.substitutions.join(",");
      this.setState({ isEditing: true, ...data });
    }
  }

  render() {
    const { classes, orderData } = this.props;

    return (
      <>
        <div className={classes.main}>
          <div className={classes.partOne}>
            <Form
              onSubmit={this.handleSubmit}
              render={({ handleSubmit, pristine, invalid }) => (
                <form onSubmit={handleSubmit}>
                  <div className={classes.btnsDiv}>
                    <Button
                      onClick={() =>
                        this.setState({ collapse: !this.state.collapse })
                      }
                      className={classes.toggleBtn}
                      variant="outlined"
                    >
                      Toggle Meta Data Form
                    </Button>
                    <Button
                      disabled={pristine || invalid}
                      type="submit"
                      color="primary"
                      className="btn-info text-white"
                      variant="contained"
                    >
                      {this.state.editing ? "UPDATE" : "SUBMIT"}
                    </Button>
                  </div>
                  <Collapse style={{ padding: 10 }} in={this.state.collapse}>
                    <TextField
                      label="Enter From Address"
                      type="mail"
                      name="formAddress"
                      validate={required}
                      placeholder="Enter From Address"
                      fullWidth
                      variant="outlined"
                      className={classes.marginBottom}
                    />

                    <TextField
                      label="Enter Subject"
                      name="subject"
                      placeholder="Enter Subject"
                      fullWidth
                      variant="outlined"
                      validate={required}
                      className={classes.marginBottom}
                    />

                    <TextField
                      label="Enter Title"
                      name="title"
                      placeholder="Enter Title"
                      fullWidth
                      variant="outlined"
                      className={classes.marginBottom}
                      validate={required}
                    />

                    <TextField
                      label="Enter Type"
                      type="mail"
                      name="type"
                      placeholder="Enter Type"
                      fullWidth
                      variant="outlined"
                      className={classes.marginBottom}
                      validate={required}
                    />

                    <TextField
                      label="Enter ReplyTo Address"
                      type="mail"
                      name="replyto"
                      placeholder="Enter ReplyTo Address"
                      fullWidth
                      variant="outlined"
                      className={classes.marginBottom}
                      validate={required}
                    />

                    <TextField
                      label="Enter Substitutions (Comma separated)"
                      type="mail"
                      name="substitutions"
                      placeholder="Enter Substitutions (Comma separated)"
                      fullWidth
                      variant="outlined"
                      className={classes.marginBottom}
                      validate={required}
                    />
                  </Collapse>
                </form>
              )}
            />
            {/* Ideally this editor should also be in form but it not a input so.....(also was having some css issue) */}
            {/* <Editor
              defaultValue={this.state.template}
              getValue={value => {
                if (this.state.template !== value) {
                  // eslint-disable-next-line
                  this.setState({
                    template: value
                  });
                }
              }}
            /> */}
          </div>
          <div className={classes.partTwo}>
            <div className={classes.preview}>
              <h2>Preview</h2>
            </div>
            <iframe
              title="Preview"
              srcDoc={this.state.template}
              width="100%"
              height="100%"
              className="preview-view"
            />
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps({ templatesReducer }) {
  return {
    addTemplateRes: templatesReducer.addTemplate,
    editTemplateRes: templatesReducer.editTemplate
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addTemplate: Actions.addTemplateMethod,
      editTemplate: Actions.editTemplatesMethod,
      showMessage
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Add));
