import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fade,
  Paper,
  CircularProgress,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useToast } from "../../context/ToastContext";

import GlobalModal from "../../ui/GlobalModal";
import { buildExportPayload } from "./ExportHelpers";
import { exportEmployeeReport } from "../../services/employeeService";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

// ---- Notion/Framer-inspired tokens ----
const ink = "#37352F"; // primary text
const inkSoft = "#787774"; // secondary text
const line = "#E9E9E7"; // hairline border
const lineHover = "#D3D1CB";
const surface = "#FBFBFA"; // subtle off-white panel
const accent = "#2383E2"; // sparse accent (selection only)
const accentTint = "#EDF3FC";

const ExportEmployeeModal = ({ open, handleClose, onExport }) => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const [reportType, setReportType] = useState("ALL");
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState("");
  const { showToast } = useToast();

  const handleExportClick = async () => {
    setExportError("");
    setIsExporting(true);

    try {
      // let exportFromDate = null;
      // let exportToDate = null;

      // switch (reportType) {
      //   case "ALL":
      //     exportFromDate = null;
      //     exportToDate = null;
      //     break;

      //   case "MONTHLY":
      //     exportFromDate = new Date(year, month - 1, 1);
      //     exportToDate = new Date(year, month, 0);
      //     break;

      //   case "QUARTERLY": {
      //     const startMonth = (quarter - 1) * 3;

      //     exportFromDate = new Date(year, startMonth, 1);
      //     exportToDate = new Date(year, startMonth + 3, 0);
      //     break;
      //   }

      //   case "HALF_YEARLY":
      //     if (halfYear === "H1") {
      //       exportFromDate = new Date(year, 0, 1);
      //       exportToDate = new Date(year, 6, 0);
      //     } else {
      //       exportFromDate = new Date(year, 6, 1);
      //       exportToDate = new Date(year, 12, 0);
      //     }
      //     break;

      //   case "YEARLY":
      //     exportFromDate = new Date(year, 0, 1);
      //     exportToDate = new Date(year, 11, 31);
      //     break;

      //   default:
      //     exportFromDate = fromDate?.toDate() || null;
      //     exportToDate = toDate?.toDate() || null;
      // }
      // const payload = buildExportPayload({
      //   fromDate: exportFromDate,
      //   toDate: exportToDate,
      // });

      let exportFromDate = null;
      let exportToDate = null;

      if (reportType === "CUSTOM") {
        if (!fromDate || !toDate) {
          showToast(
            "warn",
            "Date Range Required",
            "Please select both From Date and To Date.",
          );

          setIsExporting(false);
          return;
        }

        exportFromDate = fromDate.toDate();
        exportToDate = toDate.toDate();
      }

      const payload = buildExportPayload({
        fromDate: exportFromDate,
        toDate: exportToDate,
      });
      const response = await exportEmployeeReport(payload);

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      const today = new Date();
      const formattedDate = `${today.getFullYear()}-${String(
        today.getMonth() + 1,
      ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

      link.download = `employee_report_${formattedDate}.xlsx`;

      link.href = url;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
      showToast(
        "success",
        "Export Successful",
        "Employee report has been downloaded successfully.",
      );

      if (onExport) {
        onExport({
          reportType,
          fromDate: exportFromDate,
          toDate: exportToDate,
        });
      }

      handleClose();
    } catch (error) {
      console.error("Export failed:", error);
      showToast(
        "error",
        "Export Failed",
        "Unable to export employee report. Please try again.",
      );

      setExportError("Couldn't export the report. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  // const reportCards = [
  //   {
  //     value: "ALL",
  //     title: "All employees",
  //     subtitle: "Complete list",
  //     icon: "📋",
  //   },
  //   {
  //     value: "MONTHLY",
  //     title: "Monthly",
  //     subtitle: "By join month",
  //     icon: "📅",
  //   },
  //   { value: "QUARTERLY", title: "Quarterly", subtitle: "Q1 – Q4", icon: "📊" },
  //   {
  //     value: "HALF_YEARLY",
  //     title: "Half yearly",
  //     subtitle: "H1 & H2",
  //     icon: "📈",
  //   },
  //   { value: "YEARLY", title: "Yearly", subtitle: "Full year", icon: "📆" },
  // ];
  const reportCards = [
    {
      value: "ALL",
      title: "All Employees",
      subtitle: "Export the complete employee list",
      icon: "📋",
    },
    {
      value: "CUSTOM",
      title: "Custom Date",
      subtitle: "Export employees within a selected date range",
      icon: "🗓️",
    },
  ];

  return (
    <GlobalModal
      open={open}
      handleClose={handleClose}
      title="Export Employee Report"
      subtitle={
        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#ffffff",
              lineHeight: 1.6,
              color: "#fffff",
            }}
          >
            Download employee records in Excel format. Export all employees or
            filter employees by a custom joining date range.
          </Typography>
        </Box>
      }
      maxWidth={820}
      modalHeight="auto"
    >
      <Box sx={{ p: 1, fontFamily: "'Inter', -apple-system, sans-serif" }}>
        <Typography
          sx={{
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: inkSoft,
            mb: 2,
          }}
        >
          Report type
        </Typography>

        {/* Report type cards — icon + text in one row, 5 per row on desktop */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1.25,
          }}
        >
          {reportCards.map((card) => {
            const selected = reportType === card.value;

            return (
              <Box
                key={card.value}
                onClick={() => setReportType(card.value)}
                sx={{
                  position: "relative",
                  cursor: "pointer",
                  borderRadius: "10px",
                  border: `1px solid ${selected ? accent : line}`,
                  background: selected ? accentTint : "#fff",
                  p: 1.5,
                  flex: {
                    xs: "1 1 calc(50% - 10px)", // 2 per row on mobile
                    sm: "1 1 calc(33.33% - 10px)", // 3 per row on tablet
                    md: "1 1 calc(20% - 10px)", // 5 per row on desktop
                  },
                  minWidth: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.25,
                  transition:
                    "border-color 120ms ease, background 120ms ease, box-shadow 120ms ease",
                  "&:hover": {
                    borderColor: selected ? accent : lineHover,
                    boxShadow: selected
                      ? "none"
                      : "0 1px 4px rgba(15,15,15,0.06)",
                  },
                }}
              >
                {selected && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: accent,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CheckIcon sx={{ fontSize: 11, color: "#fff" }} />
                  </Box>
                )}

                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    flexShrink: 0,
                    borderRadius: "8px",
                    background: selected ? "#fff" : surface,
                    border: `1px solid ${selected ? accent : line}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    lineHeight: 1,
                  }}
                >
                  {card.icon}
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: "13.5px",
                      fontWeight: 600,
                      color: ink,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "11.5px",
                      color: inkSoft,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {card.subtitle}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Dynamic Filters */}
        {/* <Fade in={reportType !== "ALL"}>
          <Box>
            {reportType !== "ALL" && (
              <Paper
                elevation={0}
                sx={{
                  mt: 3,
                  p: 2.5,
                  borderRadius: "10px",
                  background: surface,
                  border: `1px solid ${line}`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: inkSoft,
                    mb: 2,
                  }}
                >
                  Filters
                </Typography>

                <Grid container spacing={2}>
                  {fromDate && toDate && (
                    <Box
                      sx={{
                        mt: 3,
                        p: 2,
                        borderRadius: "10px",
                        background: "#F8FAFC",
                        border: "1px solid #E5E7EB",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          color: "#6B7280",
                          mb: 1,
                        }}
                      >
                        Join Date Range
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: 600,
                          color: "#2563EB",
                        }}
                      >
                        {fromDate?.format("DD MMM YYYY")} →{" "}
                        {toDate?.format("DD MMM YYYY")}
                      </Typography>
                    </Box>
                  )}
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="From Date"
                          value={fromDate}
                          onChange={(newValue) => setFromDate(newValue)}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              size: "small",
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="To Date"
                          value={toDate}
                          onChange={(newValue) => setToDate(newValue)}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              size: "small",
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            )}
          </Box>
        </Fade> */}
        {/* Dynamic Filters */}
        <Fade in={reportType === "CUSTOM"}>
          <Box>
            {reportType === "CUSTOM" && (
              <Paper
                elevation={0}
                sx={{
                  mt: 3,
                  p: 2.5,
                  borderRadius: "10px",
                  background: surface,
                  border: `1px solid ${line}`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: inkSoft,
                    mb: 2,
                  }}
                >
                  Custom Date Range
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="From Date"
                        value={fromDate}
                        onChange={(newValue) => setFromDate(newValue)}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            size: "small",
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="To Date"
                        value={toDate}
                        onChange={(newValue) => setToDate(newValue)}
                        minDate={fromDate}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            size: "small",
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>

                {fromDate && toDate && (
                  <Box
                    sx={{
                      mt: 2,
                      p: 2,
                      borderRadius: "8px",
                      background: "#F8FAFC",
                      border: "1px solid #E5E7EB",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        color: "#6B7280",
                        mb: 1,
                      }}
                    >
                      Selected Join Date Range
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#2563EB",
                      }}
                    >
                      {fromDate.format("DD MMM YYYY")} →{" "}
                      {toDate.format("DD MMM YYYY")}
                    </Typography>
                  </Box>
                )}
              </Paper>
            )}
          </Box>
        </Fade>

        {exportError && (
          <Typography sx={{ fontSize: "13px", color: "#D1453B", mt: 2 }}>
            {exportError}
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1.5,
            mt: 3.5,
            pt: 2.5,
            borderTop: `1px solid ${line}`,
          }}
        >
          <Button
            variant="outlined"
            onClick={handleClose}
            disabled={isExporting}
            sx={{
              borderRadius: "8px",
              px: 3,
              py: 0.9,
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "none",
              color: ink,
              borderColor: line,
              "&:hover": { borderColor: lineHover, background: surface },
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleExportClick}
            disableElevation
            disabled={isExporting}
            startIcon={
              isExporting ? (
                <CircularProgress size={14} sx={{ color: "#fff" }} />
              ) : null
            }
            sx={{
              borderRadius: "8px",
              px: 3,
              py: 0.9,
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "none",
              background: ink,
              color: "#fff",
              "&:hover": { background: "#2A2825" },
              "&.Mui-disabled": { background: "#8C8A85", color: "#fff" },
            }}
          >
            {isExporting ? "Exporting…" : "Export"}
          </Button>
        </Box>
      </Box>
    </GlobalModal>
  );
};

export default ExportEmployeeModal;
