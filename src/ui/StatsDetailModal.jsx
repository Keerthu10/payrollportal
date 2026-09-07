import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Fade,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const COLUMN_WIDTHS = {
  employeeId: 120,
  employeeName: 180,
  email: 220,
  designation: 160,
  emailSentAt: 170,
  emailError: 220,
  deliveryStatus: 140,
};

const StatDetailModal = ({
  open,
  handleClose,
  card,
  columns,
  rows,
  loading,
  notAvailable,
  page = 0,
  rowsPerPage = 10,
  totalCount = 0,
  onPageChange,
}) => {
  if (!card) return null;

  const hasColumns = Array.isArray(columns) && columns.length > 0;
  const showPagination =
    hasColumns && !notAvailable && typeof onPageChange === "function";

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(15,23,42,0.35)",
          },
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "96%", sm: hasColumns ? 1100 : 400 },
            maxWidth: "94vw",
            maxHeight: "85vh",
            borderRadius: "20px",
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            boxShadow: `0 20px 50px ${card.shadowColor || "rgba(15,23,42,0.18)"}`,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Top accent bar */}
          <Box sx={{ height: "4px", background: card.color, flexShrink: 0 }} />

          <Box
            sx={{
              p: { xs: 2.5, sm: 3.5 },
              position: "relative",
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            {/* Close button */}
            <IconButton
              onClick={handleClose}
              size="small"
              sx={{
                position: "absolute",
                top: 14,
                right: 14,
                width: 34,
                height: 34,
                color: "#475569",
                backgroundColor: "#F1F5F9",
                border: "1px solid #E2E8F0",
                zIndex: 2,
                "&:hover": {
                  backgroundColor: "#E2E8F0",
                  color: "#0F172A",
                },
              }}
            >
              <CloseRoundedIcon fontSize="small" />
            </IconButton>

            {/* Header — larger title/value text */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 2.5,
                flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "14px",
                  background: card.lightBg,
                  color: card.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1px solid ${card.lightBg}`,
                  flexShrink: 0,
                }}
              >
                {card.icon}
              </Box>

              <Box>
                <Typography
                  sx={{ fontSize: 15, fontWeight: 600, color: "#64748B" }}
                >
                  {card.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: "#0F172A",
                    lineHeight: 1.1,
                    mt: 0.2,
                  }}
                >
                  {card.value}
                </Typography>
              </Box>
            </Box>

            {!hasColumns && (
              <Typography sx={{ fontSize: 15, color: "#64748B" }}>
                {card.subtitle}
              </Typography>
            )}

            {hasColumns && notAvailable && (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography sx={{ color: "#94A3B8", fontSize: 15 }}>
                  Detailed breakdown isn't available yet for this category.
                </Typography>
              </Box>
            )}

            {hasColumns && !notAvailable && loading && (
              <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
                <CircularProgress size={28} sx={{ color: card.color }} />
              </Box>
            )}

            {hasColumns &&
              !notAvailable &&
              !loading &&
              rows &&
              rows.length === 0 && (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <Typography sx={{ color: "#94A3B8", fontSize: 15 }}>
                    No records found.
                  </Typography>
                </Box>
              )}

            {hasColumns &&
              !notAvailable &&
              !loading &&
              rows &&
              rows.length > 0 && (
                <>
                  <TableContainer
                    sx={{
                      borderRadius: "12px",
                      border: "1px solid #E2E8F0",
                      maxHeight: 420,
                      minHeight: 0,
                      "&::-webkit-scrollbar": { width: "6px", height: "6px" },
                      "&::-webkit-scrollbar-track": {
                        background: "transparent",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "#CBD5E1",
                        borderRadius: "10px",
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        background: card.color,
                      },
                      scrollbarWidth: "thin",
                      scrollbarColor: "#CBD5E1 transparent",
                    }}
                  >
                    <Table
                      size="medium"
                      stickyHeader
                      sx={{
                        tableLayout: "auto",
                        minWidth: 1050,
                      }}
                    >
                      {/* <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              width: 64,
                              fontWeight: 800,
                              fontSize: 14,
                              letterSpacing: "0.4px",
                              textTransform: "uppercase",
                              color: "#475569",
                              background: "#F8FAFC",
                              borderBottom: `2px solid ${card.color}`,
                            }}
                          >
                            S.No
                          </TableCell>
                          {columns.map((col) => (
                            <TableCell
                              key={col.key}
                              sx={{
                                width: COLUMN_WIDTHS[col.key] || 160,
                                fontWeight: 700,
                                fontSize: 13,
                                letterSpacing: "0.4px",
                                textTransform: "uppercase",
                                color: "#475569",
                                background: "#F8FAFC",
                                borderBottom: `2px solid ${card.color}`,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {col.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead> */}
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              width: 64,
                              fontWeight: 700,
                              fontSize: "14px",
                              fontFamily: "'Poppins', sans-serif",
                              color: "#FFFFFF",
                              background:
                                "linear-gradient(135deg, #24479A 0%, #2F6BF2 50%, #7C3AED 100%)",
                              borderBottom: "none",
                            }}
                          >
                            S.No
                          </TableCell>

                          {columns.map((col) => (
                            <TableCell
                              key={col.key}
                              sx={{
                                width: COLUMN_WIDTHS[col.key] || 160,
                                fontWeight: 700,
                                fontSize: "14px",
                                fontFamily: "'Poppins', sans-serif",
                                color: "#FFFFFF",
                                background:
                                  "linear-gradient(135deg, #24479A 0%, #2F6BF2 50%, #7C3AED 100%)",
                                borderBottom: "none",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {col.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row, i) => (
                          <TableRow
                            key={row.employeeId || i}
                            sx={{
                              background: i % 2 === 0 ? "#FFFFFF" : "#FAFBFF",
                              "&:hover": { background: card.lightBg },
                            }}
                          >
                            <TableCell
                              sx={{
                                color: "#94A3B8",
                                fontWeight: 600,
                                fontSize: 14.5,
                                borderBottom: "1px solid #F1F5F9",
                              }}
                            >
                              {page * rowsPerPage + i + 1}
                            </TableCell>
                            {columns.map((col) => (
                              <TableCell
                                key={col.key}
                                title={row[col.key] ?? ""}
                                sx={{
                                  color: "#334155",
                                  fontSize: 14.5,
                                  borderBottom: "1px solid #F1F5F9",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  maxWidth: COLUMN_WIDTHS[col.key] || 160,
                                }}
                              >
                                {col.key === "emailSentAt"
                                  ? row.emailSentAt
                                    ? new Date(row.emailSentAt).toLocaleString(
                                        "en-GB",
                                        {
                                          day: "2-digit",
                                          month: "short",
                                          hour: "2-digit",
                                          minute: "2-digit",
                                          hour12: true,
                                        },
                                      )
                                    : "—"
                                  : (row[col.key] ?? "—")}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {/* ===== PAGINATION ===== */}
                  {showPagination && (
                    <TablePagination
                      component="div"
                      count={totalCount}
                      page={page}
                      onPageChange={(e, newPage) => onPageChange(newPage)}
                      rowsPerPage={rowsPerPage}
                      rowsPerPageOptions={[rowsPerPage]}
                      sx={{
                        mt: 1,
                        flexShrink: 0,
                        ".MuiTablePagination-toolbar": { pl: 0 },
                        ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
                          {
                            fontSize: 13.5,
                            color: "#64748B",
                          },
                        ".MuiTablePagination-actions button": {
                          color: card.color,
                        },
                      }}
                    />
                  )}

                  {!showPagination && (
                    <Typography
                      sx={{
                        fontSize: 13,
                        color: "#94A3B8",
                        mt: 1.5,
                        flexShrink: 0,
                      }}
                    >
                      Showing {rows.length} record{rows.length !== 1 ? "s" : ""}
                    </Typography>
                  )}
                </>
              )}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default StatDetailModal;
