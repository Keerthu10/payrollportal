import React from "react";

import { Box, Paper, Button, TextField, InputAdornment } from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Dropdown } from "primereact/dropdown";

const verificationOptions = [
  { label: "Verified", value: true },
  { label: "Unverified", value: false },
];

const PayslipFilter = ({
  filters,
  onFilterChange,
  onBulkDownload,
  onReset,
  fromMonth,
  toMonth,
  setFromMonth,
  setToMonth,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: "24px",
        background: "linear-gradient(135deg,#1E1B6D 0%, #2B256F 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Search */}
        <TextField
          placeholder="Search Employee..."
          value={filters?.search || ""}
          onChange={(e) => onFilterChange("search", e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon sx={{ color: "#94A3B8" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            flex: 1,
            width: "100%",
            minWidth: {
              xs: "100%",
              md: 350,
            },

            "& .MuiOutlinedInput-root": {
              height: 56,
              borderRadius: "14px",
              color: "#fff",

              "& fieldset": {
                borderColor: "rgba(255,255,255,0.15)",
              },

              "&:hover fieldset": {
                borderColor: "rgba(255,255,255,0.30)",
              },
            },

            "& input::placeholder": {
              color: "#CBD5E1",
              opacity: 1,
            },
          }}
        />

        <Box
          sx={{
            width: {
              xs: "100%",
              md: 220,
            },
          }}
        >
          <Dropdown
            value={filters?.emailVerified}
            options={verificationOptions}
            optionLabel="label"
            optionValue="value"
            placeholder="Email Verification"
            onChange={(e) => onFilterChange("emailVerified", e.value)}
            style={{
              width: "100%",
              height: "56px",
            }}
          />
        </Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ width: { xs: "100%", md: 220 } }}>
            <DatePicker
              label="From Month"
              views={["year", "month"]}
              value={fromMonth}
              onChange={(newValue) => setFromMonth(newValue)}
              format="MMMM YYYY"
              slotProps={{
                textField: {
                  placeholder: "From Month",
                },
              }}
              sx={{
                width: "100%",

                "& .MuiPickersInputBase-root": {
                  height: 56,
                  background: "#2B256F",
                  borderRadius: "14px",
                  color: "#fff",
                },

                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.15)",
                },

                "& .MuiSvgIcon-root": {
                  color: "#fff",
                },

                "& .MuiInputBase-input": {
                  color: "#fff",
                },

                "& .MuiInputLabel-root": {
                  color: "#fff",
                },

                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#fff",
                },
              }}
            />
          </Box>

          <Box sx={{ width: { xs: "100%", md: 220 } }}>
            <DatePicker
              label="To Month"
              views={["year", "month"]}
              value={toMonth}
              onChange={(newValue) => setToMonth(newValue)}
              format="MMMM YYYY"
              slotProps={{
                textField: {
                  placeholder: "To Month",
                },
              }}
              sx={{
                width: "100%",

                "& .MuiPickersInputBase-root": {
                  height: 56,
                  background: "#2B256F",
                  borderRadius: "14px",
                  color: "#fff",
                },

                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.15)",
                },

                "& .MuiSvgIcon-root": {
                  color: "#fff",
                },

                "& .MuiInputBase-input": {
                  color: "#fff",
                },

                "& .MuiInputLabel-root": {
                  color: "#fff",
                },

                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#fff",
                },
              }}
            />
          </Box>
        </LocalizationProvider>

        <Box
          sx={{
            width: {
              xs: "100%",
              md: "auto",
            },
          }}
        >
          <Button
            fullWidth
            variant="contained"
            onClick={onBulkDownload}
            sx={{
              height: 56,
              px: 4,
              borderRadius: "14px",
              textTransform: "none",
              fontWeight: 600,
              background: "linear-gradient(90deg,#059669,#10B981)",

              "&:hover": {
                background: "linear-gradient(90deg,#047857,#059669)",
              },
            }}
          >
            Download All
          </Button>
        </Box>

        {/* Reset */}
        <Box
          sx={{
            width: {
              xs: "100%",
              md: "auto",
            },
          }}
        >
          <Button
            fullWidth
            variant="contained"
            startIcon={<RefreshRoundedIcon />}
            onClick={onReset}
            sx={{
              height: 56,
              px: 4,
              borderRadius: "14px",
              textTransform: "none",
              fontWeight: 600,
              background: "linear-gradient(90deg,#7C3AED,#2563EB)",

              "&:hover": {
                background: "linear-gradient(90deg,#6D28D9,#1D4ED8)",
              },
            }}
          >
            Reset
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default PayslipFilter;
