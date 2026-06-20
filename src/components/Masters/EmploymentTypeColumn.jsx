import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import { IconButton, Menu, MenuItem, ListItemIcon } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const ActionMenu = ({ row, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            onEdit(row);
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <EditRoundedIcon fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            onDelete(row.id);
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <DeleteRoundedIcon fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export const employmentTypeColumns = (onEdit, onDelete) => [
  {
    field: "sno",
    headerName: "S.No",
    width: 80,
    sortable: false,
    renderCell: (params) =>
      params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
  },
  {
    field: "employmentType",
    headerName: "Employment Type",
    flex: 1.5,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => (
      <Chip
        label={params.value}
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
      <ActionMenu row={params.row} onEdit={onEdit} onDelete={onDelete} />
    ),
  },
];
