// import React, { useRef, useState } from "react";

// import * as XLSX from "xlsx";

// import { Box, Typography, Button, Paper, Stack } from "@mui/material";

// import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";

// import GlobalModal from "../ui/GlobalModal";

// import Table from "../ui/Table";

// const Payroll = () => {
//   const fileInputRef = useRef(null);

//   const [openModal, setOpenModal] = useState(false);

//   const [openSubmitModal, setOpenSubmitModal] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [modalStep, setModalStep] = useState("preview");

//   const [previewData, setPreviewData] = useState([]);

//   const [columns, setColumns] = useState([]);

//   const [fileName, setFileName] = useState("");

//   const confirmPayrollSubmit = async () => {
//     try {
//       setSubmitting(true);
//       console.log("Final Payroll Data:", previewData);
//       alert("Payroll Submitted Successfully");
//       setOpenSubmitModal(false);
//       setOpenModal(false);
//     } catch (error) {
//       console.error(error);
//       alert("Payroll Submission Failed");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // =========================================
//   // HANDLE EXCEL FILE
//   // =========================================

//   const handleFile = (event) => {
//     const file = event.target.files[0];

//     if (!file) return;

//     // FILE TYPE VALIDATION
//     const allowedTypes = [
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       "application/vnd.ms-excel",
//     ];

//     if (!allowedTypes.includes(file.type)) {
//       alert("Only Excel files are allowed");
//       return;
//     }

//     // FILE SIZE VALIDATION
//     if (file.size > 2 * 1024 * 1024) {
//       alert("File size should be less than 2MB");
//       return;
//     }

//     setFileName(file.name);

//     const reader = new FileReader();

//     reader.onload = (e) => {
//       const data = e.target.result;

//       // READ WORKBOOK
//       const workbook = XLSX.read(data, {
//         type: "binary",
//       });

//       // GET FIRST SHEET
//       const sheetName = workbook.SheetNames[0];

//       const worksheet = workbook.Sheets[sheetName];

//       // CONVERT TO JSON
//       const rawData = XLSX.utils.sheet_to_json(worksheet, {
//         raw: false,
//         defval: 0,
//       });

//       const excelData = rawData.map((row) => {
//         const normalizedRow = {};

//         Object.keys(row).forEach((key) => {
//           normalizedRow[key.trim().toUpperCase()] = row[key];
//         });

//         return normalizedRow;
//       });

//       // =========================================
//       // COMPUTE PAYROLL
//       // =========================================

//       const processedData = excelData.map((row, index) => {
//         const parseValue = (value) => {
//           return Number(
//             String(value || 0)
//               .replace(/,/g, "")
//               .trim(),
//           );
//         };

//         const basic = parseValue(row["BASIC SALARY"]);

//         const hra = parseValue(row["HRA"]);

//         const specialAllowance = parseValue(row["SPECIAL ALLOWANCE"]);

//         const professionTax = parseValue(row["PROFESSION TAX"]);

//         const medicalInsurance = parseValue(row["GROUP MEDICAL INSURANCE"]);

//         const pf = parseValue(row["PF EE CON"]);

//         const tds = parseValue(row["TDS"]);

//         const eduCess = parseValue(row["EDU CESS"]);

//         const otherDeductions = parseValue(row["OTHER DEDUCTIONS"]);

//         // CALCULATIONS
//         const grossPay = basic + hra + specialAllowance;

//         const deductions =
//           professionTax +
//           medicalInsurance +
//           pf +
//           tds +
//           eduCess +
//           otherDeductions;

//         const netPay = grossPay - deductions;

//         return {
//           id: index + 1,

//           ...row,

//           GROSSPAY: grossPay,

//           DEDUCTIONS: deductions,

//           NETPAY: netPay,
//         };
//       });
//       // =========================================
//       // DYNAMIC COLUMNS
//       // =========================================

//       const dynamicColumns =
//         processedData.length > 0
//           ? Object.keys(processedData[0]).map((key) => ({
//               field: key,

//               header: key.toUpperCase(),
//             }))
//           : [];

//       // SAVE DATA
//       console.log(processedData);
//       setPreviewData(processedData);

//       setColumns(dynamicColumns);

//       // OPEN MODAL
//       setOpenModal(true);
//     };

//     reader.readAsBinaryString(file);
//   };

//   return (
//     <Box>
//       {/* =========================================
//           PAGE HEADER
//       ========================================= */}

//       <Box sx={{ mb: 4 }}>
//         <Typography variant="h3" fontWeight={700}>
//           Payroll Dashboard
//         </Typography>

//         <Typography
//           sx={{
//             color: "#64748B",
//             mt: 1,
//           }}
//         >
//           Upload and process employee payroll
//         </Typography>
//       </Box>

//       {/* =========================================
//           UPLOAD CARD
//       ========================================= */}

//       <Paper
//         elevation={0}
//         sx={{
//           p: 5,

//           borderRadius: "28px",

//           background: "linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)",

//           border: "1px solid #dbeafe",
//         }}
//       >
//         <Stack spacing={3} justifyContent="center" alignItems="center">
//           <UploadFileRoundedIcon
//             sx={{
//               fontSize: 90,

//               color: "#2563eb",
//             }}
//           />

//           <Typography variant="h4" fontWeight={700}>
//             Upload Payroll Excel
//           </Typography>

//           <Typography
//             sx={{
//               color: "#64748B",
//             }}
//           >
//             Upload employee payroll Excel template
//           </Typography>

