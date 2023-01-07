import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import "./UsersList.css";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "first name",
    width: 150,
  },
  {
    field: "lastName",
    headerName: "last Name",
    width: 150,
  },
  {
    field: "userName",
    headerName: "Username",
    width: 150,
  },
  {
    field: "adress",
    headerName: "Address",
    width: 150,
  },
  {
    field: "likes",
    headerName: "likes",
    width: 150,
  },
];

const UsersList = (props) => {
  const rows = props.listPublicUsers;

  const onRowClicked = (GridRowParams) => {
    props.onClickUser(GridRowParams.row);
  };

  return (
    <Box className="table">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        disableSelectionOnClick={true}
        onRowClick={onRowClicked}
      />
    </Box>
  );
};

export default UsersList;
