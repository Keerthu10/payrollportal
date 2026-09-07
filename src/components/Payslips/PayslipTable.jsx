// import React from "react";

// import { Paper } from "@mui/material";

// import Table from "../../ui/Table";

// import { payslipColumns } from "./PayslipColumn";

// const PayslipTable = ({
//   payslips,
//   loading,
//   onView,
//   onEdit,
//   onDownload,
//   rowCount,
//   paginationModel,
//   onPaginationModelChange,
//   serialStart,
// }) => {
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         borderRadius: "20px",
//         overflow: "hidden",

//         background: "#23255E",

//         border: "1px solid rgba(255,255,255,0.08)",

//         p: 1,

//         boxShadow: "0 12px 24px rgba(0,0,0,0.18), 0 4px 8px rgba(0,0,0,0.12)",
//       }}
//     >
//       <Table
//         rows={payslips}
//         columns={payslipColumns(onView, onDownload, onEdit, serialStart)}
//         loading={loading}
//         height={550}
//         paginationMode="server"
//         rowCount={rowCount}
//         paginationModel={paginationModel}
//         onPaginationModelChange={onPaginationModelChange}
//       />
//     </Paper>
//   );
// };

// export default PayslipTable;

import React from "react";
import { Paper, IconButton, Chip, Box } from "@mui/material";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";
import MarkEmailUnreadRoundedIcon from "@mui/icons-material/MarkEmailUnreadRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PendingRoundedIcon from "@mui/icons-material/PendingRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
// import "./PayslipTable.css";

const PayslipTablePrime = ({
  payslips = [],
  loading = false,
  onView,
  onEdit,
  onDownload,
  page = 0,
  rowsPerPage = 10,
  totalRecords = 0,
  onPageChange,
}) => {
  const serialNumberTemplate = (rowData, options) => (
    <Box sx={{ fontWeight: 600 }}>{options.rowIndex + 1}</Box>
  );

  const emailVerifiedTemplate = (row) => (
    <Chip
      icon={
        row.emailVerified ? (
          <MarkEmailReadRoundedIcon />
        ) : (
          <MarkEmailUnreadRoundedIcon />
        )
      }
      label={row.emailVerified ? "Verified" : "Unverified"}
      size="small"
      sx={{
        bgcolor: row.emailVerified ? "#16A34A" : "#DC2626",
        color: "#fff",
        fontWeight: 600,
        minWidth: "120px",
      }}
    />
  );

  // const statusTemplate = (row) => {
  //   const colorMap = {
  //     DELIVERED: "#16A34A",
  //     PENDING: "#2196F3",
  //     FAILED: "#DC2626",
  //     BOUNCED: "#F59E0B",
  //     PRINTED: "#7C3AED",
  //   };

  //   return (
  //     <Box display="flex" justifyContent="center">
  //       <Chip
  //         label={row.deliveryStatus}
  //         size="small"
  //         sx={{
  //           minWidth: "120px",
  //           color: "#fff",
  //           fontWeight: 700,
  //           backgroundColor: colorMap[row.deliveryStatus] || "#64748B",
  //         }}
  //       />
  //     </Box>
  //   );
  // };

  const statusTemplate = (row) => {
    const statusConfig = {
      DELIVERED: {
        color: "#16A34A",
        icon: <CheckCircleRoundedIcon />,
      },
      PENDING: {
        color: "#2196F3",
        icon: <PendingRoundedIcon />,
      },
      FAILED: {
        color: "#DC2626",
        icon: <CancelRoundedIcon />,
      },
      BOUNCED: {
        color: "#F59E0B",
        icon: <ErrorOutlineRoundedIcon />,
      },
      PRINTED: {
        color: "#7C3AED",
        icon: <PrintRoundedIcon />,
      },
    };

    const config = statusConfig[row.deliveryStatus] || {
      color: "#64748B",
      icon: null,
    };

    return (
      <Box display="flex" justifyContent="center">
        <Chip
          icon={config.icon}
          label={row.deliveryStatus}
          size="small"
          sx={{
            minWidth: "130px",
            color: "#fff",
            fontWeight: 700,
            backgroundColor: config.color,

            "& .MuiChip-icon": {
              color: "#fff",
              fontSize: 18,
            },
          }}
        />
      </Box>
    );
  };

  const actionButtonStyle = {
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#93C5FD",

    "&:hover": {
      background: "rgba(255,255,255,0.12)",
      border: "1px solid rgba(147,197,253,0.4)",
      transform: "translateY(-2px)",
    },
  };

  const actionTemplate = (row) => (
    <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
      <IconButton
        sx={actionButtonStyle}
        onClick={() => onView(row.id)}
        title="View Payslip"
      >
        <VisibilityRoundedIcon fontSize="small" />
      </IconButton>

      <IconButton
        sx={actionButtonStyle}
        onClick={() => onEdit(row)}
        title="Edit Payslip"
      >
        <EditRoundedIcon fontSize="small" />
      </IconButton>

      <IconButton
        sx={actionButtonStyle}
        onClick={() => onDownload(row.id)}
        title="Download Payslip"
      >
        <DownloadRoundedIcon fontSize="small" />
      </IconButton>
    </Box>
  );

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "20px",
        overflow: "hidden",
        background: "#23255E",
        p: 1,
      }}
    >
      <DataTable
        value={payslips}
        loading={loading}
        scrollable
        scrollHeight="500px"
        className="employee-prime-table"
        tableStyle={{ minWidth: "1300px" }}
        lazy
        paginator
        first={page * rowsPerPage}
        rows={rowsPerPage}
        totalRecords={totalRecords}
        onPage={(event) => {
          onPageChange(event.page, event.rows);
        }}
        rowsPerPageOptions={[10, 25, 50, 100]}
        paginatorTemplate={{
          layout:
            "RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink",
          RowsPerPageDropdown: (options) => (
            <div className="rows-per-page-wrapper">
              <span className="rows-per-page-label">Rows per page:</span>
              {options.element}
            </div>
          ),
        }}
        currentPageReportTemplate="{first}–{last} of {totalRecords}"
      >
        <Column
          header="S.No"
          body={serialNumberTemplate}
          style={{ width: "80px" }}
        />

        <Column
          field="employeeId"
          header="Employee ID"
          style={{ width: "150px" }}
        />

        <Column
          field="employeeName"
          header="Employee Name"
          style={{ width: "250px" }}
        />

        <Column field="email" header="Email Id" style={{ width: "180px" }} />

        <Column
          field="designation"
          header="Designation"
          style={{ width: "220px" }}
        />
        <Column field="location" header="Location" style={{ width: "220px" }} />

        <Column
          field="payPeriod"
          header="Pay Period"
          style={{ width: "180px" }}
        />

        <Column
          header="Email Verified"
          body={emailVerifiedTemplate}
          style={{ width: "180px" }}
        />

        <Column
          header="Status"
          body={statusTemplate}
          style={{ width: "160px" }}
        />

        <Column
          header="Actions"
          body={actionTemplate}
          style={{ width: "180px" }}
        />
      </DataTable>
    </Paper>
  );
};

export default PayslipTablePrime;

