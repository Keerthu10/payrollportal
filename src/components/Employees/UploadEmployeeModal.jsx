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
  validationErrors,
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
              fontSize: {
                xs: 14,
                sm: 16,
              },
              wordBreak: "break-word",
            }}
          >
            Uploaded File : {uploadedFileName}
          </Typography>
        )}

        {validationErrors?.length > 0 && (
          <Box
            sx={{
              background: "#FEF2F2",
              border: "1px solid #FCA5A5",
              borderRadius: {
                xs: 2,
                sm: 3,
              },

              p: {
                xs: 1.5,
                sm: 2,
              },
              mb: 3,
            }}
          >
            <Typography color="error" fontWeight={600} sx={{ mb: 1 }}>
              {validationErrors.length} validation error(s) found
            </Typography>

            {validationErrors.map((error, index) => (
              <Typography
                key={index}
                color="error"
                sx={{
                  fontSize: {
                    xs: 13,
                    sm: 14,
                  },
                  wordBreak: "break-word",
                }}
              >
                • Row {error.row}: {error.message}
              </Typography>
            ))}
          </Box>
        )}

        {excelData.length > 0 && (
          <>
            <TableContainer
              component={Paper}
              sx={{
                border: "1px solid #1F2937",
                background: "#111827",
                overflow: "auto",
                borderRadius: {
                  xs: 2,
                  sm: 3,
                },

                maxHeight: {
                  xs: 350,
                  sm: 450,
                  md: 500,
                },
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
                          fontSize: {
                            xs: 12,
                            sm: 14,
                          },
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
                    .map((row, index) => {
                      const rowNumber = page * rowsPerPage + index + 2;

                      const rowErrors = validationErrors.filter(
                        (error) => error.row === rowNumber,
                      );

                      return (
                        <TableRow key={index}>
                          <TableCell
                            sx={{
                              color: "#E5E7EB",
                              fontSize: {
                                xs: 12,
                                sm: 14,
                              },
                              whiteSpace: "nowrap",
                            }}
                          >
                            {page * rowsPerPage + index + 1}
                          </TableCell>

                          {previewHeaders.map((header) => (
                            <TableCell
                              key={header}
                              sx={{
                                color: "#E5E7EB",
                                fontSize: {
                                  xs: 12,
                                  sm: 14,
                                },
                                whiteSpace: "nowrap",
                              }}
                            >
                              {header === "Date of Birth (DD-MM-YYYY)" ||
                              header === "Join Date (DD-MM-YYYY)"
                                ? formatDate(row[header])
                                : row[header] || "-"}
                            </TableCell>
                          ))}

                          <TableCell>
                            {rowErrors.length === 0 ? (
                              <Typography
                                sx={{
                                  color: "#22C55E",
                                  fontWeight: 600,
                                  fontSize: {
                                    xs: 12,
                                    sm: 14,
                                  },
                                  whiteSpace: "nowrap",
                                }}
                              >
                                ✓ Valid
                              </Typography>
                            ) : (
                              <Typography
                                sx={{
                                  color: "#EF4444",
                                  fontWeight: 600,
                                  fontSize: {
                                    xs: 12,
                                    sm: 14,
                                  },
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {rowErrors.map((e) => e.message).join(", ")}
                              </Typography>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
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
                "& .MuiTablePagination-toolbar": {
                  flexWrap: "wrap",
                  justifyContent: {
                    xs: "center",
                    sm: "space-between",
                  },
                },

                "& .MuiTablePagination-selectLabel": {
                  fontSize: {
                    xs: 12,
                    sm: 14,
                  },
                },

                "& .MuiTablePagination-displayedRows": {
                  fontSize: {
                    xs: 12,
                    sm: 14,
                  },
                },

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
