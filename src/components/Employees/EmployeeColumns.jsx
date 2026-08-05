// import React, { useState } from "react";
// import { Box, IconButton, Chip } from "@mui/material";
// import EditRoundedIcon from "@mui/icons-material/EditRounded";
// import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
// import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
// import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
// import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";
// import MarkEmailUnreadRoundedIcon from "@mui/icons-material/MarkEmailUnreadRounded";

// export const employeeColumns = (onView, onEdit, onDelete, onResendVerification) => [
//   {
//     field: "sno",
//     headerName: "S.No",
//     width: 80,
//     sortable: false,
//     renderCell: (params) =>
//       params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
//   },
//   {
//     field: "employeeId",
//     headerName: "Employee ID",
//     flex: 1,
//   },
//   {
//     field: "name",
//     headerName: "Employee Name",
//     flex: 1.5,
//   },
//   {
//     field: "email",
//     headerName: "Email",
//     flex: 2,
//   },
//   {
//     field: "phone",
//     headerName: "Phone",
//     flex: 1,
//   },
//   {
//     field: "designation",
//     headerName: "Designation",
//     flex: 1.5,
//   },
//   {
//     field: "location",
//     headerName: "Location",
//     flex: 1,
//   },
//   {
//     field: "joinDate",
//     headerName: "Join Date",
//     flex: 1,
//   },
//   {
//     field: "active",
//     headerName: "Status",
//     flex: 1,
//     renderCell: (params) => (
//       <Chip
//         label={params.row.active ? "Active" : "Inactive"}
//         color={params.row.active ? "success" : "error"}
//         size="small"
//       />
//     ),
//   },
//   {
//     field: "verified",
//     headerName: "Email Verified",
//     flex: 1.3,
//     renderCell: (params) =>
//       params.row.verified ? (
//         <Chip
//           icon={<MarkEmailReadRoundedIcon fontSize="small" />}
//           label="Verified"
//           color="success"
//           size="small"
//         />
//       ) : (
//         <IconButton
//           size="small"
//           color="warning"
//           title="Resend verification email"
//           onClick={() => onResendVerification(params.row)}
//         >
//           <MarkEmailUnreadRoundedIcon fontSize="small" />
//           <Box component="span" sx={{ fontSize: "12px", ml: 0.5 }}>
//             Resend
//           </Box>
//         </IconButton>
//       ),
//   },
//   {
//     field: "actions",
//     headerName: "Actions",
//     width: 120,
//     sortable: false,
//     renderCell: (params) => (
//       <Box display="flex" gap={1}>
//         {/* Edit */}
//         <IconButton
//           color="primary"
//           size="small"
//           onClick={() => onEdit(params.row)}
//         >
//           <EditRoundedIcon fontSize="small" />
//         </IconButton>

//         {/* Show Delete only for Active employees */}
//         {params.row.active && (
//           <IconButton
//             color="error"
//             size="small"
//             onClick={() => onDelete(params.row)}
//           >
//             <DeleteRoundedIcon fontSize="small" />
//           </IconButton>
//         )}
//       </Box>
//     ),
//   },
// ];

import React, { useState } from "react";
import { Box, IconButton, Chip } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";
import MarkEmailUnreadRoundedIcon from "@mui/icons-material/MarkEmailUnreadRounded";

export const employeeColumns = (
  onView,
  onEdit,
  onDelete,
  onResendVerification,
) => [
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
    minWidth: 130,
  },
  {
    field: "name",
    headerName: "Employee Name",
    flex: 1.5,
    minWidth: 170,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 2,
    minWidth: 200,
  },
  {
    field: "phone",
    headerName: "Phone",
    flex: 1,
    minWidth: 130,
  },
  {
    field: "designation",
    headerName: "Designation",
    flex: 1.5,
    minWidth: 150,
  },
  {
    field: "location",
    headerName: "Location",
    flex: 1,
    minWidth: 140,
  },
  {
    field: "joinDate",
    headerName: "Join Date",
    flex: 1,
    minWidth: 130,
  },
  {
    field: "active",
    headerName: "Status",
    flex: 1,
    minWidth: 110,
    renderCell: (params) => (
      <Chip
        label={params.row.active ? "Active" : "Inactive"}
        color={params.row.active ? "success" : "error"}
        size="small"
      />
    ),
  },
  {
    field: "verified",
    headerName: "Email Verified",
    flex: 1.3,
    minWidth: 170,
    renderCell: (params) =>
      params.row.verified ? (
        <Chip
          icon={<MarkEmailReadRoundedIcon fontSize="small" />}
          label="Verified"
          color="success"
          size="small"
        />
      ) : (
        <IconButton
          size="small"
          color="warning"
          title="Resend verification email"
          onClick={() => onResendVerification(params.row)}
        >
          <MarkEmailUnreadRoundedIcon fontSize="small" />
          <Box component="span" sx={{ fontSize: "12px", ml: 0.5 }}>
            Resend
          </Box>
        </IconButton>
      ),
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 120,
    sortable: false,
    renderCell: (params) => (
      <Box display="flex" gap={1}>
        {/* Edit */}
        <IconButton
          color="primary"
          size="small"
          onClick={() => onEdit(params.row)}
        >
          <EditRoundedIcon fontSize="small" />
        </IconButton>

        {/* Show Delete only for Active employees */}
        {params.row.active && (
          <IconButton
            color="error"
            size="small"
            onClick={() => onDelete(params.row)}
          >
            <DeleteRoundedIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    ),
  },
];