import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { IconButton, Tooltip } from "@mui/material";

// export const designationColumns = (onEdit, onDelete) => [
//   {
//     field: "sno",
//     headerName: "S.No",
//     width: 80,
//     sortable: false,
//     renderCell: (params) =>
//       params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
//   },
//   {
//     field: "designationName",
//     headerName: "Designation Name",
//     flex: 1.5,
//   },
//   {
//     field: "status",
//     headerName: "Status",
//     flex: 1,
//     renderCell: (params) => (
//       <Chip
//         label={params.value}
//         color={params.value === "Inactive" ? "error" : "success"}
//         size="small"
//       />
//     ),
//   },
//   {
//     field: "actions",
//     headerName: "Actions",
//     width: 120,
//     sortable: false,
//     renderCell: (params) => (
//       <>
//         <Tooltip title="Edit">
//           <IconButton
//             color="primary"
//             size="small"
//             onClick={() => onEdit(params.row)}
//           >
//             <EditRoundedIcon fontSize="small" />
//           </IconButton>
//         </Tooltip>

//         <Tooltip title="Delete">
//           <IconButton
//             color="error"
//             size="small"
//             onClick={() => onDelete(params.row.designationId)}
//           >
//             <DeleteRoundedIcon fontSize="small" />
//           </IconButton>
//         </Tooltip>
//       </>
//     ),
//   },
// ];

export const designationColumns = (onEdit, onDelete) => [
  {
    field: "sno",
    headerName: "S.No",
    width: 80,
    sortable: false,
    renderCell: (params) =>
      params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
  },
  {
    field: "designationName",
    headerName: "Designation Name",
    flex: 1.5,
    minWidth: 220, // Added
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 130, // Added
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
    minWidth: 120, // Added
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
            onClick={() => onDelete(params.row.designationId)}
          >
            <DeleteRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </>
    ),
  },
];