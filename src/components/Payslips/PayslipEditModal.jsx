// import React, { useState, useEffect, useRef } from "react";
// import { Grid, TextField, Typography, Box, Button, Paper } from "@mui/material";
// import { Toast } from "primereact/toast";
// import GlobalModal from "../../ui/GlobalModal";

// const PayslipEditModal = ({
//   open,
//   handleClose,
//   payslip,
//   onSave,
//   toastRef: externalToastRef,
// }) => {
//   const [formData, setFormData] = useState({});
//   const [saving, setSaving] = useState(false);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (payslip) {
//       setFormData(payslip);
//     }
//   }, [payslip]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => {
//       const updatedData = {
//         ...prev,
//         [name]: value,
//       };

//       if (name === "lopDays") {
//         const totalDays = Number(updatedData.totalDays || 0);
//         const lopDays = Number(value || 0);

//         updatedData.workingDays = totalDays - lopDays;
//       }

//       return updatedData;
//     });
//   };

//   const grossSalary =
//     Number(formData.basicSalary || 0) +
//     Number(formData.hra || 0) +
//     Number(formData.specialAllowance || 0);

//   const itemizedDeductions =
//     Number(formData.professionTax || 0) +
//     Number(formData.groupMedicalInsurance || 0) +
//     Number(formData.pf || 0) +
//     Number(formData.tds || 0) +
//     Number(formData.eduCess || 0) +
//     Number(formData.otherDeductions || 0);

//   const totalDays = Number(formData.totalDays || 0);
//   const lopDays = Number(formData.lopDays || 0);

//   // LOP deduction = per-day gross rate × LOP days (matches backend formula)
//   const lopDeduction = totalDays > 0 ? (grossSalary / totalDays) * lopDays : 0;

//   const totalDeduction = itemizedDeductions + lopDeduction;

//   const netSalary = grossSalary - totalDeduction;

//   const handleUpdate = async () => {
//     try {
//       setSaving(true);

//       await onSave(formData);

//       handleClose();
//     } catch (error) {
//       console.error("Update failed:", error);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.workingDays) {
//       newErrors.workingDays = "Working Days is required";
//     }

//     if (!formData.lopDays && formData.lopDays !== 0) {
//       newErrors.lopDays = "LOP Days is required";
//     }

//     if (Number(formData.lopDays) > Number(formData.workingDays)) {
//       newErrors.lopDays = "LOP Days cannot exceed Working Days";
//     }

//     if (!formData.basicSalary) {
//       newErrors.basicSalary = "Basic Salary is required";
//     }

//     if (!formData.hra) {
//       newErrors.hra = "HRA is required";
//     }

//     if (!formData.specialAllowance) {
//       newErrors.specialAllowance = "Special Allowance is required";
//     }

//     if (Number(formData.basicSalary) < 0) {
//       newErrors.basicSalary = "Amount cannot be negative";
//     }

//     if (Number(formData.hra) < 0) {
//       newErrors.hra = "Amount cannot be negative";
//     }

//     if (Number(formData.specialAllowance) < 0) {
//       newErrors.specialAllowance = "Amount cannot be negative";
//     }

//     return newErrors;
//   };

//   // ---- Shared style tokens (matches EmployeeModal) ----
//   const fieldStyle = {
//     "& .MuiOutlinedInput-root": {
//       borderRadius: "12px",
//       backgroundColor: "#fff",
//       height: 52,
//       maxWidth: 180,
//       display: "flex",
//       alignItems: "center",
//     },
//     "& .MuiInputBase-root": {
//       width: "100%",
//     },
//     "& .MuiOutlinedInput-input": {
//       padding: "0 14px",
//       height: "100%",
//       boxSizing: "border-box",
//     },
//   };

//   const readOnlyFieldStyle = {
//     ...fieldStyle,
//     "& .MuiOutlinedInput-root": {
//       ...fieldStyle["& .MuiOutlinedInput-root"],
//       backgroundColor: "#F1F5F9",
//     },
//   };

//   const labelStyle = {
//     fontSize: 13,
//     fontWeight: 700,
//     color: "#475569",
//     mb: 1,
//     textTransform: "uppercase",
//   };

//   const sectionTitleStyle = {
//     fontSize: 16,
//     fontWeight: 700,
//     color: "#0F172A",
//   };

//   const RequiredMark = () => (
//     <Box
//       component="span"
//       sx={{
//         color: "error.main",
//         fontSize: "13px",
//         fontWeight: 700,
//         ml: 0.3,
//         verticalAlign: "middle",
//       }}
//     >
//       *
//     </Box>
//   );

