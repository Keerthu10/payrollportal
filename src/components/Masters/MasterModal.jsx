import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import GlobalModal from "../../ui/GlobalModal";

const MasterModal = ({
  open,
  handleClose,
  onSave,
  mode = "designation",
  record = null,
  showToast,
}) => {
  const getInitialData = () => ({
    name: "",
    status: "Active",
  });

  const [formData, setFormData] = useState(getInitialData());

  useEffect(() => {
    if (record) {
      setFormData({
        name: record.designationName || record.employmentType || "",
        status: record.status || "Active",
      });
    } else {
      setFormData({
        name: "",
        status: "Active",
      });
    }
  }, [record, open]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      const message =
        mode === "designation"
          ? "Designation Name is required"
          : "Employement Type is required";

      showToast("error", "Validation Error", message);
      return;
    }

    onSave(formData);
  };

  const fieldStyle = {
    width: "100%",

    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      backgroundColor: "#fff",
      height: "52px",
    },
  };

  const labelStyle = {
    fontSize: 13,
    fontWeight: 700,
    color: "#475569",
    mb: 1,
    textTransform: "uppercase",
  };

  return (
    <GlobalModal
      open={open}
      handleClose={handleClose}
      title={
        record
          ? `Edit ${mode === "designation" ? "Designation" : "Employement Type"}`
          : `Add ${mode === "designation" ? "Designation" : "Employement Type"}`
      }
      subtitle="Master Configuration"
      maxWidth={600}
      modalHeight="auto"
      actions={
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              setFormData({
                name: "",
                status: "Active",
              });
              handleClose();
            }}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              background: "linear-gradient(135deg,#2563EB,#1D4ED8)",

              "&:hover": {
                background: "linear-gradient(135deg,#1D4ED8,#1E40AF)",
              },
            }}
          >
            Save
          </Button>
        </Box>
      }
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography sx={labelStyle}>
            {mode === "designation" ? "Designation Name" : "Employement Type"}
          </Typography>

          <TextField
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={
              mode === "designation"
                ? "Enter Designation Name"
                : "Enter Employement Type"
            }
            sx={fieldStyle}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography sx={labelStyle}>Status</Typography>

          <TextField
            select
            fullWidth
            name="status"
            value={formData.status}
            onChange={handleChange}
            sx={fieldStyle}
          >
            <MenuItem value="Active">Active</MenuItem>

            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </GlobalModal>
  );
};

export default MasterModal;
