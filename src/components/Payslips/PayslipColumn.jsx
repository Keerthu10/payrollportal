import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

export const payslipColumns = (onView, onDownload, onEdit, serialStart = 0) => [
  {
    field: "sno",
    headerName: "S.No",
    width: 80,
    sortable: false,
    renderCell: (params) =>
      serialStart + params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
  },
  {
    field: "employeeId",
    headerName: "Employee ID",
    flex: 1,
    minWidth: 130,
  },
  {
    field: "employeeName",
    headerName: "Employee Name",
    flex: 1.5,
    minWidth: 170,
  },
  {
    field: "designation",
    headerName: "Designation",
    flex: 1.2,
    minWidth: 150,
  },
  {
    field: "payPeriod",
    headerName: "Pay Period",
    minWidth: 150,
  },
  {
    field: "emailVerified",
    headerName: "Email Verified",
    minWidth: 150,
    renderCell: (params) => (
      <Chip
        label={params.value ? "Verified" : "Unverified"}
        color={params.value ? "success" : "warning"}
        size="small"
      />
    ),
  },
  {
    field: "deliveryStatus",
    headerName: "Status",
    minWidth: 150,
    renderCell: (params) => {
      const status = params.value;

      let bgColor = "#6c63ff";

      if (status === "DELIVERED") bgColor = "#4caf50";
      else if (status === "FAILED") bgColor = "#f44336";
      else if (status === "BOUNCED") bgColor = "#ff9800";
      else if (status === "PENDING") bgColor = "#2196f3";
      else if (status === "PRINTED") bgColor = "#9c27b0";

      return (
        <Chip
          label={
            status
              ? status.charAt(0) + status.slice(1).toLowerCase()
              : "Unknown"
          }
          size="small"
          sx={{
            backgroundColor: bgColor,
            color: "#fff",
            fontWeight: 600,
            minWidth: 90,
          }}
        />
      );
    },
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 140,
    sortable: false,
    renderCell: (params) => (
      <>
        <IconButton onClick={() => onView(params.row.id)}>
          <VisibilityRoundedIcon />
        </IconButton>

        <IconButton
          onClick={() => onEdit(params.row)}
          title="Edit Payslip"
          color="primary"
        >
          <EditRoundedIcon />
        </IconButton>

        <IconButton onClick={() => onDownload(params.row.id)}>
          <DownloadRoundedIcon />
        </IconButton>
      </>
    ),
  },
];