//   // Reusable field renderer so every field follows the same label/box pattern
//   const renderField = ({
//     label,
//     name,
//     value,
//     readOnly = false,
//     disabled = false,
//     required = false,
//     md = 4,
//   }) => (
//     <Grid size={{ xs: 12, md }}>
//       <Typography sx={labelStyle}>
//         {label}
//         {required && <RequiredMark />}
//       </Typography>
//       <TextField
//         fullWidth
//         name={name}
//         value={value ?? ""}
//         onChange={readOnly || disabled ? undefined : handleChange}
//         disabled={disabled}
//         sx={readOnly || disabled ? readOnlyFieldStyle : fieldStyle}
//         InputProps={{
//           readOnly,
//           sx: {
//             height: 52,
//             alignItems: "center",
//             // MUI greys out disabled text by default; override so it
//             // still reads clearly instead of looking washed out.
//             "&.Mui-disabled": {
//               WebkitTextFillColor: "#334155",
//               color: "#334155",
//             },
//           },
//         }}
//       />
//     </Grid>
//   );

//   return (
//     <>
//       <GlobalModal
//         open={open}
//         handleClose={handleClose}
//         title="Edit Payslip"
//         subtitle="Modify payroll details"
//         maxWidth={1200}
//         actions={
//           <Box
//             sx={{
//               width: "100%",
//               display: "flex",
//               justifyContent: "flex-end",
//               gap: 2,
//             }}
//           >
//             <Button
//               variant="outlined"
//               onClick={handleClose}
//               sx={{
//                 borderRadius: "12px",
//                 px: 3,
//                 textTransform: "none",
//                 fontWeight: 600,
//               }}
//             >
//               Cancel
//             </Button>

//             <Button
//               variant="contained"
//               onClick={handleUpdate}
//               disabled={saving}
//               sx={{
//                 borderRadius: "12px",
//                 px: 4,
//                 textTransform: "none",
//                 fontWeight: 600,
//                 background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
//                 "&:hover": {
//                   background: "linear-gradient(135deg,#1D4ED8,#1E40AF)",
//                 },
//               }}
//             >
//               {saving ? "Updating..." : "Update Payslip"}
//             </Button>
//           </Box>
//         }
//       >
//         <Box
//           sx={{
//             width: "100%",
//             pt: 1,
//           }}
//         >
//           <Grid container rowSpacing={3} columnSpacing={3}>
//             {/* Employee Details */}
//             <Grid size={12}>
//               <Typography sx={sectionTitleStyle}>
//                 Employee Information
//               </Typography>
//             </Grid>

//             {renderField({
//               label: "Employee ID",
//               name: "employeeId",
//               value: formData.employeeId,
//               disabled: true,
//               md: 3,
//             })}
//             {renderField({
//               label: "Employee Name",
//               name: "employeeName",
//               value: formData.employeeName,
//               disabled: true,
//               md: 3,
//             })}
//             {renderField({
//               label: "Pay Period",
//               name: "payPeriod",
//               value: formData.payPeriod,
//               disabled: true,
//               md: 3,
//             })}
//             {renderField({
//               label: "Status",
//               name: "deliveryStatus",
//               value: formData.deliveryStatus,
//               disabled: true,
//               md: 3,
//             })}

//             {/* Attendance */}
//             <Grid size={12}>
//               <Typography sx={{ ...sectionTitleStyle, mt: 1 }}>
//                 Attendance Details
//               </Typography>
//             </Grid>

//             {renderField({
//               label: "Total Days",
//               name: "totalDays",
//               value: formData.totalDays,
//               disabled: true,
//               md: 3,
//             })}
//             {renderField({
//               label: "Working Days",
//               name: "workingDays",
//               value: formData.workingDays,
//               disabled: true,
//               md: 3,
//             })}
//             {renderField({
//               label: "LOP Days",
//               name: "lopDays",
//               value: formData.lopDays,
//               md: 3,
//             })}

//             {/* Earnings */}
//             <Grid size={12}>
//               <Typography sx={{ ...sectionTitleStyle, mt: 1 }}>
//                 Earnings
//               </Typography>
//             </Grid>

//             {renderField({
//               label: "Basic Salary",
//               name: "basicSalary",
//               value: formData.basicSalary,
//             })}
//             {renderField({
//               label: "HRA",
//               name: "hra",
//               value: formData.hra,
//             })}
//             {renderField({
//               label: "Special Allowance",
//               name: "specialAllowance",
//               value: formData.specialAllowance,
//             })}

