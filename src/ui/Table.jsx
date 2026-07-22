import React from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const Table = ({
  rows = [],
  columns = [],
  loading = false,
  height = 600,
  onRowClick,
  paginationMode = "client",
  rowCount,
  paginationModel,
  onPaginationModelChange,
}) => {
  return (
    <Box sx={{ height: 450, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pageSizeOptions={[10, 25, 50, 100]}
        disableRowSelectionOnClick
        onRowClick={onRowClick}
        paginationMode={paginationMode}
        rowCount={paginationMode === "server" ? rowCount : undefined}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        {...(paginationMode !== "server" && {
          initialState: {
            pagination: { paginationModel: { pageSize: 10 } },
          },
        })}
        slots={{
          toolbar: GridToolbar,
          noRowsOverlay: () => (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ color: "#CBD5E1" }}>
                No records found
              </Typography>
            </Box>
          ),
        }}
        sx={{
          border: 0,
          background: "linear-gradient(135deg,#1E1B6D 0%, #2B256F 100%)",
          color: "#FFFFFF",

          /* Header */

          // "& .MuiDataGrid-columnHeaders": {
          //   background:
          //     "linear-gradient(135deg,#1E1B6D 0%, #4338CA 100%)",
          //   borderBottom: "1px solid rgba(255,255,255,0.1)",
          //   minHeight: "64px !important",
          // },

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#1A1D52 !important",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          },

          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#1A1D52 !important",
          },

          "& .MuiDataGrid-columnHeaderTitle": {
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: "14px",
          },

          /* Rows */
          "& .MuiDataGrid-row": {
            backgroundColor: "rgba(255,255,255,0.03)",
            transition: "all .25s ease",
          },

          "& .MuiDataGrid-row:nth-of-type(even)": {
            backgroundColor: "rgba(255,255,255,0.02)",
          },

          "& .MuiDataGrid-row:hover": {
            backgroundColor: "rgba(99,102,241,0.15)",
            transform: "translateY(-1px)",
          },

          /* Cells */
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            color: "#F8FAFC",
            fontSize: "14px",
          },

          /* Footer */
          "& .MuiDataGrid-footerContainer": {
            borderTop: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)",
            color: "#FFFFFF",
          },

          /* Toolbar */
          "& .MuiDataGrid-toolbarContainer": {
            padding: "14px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
          },

          "& .MuiButton-root": {
            color: "#FFFFFF",
          },

          "& .MuiSvgIcon-root": {
            color: "#CBD5E1",
          },

          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },

          "& .MuiTablePagination-root": {
            color: "#FFFFFF",
          },

          "& .MuiSelect-icon": {
            color: "#FFFFFF",
          },
        }}
      />
    </Box>
  );
};

export default Table;