import React from "react";
import Chip from "@mui/material/Chip";
import { IconButton, Tooltip } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

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
    width: 120,
    sortable: false,
    renderCell: (params) => (
      <>
        <Tooltip title="Edit">
          <IconButton
            color="primary"
            size="small"
            onClick={() => onEdit(params.row)}
          >
            <EditRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton
            color="error"
            size="small"
            onClick={() => onDelete(params.row.id)}
          >
            <DeleteRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </>
    ),
  },
];
