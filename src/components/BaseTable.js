import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    noSelectCheckbox
  } = props;

  return (
    <TableHead>
      <TableRow>
        {!noSelectCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
        )}
        {props.headRows.map(row => (
          <TableCell
            key={row.id}
            align="center"
            padding={row.disablePadding ? "none" : "default"}
            sortDirection={orderBy === row.id ? order : false}
          >
            {row.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: 30
  },
  projectHeading: {
    padding: 20,
    "& h3": {
      marginLeft: 24
    }
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px"
  },
  paper: {
    width: "100%",
    marginBottom: 20
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

const EnhancedTable = withStyles(styles)(
  ({ classes, handleSelectEach, handleSelectAll, hasSearch, ...props }) => {
    const data = props.data || [];
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchKey, setSearchKey] = React.useState("");
    const currentSearchData =
      (hasSearch &&
        props.data &&
        props.data.filter(item =>
          item.type.includes(searchKey && searchKey.toUpperCase())
        )) ||
      [];

    let currentPageData = hasSearch
      ? currentSearchData.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        )
      : props.data &&
        props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    function handleSelectAllClick(event) {
      if (event.target.checked) {
        const newSelecteds = currentPageData.map(n => n._id);
        setSelected(newSelecteds);
        handleSelectAll(newSelecteds);

        return;
      }
      setSelected([]);
      handleSelectAll([]);
    }

    function handleClick(event, name) {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setSelected(newSelected);
      handleSelectEach(newSelected);
    }

    function handleChangePage(event, newPage) {
      setPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
      setRowsPerPage(+event.target.value);
    }
    const handleSearch = e => {
      const data = props.data || [];
      currentPageData = data.filter(item => item.type.includes(e.target.value));
      setSearchKey(e.target.value);
    };
    const isSelected = name => selected.indexOf(name) !== -1;

    const emptyRows =
      rowsPerPage -
      Math.min(
        rowsPerPage,
        props.data && props.data.length - page * rowsPerPage
      );

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          {props.projectHeading && (
            <div className={classes.toolbar}>
              <div className={classes.projectHeading}>
                <h3>{props.projectHeading}</h3>
              </div>
              <div>
                <input placeholder="Search by Type" onChange={handleSearch} />
              </div>
            </div>
          )}
          <div className={classes.tableWrapper}>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <EnhancedTableHead
                noSelectCheckbox={props.noSelectCheckbox}
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={currentPageData && currentPageData.length}
                headRows={props.headRows}
              />
              <TableBody>
                {props.children({
                  data: currentPageData,
                  isSelected,
                  handleClick
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100, 200, 500]}
            component="div"
            count={props.data && props.data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page"
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page"
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
  }
);

export default EnhancedTable;
