import React, { useState } from "react";

import {
  Typography,
  Box,
  Button,
  Backdrop,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import GlobalModal from "../../ui/GlobalModal";

const UploadEmployeeModal = ({
  open,
  handleClose,
  uploadedFileName,
  excelData,
  loading,
  onImportEmployees,
  importing,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const previewHeaders = [
    "Name",
    "Email",
    "Date of Birth (DD-MM-YYYY)",
    "Phone",
    "Designation",
    "Location",
    "Join Date (DD-MM-YYYY)",
    "Bank Name",
    "Employement Type",
    "Bank Account No",
    "IFSC Code",
    "PAN No",
    "UAN No",
  ];

  const formatDate = (value) => {
    if (!value) return "-";

    // If already DD-MM-YYYY, keep it as it is
    if (/^\d{2}-\d{2}-\d{4}$/.test(value)) {
      return value;
    }

    // Handle formats like 3/15/95 or 8/20/94
    const date = new Date(value);

    if (isNaN(date.getTime())) {
      return value;
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };
  return (
    <>
      <GlobalModal
        open={open}
        handleClose={handleClose}
        title="Employee Excel Preview"
        subtitle="Upload and preview employee excel"
        maxWidth={1200}
        fullWidth
        actions={
          <>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={onImportEmployees}
              disabled={excelData.length === 0 || importing}
            >
              {importing ? "Importing..." : "Import Employees"}
            </Button>
          </>
        }
      >
        {uploadedFileName && (
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: 600,
              mb: 3,
            }}
          >
            Uploaded File : {uploadedFileName}
          </Typography>
        )}

        {/* <Box
          sx={{
            background: "#FEF2F2",
            border: "1px solid #FCA5A5",
            borderRadius: "12px",
            p: 2,
            mb: 3,
          }}
        >
          <Typography key={index} color="error" sx={{ mb: 1 }}>
            • {error}
          </Typography>
        </Box> */}

        {excelData.length > 0 && (
          <>
            <TableContainer
              component={Paper}
              sx={{
                borderRadius: "20px",
                border: "1px solid #1F2937",
                background: "#111827",
                maxHeight: 500,
                overflow: "auto",
                mb: 2,
              }}
            >
              <Table
                stickyHeader
                sx={{
                  minWidth: 1800,

                  "& .MuiTableCell-root": {
                    borderBottom: "1px solid rgba(255,255,255,0.12)",
                    whiteSpace: "nowrap",
                  },

                  "& .MuiTableRow-root:nth-of-type(even)": {
                    background: "#1F2937",
                  },

                  "& .MuiTableRow-root:nth-of-type(odd)": {
                    background: "#111827",
                  },

                  "& .MuiTableRow-root:hover": {
                    background: "#374151",
                  },
                }}
              >
                {/* <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        background: "#111827",
                        color: "#fff",
                        fontWeight: 700,
                      }}
                    >
                      S.No
                    </TableCell>
                    {previewHeaders.map((header) => (
                      <TableCell
                        key={header}
                        sx={{
                          color: "#E5E7EB",
                        }}
                      >
                        {header === "Date of Birth (DD-MM-YYYY)" ||
                        header === "Join Date (DD-MM-YYYY)"
                          ? formatDate(row[header])
                          : row[header] || "-"}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {excelData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ color: "#E5E7EB" }}>
                          {page * rowsPerPage + index + 1}
                        </TableCell>

                        {previewHeaders.map((header) => (
                          <TableCell
                            key={header}
                            sx={{
                              color: "#E5E7EB",
                            }}
                          >
                            {row[header] || "-"}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                </TableBody> */}

                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        background: "#111827",
                        color: "#fff",
                        fontWeight: 700,
                      }}
                    >
                      S.No
                    </TableCell>

                    {previewHeaders.map((header) => (
                      <TableCell
                        key={header}
                        sx={{
                          background: "#111827",
                          color: "#fff",
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {excelData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ color: "#E5E7EB" }}>
                          {page * rowsPerPage + index + 1}
                        </TableCell>

                        {previewHeaders.map((header) => (
                          <TableCell
                            key={header}
                            sx={{
                              color: "#E5E7EB",
                            }}
                          >
                            {header === "Date of Birth (DD-MM-YYYY)" ||
                            header === "Join Date (DD-MM-YYYY)"
                              ? formatDate(row[header])
                              : row[header] || "-"}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={excelData.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={(event, newPage) => setPage(newPage)}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
              rowsPerPageOptions={[10, 25, 50]}
              sx={{
                background: "#111827",
                color: "#fff",

                "& .MuiTablePagination-selectIcon": {
                  color: "#fff",
                },

                "& .MuiSvgIcon-root": {
                  color: "#fff",
                },

                "& .MuiInputBase-root": {
                  color: "#fff",
                },
              }}
            />
          </>
        )}
      </GlobalModal>
    </>
  );
};

export default UploadEmployeeModal;
