import React, { useRef, useState } from "react";

import * as XLSX from "xlsx";

import { Box, Typography, Button, Paper, Stack } from "@mui/material";

import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";

import GlobalModal from "../ui/GlobalModal";

import Table from "../ui/Table";

const Payroll = () => {
  const fileInputRef = useRef(null);

  const [openModal, setOpenModal] = useState(false);

  const [previewData, setPreviewData] = useState([]);

  const [columns, setColumns] = useState([]);

  const [fileName, setFileName] = useState("");

  // =========================================
  // HANDLE EXCEL FILE
  // =========================================

  const handleFile = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    // FILE TYPE VALIDATION
    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only Excel files are allowed");
      return;
    }

    // FILE SIZE VALIDATION
    if (file.size > 2 * 1024 * 1024) {
      alert("File size should be less than 2MB");
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;

      // READ WORKBOOK
      const workbook = XLSX.read(data, {
        type: "binary",
      });

      // GET FIRST SHEET
      const sheetName = workbook.SheetNames[0];

      const worksheet = workbook.Sheets[sheetName];

      // CONVERT TO JSON
      const rawData = XLSX.utils.sheet_to_json(worksheet, {
        raw: false,
        defval: 0,
      });

      const excelData = rawData.map((row) => {
        const normalizedRow = {};

        Object.keys(row).forEach((key) => {
          normalizedRow[key.trim().toUpperCase()] = row[key];
        });

        return normalizedRow;
      });

      // =========================================
      // COMPUTE PAYROLL
      // =========================================

      const processedData = excelData.map((row, index) => {
        const parseValue = (value) => {
          return Number(
            String(value || 0)
              .replace(/,/g, "")
              .trim(),
          );
        };

        const basic = parseValue(row["BASIC SALARY"]);

        const hra = parseValue(row["HRA"]);

        const specialAllowance = parseValue(row["SPECIAL ALLOWANCE"]);

        const professionTax = parseValue(row["PROFESSION TAX"]);

        const medicalInsurance = parseValue(row["GROUP MEDICAL INSURANCE"]);

        const pf = parseValue(row["PF EE CON"]);

        const tds = parseValue(row["TDS"]);

        const eduCess = parseValue(row["EDU CESS"]);

        const otherDeductions = parseValue(row["OTHER DEDUCTIONS"]);

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
          id: index + 1,

          ...row,

          GROSSPAY: grossPay,

          DEDUCTIONS: deductions,

          NETPAY: netPay,
        };
      });
      // =========================================
      // DYNAMIC COLUMNS
      // =========================================

      const dynamicColumns =
        processedData.length > 0
          ? Object.keys(processedData[0]).map((key) => ({
              field: key,

              header: key.toUpperCase(),
            }))
          : [];

      // SAVE DATA
      console.log(processedData);
      setPreviewData(processedData);

      setColumns(dynamicColumns);

      // OPEN MODAL
      setOpenModal(true);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <Box>
      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" fontWeight={700}>
          Payroll Dashboard
        </Typography>

        <Typography
          sx={{
            color: "#64748B",
            mt: 1,
          }}
        >
          Upload and process employee payroll
        </Typography>
      </Box>

      {/* =========================================
          UPLOAD CARD
      ========================================= */}

      <Paper
        elevation={0}
        sx={{
          p: 5,

          borderRadius: "28px",

          background: "linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)",

          border: "1px solid #dbeafe",
        }}
      >
        <Stack spacing={3} justifyContent="center" alignItems="center">
          <UploadFileRoundedIcon
            sx={{
              fontSize: 90,

              color: "#2563eb",
            }}
          />

          <Typography variant="h4" fontWeight={700}>
            Upload Payroll Excel
          </Typography>

          <Typography
            sx={{
              color: "#64748B",
            }}
          >
            Upload employee payroll Excel template
          </Typography>

          {/* UPLOAD BUTTON */}

          <Button
            variant="contained"
            size="large"
            onClick={() => fileInputRef.current.click()}
            sx={{
              borderRadius: "14px",

              px: 5,

              py: 1.5,

              textTransform: "none",

              fontWeight: 600,

              fontSize: "16px",
            }}
          >
            Upload Excel
          </Button>

          {/* HIDDEN FILE INPUT */}

          <input
            hidden
            type="file"
            accept=".xlsx,.xls"
            ref={fileInputRef}
            onChange={handleFile}
          />

          {/* FILE NAME */}

          {fileName && (
            <Typography
              sx={{
                fontWeight: 600,

                color: "#0f172a",
              }}
            >
              Uploaded File: {fileName}
            </Typography>
          )}
        </Stack>
      </Paper>

      {/* =========================================
          PAYROLL PREVIEW MODAL
      ========================================= */}

      <GlobalModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        title="Payroll Preview"
        subtitle="Validate and process employee payroll"
        maxWidth={1400}
        fullWidth
        actions={
          <>
            <Button
              variant="outlined"
              sx={{
                borderRadius: "12px",

                textTransform: "none",

                fontWeight: 600,
              }}
            >
              Validate Payroll
            </Button>

            <Button
              variant="contained"
              sx={{
                borderRadius: "12px",

                textTransform: "none",

                fontWeight: 600,
              }}
            >
              Process Payroll
            </Button>
          </>
        }
      >
        <Box>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
            Excel Preview
          </Typography>

          {/* REUSABLE TABLE */}

          <Table
            value={previewData}
            columns={columns}
            enablePagination={true}
            pagination={{
              first: 0,
              size: 10,
            }}
            totalRecords={previewData.length}
            dataKey="id"
          />
        </Box>
      </GlobalModal>
    </Box>
  );
};

export default Payroll;
