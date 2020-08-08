import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import SendIcon from "@material-ui/icons/Save";
import CheckIcon from "@material-ui/icons/SelectAll";
import CreateNewIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as Actions from "../../actions";
import { connect } from "react-redux";
// import fileDownload from "react-file-download";
import Snackbar from "@material-ui/core/Snackbar";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import TemplatesTable from "../TemplatesTable";
import DeleteTemplateDialog from "./DeleteTemplateDialog";

const styles = theme => ({
  templates: {
    width: "90%",
    margin: "auto"
  },
  marginBottom: {
    marginBottom: 10
  }
});

class List extends Component {
  state = {
    data: [],
    showDialog: false,
    dataToDelete: {},
    exportedTemplates: [],
    exportClicked: false
  };

  selected = [];

  componentDidMount() {
    const projectId = this.props.match.params.id;
    this.props.getTemplates(projectId);
  }

  confirm_delete() {
    this.props.deleteTemplate(this.state.dataToDelete._id);
  }

  edit = data => {
    this.props.history.push(`/projects/:projectId/templates/${data._id}`, {
      data
    });
  };

  addNewTemplate = () => {
    const projectId = this.props.match.params.id;
    this.props.history.push(`/projects/${projectId}/add-template`);
  };

  selectAll() {
    const templates = this.state.data;
    templates.forEach((data, id) => {
      data.checked = true;
    });
    this.setState({ data: templates });
  }

  onChangeHandler(data) {
    const templates = this.state.data;
    templates.forEach((temp, id) => {
      if (temp.from === data.from) {
        temp.checked = !temp.checked;
      }
    });
    this.setState({ data: templates });
  }

  export() {
    const templates = this.state.data;
    const filteredTemplates = templates.filter((item, i) =>
      this.selected.includes(item._id)
    );
    if (filteredTemplates.length === 0) {
      this.setState({
        snackbar: true,
        snackbarMessage: "Please select at least one template to export"
      });
    } else {
      // fileDownload(JSON.stringify(filteredTemplates), "templates.json");
    }
  }

  handleSelectAll = arr => {
    this.selected = arr;
  };

  handleSelectEach = arr => (this.selected = arr);

  handleCloseDeleteTemplateDialog = () =>
    this.setState({ showDeleteTemplateDialog: false });

  handleDelete = () => {
    this.props.deleteTemplate(this.state.dataToDelete._id);
  };

  render() {
    const projectHeading =
      this.props.location.state && this.props.location.state.tableHeading;
    const { classes } = this.props;
    const data = this.props.getTemplateRes.data || [];
    return (
      <>
        <div id="templates" className={classes.templates}>
          <div>
            <h3 style={{ marginTop: 10 }}>
              TEMPLATES
              <Button
                onClick={this.addNewTemplate}
                variant="contained"
                color="primary"
                style={{ marginLeft: 10 }}
              >
                <CreateNewIcon /> Create new
              </Button>
              <Button
                onClick={() => this.export()}
                variant="contained"
                color="primary"
                style={{ marginLeft: 10 }}
              >
                <SendIcon /> EXPORT SELECTED
              </Button>
            </h3>
          </div>
          {!!data.length && (
            <TemplatesTable
              handleSelectEach={arr => {
                this.handleSelectEach(arr);
              }}
              projectHeading={projectHeading}
              handleSelectAll={arr => {
                this.handleSelectAll(arr);
              }}
              handleDelete={row =>
                this.setState({
                  showDeleteTemplateDialog: true,
                  dataToDelete: row
                })
              }
              edit={this.edit}
              data={data}
            />
          )}
        </div>
        <DeleteTemplateDialog
          open={this.state.showDeleteTemplateDialog}
          onClose={this.handleCloseDeleteTemplateDialog}
          handleDelete={this.handleDelete}
        />
      </>
    );
  }
}

function mapStateToProps({ templatesReducer }) {
  return {
    getTemplateRes: templatesReducer.getTemplates,
    deleteTemplateRes: templatesReducer.deleteTemplate,
    projectId: templatesReducer.projectId
  };
}

const mapDispatchToProps = {
  getTemplates: Actions.getTemplatesMethod,
  deleteTemplate: Actions.deleteTemplatesMethod
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(List)));