//             {/* Deductions */}
//             <Grid size={12}>
//               <Typography sx={{ ...sectionTitleStyle, mt: 1 }}>
//                 Deductions
//               </Typography>
//             </Grid>

//             {renderField({
//               label: "Professional Tax",
//               name: "professionTax",
//               value: formData.professionTax,
//             })}
//             {renderField({
//               label: "Medical Insurance",
//               name: "groupMedicalInsurance",
//               value: formData.groupMedicalInsurance,
//             })}
//             {renderField({
//               label: "PF",
//               name: "pf",
//               value: formData.pf,
//             })}
//             {renderField({
//               label: "TDS",
//               name: "tds",
//               value: formData.tds,
//             })}
//             {renderField({
//               label: "Education Cess",
//               name: "eduCess",
//               value: formData.eduCess,
//             })}
//             {renderField({
//               label: "Other Deductions",
//               name: "otherDeductions",
//               value: formData.otherDeductions,
//             })}

//             {/* Salary Summary */}
//             <Grid size={12}>
//               <Paper
//                 elevation={0}
//                 sx={{
//                   mt: 2,
//                   p: 3,
//                   borderRadius: 3,
//                   backgroundColor: "#F8FAFC",
//                   border: "1px solid #E2E8F0",
//                 }}
//               >
//                 <Typography variant="h6" fontWeight={700} gutterBottom>
//                   Salary Summary
//                 </Typography>

//                 <Typography sx={{ mb: 1 }}>
//                   Gross Salary : ₹{grossSalary.toFixed(2)}
//                 </Typography>

//                 <Typography sx={{ mb: 1 }}>
//                   Itemized Deductions : ₹{itemizedDeductions.toFixed(2)}
//                 </Typography>

//                 {lopDays > 0 && (
//                   <Typography sx={{ mb: 1, color: "error.main" }}>
//                     LOP Deduction ({lopDays} day{lopDays > 1 ? "s" : ""}) : ₹
//                     {lopDeduction.toFixed(2)}
//                   </Typography>
//                 )}

//                 <Typography sx={{ mb: 1 }}>
//                   Total Deduction : ₹{totalDeduction.toFixed(2)}
//                 </Typography>

//                 <Typography
//                   variant="h6"
//                   fontWeight={700}
//                   sx={{ color: netSalary < 0 ? "error.main" : "inherit" }}
//                 >
//                   Net Salary : ₹{netSalary.toFixed(2)}
//                 </Typography>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Box>
//       </GlobalModal>
//     </>
//   );
// };

// export default PayslipEditModal;

import React, { useState, useEffect, useRef } from "react";
import { Grid, TextField, Typography, Box, Button, Paper } from "@mui/material";
import { Toast } from "primereact/toast";
import GlobalModal from "../../ui/GlobalModal";

