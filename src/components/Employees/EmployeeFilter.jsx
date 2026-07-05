import React, { useState, useEffect } from "react";

import {
  Paper,
  Box,
  TextField,
  MenuItem,
  Button,
  InputAdornment,
} from "@mui/material";
import { Dropdown } from "primereact/dropdown";
import { getDesignationInfo } from "../../services/designationService";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

const EmployeeFilters = ({
  search,
  setSearch,
  designation,
  setDesignation,
  status,
  setStatus,
}) => {
  const [designations, setDesignations] = useState([]);
  useEffect(() => {
    loadDesignation();
  }, []);

  const loadDesignation = async () => {
    try {
      const response = await getDesignationInfo();
      setDesignations(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleReset = () => {
    setSearch("");
    setDesignation("");
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
        {/* <FormControl
          sx={{
            width: 220,

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

            "& .MuiInputLabel-root": {
              color: "#CBD5E1",
            },

            "& .MuiSvgIcon-root": {
              color: "#fff",
            },
          }}
        >
          <InputLabel>Department</InputLabel>

          <Select
            value={department}
            label="Department"
            onChange={(e) => setDepartment(e.target.value)}
          >
            <MenuItem value="">All Departments</MenuItem>

            {departments.map((dept) => (
              <MenuItem key={dept.departmentId} value={dept.departmentName}>
                {dept.departmentName}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        <Box sx={{ width: 220 }}>
          <Dropdown
            className="designation-dropdown"
            value={designation}
            options={[{ designationName: "All Designation" }, ...designations]}
            optionLabel="designationName"
            optionValue="designationName"
            onChange={(e) => setDesignation(e.value)}
            placeholder="Designation"
            filter
            filterPlaceholder="Search Designation..."
            filterBy="designationName"
          />
        </Box>

        {/* Status */}
        <Box sx={{ width: 180 }}>
          <Dropdown
            value={status}
            options={[
              { label: "All", value: "" },
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" },
            ]}
            optionLabel="label"
            optionValue="value"
            onChange={(e) => setStatus(e.value)}
            placeholder="Status"
            className="filter-"
            filter
            filterBy="label"
            filterPlaceholder="Search Status..."
          />
        </Box>

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

            color: "#fff",
          }}
        >
          Reset
        </Button>
      </Box>
    </Paper>
  );
};

export default EmployeeFilters;
