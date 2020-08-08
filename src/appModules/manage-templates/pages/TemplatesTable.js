import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import { IconButton } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import EnhancedTable from "../../../components/BaseTable";

const headRows = [
  { id: "subject", numeric: false, disablePadding: false, label: "Subject" },

  {
    id: "type",
    numeric: false,
    disablePadding: true,
    label: "Type"
  },
  { id: "replyTo", numeric: false, disablePadding: false, label: "Reply To" },
  { id: "action", numeric: false, disablePadding: false, label: "Action" }
];

const templateTableStyles = {
  actions: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};
const TemplatesTable = withStyles(templateTableStyles)(
  ({
    edit,
    classes,
    handleDelete,
    handleSelectEach,
    projectHeading,
    handleSelectAll,
    ...props
  }) => (
    <EnhancedTable
      headRows={headRows}
      handleSelectEach={handleSelectEach}
      handleSelectAll={handleSelectAll}
      projectHeading={projectHeading}
      hasSearch
      data={props.data}
    >
      {({ data, isSelected, handleClick }) =>
        data.map((row, id) => {
          const isItemSelected = isSelected(row._id);
          return (
            <TableRow
              hover
              onClick={event => handleClick(event, row._id)}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={id}
              selected={isItemSelected}
            >
              <TableCell padding="checkbox">
                <Checkbox checked={isItemSelected} />
              </TableCell>
              <TableCell align="center">{row.subject}</TableCell>
              <TableCell align="center">{row.type}</TableCell>
              <TableCell align="center">{row.replyto}</TableCell>
              <TableCell align="center">
                <div className={classes.actions}>
                  <IconButton
                    color="inherit"
                    mini="true"
                    style={{ color: "#3f51b5", marginLeft: 10 }}
                    aria-label="Edit"
                    className="humburger p-0"
                    onClick={() => edit(row)}
                  >
                    <CreateIcon />
                  </IconButton>

                  <IconButton
                    color="inherit"
                    style={{ color: "#F50057", marginLeft: 10 }}
                    mini="true"
                    aria-label="Delete"
                    className="humburger p-0"
                    onClick={() => handleDelete(row)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
          );
        })
      }
    </EnhancedTable>
  )
);
export default TemplatesTable;
