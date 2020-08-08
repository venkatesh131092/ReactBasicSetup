import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import TextField from "../../../../components/TextField";
import { required } from "../../../../utils/form-validations";
import { Form } from "react-final-form";

const AddUpdateDialog = ({ open, handleClose, isEditing, handleAddUpdate }) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {isEditing ? "Edit the project Title" : "Add a new Project"}
    </DialogTitle>
    <Form
      onSubmit={handleAddUpdate}
      render={({ handleSubmit, submitting, values }) => (
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              margin="dense"
              id="name"
              label="Name"
              name="name"
              type="text"
              fullWidth
              validate={required}
            />
          </DialogContent>

          <DialogActions>
            <Button
              type="submit"
              color="primary"
              className="btn-block text-white"
              variant="contained"
            >
              {isEditing ? "Update" : "Add"}
            </Button>
            <Button
              onClick={handleClose}
              color="secondary"
              className="btn-block text-white"
              variant="contained"
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      )}
    />
  </Dialog>
);

export default AddUpdateDialog;
