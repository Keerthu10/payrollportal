import Chip from "@mui/material/Chip";
import { Box } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";

const ActionMenu = ({ row, onView, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton size="small" onClick={handleClick}>
        <MoreVertRoundedIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            onView(row);
            handleClose();
          }}
        >
          <VisibilityRoundedIcon sx={{ mr: 1 }} />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEdit(row);
            handleClose();
          }}
        >
          <EditRoundedIcon sx={{ mr: 1 }} />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            onDelete(row);
            handleClose();
          }}
        >
          <DeleteRoundedIcon sx={{ mr: 1, color: "red" }} />
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export const employeeColumns = (onView, onEdit, onDelete) => [
  {
    field: "sno",
    headerName: "S.No",
    width: 80,
    sortable: false,
    renderCell: (params) =>
      params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
  },
  {
    field: "employeeId",
    headerName: "Employee ID",
    flex: 1,
  },
  {
    field: "name",
    headerName: "Employee Name",
    flex: 1.5,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 2,
  },
  {
    field: "phone",
    headerName: "Phone",
    flex: 1,
  },
  {
    field: "designation",
    headerName: "Designation",
    flex: 1.5,
  },
  {
    field: "department",
    headerName: "Department",
    flex: 1.2,
  },
  {
    field: "location",
    headerName: "Location",
    flex: 1,
  },
  {
    field: "joinDate",
    headerName: "Join Date",
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => (
      <Chip
        label={params.value || "Active"}
        color={params.value === "Inactive" ? "error" : "success"}
        size="small"
      />
    ),
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 100,
    sortable: false,

    renderCell: (params) => (
      <ActionMenu
        row={params.row}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ),
  },
];
