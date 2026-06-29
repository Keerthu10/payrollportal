import React, { useState } from "react";
import { Box, IconButton, Chip } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

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
    field: "active",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => (
      <Chip
        label={params.row.active ? "Active" : "Inactive"}
        color={params.row.active ? "success" : "error"}
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
      <Box display="flex" gap={1}>
        <IconButton
          color="primary"
          size="small"
          onClick={() => onEdit(params.row)}
        >
          <EditRoundedIcon fontSize="small" />
        </IconButton>

        <IconButton
          color="error"
          size="small"
          onClick={() => onDelete(params.row)}
        >
          <DeleteRoundedIcon fontSize="small" />
        </IconButton>
      </Box>
    ),
  },
];