//           {/* UPLOAD BUTTON */}

//           <Button
//             variant="contained"
//             size="large"
//             onClick={() => fileInputRef.current.click()}
//             sx={{
//               borderRadius: "14px",

//               px: 5,

//               py: 1.5,

//               textTransform: "none",

//               fontWeight: 600,

//               fontSize: "16px",
//             }}
//           >
//             Upload Excel
//           </Button>

//           {/* HIDDEN FILE INPUT */}

//           <input
//             hidden
//             type="file"
//             accept=".xlsx,.xls"
//             ref={fileInputRef}
//             onChange={handleFile}
//           />

//           {/* FILE NAME */}

//           {fileName && (
//             <Typography
//               sx={{
//                 fontWeight: 600,

//                 color: "#0f172a",
//               }}
//             >
//               Uploaded File: {fileName}
//             </Typography>
//           )}
//         </Stack>
//       </Paper>

//       {/* =========================================
//           PAYROLL PREVIEW MODAL
//       ========================================= */}

//       <GlobalModal
//         open={openModal}
//         handleClose={() => setOpenModal(false)}
//         title={
//           modalStep === "preview"
//             ? "Payroll Preview"
//             : "Confirm Payroll Submission"
//         }
//         subtitle={
//           modalStep === "preview"
//             ? "Validate and process employee payroll"
//             : "Please verify payroll details before final submission"
//         }
//         maxWidth={modalStep === "preview" ? 1400 : 500}
//         fullWidth={modalStep === "preview"}
//         actions={
//           modalStep === "preview" ? (
//             <>
//               <Button
//                 variant="outlined"
//                 sx={{
//                   borderRadius: "12px",
//                   textTransform: "none",
//                   fontWeight: 600,
//                 }}
//               >
//                 Validate Payroll
//               </Button>

//               <Button
//                 variant="contained"
//                 onClick={() => setModalStep("confirm")}
//                 sx={{
//                   borderRadius: "12px",
//                   textTransform: "none",
//                   fontWeight: 600,
//                 }}
//               >
//                 Process Payroll
//               </Button>
//             </>
//           ) : (
//             <>
//               <Button
//                 variant="outlined"
//                 onClick={() => setModalStep("preview")}
//                 sx={{
//                   borderRadius: "12px",
//                   textTransform: "none",
//                   fontWeight: 600,
//                 }}
//               >
//                 Back
//               </Button>

//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={confirmPayrollSubmit}
//                 sx={{
//                   borderRadius: "12px",
//                   textTransform: "none",
//                   fontWeight: 700,
//                   px: 3,
//                   py: 1.2,
//                   minWidth: "140px",
//                 }}
//               >
//                 Confirm Submit
//               </Button>
//             </>
//           )
//         }
//       >
//         {modalStep === "preview" ? (
//           <Box>
//             <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
//               Excel Preview
//             </Typography>

//             <Table
//               value={previewData}
//               columns={columns}
//               enablePagination={true}
//               pagination={{
//                 first: 0,
//                 size: 10,
//               }}
//               totalRecords={previewData.length}
//               dataKey="id"
//             />
//           </Box>
//         ) : (
//           <Box>
//             <Box
//               sx={{
//                 background: "#f8fafc",
//                 border: "1px solid #e2e8f0",
//                 borderRadius: "16px",
//                 p: 3,
//                 mb: 3,
//               }}
//             >
//               <Typography
//                 variant="h6"
//                 sx={{
//                   fontWeight: 700,
//                   mb: 1,
//                   color: "#0f172a",
//                 }}
//               >
//                 Final Payroll Confirmation
//               </Typography>

//               <Typography
//                 sx={{
//                   color: "#64748b",
//                   lineHeight: 1.7,
//                   fontSize: "15px",
//                 }}
//               >
//                 You are about to finalize payroll processing for all employees.
//               </Typography>
//             </Box>

//             <Stack spacing={2}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   background: "#eff6ff",
//                   p: 2,
//                   borderRadius: "12px",
//                 }}
//               >
//                 <Typography fontWeight={600}>Total Employees</Typography>

//                 <Typography fontWeight={700} color="primary">
//                   {previewData.length}
//                 </Typography>
//               </Box>

//               <Box
//                 sx={{
//                   background: "#eff6ff",
//                   border: "1px solid #fee0bfff",
//                   borderRadius: "12px",
//                   p: 2,
//                 }}
//               >
//                 <Typography
//                   sx={{
//                     color: "#1d4ed8",
//                     fontWeight: 600,
//                     fontSize: "14px",
//                     lineHeight: 1.7,
//                   }}
//                 >
//                   Payroll reports and payslip emails will be generated
//                   automatically for all employees after confirmation.
//                 </Typography>
//               </Box>
//             </Stack>
//           </Box>
//         )}
//       </GlobalModal>
//       {/* <GlobalModal
//         open={openSubmitModal}
//         handleClose={() => setOpenSubmitModal(false)}
//         title="Confirm Payroll Submission"
//         subtitle="Please Verify payroll details before final Submission"
//         loading={submitting}
//         disableBackdropClick={submitting}
//         actions={
//           <>
//             <Button
//               variant="outlined"
//               onClick={() => setOpenSubmitModal(false)}
//               sx={{
//                 borderRadius: "12px",
//                 textTransform: "none",
//                 fontWeight: 600,
//               }}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={confirmPayrollSubmit}
//               sx={{
//                 borderRadius: "12px",
//                 textTransform: "none",
//                 fontWeight: 600,
//               }}
//             >
//               Confirm Submit
//             </Button>
//           </>
//         }
//       >
//         <Box>
//           <Typography variant="body1" sx={{ mb: 2 }}>
//             Are you sure want to process this payroll?
//           </Typography>
//           <Typography color="text.secondary">
//             Once Submitted,Payroll cannot be edited
//           </Typography>
//           <Typography sx={{ mt: 2, fontWeight: 600 }}>
//             Total Employees: {previewData.length}
//           </Typography>
//         </Box>
//       </GlobalModal> */}
//     </Box>
//   );
// };

