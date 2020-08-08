import React from "react";
import Snackbar from "@material-ui/core/Snackbar";

class PositionedSnackbar extends React.Component {
  render() {
    const { open, message, variant } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          variant={variant || "inherit"}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{message}</span>}
        />
      </div>
    );
  }
}

export default PositionedSnackbar;
