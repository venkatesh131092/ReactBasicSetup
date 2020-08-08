import React, { Component } from "react";
import Button from "@material-ui/core/Button";

import CreateNewIcon from "@material-ui/icons/Add";

import * as Actions from "../../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProjectsTable from "../ProjectsTable";
import { withStyles } from "@material-ui/core";

import DeleteDialog from "./DeleteDialog";
import AddUpdateDialog from "./AddUpdateDialog";

class Projects extends Component {
  state = {
    data: [],
    showAddOrUpdateDialog: false,
    dataToDelete: {},
    name: "",
    showDeleteDialog: false
  };

  componentDidMount() {
    this.props.getProjects();
  }

  closeAddOrUpdateDialog = () =>
    this.setState({ showAddOrUpdateDialog: false });

  closeDeleteDialog = () => this.setState({ showDeleteDialog: false });

  openTemplates = (id, tableHeading) => {
    this.props.updateId(id);
    this.props.history.push(`/projects/${id}/templates`, {
      tableHeading
    });
  };

  edit = data => {
    this.setState({
      showAddOrUpdateDialog: true,
      name: data.name,
      isEditing: true,
      editingProjectData: data
    });
  };

  handleDelete = () => {
    this.props.deleteProject(this.state.editingProjectData._id).then(() => {
      if (this.props.deleteProjectRes.success) {
        this.closeDeleteDialog();
      }
    });
  };

  handleAddUpdate = values => {
    if (this.state.isEditing) {
      this.props
        .editProject({
          _id: this.state.editingProjectData._id,
          name: values.name
        })
        .then(() => {
          if (this.props.editProjectRes.success) {
            this.closeAddOrUpdateDialog();
          }
        });
    } else {
      this.props.addProject({ name: values.name }).then(() => {
        if (this.props.addProjectRes.success) {
          this.closeAddOrUpdateDialog();
        }
      });
    }
  };

  render() {
    const { classes, getProjectRes } = this.props;

    return (
      <>
        <div className="table-responsive ">
          <h3 style={{ marginTop: 10 }}>
            PROJECTS
            <Button
              onClick={() => this.setState({ showAddOrUpdateDialog: true })}
              variant="contained"
              className="upgrade-btn tour-step-4 text-white"
              color="primary"
              style={{ marginLeft: 10 }}
            >
              <CreateNewIcon /> Create new
            </Button>
          </h3>
          <div className={classes.projectTable}>
            <ProjectsTable
              handleDelete={data => {
                this.setState({
                  showDeleteDialog: true,
                  editingProjectData: data,
                  toDeleteItemName: data.name
                });
              }}
              edit={this.edit}
              data={getProjectRes.data || []}
              onRowClick={this.openTemplates}
            />
          </div>
        </div>
        <DeleteDialog
          open={this.state.showDeleteDialog}
          handleClose={this.closeDeleteDialog}
          toDeleteItemName={this.state.toDeleteItemName}
          handleDelete={this.handleDelete}
        />
        <AddUpdateDialog
          open={this.state.showAddOrUpdateDialog}
          handleClose={this.closeAddOrUpdateDialog}
          isEditing={this.state.isEditing}
          handleAddUpdate={this.handleAddUpdate}
        />
      </>
    );
  }
}

function mapStateToProps({ templatesReducer }) {
  return {
    getProjectRes: templatesReducer.getProjects,
    deleteProjectRes: templatesReducer.deleteProject,
    addProjectRes: templatesReducer.addProject,
    editProjectRes: templatesReducer.editProject
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getProjects: Actions.getProjectsMethod,
      deleteProject: Actions.deleteProjectsMethod,
      addProject: Actions.addProjectMethod,
      editProject: Actions.editProjectsMethod,
      updateId: Actions.updateProjectID
    },
    dispatch
  );
}
const styles = {
  projectTable: {
    width: "90%",
    margin: "auto"
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Projects));
