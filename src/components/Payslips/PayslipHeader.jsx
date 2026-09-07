import React from "react";

import { Box, Typography, Button, Paper } from "@mui/material";
import dayjs from "dayjs";

import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const PayslipHeader = ({ onExportReport, selectedMonth, setSelectedMonth }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: {
          xs: 2,
          sm: 3,
          md: 4,
        },
        mb: 4,
        borderRadius: {
          xs: "24px",
          md: "32px",
        },
        background: "linear-gradient(135deg,#1E1B6D 0%, #2B256F 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Blur Effect */}
      <Box
        sx={{
          position: "absolute",
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: "rgba(124,58,237,0.20)",
          filter: "blur(100px)",
          top: -100,
          right: -50,
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          alignItems: {
            xs: "center",
            md: "center",
          },
          justifyContent: "space-between",
          gap: 2,
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* LEFT SIDE */}
        <Box
          sx={{
            width: {
              xs: "100%",
              md: "auto",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: {
                  xs: 48,
                  md: 60,
                },
                height: {
                  xs: 48,
                  md: 60,
                },
                borderRadius: "18px",
                background: "linear-gradient(135deg,#8B5CF6 0%,#2563EB 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 25px rgba(139,92,246,0.35)",
              }}
            >
              <ReceiptLongRoundedIcon
                sx={{
                  color: "#fff",
                  fontSize: 32,
                }}
              />
            </Box>

            <Box
              sx={{
                textAlign: {
                  xs: "center",
                  md: "left",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: "15px",
                    md: "22px",
                  },
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.1,
                }}
              >
                Payslip Center
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  color: "rgba(255,255,255,0.75)",
                  fontSize: {
                    xs: "13px",
                    md: "16px",
                  },
                }}
              >
                Track employee payslips and delivery status
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* RIGHT SIDE */}
        {/* <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            startIcon={<DownloadRoundedIcon />}
            onClick={onExportReport}
            sx={{
              height: 52,
              px: 4,
              borderRadius: "14px",
              textTransform: "none",
              fontWeight: 600,
              background: "linear-gradient(90deg,#7C3AED,#2563EB)",
              boxShadow: "0 10px 25px rgba(59,130,246,0.35)",

              "&:hover": {
                background: "linear-gradient(90deg,#6D28D9,#1D4ED8)",
              },
            }}
          >
            Export Report
          </Button>
        </Box> */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
            width: {
              xs: "100%",
              md: "auto",
            },
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={["year", "month"]}
              value={selectedMonth}
              onChange={(newValue) => {
                if (newValue) {
                  setSelectedMonth(newValue);
                }
              }}
              format="MMMM YYYY"
              disableFuture
              maxDate={dayjs()}
              sx={{
                width: {
                  xs: "100%",
                  sm: 220,
                },
                minWidth: {
                  xs: "100%",
                  sm: 220,
                },

                "& .MuiPickersInputBase-root": {
                  height: {
                    xs: 52,
                    md: 56,
                  },
                  background: "#2B256F",
                  borderRadius: "14px",
                  color: "#fff",
                  border: "2px solid #FFFFFF", // White Border
                },

                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },

                "& .MuiSvgIcon-root": {
                  color: "#fff",
                },

                "& .MuiInputBase-input": {
                  color: "#fff",
                  fontWeight: 500,
                },
              }}
            />
          </LocalizationProvider>

          <Button
            variant="outlined"
            startIcon={<FileDownloadRoundedIcon />}
            onClick={onExportReport}
            sx={{
              height: 52,
              px: 3,
              borderRadius: "14px",
              color: "#fff",
              borderColor: "rgba(255,255,255,0.15)",
              textTransform: "none",
              fontWeight: 600,
              border: "2px solid #FFFFFF",

              "&:hover": {
                borderColor: "#fff",
                background: "rgba(255,255,255,0.05)",
              },
            }}
          >
            Export Report
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default PayslipHeader;
