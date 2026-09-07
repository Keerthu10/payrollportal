import React from "react";
import { Paper, IconButton, Chip, Box } from "@mui/material";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";
import MarkEmailUnreadRoundedIcon from "@mui/icons-material/MarkEmailUnreadRounded";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./EmployeeTable.css";

const EmployeeTablePrime = ({
  employees = [],
  loading = false,
  onEdit,
  onDelete,
  onResendVerification,
  page = 0,
  rowsPerPage = 10,
  totalRecords = 0,
  onPageChange,
}) => {
  const statusBodyTemplate = (row) => (
    <Chip
      label={row.active ? "Active" : "Inactive"}
      color={row.active ? "success" : "error"}
      size="small"
    />
  );

  const verifiedBodyTemplate = (row) =>
    row.verified ? (
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
        onClick={() => onResendVerification(row)}
      >
        <MarkEmailUnreadRoundedIcon fontSize="small" />

        <Box
          component="span"
          sx={{
            fontSize: "12px",
            ml: 0.5,
          }}
        >
          Resend
        </Box>
      </IconButton>
    );

  const actionBodyTemplate = (row) => (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={0.5}
      sx={{ height: "100%" }}
    >
      <IconButton
        color="primary"
        size="small"
        title="Edit"
        onClick={() => onEdit(row)}
      >
        <EditRoundedIcon fontSize="small" />
      </IconButton>

      {row.active && (
        <IconButton
          color="error"
          size="small"
          title="Delete"
          onClick={() => onDelete(row)}
        >
          <DeleteRoundedIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );

  const serialNumberTemplate = (rowData, options) => (
    <Box
      sx={{
        fontWeight: 600,
        color: "#F8FAFC",
      }}
    >
      {options.rowIndex + 1}
    </Box>
  );

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "20px",
        overflow: "hidden",
        background: "#23255E",
        border: "1px solid rgba(255,255,255,0.08)",
        p: 1,
        boxShadow: "0 12px 24px rgba(0,0,0,0.18), 0 4px 8px rgba(0,0,0,0.12)",
      }}
    >
      <DataTable
        value={employees}
        loading={loading}
        scrollable
        scrollHeight={window.innerWidth < 768 ? "400px" : "550px"}
        className="employee-prime-table"
        tableStyle={{
          minWidth: window.innerWidth < 768 ? "1200px" : "1700px",
        }}
        showGridlines={false}
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
        {/* ================= FROZEN LEFT ================= */}

        <Column
          header="S.No"
          body={serialNumberTemplate}
          frozen
          alignFrozen="left"
          style={{
            width: "80px",
            minWidth: "80px",
          }}
        />

        <Column
          field="employeeId"
          header="Employee ID"
          frozen
          alignFrozen="left"
          style={{
            width: "150px",
            minWidth: "150px",
          }}
        />

        {/* ================= SCROLLABLE ================= */}

        <Column
          field="name"
          header="Employee Name"
          style={{
            width: "220px",
            minWidth: "220px",
          }}
        />

        <Column
          field="email"
          header="Email"
          style={{
            width: "200px",
            minWidth: "200px",
          }}
        />

        <Column
          field="phone"
          header="Phone"
          style={{
            width: "150px",
            minWidth: "150px",
          }}
        />

        <Column
          field="designation"
          header="Designation"
          style={{
            width: "150px",
            minWidth: "150px",
          }}
        />

        <Column
          field="location"
          header="Location"
          style={{
            width: "120px",
            minWidth: "120px",
          }}
        />

        <Column
          field="joinDate"
          header="Join Date"
          style={{
            width: "120px",
            minWidth: "120px",
          }}
        />

        <Column
          field="active"
          header="Status"
          body={statusBodyTemplate}
          style={{
            width: "140px",
            minWidth: "140px",
          }}
        />

        <Column
          field="verified"
          header="Email Verified"
          body={verifiedBodyTemplate}
          style={{
            width: "180px",
            minWidth: "180px",
          }}
        />

        {/* ================= FROZEN RIGHT ================= */}

        <Column
          header="Actions"
          body={actionBodyTemplate}
          frozen
          alignFrozen="right"
          style={{
            width: "130px",
            minWidth: "130px",
          }}
        />
      </DataTable>
    </Paper>
  );
};

export default EmployeeTablePrime;
