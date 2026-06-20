import React from "react";

import {
  Paper,
  Box,
  TextField,
  MenuItem,
  Button,
  InputAdornment,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

const EmployeeFilters = ({
  search,
  setSearch,
  department,
  setDepartment,
  status,
  setStatus,
}) => {
  const handleReset = () => {
    setSearch("");
    setDepartment("");
    setStatus("");
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 4,
        borderRadius: "24px",
        background: "linear-gradient(135deg,#1E1B6D 0%, #2B256F 100%)",

        border: "1px solid rgba(255,255,255,0.08)",

        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Search */}
        <TextField
          fullWidth
          placeholder="Search Employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            flex: 1,

            "& .MuiOutlinedInput-root": {
              color: "#fff",

              borderRadius: "14px",

              "& fieldset": {
                borderColor: "rgba(255,255,255,0.15)",
              },

              "&:hover fieldset": {
                borderColor: "rgba(255,255,255,0.3)",
              },
            },

            "& input::placeholder": {
              color: "#CBD5E1",
              opacity: 1,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Department */}
        <TextField
          select
          label="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          sx={{
            width: 180,

            "& .MuiOutlinedInput-root": {
              color: "#fff",

              borderRadius: "14px",

              "& fieldset": {
                borderColor: "rgba(255,255,255,0.15)",
              },
            },

            "& .MuiInputLabel-root": {
              color: "#CBD5E1",
            },

            "& .MuiSvgIcon-root": {
              color: "#fff",
            },
          }}
        >
          <MenuItem value="">All Departments</MenuItem>
          <MenuItem value="Engineering">Engineering</MenuItem>
          <MenuItem value="HR">HR</MenuItem>
          <MenuItem value="Finance">Finance</MenuItem>
        </TextField>

        {/* Status */}
        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{
            width: 180,

            "& .MuiOutlinedInput-root": {
              color: "#fff",

              borderRadius: "14px",

              "& fieldset": {
                borderColor: "rgba(255,255,255,0.15)",
              },
            },

            "& .MuiInputLabel-root": {
              color: "#CBD5E1",
            },

            "& .MuiSvgIcon-root": {
              color: "#fff",
            },
          }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>

        {/* Reset */}
        <Button
          startIcon={<RestartAltRoundedIcon />}
          onClick={handleReset}
          sx={{
            height: "40px",

            width: "120px",

            borderRadius: "14px",

            textTransform: "none",

            background: "linear-gradient(135deg,#7C3AED 0%,#2563EB 100%)",

            fontWeight: 600,

            color:"#fff"
          }}
        >
          Reset
        </Button>
      </Box>
    </Paper>
  );
};

export default EmployeeFilters;