const PayslipEditModal = ({
  open,
  handleClose,
  payslip,
  onSave,
  toastRef: externalToastRef,
}) => {
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (payslip) {
      setFormData(payslip);
    }
  }, [payslip]);

  // Frosted-glass backdrop — scoped to THIS modal only, GlobalModal.jsx stays untouched.
  // Grabs the most recently mounted .MuiBackdrop-root (this modal's own backdrop)
  // and overrides its inline style directly.
  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      const backdrops = document.querySelectorAll(".MuiBackdrop-root");
      const thisBackdrop = backdrops[backdrops.length - 1];
      if (thisBackdrop) {
        thisBackdrop.style.backdropFilter = "blur(14px) saturate(160%)";
        thisBackdrop.style.webkitBackdropFilter = "blur(14px) saturate(160%)";
        thisBackdrop.style.backgroundColor = "rgba(15,23,42,0.35)";
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedData = {
        ...prev,
        [name]: value,
      };

      if (name === "lopDays") {
        const totalDays = Number(updatedData.totalDays || 0);
        const lopDays = Number(value || 0);

        updatedData.workingDays = totalDays - lopDays;
      }

      return updatedData;
    });
  };

  const grossSalary =
    Number(formData.basicSalary || 0) +
    Number(formData.hra || 0) +
    Number(formData.specialAllowance || 0);

  const itemizedDeductions =
    Number(formData.professionTax || 0) +
    Number(formData.groupMedicalInsurance || 0) +
    Number(formData.pf || 0) +
    Number(formData.tds || 0) +
    Number(formData.eduCess || 0) +
    Number(formData.otherDeductions || 0);

  const totalDays = Number(formData.totalDays || 0);
  const lopDays = Number(formData.lopDays || 0);

  // LOP deduction = per-day gross rate × LOP days (matches backend formula)
  const lopDeduction = totalDays > 0 ? (grossSalary / totalDays) * lopDays : 0;

  const totalDeduction = itemizedDeductions + lopDeduction;

  const netSalary = grossSalary - totalDeduction;

  const handleUpdate = async () => {
    try {
      setSaving(true);

      await onSave(formData);

      handleClose();
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setSaving(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.workingDays) {
      newErrors.workingDays = "Working Days is required";
    }

    if (!formData.lopDays && formData.lopDays !== 0) {
      newErrors.lopDays = "LOP Days is required";
    }

    if (Number(formData.lopDays) > Number(formData.workingDays)) {
      newErrors.lopDays = "LOP Days cannot exceed Working Days";
    }

    if (!formData.basicSalary) {
      newErrors.basicSalary = "Basic Salary is required";
    }

    if (!formData.hra) {
      newErrors.hra = "HRA is required";
    }

    if (!formData.specialAllowance) {
      newErrors.specialAllowance = "Special Allowance is required";
    }

    if (Number(formData.basicSalary) < 0) {
      newErrors.basicSalary = "Amount cannot be negative";
    }

    if (Number(formData.hra) < 0) {
      newErrors.hra = "Amount cannot be negative";
    }

    if (Number(formData.specialAllowance) < 0) {
      newErrors.specialAllowance = "Amount cannot be negative";
    }

    return newErrors;
  };

  // ---- Shared style tokens (matches EmployeeModal, now compact) ----
  const FIELD_HEIGHT = 40; // was 52

  const fieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      backgroundColor: "#fff",
      height: FIELD_HEIGHT,
      maxWidth: 180,
      display: "flex",
      alignItems: "center",
    },
    "& .MuiInputBase-root": {
      width: "100%",
    },
    "& .MuiOutlinedInput-input": {
      padding: "0 12px",
      height: "100%",
      boxSizing: "border-box",
      fontSize: 16,
    },
  };

  const readOnlyFieldStyle = {
    ...fieldStyle,
    "& .MuiOutlinedInput-root": {
      ...fieldStyle["& .MuiOutlinedInput-root"],
      backgroundColor: "#F1F5F9",
    },
  };

  const labelStyle = {
    fontSize: 13,
    fontWeight: 700,
    color: "#475569",
    mb: 0.5,
    textTransform: "uppercase",
  };

  const sectionTitleStyle = {
    fontSize: 16,
    fontWeight: 700,
    color: "#0F172A",
  };

  const RequiredMark = () => (
    <Box
      component="span"
      sx={{
        color: "error.main",
        fontSize: "12px",
        fontWeight: 700,
        ml: 0.3,
        verticalAlign: "middle",
      }}
    >
      *
    </Box>
  );

  // Reusable field renderer so every field follows the same label/box pattern
  const renderField = ({
    label,
    name,
    value,
    readOnly = false,
    disabled = false,
    required = false,
    md = 3,
  }) => (
    <Grid size={{ xs: 12, md }}>
      <Typography sx={labelStyle}>
        {label}
        {required && <RequiredMark />}
      </Typography>
      <TextField
        fullWidth
        name={name}
        value={value ?? ""}
        onChange={readOnly || disabled ? undefined : handleChange}
        disabled={disabled}
        sx={readOnly || disabled ? readOnlyFieldStyle : fieldStyle}
        InputProps={{
          readOnly,
          sx: {
            height: FIELD_HEIGHT,
            alignItems: "center",
            // MUI greys out disabled text by default; override so it
            // still reads clearly instead of looking washed out.
            "&.Mui-disabled": {
              WebkitTextFillColor: "#334155",
              color: "#334155",
            },
          },
        }}
      />
    </Grid>
  );

  return (
    <>
      <GlobalModal
        open={open}
        handleClose={handleClose}
        title="Edit Payslip"
        subtitle="Modify payroll details"
        maxWidth={900}
        actions={
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              gap: 1.5,
            }}
          >
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                borderRadius: "10px",
                px: 2.5,
                py: 0.75,
                textTransform: "none",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleUpdate}
              disabled={saving}
              sx={{
                borderRadius: "10px",
                px: 3,
                py: 0.75,
                textTransform: "none",
                fontWeight: 600,
                fontSize: 14,
                background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
                "&:hover": {
                  background: "linear-gradient(135deg,#1D4ED8,#1E40AF)",
                },
              }}
            >
              {saving ? "Updating..." : "Update Payslip"}
            </Button>
          </Box>
        }
      >
        <Box
          sx={{
            width: "100%",
            pt: 0.5,
          }}
        >
          <Grid container rowSpacing={1.5} columnSpacing={2}>
            {/* Employee Details */}
            <Grid size={12}>
              <Typography sx={sectionTitleStyle}>
                Employee Information
              </Typography>
            </Grid>

            {renderField({
              label: "Employee ID",
              name: "employeeId",
              value: formData.employeeId,
              disabled: true,
              md: 3,
            })}
            {renderField({
              label: "Employee Name",
              name: "employeeName",
              value: formData.employeeName,
              disabled: true,
              md: 3,
            })}
            {renderField({
              label: "Pay Period",
              name: "payPeriod",
              value: formData.payPeriod,
              disabled: true,
              md: 3,
            })}
            {renderField({
              label: "Status",
              name: "deliveryStatus",
              value: formData.deliveryStatus,
              disabled: true,
              md: 3,
            })}

            {/* Attendance */}
            <Grid size={12}>
              <Typography sx={{ ...sectionTitleStyle, mt: 0.5 }}>
                Attendance Details
              </Typography>
            </Grid>

            {renderField({
              label: "Total Days",
              name: "totalDays",
              value: formData.totalDays,
              disabled: true,
              md: 3,
            })}
            {renderField({
              label: "Working Days",
              name: "workingDays",
              value: formData.workingDays,
              disabled: true,
              md: 3,
            })}
            {renderField({
              label: "LOP Days",
              name: "lopDays",
              value: formData.lopDays,
              md: 3,
            })}

            {/* Earnings */}
            <Grid size={12}>
              <Typography sx={{ ...sectionTitleStyle, mt: 0.5 }}>
                Earnings
              </Typography>
            </Grid>

            {renderField({
              label: "Basic Salary",
              name: "basicSalary",
              value: formData.basicSalary,
            })}
            {renderField({
              label: "HRA",
              name: "hra",
              value: formData.hra,
            })}
            {renderField({
              label: "Special Allowance",
              name: "specialAllowance",
              value: formData.specialAllowance,
            })}

            {/* Deductions */}
            <Grid size={12}>
              <Typography sx={{ ...sectionTitleStyle, mt: 0.5 }}>
                Deductions
              </Typography>
            </Grid>

            {renderField({
              label: "Professional Tax",
              name: "professionTax",
              value: formData.professionTax,
            })}
            {renderField({
              label: "Medical Insurance",
              name: "groupMedicalInsurance",
              value: formData.groupMedicalInsurance,
            })}
            {renderField({
              label: "PF",
              name: "pf",
              value: formData.pf,
            })}
            {renderField({
              label: "TDS",
              name: "tds",
              value: formData.tds,
            })}
            {renderField({
              label: "Education Cess",
              name: "eduCess",
              value: formData.eduCess,
            })}
            {renderField({
              label: "Other Deductions",
              name: "otherDeductions",
              value: formData.otherDeductions,
            })}

            {/* Salary Summary */}
            <Grid size={12}>
              <Paper
                elevation={0}
                sx={{
                  mt: 1,
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  sx={{ mb: 0.75, fontSize: 15 }}
                >
                  Salary Summary
                </Typography>

                <Typography sx={{ mb: 0.5, fontSize: 13.5 }}>
                  Gross Salary : ₹{grossSalary.toFixed(2)}
                </Typography>

                <Typography sx={{ mb: 0.5, fontSize: 13.5 }}>
                  Itemized Deductions : ₹{itemizedDeductions.toFixed(2)}
                </Typography>

                {lopDays > 0 && (
                  <Typography
                    sx={{ mb: 0.5, fontSize: 13.5, color: "error.main" }}
                  >
                    LOP Deduction ({lopDays} day{lopDays > 1 ? "s" : ""}) : ₹
                    {lopDeduction.toFixed(2)}
                  </Typography>
                )}

                <Typography sx={{ mb: 0.5, fontSize: 13.5 }}>
                  Total Deduction : ₹{totalDeduction.toFixed(2)}
                </Typography>

                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  sx={{
                    fontSize: 15,
                    color: netSalary < 0 ? "error.main" : "inherit",
                  }}
                >
                  Net Salary : ₹{netSalary.toFixed(2)}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </GlobalModal>
    </>
  );
};

export default PayslipEditModal;