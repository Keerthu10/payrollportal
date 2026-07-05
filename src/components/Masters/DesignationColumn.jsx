import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { IconButton, Tooltip } from "@mui/material";

// const ActionMenu = ({ row, onEdit, onDelete }) => {
//   const [anchorEl, setAnchorEl] = useState(null);

//   return (
//     <>
//       <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
//         <MoreVertIcon />
//       </IconButton>

//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={() => setAnchorEl(null)}
//       >
//         <MenuItem
//           onClick={() => {
//             onEdit(row);
//             setAnchorEl(null);
//           }}
//         >
//           <ListItemIcon>
//             <EditRoundedIcon fontSize="small" />
//           </ListItemIcon>
//           Edit
//         </MenuItem>

//         <MenuItem
//           onClick={() => {
//             onDelete(row.id);
//             setAnchorEl(null);
//           }}
//         >
//           <ListItemIcon>
//             <DeleteRoundedIcon fontSize="small" />
//           </ListItemIcon>
//           Delete
//         </MenuItem>
//       </Menu>
//     </>
//   );
// };

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
            onClick={() => onDelete(params.row.designationId)}
          >
            <DeleteRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </>
    ),
  },
];


