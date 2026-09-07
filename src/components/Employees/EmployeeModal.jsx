import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  Box,
  FormControl,
  Select,
  FormHelperText,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import InputAdornment from "@mui/material/InputAdornment";
import { Dropdown } from "primereact/dropdown";

import GlobalModal from "../../ui/GlobalModal";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import { getDesignationInfo } from "../../services/designationService";
import { getEmploymentTypeInfo } from "../../services/EmploymentType";
import { getNextEmployeeId } from "../../services/employeeService";

const EmployeeModal = ({
  open,
  handleClose,
  onSave,
  mode,
  employee,
  handleResendVerification,
}) => {
  const [errors, setErrors] = useState({});
  const [designations, setDesignations] = useState([]);
  const [employmentTypes, setemploymentTypes] = useState([]);
  const loadDesignations = async () => {
    try {
      const response = await getDesignationInfo();

      console.log("Designation Response:", response);
      console.log("Designation Data:", response.data);

      setDesignations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loademploymentTypes = async () => {
    try {
      const response = await getEmploymentTypeInfo();

      console.log("Employement Response:", response);
      console.log("Employement Data:", response.data);

      setemploymentTypes(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadDesignations();
    loademploymentTypes();
  }, []);

  const getInitialFormData = () => ({
    employeeId: "",
    joinDate: new Date().toISOString().split("T")[0],
    dob: "",
    fullName: "",
    email: "",
    phone: "",
    designation: "",
    employmentType: "",
    location: "",
    bankName: "",
    bankAccountNo: "",
    ifscCode: "",
    panNo: "",
    uanNo: "",
    status: "Active",
  });

  const [formData, setFormData] = useState(getInitialFormData());

  const loadEmployeeId = async () => {
    try {
      const response = await getNextEmployeeId();

      setFormData((prev) => ({
        ...prev,
        employeeId: response.data.nextEmployeeId,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (open && mode === "add") {
      setFormData(getInitialFormData());
      loadEmployeeId();
    }

    if (employee) {
      console.log("Employee Edit Data:", employee);
      setFormData({
        employeeId: employee.employeeId,
        joinDate: employee.joinDate,
        fullName: employee.name,
        email: employee.email,
        phone: employee.phone,
        designation: employee.designation,
        employmentType: employee.employmentType || "",
        reportingManager: employee.reportingManager || "",
        location: employee.location,
        status: employee.active ? "Active" : "Inactive",

        dob: employee.dateOfBirth || "",
        bankName: employee.bankName || "",
        bankAccountNo: employee.bankAccountNo || "",
        ifscCode: employee.ifscCode || "",
        panNo: employee.panNo || "",
        uanNo: employee.uanNo || "",
      });
    }
  }, [open, mode, employee]);

  const validateField = (name, value) => {
    const v = value ?? "";
    switch (name) {
      case "fullName":
        return !v.trim() ? "Full Name is required" : "";
      case "email":
        return !v.trim()
          ? "Email is required"
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
            ? "Invalid email"
            : "";
      case "phone":
        return !v
          ? "Phone Number is required"
          : !/^\d{10}$/.test(v)
            ? "Phone Number must contain 10 digits"
            : "";
      case "dob":
        return !v ? "Date of Birth is required" : "";
      case "designation":
        return !v ? "Designation is required" : "";
      case "employmentType":
        return !v ? "Employement Type is required" : "";
      case "location":
        return !v.trim() ? "Location is required" : "";
      case "bankName":
        return !v.trim() ? "Bank Name is required" : "";
      case "bankAccountNo":
        return !v.trim()
          ? "Bank Account Number is required"
          : !/^\d{9,18}$/.test(v)
            ? "Invalid Account Number"
            : "";
      case "ifscCode":
        return !v.trim()
          ? "IFSC Code is required"
          : !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(v.toUpperCase())
            ? "Invalid IFSC Code"
            : "";
      case "panNo":
        return !v.trim()
          ? "PAN Number is required"
          : !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(v.toUpperCase())
            ? "Invalid PAN Number"
            : "";
      case "uanNo":
        return !v.trim()
          ? "UAN Number is required"
          : !/^\d{12}$/.test(v)
            ? "UAN Number must contain 12 digits"
            : "";
      default:
        return "";
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  

  const handleSubmit = () => {
    const tempErrors = {};

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);

      if (error) {
        tempErrors[field] = error;
      }
    });

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length > 0) {
      return;
    }

    const payload = {
      name: formData.fullName,
      email: formData.email,
      dateOfBirth: formData.dob,
      phone: formData.phone,
      designation: formData.designation,
      employmentType: formData.employmentType,
      location: formData.location,
      joinDate: formData.joinDate,
      exitDate: "",
      bankName: formData.bankName,
      bankAccountNo: formData.bankAccountNo,
      ifscCode: formData.ifscCode,
      panNo: formData.panNo,
      uanNo: formData.uanNo,
      active: formData.status === "Active",
    };

    onSave(payload);

    setFormData(getInitialFormData());
    setErrors({});
    handleClose();
  };

  const fieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      backgroundColor: "#fff",
      height: 52,
      display: "flex",
      alignItems: "center",
    },

    "& .MuiInputBase-root": {
      width: "100%",
    },

    "& .MuiOutlinedInput-input": {
      padding: "0 14px",
      height: "100%",
      boxSizing: "border-box",
    },

    "& input[type='date']::-webkit-calendar-picker-indicator": {
      background: "transparent",
      cursor: "pointer",
      opacity: 0,
      position: "absolute",
      right: 0,
      width: "36px",
      height: "100%",
    },
  };

  const labelStyle = {
    fontSize: 13,
    fontWeight: 700,
    color: "#475569",
    mb: 1,
    textTransform: "uppercase",
  };

  const handleModalClose = () => {
    setErrors({});
    setFormData(getInitialFormData());
    handleClose();
  };

  const statusOptions = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
  ];

  return (
    <GlobalModal
      open={open}
      handleClose={handleModalClose}
      title={mode === "add" ? "Add Employee" : "Edit Employee"}
      subtitle="Create and manage employee records"
      maxWidth={850}
      actions={
        <>
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
              onClick={handleModalClose}
              sx={{
                borderRadius: "12px",
                px: 3,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                borderRadius: "12px",
                px: 4,
                textTransform: "none",
                fontWeight: 600,
                background: "linear-gradient(135deg,#2563EB,#1D4ED8)",

                "&:hover": {
                  background: "linear-gradient(135deg,#1D4ED8,#1E40AF)",
                },
              }}
            >
              {mode === "add" ? "Save Employee" : "Update Employee"}
            </Button>
          </Box>
        </>
      }
    >
      <Box
        sx={{
          width: "100%",
          pt: 1,
        }}
      >
        <Grid container rowSpacing={3} columnSpacing={3}>
          {/* Row 1 */}

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={labelStyle}>
              Employee ID
              <Box
                component="span"
                sx={{
                  color: "error.main",
                  fontSize: "13px",
                  fontWeight: 700,
                  ml: 0.3,
                  verticalAlign: "middle",
                  visibility: "hidden",
                }}
              >
                *
              </Box>
            </Typography>
            <TextField
              fullWidth
              disabled
              value={formData.employeeId}
              sx={fieldStyle}
              InputProps={{
                sx: {
                  height: 52,
                  alignItems: "center",
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={labelStyle}>
              Join Date
              <Box
                component="span"
                sx={{
                  color: "error.main",
                  fontSize: "13px",
                  fontWeight: 700,
                  ml: 0.3,
                  verticalAlign: "middle",
                }}
              >
                *
              </Box>
            </Typography>

            <Box sx={{ position: "relative" }}>
              <TextField
                type="date"
                name="joinDate"
                fullWidth
                value={formData.joinDate}
                onChange={handleChange}
                error={!!errors.joinDate}
                helperText={errors.joinDate}
                sx={fieldStyle}
              />
              <CalendarTodayRoundedIcon
                sx={{
                  position: "absolute",
                  right: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: 20,
                  color: "#6D5DFB",
                  pointerEvents: "none",
                }}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={labelStyle}>
              Full Name
              <Box
                component="span"
                sx={{
                  color: "error.main",
                  fontSize: "13px", // Increase size
                  fontWeight: 700,
                  ml: 0.3,
                  verticalAlign: "middle",
                }}
              >
                *
              </Box>
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter employee full name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={!!errors.fullName}
              helperText={errors.fullName}
              sx={fieldStyle}
            />
          </Grid>

          {/* Row 2 */}

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={labelStyle}>
              Corporate Email
              <Box
                component="span"
                sx={{
                  color: "error.main",
                  fontSize: "13px", // Increase size
                  fontWeight: 700,
                  ml: 0.3,
                  verticalAlign: "middle",
                }}
              >
                *
              </Box>
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter employee email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={fieldStyle}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CheckCircleIcon color="success" />
                  </InputAdornment>
                ),
              }}
            />

            {mode !== "add" && !employee?.verified && (
              <Box sx={{ mt: 1 }}>
                <Typography color="error" variant="caption">
                  Email not verified
                </Typography>

                <Button
                  size="small"
                  variant="text"
                  onClick={handleResendVerification}
                  sx={{
                    textTransform: "none",
                    ml: 1,
                  }}
                >
                  Resend Verification Email
                </Button>
              </Box>
            )}
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={labelStyle}>
              Date of Birth
              <Box
                component="span"
                sx={{
                  color: "error.main",
                  fontSize: "13px",
                  fontWeight: 700,
                  ml: 0.3,
                  verticalAlign: "middle",
                }}
              >
                *
              </Box>
            </Typography>

            <Box sx={{ position: "relative" }}>
              <TextField
                type="date"
                fullWidth
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                error={!!errors.dob}
                helperText={errors.dob}
                sx={fieldStyle}
              />
              <CalendarTodayRoundedIcon
                sx={{
                  position: "absolute",
                  right: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: 20,
                  color: "#6D5DFB",
                  pointerEvents: "none",
                }}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={labelStyle}>
              Phone Number
              <Box
                component="span"
                sx={{
                  color: "error.main",
                  fontSize: "13px", // Increase size
                  fontWeight: 700,
                  ml: 0.3,
                  verticalAlign: "middle",
                }}
              >
                *
              </Box>
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter Phone Number"
              name="phone"
              value={formData.phone}
              error={!!errors.phone}
              helperText={errors.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");

                if (value.length <= 10) {
                  setFormData((prev) => ({
                    ...prev,
                    phone: value,
                  }));

                  setErrors((prev) => ({
                    ...prev,
                    phone:
                      value.length === 10
                        ? ""
                        : "Phone Number must contain 10 digits",
                  }));
                }
              }}
              sx={fieldStyle}
            />
          </Grid>

          {/* Row 3 */}

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={labelStyle}>
              Designation
              <Box
                component="span"
                sx={{
                  color: "error.main",
                  fontSize: "13px", // Increase size
                  fontWeight: 700,
                  ml: 0.3,
                  verticalAlign: "middle",
                }}
              >
                *
              </Box>
            </Typography>

            <Dropdown
              value={formData.designation}
              options={designations}
              optionLabel="designationName"
              optionValue="designationName"
              className={`modal-dropdown ${errors.designation ? "p-invalid" : ""}`}
              placeholder="Select Designation"
              filter
              appendTo={document.body}
              autoZIndex={true}
              baseZIndex={10000}
              panelStyle={{ zIndex: 99999 }}
              style={{ width: "100%" }}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "designation",
                    value: e.value,
                  },
                })
              }
            />
            {errors.designation && (
              <small
                style={{
                  color: "#d32f2f",
                  display: "block",
                  marginTop: "4px",
                  fontSize: "12px",
                }}
              >
                {errors.designation}
              </small>
            )}
          </Grid>

          {/* <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={labelStyle}>Designation</Typography>
            <TextField
              fullWidth
              name="designation"
              placeholder="Enter designation"
              value={formData.designation}
              onChange={handleChange}
              error={!!errors.designation}
              helperText={errors.designation}
              sx={fieldStyle}
            />
          </Grid> */}

          {/* Row 4 */}

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={labelStyle}>
              Employement Type
              <Box
                component="span"
                sx={{
                  color: "error.main",
                  fontSize: "13px", // Increase size
                  fontWeight: 700,
                  ml: 0.3,
                  verticalAlign: "middle",
                }}
              >
                *
              </Box>
            </Typography>

            <Dropdown
              value={formData.employmentType}
              options={employmentTypes}
              optionLabel="jobType"
              optionValue="jobType"
              className={`modal-dropdown ${errors.employmentType ? "p-invalid" : ""}`}
              placeholder="Select Employement Type"
              filter
              appendTo={document.body}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "employmentType",
                    value: e.value,
                    
                  },
                })
              }
            />
            {errors.employmentType && (
              <small
                style={{
                  color: "#d32f2f",
                  display: "block",
                  marginTop: "4px",
                  fontSize: "12px",
                }}
              >
                {errors.employmentType}
              </small>
            )}
          </Grid>

          {/* Row 5 */}

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={labelStyle}>
              Location
              <Box
                component="span"
                sx={{
                  color: "error.main",
                  fontSize: "13px", // Increase size
                  fontWeight: 700,
                  ml: 0.3,
                  verticalAlign: "middle",
                }}
              >
                *
              </Box>
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              error={!!errors.location}
              helperText={errors.location}
              sx={fieldStyle}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={labelStyle}>
              Bank Name
              <Box
                component="span"
                sx={{
                  color: "error.main",
                  fontSize: "13px", // Increase size
                  fontWeight: 700,
                  ml: 0.3,
                  verticalAlign: "middle",
                }}
              >
                *
              </Box>
            </Typography>
            <TextField
              fullWidth
              name="bankName"
              placeholder="Enter bank name"
              value={formData.bankName}
              onChange={handleChange}
              error={!!errors.bankName}
              helperText={errors.bankName}
              sx={fieldStyle}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={labelStyle}>
              Bank Account Number
              <Box
                component="span"
                sx={{
                  color: "error.main",
                  fontSize: "13px", // Increase size
                  fontWeight: 700,
                  ml: 0.3,
                  verticalAlign: "middle",
                }}
              >
                *
              </Box>
            </Typography>
            <TextField
              fullWidth
              name="bankAccountNo"
              placeholder="Enter account number"
              value={formData.bankAccountNo}
              onChange={handleChange}
              error={!!errors.bankAccountNo}
              helperText={errors.bankAccountNo}
              sx={fieldStyle}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={labelStyle}>
              IFSC Code
              <Box
                component="span"
                sx={{
                  color: "error.main",
                  fontSize: "13px", // Increase size
                  fontWeight: 700,
                  ml: 0.3,
                  verticalAlign: "middle",
                }}
              >
                *
              </Box>
            </Typography>
            <TextField
              fullWidth
              name="ifscCode"
              placeholder="Enter IFSC code"
              value={formData.ifscCode}
              onChange={handleChange}
              error={!!errors.ifscCode}
              helperText={errors.ifscCode}
              sx={fieldStyle}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={labelStyle}>
              PAN Number
              <Box
                component="span"
                sx={{
                  color: "error.main",
                  fontSize: "13px", // Increase size
                  fontWeight: 700,
                  ml: 0.3,
                  verticalAlign: "middle",
                }}
              >
                *
              </Box>
            </Typography>
            <TextField
              fullWidth
              name="panNo"
              placeholder="Enter PAN number"
              value={formData.panNo}
              onChange={handleChange}
              error={!!errors.panNo}
              helperText={errors.panNo}
              sx={fieldStyle}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={labelStyle}>UAN Number</Typography>
            <TextField
              fullWidth
              name="uanNo"
              placeholder="Enter UAN number"
              value={formData.uanNo}
              onChange={handleChange}
              error={!!errors.uanNo}
              helperText={errors.uanNo}
              sx={fieldStyle}
            />
          </Grid>
          {mode === "edit" && (
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography sx={labelStyle}>
                Status
                <Box
                  component="span"
                  sx={{
                    color: "error.main",
                    fontSize: "13px", // Increase size
                    fontWeight: 700,
                    ml: 0.3,
                    verticalAlign: "middle",
                  }}
                >
                  *
                </Box>
              </Typography>

              <Dropdown
                value={formData.status}
                options={statusOptions}
                optionLabel="label"
                optionValue="value"
                placeholder="Select Status"
                className="modal-dropdown"
                style={{ width: "100%" }}
                appendTo={document.body}
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: "status",
                      value: e.value,
                    },
                  })
                }
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </GlobalModal>
  );
};

export default EmployeeModal;
