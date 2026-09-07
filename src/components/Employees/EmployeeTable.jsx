import React from "react";

import { Paper } from "@mui/material";

import Table from "../../ui/Table";

import { employeeColumns } from "./EmployeeColumns";

const EmployeeTable = ({
  employees,
  loading,
  onView,
  onEdit,
  onDelete,
  onActivate,
  onResendVerification,
  rowCount,
  paginationModel,
  onPaginationModelChange,
}) => {
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
      <Table
        rows={employees}
        columns={employeeColumns(
          onView,
          onEdit,
          onDelete,
          onActivate,
          onResendVerification,
        )}
        loading={loading}
        height={650}
        paginationMode="server"
        rowCount={rowCount}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
      />
    </Paper>
  );
};

export default EmployeeTable;