// export default Payroll;

import React, { useState, useRef } from "react";

import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Backdrop,
  CircularProgress,
} from "@mui/material";

import {
  downloadPayrollTemplate,
  generatePayrollEmails,
} from "../services/payroll";

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import TablePagination from "@mui/material/TablePagination";
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { useToast } from "../context/ToastContext";
import PayrollLoader from "../components/PayrollLoader";

import * as XLSX from "xlsx";

const sampleHeaders = [
  "Employee ID",
  "Employee Name",
  "Email",
  "Date Of Birth",
  "Designation",
  "Location",
  "Bank Name",
  "Bank Account No",
  "PAN No",
  "UAN No",
  "Pay Period",
  "Total Days",
  "Working Days",
  "LOP Days",
  "Basic Salary",
  "HRA",
  "Special Allowance",
  "Profession Tax",
  "Group Medical Insurance",
  "PF EE CON",
  "PF ER CON",
  "TDS",
  "EDU Cess",
  "Other Deductions",
];

const previewHeaders = [
  "S.No",
  ...sampleHeaders,
  "GrossPay",
  "Deductions",
  "NetPay",
];

const Payroll = () => {
  // =========================
  // STATES
  // =========================

  const { showToast } = useToast();

  const [openModal, setOpenModal] = useState(false);

  const [excelData, setExcelData] = useState([]);

  const [validationErrors, setValidationErrors] = useState([]);

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [uploadedFileName, setUploadedFileName] = useState("");

  const [templateHeaders, setTemplateHeaders] = useState([]);

  const [loading, setLoading] = useState(false);

  const [dragActive, setDragActive] = useState(false);

  const [failedEmployeeIds, setFailedEmployeeIds] = useState([]);

  const [emailSummary, setEmailSummary] = useState(null);

  const [sendingEmails, setSendingEmails] = useState(false);

  const [progress, setProgress] = useState(0);

  const [processedCount, setProcessedCount] = useState(0);

  const fileInputRef = useRef(null);

  // =========================
  // DOWNLOAD TEMPLATE
  // =========================

  const handleDownloadTemplate = async () => {
    try {
      const response = await downloadPayrollTemplate();

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", "Payroll_Template.xlsx");

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);

      showToast("error", "Download Failed", "Unable to download template");
    }
  };

  // =========================
  // VALIDATION
  // =========================

  const validatePayrollData = (data) => {
    let errors = [];
    const employeeIds = new Set();
    const emails = new Set();
    const bankAccount = new Set();
    const panNumbers = new Set();
    const uanNumbers = new Set();

    data.forEach((employee, index) => {
      const row = index + 1;

      // EMPLOYEE ID
      if (!employee["Employee ID"]) {
        errors.push(`Row ${row}: Employee ID is required`);
      }
      if (employeeIds.has(employee["Employee ID"])) {
        errors.push(`Row ${row}: Duplicate Employee ID`);
      }
      employeeIds.add(employee["Employee ID"]);

      // EMPLOYEE NAME
      if (!employee["Employee Name"]) {
        errors.push(`Row ${row}: Employee Name is required`);
      }

      // EMAIL
      const email = String(employee["Email"]).trim().toLowerCase();
      if (!email) {
        errors.push(`Row ${row}: Email is required`);
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        errors.push(`Row ${row}: Invalid Email`);
      } else if(emails.has(email)){
        errors.push(`Row ${row}:Duplicate Email`);
      } else {
        emails.add(email);
      }

      // DOB
      const dobValue = employee["Date Of Birth"];

      let dob = "";

      if (typeof dobValue === "number") {
        dob = XLSX.SSF.format("dd-mm-yyyy", dobValue);
      } else {
        dob = String(dobValue).trim();
      }

      if (!/^\d{2}-\d{2}-\d{4}$/.test(dob)) {
        errors.push(`Row ${row}: DOB must be DD-MM-YYYY`);
      }

      // DESIGNATION
      if (!employee["Designation"]) {
        errors.push(`Row ${row}: Designation is required`);
      }

      // LOCATION
      if (!employee["Location"]) {
        errors.push(`Row ${row}: Location is required`);
      }

      // BANK NAME
      if (!employee["Bank Name"]) {
        errors.push(`Row ${row}: Bank Name is required`);
      }

      // ACCOUNT NUMBER
      const bankAccounts = String(employee["Bank Account No"]).trim();

      if (!bankAccounts) {
        errors.push(`Row ${row}: Account Number Required`);
      } else if (bankAccount.has(bankAccounts)) {
        errors.push(`Row ${row}: Duplicate Bank Account No`);
      } else {
        bankAccount.add(bankAccounts);
      }

      // PAN
      const panNo = String(employee["PAN No"]).trim().toUpperCase();
      if (!panNo) {
        errors.push(`Row ${row}:PAN no is required`);
      } else if (panNumbers.has(panNo)) {
        errors.push(`Row ${row}:Duplicate PAN No`);
      } else {
        panNumbers.add(panNo);
      }

      // UAN
      const uanNo = String(employee["UAN No"]).trim();

      if(!uanNo){
        errors.push(`Row ${row}:UAN No is required`);
      }else if(uanNumbers.has(uanNo)){
        errors.push(`Row ${row}:Duplicate UAN No`);
      } else{
        uanNumbers.add(uanNo);
      }

      // PAY PERIOD
      if (!employee["Pay Period"]) {
        errors.push(`Row ${row}: Pay Period is required`);
      }

      // TOTAL DAYS / WORKING DAYS / LOP DAYS
      if (Number(employee["Total Days"]) <= 0) {
        errors.push(`Row ${row}: Invalid Total Days`);
      }
      if (Number(employee["Working Days"]) < 0) {
        errors.push(`Row ${row}: Invalid Working Days`);
      }
      if (Number(employee["LOP Days"]) < 0) {
        errors.push(`Row ${row}: Invalid LOP Days`);
      }

      // SALARY COMPONENTS
      if (!employee["Basic Salary"] || Number(employee["Basic Salary"]) <= 0) {
        errors.push(`Row ${row}: Invalid Basic Salary`);
      }
      if (Number(employee["HRA"]) < 0) {
        errors.push(`Row ${row}: Invalid HRA`);
      }
      if (Number(employee["Special Allowance"]) < 0) {
        errors.push(`Row ${row}: Invalid Special Allowance`);
      }

      // DEDUCTIONS
      if (Number(employee["Profession Tax"]) < 0) {
        errors.push(`Row ${row}: Invalid Profession Tax`);
      }
      if (Number(employee["Group Medical Insurance"]) < 0) {
        errors.push(`Row ${row}: Invalid Group Medical Insurance`);
      }
      if (Number(employee["PF EE CON"]) < 0) {
        errors.push(`Row ${row}: Invalid PF EE Contribution`);
      }
      if (Number(employee["PF ER CON"]) < 0) {
        errors.push(`Row ${row}: Invalid PF ER Contribution`);
      }
      if (Number(employee["TDS"]) < 0) {
        errors.push(`Row ${row}: Invalid TDS`);
      }
      if (Number(employee["EDU Cess"]) < 0) {
        errors.push(`Row ${row}: Invalid EDU Cess`);
      }
      if (Number(employee["Other Deductions"]) < 0) {
        errors.push(`Row ${row}: Invalid Other Deductions`);
      }
    });

    setValidationErrors(errors);
  };

  // =========================
  // FILE UPLOAD
  // =========================

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setLoading(true);

    setUploadedFileName(file.name);

    const reader = new FileReader();

    reader.readAsArrayBuffer(file);

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);

      const workbook = XLSX.read(data, {
        type: "array",
      });

      const sheetName = workbook.SheetNames[0];

      const worksheet = workbook.Sheets[sheetName];

      const headers = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      })[0];

      setTemplateHeaders(headers);

      const normalizedHeaders = headers.map((h) =>
        String(h).trim().toUpperCase(),
      );

      const normalizedTemplate = sampleHeaders.map((h) =>
        h.trim().toUpperCase(),
      );

      const missingHeaders = normalizedTemplate.filter(
        (header) => !normalizedHeaders.includes(header),
      );

      if (missingHeaders.length > 0) {
        setValidationErrors([`Missing columns: ${missingHeaders.join(", ")}`]);

        setLoading(false);
        return;
      }

      const allData = XLSX.utils.sheet_to_json(worksheet, {
        defval: "",
        raw: false,
      });

      const jsonData = allData.slice(1);

      if (jsonData.length === 0) {
        setValidationErrors(["No data rows found in uploaded file"]);
        setExcelData([]);
        setLoading(false);
        return;
      }

      setTimeout(() => {
        setLoading(false);
      }, 2000);

      // =========================
      // PROCESS DATA
      // =========================

      const processedData = jsonData.map((row, index) => {
        let formattedDOB = row["Date Of Birth"];

        if (formattedDOB) {
          const date = new Date(formattedDOB);
          if (!isNaN(date)) {
            const day = String(date.getDate()).padStart(2, "0");

            const month = String(date.getMonth() + 1).padStart(2, "0");

            const year = date.getFullYear();

            formattedDOB = `${day}-${month}-${year}`;
          }
        }
        const basic = Number(row["Basic Salary"]) || 0;
        const hra = Number(row["HRA"]) || 0;
        const specialAllowance = Number(row["Special Allowance"]) || 0;

        const professionTax = Number(row["Profession Tax"]) || 0;
        const medicalInsurance = Number(row["Group Medical Insurance"]) || 0;
        const pfEE = Number(row["PF EE CON"]) || 0;
        const pfER = Number(row["PF ER CON"]) || 0;
        const tds = Number(row["TDS"]) || 0;
        const eduCess = Number(row["EDU Cess"]) || 0;
        const otherDeductions = Number(row["Other Deductions"]) || 0;

        // CALCULATIONS

        const grossPay = basic + hra + specialAllowance;

        const deductions =
          professionTax +
          medicalInsurance +
          pfEE +
          pfER +
          tds +
          eduCess +
          otherDeductions;

        const netPay = grossPay - deductions;

        return {
          "S.No": index + 1,
          ...row,
          "Date Of Birth": formattedDOB,
          GrossPay: grossPay,
          Deductions: deductions,
          NetPay: netPay,
        };
      });

      // =========================
      // SET STATE
      // =========================

      setExcelData(processedData);

      setValidationErrors([]);

      validatePayrollData(processedData);

      console.log("Processed Payroll Data:", processedData);

      setLoading(false);
    };
  };

  // const handleGenerateEmails = async () => {
  //   try {
  //     setSendingEmails(true);
  //     setProgress(0);
  //     setProcessedCount(0);

  //     let count = 0;

  //     const totalEmployees = excelData.length;

  //     const progressInterval = setInterval(() => {
  //       count++;

  //       setProcessedCount(count);

  //       const percentage = Math.round((count / totalEmployees) * 100);

  //       setProgress(percentage > 100 ? 100 : percentage);

  //       if (count >= totalEmployees) {
  //         clearInterval(progressInterval);
  //       }
  //     }, 400);
  //     setEmailSummary(null);
  //     setFailedEmployeeIds([]);

  //     const payload = {
  //       runId:null,
  //       employees: excelData.map((item) => ({
  //         employeeId: item["Employee ID"],
  //         employeeName: item["Employee Name"],
  //         email: item["Email"],
  //         dateOfBirth: item["Date Of Birth"]?.split("-")?.reverse()?.join("-"),
  //         designation: item["Designation"],
  //         location: item["Location"],
  //         bankName: item["Bank Name"],
  //         bankAccountNo: item["Bank Account No"],
  //         panNo: item["PAN No"],
  //         uanNo: item["UAN No"],
  //         payPeriod: item["Pay Period (DD.MM.YYYY-DD.MM.YYYY)"],

  //         totalDays: item["Total Days"],
  //         workingDays: item["Working Days"],
  //         lopDays: item["LOP Days"],

  //         basicSalary: item["Basic Salary"],
  //         hra: item["HRA"],
  //         specialAllowance: item["Special Allowance"],

  //         professionTax: item["Profession Tax"],

  //         groupMedicalInsurance: item["Group Medical Insurance"],

  //         pfEeCon: item["PF EE CON"],

  //         pfErCon: item["PF ER CON"],

  //         tds: item["TDS"],

  //         eduCess: item["EDU Cess"],

  //         otherDeductions: item["Other Deductions"],
  //       })),
  //     };
  //     console.log(
  //       "Submitting Payroll Payload:",
  //       JSON.stringify(payload, null, 2),
  //     );
  //     const response = await generatePayrollEmails(payload);

  //     const result = response.data.data;

  //     if (result.emailsFailed === 0) {
  //       setOpenModal(false);

  //       setFailedEmployeeIds([]);

  //       setEmailSummary(null);

  //       showToast(
  //         "success",
  //         "Success",
  //         "Emails sent to all employees successfully",
  //       );
  //     } else {
  //       setEmailSummary(result);

  //       const failedIds = result.failedEmployees.map(
  //         (emp) => emp.split(" - ")[0],
  //       );

  //       setFailedEmployeeIds(failedIds);

  //       showToast(
  //         "warning",
  //         "Partial Success",
  //         `${result.emailsFailed} emails failed`,
  //       );
  //     }
  //   } catch (error) {
  //     console.log(error);

  //     showToast("error", "Failed", "Unable to send payroll emails");
  //   } finally {
  //     setProgress(100);

  //     setTimeout(() => {
  //       setSendingEmails(false);
  //     }, 1000);
  //   }
  // };

  const handleGenerateEmails = async () => {
    try {
      setSendingEmails(true);
      setProgress(0);
      setProcessedCount(0);
      setEmailSummary(null);
      setFailedEmployeeIds([]);

      const failedEmployees = [];

      const employees = excelData.map((item) => ({
        employeeId: item["Employee ID"],
        employeeName: item["Employee Name"],
        email: item["Email"],

        dateOfBirth: item["Date Of Birth"]?.split("-")?.reverse()?.join("-"),

        designation: item["Designation"],
        location: item["Location"],
        bankName: item["Bank Name"],
        bankAccountNo: item["Bank Account No"],
        panNo: item["PAN No"],
        uanNo: item["UAN No"],
        payPeriod: item["Pay Period"],

        totalDays: Number(item["Total Days"]),
        workingDays: Number(item["Working Days"]),
        lopDays: Number(item["LOP Days"]),

        basicSalary: Number(item["Basic Salary"]),
        hra: Number(item["HRA"]),
        specialAllowance: Number(item["Special Allowance"]),

        professionTax: Number(item["Profession Tax"]),
        groupMedicalInsurance: Number(item["Group Medical Insurance"]),
        pfEeCon: Number(item["PF EE CON"]),
        pfErCon: Number(item["PF ER CON"]),
        tds: Number(item["TDS"]),
        eduCess: Number(item["EDU Cess"]),
        otherDeductions: Number(item["Other Deductions"]),
      }));

      for (let i = 0; i < employees.length; i++) {
        const employee = employees[i];

        try {
          await generatePayrollEmails({
            runId: null,
            employees: [employee],
          });
        } catch (error) {
          failedEmployees.push(
            `${employee.employeeId} - ${employee.employeeName}`,
          );
        }

        const currentCount = i + 1;

        setProcessedCount(currentCount);

        setProgress(Math.round((currentCount / employees.length) * 100));
      }

      if (failedEmployees.length === 0) {
        handleCloseModal();

        showToast(
          "success",
          "Success",
          "Successfully sent payslip emails to all employees",
        );
      } else {
        setEmailSummary({
          emailsSent: employees.length - failedEmployees.length,
          totalEmployees: employees.length,
          failedEmployees,
          emailsFailed: failedEmployees.length,
        });

        const failedIds = failedEmployees.map((emp) => emp.split(" - ")[0]);

        setFailedEmployeeIds(failedIds);

        showToast(
          "warning",
          "Partial Success",
          `${failedEmployees.length} emails failed`,
        );
      }
    } catch (error) {
      console.log(error);

      showToast("error", "Failed", "Unable to send payroll emails");
    } finally {
      setTimeout(() => {
        setSendingEmails(false);
      }, 800);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setExcelData([]);
    setValidationErrors([]);
    setUploadedFileName("");
    setTemplateHeaders([]);
    setPage(0);
    setRowsPerPage(10);
    setDragActive(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      {/* WHOLE PAGE GLOBAL LOADER */}

      <Backdrop
        open={loading}
        sx={{
          zIndex: 99999,
          background: "rgba(2,6,23,0.78)",
          backdropFilter: "blur(6px)",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress
          size={70}
          thickness={4}
          sx={{
            color: "#8B5CF6",
          }}
        />

        <Typography
          sx={{
            color: "#fff",
            fontWeight: 700,
            fontSize: "20px",
            letterSpacing: "0.5px",
          }}
        >
          Processing Payroll...
        </Typography>
      </Backdrop>
      <Box
        // sx={{
        //   background: "linear-gradient(180deg, #111827 0%, #0F172A 100%)",
        //   borderRadius: "28px",
        //   p: 5,
        //   border: "1px solid rgba(255,255,255,0.08)",
        //   boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
        // }}
        // sx={{
        //   background:
        //     "linear-gradient(135deg, rgba(15,23,42,0.96) 0%, rgba(30,41,59,0.95) 45%, rgba(49,46,129,0.92) 100%)",

        //   borderRadius: "32px",

        //   p: 5,

        //   border: "1px solid rgba(255,255,255,0.08)",

        //   backdropFilter: "blur(18px)",

        //   boxShadow:
        //     "0 20px 60px rgba(0,0,0,0.35), 0 0 40px rgba(139,92,246,0.12)",

        //   position: "relative",

        //   overflow: "hidden",
        // }}
        sx={{
          background: "rgba(15,23,42,0.72)",

          backdropFilter: "blur(18px)",

          borderRadius: "32px",

          p: 5,

          border: "1px solid rgba(255,255,255,0.08)",

          boxShadow: "0 20px 60px rgba(0,0,0,0.28)",
        }}
      >
        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            width: "100%",
            mb: 5,
          }}
        >
          {/* LEFT SIDE */}
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                color: "#fff",
                fontSize: "28px",
                fontWeight: 700,
              }}
            >
              Payroll Management
            </Typography>
          </Box>

          {/* RIGHT SIDE */}

          <Button
            variant="outlined"
            startIcon={<DownloadOutlinedIcon />}
            onClick={handleDownloadTemplate}
            sx={{
              borderRadius: "14px",
              color: "#fff",
              borderColor: "rgba(255,255,255,0.15)",
              px: 3,
              py: 1.2,
              textTransform: "none",
              fontWeight: 700,

              "&:hover": {
                borderColor: "#2563EB",
                background: "rgba(37,99,235,0.08)",
              },
            }}
          >
            Download template
          </Button>
        </Stack>

        <Box
          onDragEnter={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setDragActive(false);
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            setOpenModal(true);
            const file = e.dataTransfer.files[0];
            if (!file) return;
            handleFileUpload({
              target: {
                files: [file],
              },
            });
          }}
          component="label"
          sx={{
            border: dragActive ? "2px dashed #2563EB" : "2px dashed #CBD5E1",
            borderRadius: "22px",
            py: 5,
            px: 3,
            textAlign: "center",
            cursor: "pointer",
            display: "block",
            transition: "all 0.3s ease",
            mb: 4,
            background: "rgba(255,255,255,0.92)",
            minHeight: "340px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            "&:hover": {
              transform: "translateY(-2px)",

              boxShadow: "0 15px 35px rgba(37,99,235,0.12)",
            },
          }}
        >
          <input
            ref={fileInputRef}
            hidden
            type="file"
            accept=".xlsx,xls"
            onChange={(e) => {
              setOpenModal(true);
              handleFileUpload(e);
            }}
          />
          <FileUploadOutlinedIcon
            sx={{
              fontSize: 70,

              color: "#2563EB",

              mb: 2,

              filter: "drop-shadow(0 6px 16px rgba(37,99,235,0.28))",
            }}
          />
          <Typography
            sx={{ fontWeight: 700, fontSize: "32px", color: "#0F172A", mb: 1 }}
          >
            Drag and Drop Payroll Excel here
          </Typography>
          <Typography sx={{ color: "#64748B", fontSize: "16px" }}>
            or Click to browse .xlsx file
          </Typography>
          <Button
            variant="contained"
            startIcon={<UploadFileOutlinedIcon />}
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            sx={{
              mt: 3,

              background: "linear-gradient(90deg, #7C3AED 0%, #2563EB 100%)",

              borderRadius: "14px",

              px: 4,

              py: 1.3,

              textTransform: "none",

              fontWeight: 700,

              fontSize: "15px",

              boxShadow: "0 10px 25px rgba(37,99,235,0.28)",

              "&:hover": {
                background: "linear-gradient(90deg, #6D28D9 0%, #1D4ED8 100%)",
              },
            }}
          >
            Upload Payroll Sheet
          </Button>
          {uploadedFileName && (
            <Box
              sx={{
                mt: 3,
                px: 2,
                py: 1.5,
                borderRadius: "14px",
                background: "rgba(37,99,235,0.08)",
                border: "1px solid rgba(37,99,235,0.18)",
                display: "inline-flex",
                alignItems: "center",
                gap: 1.2,
              }}
            >
              <DescriptionOutlinedIcon
                sx={{
                  color: "#2563EB",
                  fontSize: 22,
                }}
              />

              <Typography
                sx={{
                  color: "#0F172A",
                  fontWeight: 600,
                  fontSize: "15px",
                }}
              >
                {uploadedFileName}
              </Typography>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            mt: 4,
            px: 3,
            py: 2.5,
            borderRadius: "16px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{
              mb: 2,
            }}
          >
            <ChecklistOutlinedIcon
              sx={{
                color: "#A78BFA",
                fontSize: 26,
              }}
            />

            <Typography
              sx={{
                color: "#fff",
                fontWeight: 700,
                fontSize: "22px",
              }}
            >
              Payroll Upload Guidelines
            </Typography>
          </Stack>

          <Typography
            sx={{
              color: "#CBD5E1",
              fontSize: "16px",
              mb: 1,
            }}
          >
            1. Upload payroll data only in .xlsx format
          </Typography>

          <Typography
            sx={{
              color: "#CBD5E1",
              fontSize: "16px",
              mb: 1,
            }}
          >
            2. Use the downloaded payroll template before uploading
          </Typography>

          <Typography
            sx={{
              color: "#CBD5E1",
              fontSize: "16px",
              mb: 1,
            }}
          >
            3. Validation errors must be resolved before email generation
          </Typography>
          <Typography
            sx={{
              color: "#CBD5E1",
              fontSize: "16px",
              mb: 1,
            }}
          >
            4. Payroll emails will be successfully generated and sent to each
            employee
          </Typography>
        </Box>

        {/* ========================= */}
        {/* UPLOAD BUTTON */}
        {/* ========================= */}

        {/* <Button
          variant="outlined"
          startIcon={<UploadFileOutlinedIcon />}
          onClick={() => setOpenModal(true)}
          sx={{
            borderRadius: "14px",
            color: "#fff",
            borderColor: "rgba(255,255,255,0.15)",
            px: 3,
            py: 1.2,
            textTransform: "none",
            fontWeight: 700,
            fontSize: "15px",

            "&:hover": {
              borderColor: "#2563EB",
              background: "rgba(37,99,235,0.08)",
            },
          }}
        >
          Upload & preview payroll sheet
        </Button> */}

        {/* ========================= */}
        {/* GLOBAL MODAL */}
        {/* ========================= */}

        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          maxWidth={false}
          fullWidth
          PaperProps={{
            sx: {
              background: "#1E293B",
              borderRadius: "24px",
              color: "#fff",
              p: 1,
              width: "95vw",
              maxWidth: "95vw",
              height: "92vh",
            },
          }}
        >
          {/* HEADER */}

          <DialogTitle
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              background: "#fff",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <PreviewOutlinedIcon
                  sx={{
                    color: "#32353bff",
                    fontSize: 30,
                  }}
                />

                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "24px",
                  }}
                >
                  Preview Payroll Sheet
                </Typography>
              </Stack>

              <IconButton
                onClick={handleCloseModal}
                sx={{
                  color: "#0F172A",
                  position: "absolute",
                  right: 16,
                  top: 16,

                  "&:hover": {
                    background: "rgba(15,23,42,0.08)",
                  },
                }}
              >
                <HighlightOffOutlinedIcon sx={{ fontSize: "30px" }} />
              </IconButton>
            </Box>
          </DialogTitle>

          {/* CONTENT */}

          <DialogContent>
            <Backdrop
              open={loading}
              sx={{
                position: "absolute",
                zIndex: 9999,
                color: "#fff",
                borderRadius: "24px",
                background: "rgba(15,23,42,0.72)",
                backdropFilter: "blur(4px)",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <CircularProgress
                size={60}
                thickness={4}
                sx={{
                  color: "#8B5CF6",
                }}
              />

              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "18px",
                }}
              >
                Processing Payroll Sheet...
              </Typography>
            </Backdrop>
            <Backdrop
              open={sendingEmails}
              sx={{
                position: "absolute",
                zIndex: 10000,
                borderRadius: "24px",
                background: "rgba(15,23,42,0.72)",
                backdropFilter: "blur(6px)",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <CircularProgress
                size={65}
                thickness={4}
                sx={{
                  color: "#10B981",
                }}
              />

              <Typography
                sx={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "22px",
                }}
              >
                Processing Payroll...
              </Typography>

              <Typography
                sx={{
                  color: "#CBD5E1",
                  fontSize: "15px",
                }}
              >
                Sending emails to employees...
              </Typography>
            </Backdrop>
            {/* VALIDATION ERRORS */}

            {validationErrors.length > 0 && (
              <Box
                sx={{
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  borderRadius: "16px",
                  p: 3,
                  mb: 4,
                }}
              >
                <Typography
                  sx={{
                    color: "#FCA5A5",
                    fontWeight: 700,
                    mb: 2,
                  }}
                >
                  Validation Errors
                </Typography>

                {validationErrors.map((error, index) => (
                  <Typography
                    key={index}
                    sx={{
                      color: "#FCA5A5",
                      mb: 1,
                      fontSize: "14px",
                    }}
                  >
                    • {error}
                  </Typography>
                ))}
              </Box>
            )}

            {/* TABLE PREVIEW */}

            {emailSummary && (
              <Box
                sx={{
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  borderRadius: "16px",
                  p: 3,
                  mb: 4,
                }}
              >
                <Typography
                  sx={{
                    color: "#FCA5A5",
                    fontWeight: 700,
                    fontSize: "20px",
                    mb: 2,
                  }}
                >
                  Failed Employees
                </Typography>

                <Typography
                  sx={{
                    color: "#fff",
                    mb: 2,
                  }}
                >
                  Emails Sent:
                  {emailSummary.emailsSent}/{emailSummary.totalEmployees}
                </Typography>

                {emailSummary.failedEmployees.map((employee, index) => (
                  <Typography
                    key={index}
                    sx={{
                      color: "#FCA5A5",
                      mb: 1,
                    }}
                  >
                    • {employee}
                  </Typography>
                ))}
              </Box>
            )}

            {excelData.length > 0 && (
              <>
                <TableContainer
                  component={Paper}
                  sx={{
                    background: "#111827",
                    borderRadius: "18px",
                    overflowX: "auto",
                    mb: 4,
                  }}
                >
                  <Table stickyHeader sx={{ minWidth: 2400 }}>
                    <TableHead>
                      <TableRow sx={{ background: "#1F2937" }}>
                        {previewHeaders.map((header) => (
                          <TableCell
                            key={header}
                            sx={{
                              background: "#111827",
                              color: "#E2E8F0",
                              fontWeight: 700,
                              whiteSpace: "nowrap",
                              wordBreak: "break-word",
                              borderBottom: "1px solid rgba(255,255,255,0.08)",
                              fontSize: "12px",
                            }}
                          >
                            {header}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {excelData
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage,
                        )
                        .map((row, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              backgroundColor: failedEmployeeIds.includes(
                                row["Employee ID"],
                              )
                                ? "rgba(239,68,68,0.18)"
                                : index % 2 === 0
                                  ? "#1F2937"
                                  : "#111827",
                            }}
                          >
                            {previewHeaders.map((header) => (
                              <TableCell
                                key={header}
                                sx={{
                                  color: "#CBD5E1",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {row[header]}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* <Typography
                  sx={{ color: "#2f3237ff", fontSize: "16px", mb: 1 }}
                >
                  Showing {page * rowsPerPage + 1}–
                  {Math.min((page + 1) * rowsPerPage, excelData.length)} of{" "}
                  {excelData.length} records
                </Typography>
                <TablePagination
                  component="div"
                  count={excelData.length}
                  page={page}
                  onPageChange={(event, newPage) => {
                    setPage(newPage);
                  }}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                  }}
                  rowsPerPageOptions={[10, 25, 50, 100]}
                  sx={{
                    color: "#fff",

                    ".MuiTablePagination-selectIcon": {
                      color: "#fff",
                    },

                    ".MuiSvgIcon-root": {
                      color: "#fff",
                    },

                    ".MuiSelect-icon": {
                      color: "#fff",
                    },
                  }}
                /> */}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 2,
                    px: 1,
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  <Typography
                    sx={{
                      color: "#2f3237ff",
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                  >
                    Showing {page * rowsPerPage + 1}–
                    {Math.min((page + 1) * rowsPerPage, excelData.length)} of{" "}
                    {excelData.length} records
                  </Typography>

                  <TablePagination
                    component="div"
                    count={excelData.length}
                    page={page}
                    onPageChange={(event, newPage) => {
                      setPage(newPage);
                    }}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(event) => {
                      setRowsPerPage(parseInt(event.target.value, 10));
                      setPage(0);
                    }}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    sx={{
                      color: "#2f3237ff",

                      ".MuiTablePagination-toolbar": {
                        padding: 0,
                      },

                      ".MuiTablePagination-selectLabel": {
                        color: "#2f3237ff",
                      },

                      ".MuiTablePagination-displayedRows": {
                        color: "#2f3237ff",
                      },

                      ".MuiSelect-icon": {
                        color: "#2f3237ff",
                      },

                      ".MuiSvgIcon-root": {
                        color: "#2f3237ff",
                      },
                    }}
                  />
                </Box>
              </>
            )}

            {/* GENERATE EMAIL */}

            <Box
              sx={{
                textAlign: "right",
              }}
            >
              <Button
                variant="contained"
                onClick={handleGenerateEmails}
                startIcon={<EmailOutlinedIcon />}
                disabled={
                  validationErrors.length > 0 ||
                  excelData.length === 0 ||
                  sendingEmails
                }
                sx={{
                  background:
                    validationErrors.length === 0 && excelData.length > 0
                      ? "#10B981"
                      : "#475569",

                  borderRadius: "14px",

                  px: 4,

                  py: 1.3,

                  textTransform: "none",

                  fontWeight: 700,

                  "&:hover": {
                    background:
                      validationErrors.length === 0 && excelData.length > 0
                        ? "#059669"
                        : "#475569",
                  },
                }}
              >
                {sendingEmails ? "Sending Emails" : "Generate Emails"}
              </Button>
            </Box>
            <PayrollLoader
              open={sendingEmails}
              progress={progress}
              current={processedCount}
              total={excelData.length}
            />
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default Payroll;
