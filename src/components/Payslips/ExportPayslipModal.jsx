import React, { useState } from "react";

import { Box, Typography, Button } from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";

import GlobalModal from "../../ui/GlobalModal";

import { exportPayslipReport } from "../../services/payroll";
import { useToast } from "../../context/ToastContext";

const ExportPayslipModal = ({
  open,
  handleClose,
  selectedMonth,
  search,
  emailVerified,
  status,
}) => {
  const { showToast } = useToast();

  const [isExporting, setIsExporting] = useState(false);

  const [reportType, setReportType] = useState("CURRENT");

  const [customMonth, setCustomMonth] = useState(dayjs());

  const accent = "#2F80ED";
  const accentTint = "#F2F8FF";
  const line = "#D9E2F1";
  const lineHover = "#B8C7E6";
  const ink = "#1F2937";
  const inkSoft = "#6B7280";
  const surface = "#F8FAFC";

  const reportCards = [
    {
      value: "CURRENT",
      title: "Current Month",
      subtitle: "Export selected month payslips",
      icon: "📋",
    },
    {
      value: "CUSTOM",
      title: "Custom Month",
      subtitle: "Choose another month",
      icon: "🗓️",
    },
  ];

  const handleExportClick = async () => {
    try {
      setIsExporting(true);

      let exportMonth;
      let exportYear;

      if (reportType === "CURRENT") {
        exportMonth = Number(selectedMonth.format("MM"));
        exportYear = Number(selectedMonth.format("YYYY"));
      } else {
        exportMonth = Number(customMonth.format("MM"));
        exportYear = Number(customMonth.format("YYYY"));
      }

      const payload = {
        search,
        month: exportMonth,
        year: exportYear,
        emailVerified,
        status,
      };

      const response = await exportPayslipReport(payload);

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = `Payslip_Report_${exportMonth}_${exportYear}.xlsx`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

      showToast(
        "success",
        "Export Successful",
        "Payslip report downloaded successfully.",
      );

      handleClose();
    } catch (error) {
      console.error(error);

      showToast("error", "Export Failed", "Unable to export payslip report.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <GlobalModal
      open={open}
      handleClose={handleClose}
      title="Export Payslip Report"
      maxWidth={820}
      modalHeight="auto"
    >
      <Box sx={{ p: 1 }}>
        <Typography
          sx={{
            fontSize: "14px",
            color: "#64748B",
            mb: 3,
          }}
        >
          Download payslip reports in Excel format for the selected month.
        </Typography>

        <Typography
          sx={{
            fontSize: "13px",
            fontWeight: 600,
            textTransform: "uppercase",
            color: inkSoft,
            mb: 2,
          }}
        >
          Report Type
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            flexWrap: "wrap",
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
                  flex: "1 1 250px",
                  display: "flex",
                  alignItems: "center",
                  gap: 1.25,
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
                    <CheckIcon
                      sx={{
                        fontSize: 11,
                        color: "#fff",
                      }}
                    />
                  </Box>
                )}

                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: "8px",
                    background: selected ? "#fff" : surface,
                    border: `1px solid ${selected ? accent : line}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                  }}
                >
                  {card.icon}
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: ink,
                    }}
                  >
                    {card.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: inkSoft,
                    }}
                  >
                    {card.subtitle}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

        {reportType === "CUSTOM" && (
          <Box sx={{ mt: 3 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Month & Year"
                views={["year", "month"]}
                value={customMonth}
                onChange={(value) => setCustomMonth(value)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            mt: 4,
          }}
        >
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleExportClick}
            disabled={isExporting}
          >
            {isExporting ? "Exporting..." : "Export"}
          </Button>
        </Box>
      </Box>
    </GlobalModal>
  );
};

export default ExportPayslipModal;
