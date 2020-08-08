import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { IconButton } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import EnhancedTable from "../../../components/BaseTable";

const projectStyles = theme => ({
  actions: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

const projectTableHeads = [
  { id: "id", numeric: true, disablePadding: false, label: "ID" },
  {
    id: "projectName",
    numeric: false,
    disablePadding: false,
    label: "Project Name"
  },
  { id: "action", numeric: false, disablePadding: false, label: "Action" }
];

const ProjectsTable = withStyles(projectStyles)(
  ({ classes, edit, handleDelete, ...props }) => (
    <EnhancedTable
      noSelectCheckbox
      headRows={projectTableHeads}
      data={props.data}
    >
      {({ data, isSelected, handleClick }) =>
        data.map((row, id) => {
          const isItemSelected = isSelected(id);
          return (
            <TableRow
              hover
              onClick={event => props.onRowClick(row._id, row.name)}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={id}
              selected={isItemSelected}
            >
              <TableCell align="center">{id}</TableCell>
              <TableCell align="center">{row.name}</TableCell>

              <TableCell align="center">
                <div className={classes.actions}>
                  <IconButton
                    color="inherit"
                    mini="true"
                    style={{ color: "#3f51b5", marginLeft: 10 }}
                    aria-label="Edit"
                    className="humburger p-0"
                    onClick={e => {
                      e.stopPropagation();
                      edit(row);
                    }}
                  >
                    <CreateIcon />
                  </IconButton>

                  <IconButton
                    color="inherit"
                    style={{ color: "#F50057", marginLeft: 10 }}
                    mini="true"
                    aria-label="Delete"
                    className="humburger p-0"
                    onClick={e => {
                      e.stopPropagation();
                      handleDelete(row);
                    }}
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

export default ProjectsTable;
