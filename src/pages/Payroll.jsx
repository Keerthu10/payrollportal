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
  "Employment Type",
  "IFSC Code",
  "Special Allowance",
  "Profession Tax",
  "Group Medical Insurance",
  "PF",
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

  const [isInvalidFile, setIsInvalidFile] = useState(false);

  const [loading, setLoading] = useState(false);

  const [dragActive, setDragActive] = useState(false);

  const [failedEmployeeIds, setFailedEmployeeIds] = useState([]);

  const [emailSummary, setEmailSummary] = useState(null);

  const [sendingEmails, setSendingEmails] = useState(false);

  const [progress, setProgress] = useState(0);

  const [processedCount, setProcessedCount] = useState(0);

  const fileInputRef = useRef(null);

  const parseNumber = (value) => {
    if (value === null || value === undefined || value === "") {
      return 0;
    }

    return Number(String(value).replace(/,/g, "").trim()) || 0;
  };

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

      // Extract filename from Content-Disposition header sent by backend
      let fileName = "Payroll_Template.xlsx"; // fallback
      const disposition = response.headers["content-disposition"];

      if (disposition) {
        const match = disposition.match(
          /filename\*?=(?:UTF-8'')?["']?([^"';\n]+)/i,
        );
        if (match && match[1]) {
          fileName = decodeURIComponent(match[1]);
        }
      }

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", fileName);

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);

      showToast(
        "error",
        "Download Failed",
        error?.response?.data?.message || "Unable to download template",
      );
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
      } else if (emails.has(email)) {
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
      const bankAccountNo = String(employee["Bank Account No"] ?? "")
        .replace(/,/g, "")
        .replace(/\s|-/g, "")
        .trim();

      if (!bankAccountNo) {
        errors.push(`Row ${row}: Bank Account Number is required`);
      } else if (!/^\d{9,18}$/.test(bankAccountNo)) {
        errors.push(`Row ${row}: Invalid Bank Account Number`);
      } else if (bankAccount.has(bankAccountNo)) {
        errors.push(`Row ${row}: Duplicate Bank Account Number`);
      } else {
        bankAccount.add(bankAccountNo);
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

      if (!uanNo) {
        errors.push(`Row ${row}:UAN No is required`);
      } else if (uanNumbers.has(uanNo)) {
        errors.push(`Row ${row}:Duplicate UAN No`);
      } else {
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
      if (Number(employee["PF"]) < 0) {
        errors.push(`Row ${row}: Invalid PF EE Contribution`);
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

    setEmailSummary(null);
    setFailedEmployeeIds([]);
    setIsInvalidFile(false);
    setValidationErrors([]);
    setExcelData([]);

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
        setIsInvalidFile(true);
        showToast(
          "error",
          "Invalid Payroll Template",
          "Please upload a valid Payroll_Template.xlsx.",
        );

        setValidationErrors([
          "The uploaded file doesn't match the Payroll Template.",
          "",
          "Missing Columns:",
          ...missingHeaders,
        ]);

        setExcelData([]);

        setLoading(false);
        return;
      }

      const allData = XLSX.utils.sheet_to_json(worksheet, {
        defval: "",
        raw: false,
      });

      const jsonData = allData;

      if (jsonData.length === 0) {
        setIsInvalidFile(true);
        setValidationErrors(["No data rows found in uploaded file"]);
        setExcelData([]);
        setLoading(false);
        return;
      }

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
        const basic = parseNumber(row["Basic Salary"]);
        const hra = parseNumber(row["HRA"]);
        const specialAllowance = parseNumber(row["Special Allowance"]);

        const professionTax = parseNumber(row["Profession Tax"]);
        const medicalInsurance = parseNumber(row["Group Medical Insurance"]);
        const pf = parseNumber(row["PF"]);
        const tds = parseNumber(row["TDS"]);
        const eduCess = parseNumber(row["EDU Cess"]);
        const otherDeductions = parseNumber(row["Other Deductions"]);

        // CALCULATIONS

        const grossPay = basic + hra + specialAllowance;

        const deductions =
          professionTax +
          medicalInsurance +
          pf +
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

      setIsInvalidFile(false);

      setOpenModal(true);

      requestAnimationFrame(() => {
        setLoading(false);
      });
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

        totalDays: parseNumber(item["Total Days"]),
        workingDays: parseNumber(item["Working Days"]),
        lopDays: parseNumber(item["LOP Days"]),

        basicSalary: parseNumber(item["Basic Salary"]),
        hra: parseNumber(item["HRA"]),
        employmentType: item["Employment Type"],
        ifscCode: item["IFSC Code"],
        specialAllowance: parseNumber(item["Special Allowance"]),

        professionTax: parseNumber(item["Profession Tax"]),
        groupMedicalInsurance: parseNumber(item["Group Medical Insurance"]),
        pf: parseNumber(item["PF"]),
        tds: parseNumber(item["TDS"]),
        eduCess: parseNumber(item["EDU Cess"]),
        otherDeductions: parseNumber(item["Other Deductions"]),
        emailVerified: true,
      }));

      let runId = null;

      for (let i = 0; i < employees.length; i++) {
        const employee = employees[i];

        try {
          const payload = {
            runId: runId,
            employees: [employee],
          };

          console.log("Request Payload:", payload);

          const response = await generatePayrollEmails(payload);

          console.log("Response:", response.data);

          // Save runId returned from backend
          if (response?.data?.data?.runId != null) {
            runId = response.data.data.runId;
          }
        } catch (error) {
          console.error(error);

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
    setIsInvalidFile(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = () => {
    setUploadedFileName("");
    setExcelData([]);
    setValidationErrors([]);
    setTemplateHeaders([]);
    setEmailSummary(null);
    setFailedEmployeeIds([]);
    setPage(0);
    setIsInvalidFile(false);
    setLoading(false);
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
          background: "linear-gradient(135deg, #241B67 0%, #302A7C 100%)",
          borderRadius: "32px",
          p: 5,
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
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
              background: "linear-gradient(90deg, #7C3AED 0%, #2563EB 100%)",
              boxShadow: "0 10px 25px rgba(37,99,235,0.28)",
              borderRadius: "14px",
              color: "#fff",
              borderColor: "rgba(24, 23, 23, 0.15)",
              px: 3,
              py: 1.2,
              textTransform: "none",
              fontWeight: 700,

              "&:hover": {
                background: "linear-gradient(90deg, #6D28D9 0%, #1D4ED8 100%)",
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
            py: 2,
            px: 3,
            textAlign: "center",
            cursor: "pointer",
            display: "block",
            transition: "all 0.3s ease",
            mb: 4,
            background: "rgba(255,255,255,0.92)",
            minHeight: "140px",
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
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
          />
          <FileUploadOutlinedIcon
            sx={{
              fontSize: 50,

              color: "#2563EB",

              mb: 2,

              filter: "drop-shadow(0 6px 16px rgba(37,99,235,0.28))",
            }}
          />
          <Typography
            sx={{ fontWeight: 700, fontSize: "24px", color: "#0F172A", mb: 1 }}
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
              mt: 2,

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
          {/* {uploadedFileName && (
            <Box
              sx={{
                mt: 3,
                px: 2,
                py: 1.5,
                borderRadius: "14px",
                background:
                  validationErrors.length > 0
                    ? "#FEE2E2"
                    : "rgba(37,99,235,0.08)",
                border:
                  validationErrors.length > 0
                    ? "1px solid #EF4444"
                    : "1px solid rgba(37,99,235,0.18)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "420px",
              }}
            >
              <Box display="flex" alignItems="center">
                <DescriptionOutlinedIcon
                  color={validationErrors.length > 0 ? "error" : "primary"}
                />
              </Box>
              <Typography
                sx={{
                  color: "#0F172A",
                  fontWeight: 600,
                  fontSize: "15px",
                }}
              >
                {uploadedFileName}
              </Typography>
              <IconButton
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile();
                }}
              >
                <HighlightOffOutlinedIcon />
              </IconButton>
            </Box>
          )} */}
          {uploadedFileName && !loading && !openModal && (
            <>
              <Box
                sx={{
                  mt: 3,
                  px: 2,
                  py: 1.5,
                  borderRadius: "14px",
                  background: isInvalidFile
                    ? "#FEE2E2"
                    : "rgba(37,99,235,0.08)",
                  border: isInvalidFile
                    ? "1px solid #EF4444"
                    : "1px solid rgba(37,99,235,0.18)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "420px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <DescriptionOutlinedIcon
                    color={isInvalidFile ? "error" : "primary"}
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

                <IconButton
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile();
                  }}
                >
                  <HighlightOffOutlinedIcon />
                </IconButton>
              </Box>

              {/* Show this only if validation failed */}
              {isInvalidFile && (
                <Box
                  sx={{
                    width: "420px",
                    mt: 2,
                    p: 2,
                    borderRadius: 2,
                    background: "#FEF2F2",
                    border: "1px solid #FCA5A5",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#B91C1C",
                      fontWeight: 700,
                      mb: 1,
                    }}
                  >
                    Invalid Payroll Template
                  </Typography>

                  <Typography
                    sx={{
                      color: "#7F1D1D",
                      fontSize: "14px",
                      textAlign: "center",
                      lineHeight: 1.6,
                    }}
                  >
                    This file doesn't match the required payroll template.
                    <br />
                    Please remove this file and upload a valid{" "}
                    <strong>Payroll_Template.xlsx</strong>.
                    <br />
                    If needed, use the <strong>"Download Template"</strong>{" "}
                    button above.
                  </Typography>
                </Box>
              )}
            </>
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
              color: "#fff",
              fontSize: "16px",
              mb: 1,
            }}
          >
            1. Upload payroll data only in .xlsx format
          </Typography>

          <Typography
            sx={{
              color: "#fff",
              fontSize: "16px",
              mb: 1,
            }}
          >
            2. Use the downloaded payroll template before uploading
          </Typography>

          <Typography
            sx={{
              color: "#fff",
              fontSize: "16px",
              mb: 1,
            }}
          >
            3. Validation errors must be resolved before email generation
          </Typography>
          <Typography
            sx={{
              color: "#fff",
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
