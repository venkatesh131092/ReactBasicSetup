import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const DeleteTemplateDialog = ({ open, onClose, handleDelete }) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      Are you sure you want to <br /> delete this template?
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        This cannot be undone. The template <br /> will be deleted permanently.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary" variant="contained">
        No
      </Button>
      <Button onClick={handleDelete} color="secondary" variant="contained">
        Yes
      </Button>
    </DialogActions>
  </Dialog>
);
export default DeleteTemplateDialog;
