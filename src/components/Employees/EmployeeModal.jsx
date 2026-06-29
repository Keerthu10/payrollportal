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
import { getDepartmentInfo } from "../../services/departmentService";
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
  const [departments, setDepartments] = useState([]);
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const loadDepartments = async () => {
    try {
      const response = await getDepartmentInfo();

      console.log("Department Response:", response);
      console.log("Department Data:", response.data);

      setDepartments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadEmploymentTypes = async () => {
    try {
      const response = await getEmploymentTypeInfo();

      console.log("Employment Response:", response);
      console.log("Employment Data:", response.data);

      setEmploymentTypes(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadDepartments();
    loadEmploymentTypes();
  }, []);

  const getInitialFormData = () => ({
    employeeId: "",
    joinDate: new Date().toISOString().split("T")[0],
    dob: "",
    fullName: "",
    email: "",
    phone: "",
    department: "",
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
        department: employee.department,
        designation: employee.designation,
        employmentType: employee.employmentType || "",
        reportingManager: employee.reportingManager || "",
        location: employee.location,
        status: employee.status,

        dob: employee.dateOfBirth || "",
        bankName: employee.bankName || "",
        bankAccountNo: employee.bankAccountNo || "",
        ifscCode: employee.ifscCode || "",
        panNo: employee.panNo || "",
        uanNo: employee.uanNo || "",
      });
    }
  }, [open, mode, employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log(name, value);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = () => {
    let tempErrors = {};

    if (!formData.fullName.trim()) {
      tempErrors.fullName = "Full Name is required";
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Invalid email";
    }

    if (!formData.phone) {
      tempErrors.phone = "Phone Number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      tempErrors.phone = "Phone Number must contain 10 digits";
    }

    if (!formData.dob) {
      tempErrors.dob = "Date of Birth is required";
    }

    if (!formData.department) {
      tempErrors.department = "Department is required";
    }

    if (!formData.designation.trim()) {
      tempErrors.designation = "Designation is required";
    }

    if (!formData.employmentType) {
      tempErrors.employmentType = "Employment Type is required";
    }

    if (!formData.location.trim()) {
      tempErrors.location = "Location is required";
    }

    if (!formData.bankName.trim()) {
      tempErrors.bankName = "Bank Name is required";
    }

    if (!formData.bankAccountNo.trim()) {
      tempErrors.bankAccountNo = "Bank Account Number is required";
    } else if (!/^\d{9,18}$/.test(formData.bankAccountNo)) {
      tempErrors.bankAccountNo = "Invalid Account Number";
    }

    if (!formData.ifscCode.trim()) {
      tempErrors.ifscCode = "IFSC Code is required";
    } else if (
      !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode.toUpperCase())
    ) {
      tempErrors.ifscCode = "Invalid IFSC Code";
    }

    if (!formData.panNo.trim()) {
      tempErrors.panNo = "PAN Number is required";
    } else if (
      !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNo.toUpperCase())
    ) {
      tempErrors.panNo = "Invalid PAN Number";
    }

    if (!formData.uanNo.trim()) {
      tempErrors.uanNo = "UAN Number is required";
    } else if (!/^\d{12}$/.test(formData.uanNo)) {
      tempErrors.uanNo = "UAN Number must contain 12 digits";
    }

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length > 0) return;

    const payload = {
      name: formData.fullName,
      email: formData.email,
      dateOfBirth: formData.dob,
      phone: formData.phone,
      designation: formData.designation,
      department: formData.department,
      employmentType: formData.employmentType,
      location: formData.location,
      joinDate: formData.joinDate,
      exitDate: "",
      bankName: formData.bankName,
      bankAccountNo: formData.bankAccountNo,
      ifscCode: formData.ifscCode,
      panNo: formData.panNo,
      uanNo: formData.uanNo,
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
    },

    "& .MuiInputBase-root": {
      width: "100%",
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
            <Typography sx={labelStyle}>Employee ID</Typography>
            <TextField
              fullWidth
              disabled
              value={formData.employeeId}
              sx={fieldStyle}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={labelStyle}>Join Date</Typography>
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
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={labelStyle}>Full Name</Typography>
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
            <Typography sx={labelStyle}>Corporate Email</Typography>
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
            <Typography sx={labelStyle}>Date of Birth</Typography>
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
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={labelStyle}>Phone Number</Typography>
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
            <Typography sx={labelStyle}>Department</Typography>

            <Dropdown
              value={formData.department}
              options={departments}
              optionLabel="departmentName"
              optionValue="departmentName"
              className={`modal-dropdown ${errors.department ? "p-invalid" : ""}`}
              placeholder="Select Department"
              filter
              appendTo={document.body}
              autoZIndex={true}
              baseZIndex={10000}
              panelStyle={{ zIndex: 99999 }}
              style={{ width: "100%" }}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "department",
                    value: e.value,
                  },
                })
              }
            />
            {errors.department && (
              <small
                style={{
                  color: "#d32f2f",
                  display: "block",
                  marginTop: "4px",
                  fontSize: "12px",
                }}
              >
                {errors.department}
              </small>
            )}
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
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
          </Grid>

          {/* Row 4 */}

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={labelStyle}>Employment Type</Typography>

            <Dropdown
              value={formData.employmentType}
              options={employmentTypes}
              optionLabel="jobType"
              optionValue="jobType"
              className={`modal-dropdown ${errors.employmentType ? "p-invalid" : ""}`}
              placeholder="Select Employment Type"
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
            <Typography sx={labelStyle}>Location</Typography>
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
            <Typography sx={labelStyle}>Bank Name</Typography>
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
            <Typography sx={labelStyle}>Bank Account Number</Typography>
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
            <Typography sx={labelStyle}>IFSC Code</Typography>
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
            <Typography sx={labelStyle}>PAN Number</Typography>
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
        </Grid>
      </Box>
    </GlobalModal>
  );
};

export default EmployeeModal;
