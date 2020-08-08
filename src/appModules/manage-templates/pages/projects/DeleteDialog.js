import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { DialogContentText } from "@material-ui/core";

const DeleteDialog = ({
  open,
  handleClose,
  toDeleteItemName,
  handleDelete
}) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      Confirm Delete {toDeleteItemName}?
    </DialogTitle>
    <DialogContent>
      <DialogContentText>This action cannot be reversed.</DialogContentText>
    </DialogContent>

    <DialogActions>
      <Button
        onClick={handleDelete}
        color="primary"
        className="btn-block text-white"
        variant="contained"
      >
        Delete
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
  </Dialog>
);
export default DeleteDialog;
