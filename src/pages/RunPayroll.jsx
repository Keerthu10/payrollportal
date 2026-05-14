import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";

import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Stack,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";

import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const RunPayroll = () => {
  const fileInputRef = useRef(null);

  const [fileName, setFileName] = useState("");

  const [previewData, setPreviewData] = useState([]);

  const [summary, setSummary] = useState({
    employees: 0,
    validRows: 0,
    invalidRows: 0,
    totalPayout: 0,
  });

  const handleFile = (file) => {
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

      const workbook = XLSX.read(data, {
        type: "binary",
      });

      const sheetName = workbook.SheetNames[0];

      const worksheet = workbook.Sheets[sheetName];

      const excelData = XLSX.utils.sheet_to_json(worksheet);

      setPreviewData(excelData);

      // SUMMARY DATA
      const employees = excelData.length;

      const validRows = excelData.length;

      const invalidRows = 0;

      let totalPayout = 0;

      excelData.forEach((item) => {
        totalPayout += Number(item.salary || 0);
      });

      setSummary({
        employees,
        validRows,
        invalidRows,
        totalPayout,
      });
    };

    reader.readAsBinaryString(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    handleFile(file);
  };

  const summaryCards = [
    {
      title: "Employees",
      value: summary.employees,
      icon: <GroupsRoundedIcon />,
      color: "#2563eb",
    },
    {
      title: "Valid Rows",
      value: summary.validRows,
      icon: <CheckCircleRoundedIcon />,
      color: "#16a34a",
    },
    {
      title: "Invalid Rows",
      value: summary.invalidRows,
      icon: <ErrorOutlineRoundedIcon />,
      color: "#dc2626",
    },
    {
      title: "Total Payout",
      value: `₹${summary.totalPayout.toLocaleString()}`,
      icon: <CurrencyRupeeRoundedIcon />,
      color: "#9333ea",
    },
  ];

  return (
    <Box>
      {/* HEADER */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" fontWeight={700}>
          Run Payroll
        </Typography>

        <Typography
          sx={{
            color: "#64748B",
            mt: 1,
          }}
        >
          Upload employee payroll Excel template and process salaries
        </Typography>
      </Box>

      {/* UPLOAD CARD */}
      <Paper
        elevation={0}
        sx={{
          p: 5,

          borderRadius: "28px",

          background: "linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)",

          border: "1px solid #dbeafe",

          mb: 4,
        }}
      >
        <Box
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
          sx={{
            minHeight: 300,

            border: "2px dashed #2563eb",

            borderRadius: "24px",

            display: "flex",

            flexDirection: "column",

            justifyContent: "center",

            alignItems: "center",

            textAlign: "center",

            cursor: "pointer",

            transition: "0.3s",

            backgroundColor: "#ffffff",

            "&:hover": {
              backgroundColor: "#f8fbff",

              borderColor: "#1d4ed8",
            },
          }}
        >
          <UploadFileRoundedIcon
            sx={{
              fontSize: 90,

              color: "#2563eb",

              mb: 2,
            }}
          />

          <Typography variant="h4" fontWeight={700}>
            Drag & Drop Excel File
          </Typography>

          <Typography
            sx={{
              color: "#64748B",

              mt: 1,

              mb: 3,
            }}
          >
            Upload payroll Excel template (.xlsx, .xls)
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{
              borderRadius: "14px",

              px: 5,

              py: 1.5,

              textTransform: "none",

              fontWeight: 600,

              fontSize: "16px",
            }}
          >
            Browse File
          </Button>

          <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
            <Chip label=".xlsx" />

            <Chip label=".xls" />

            <Chip label="Max 2MB" />
          </Stack>

          <input
            hidden
            type="file"
            ref={fileInputRef}
            accept=".xlsx,.xls"
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </Box>

        {/* FILE NAME */}
        {fileName && (
          <Box sx={{ mt: 3 }}>
            <Typography
              sx={{
                fontWeight: 600,

                color: "#0f172a",
              }}
            >
              Uploaded File: {fileName}
            </Typography>
          </Box>
        )}
      </Paper>

      {/* SUMMARY CARDS */}
      {previewData.length > 0 && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {summaryCards.map((card, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,

                  borderRadius: "24px",

                  backgroundColor: "#ffffff",

                  border: "1px solid #e2e8f0",

                  height: "100%",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      sx={{
                        color: "#64748B",

                        mb: 1,
                      }}
                    >
                      {card.title}
                    </Typography>

                    <Typography variant="h4" fontWeight={700}>
                      {card.value}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: 56,

                      height: 56,

                      borderRadius: "16px",

                      backgroundColor: `${card.color}15`,

                      display: "flex",

                      alignItems: "center",

                      justifyContent: "center",

                      color: card.color,
                    }}
                  >
                    {card.icon}
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* PREVIEW TABLE */}
      {previewData.length > 0 && (
        <Paper
          elevation={0}
          sx={{
            borderRadius: "28px",

            overflow: "hidden",

            border: "1px solid #e2e8f0",

            mb: 4,
          }}
        >
          <Box
            sx={{
              p: 3,

              borderBottom: "1px solid #e2e8f0",

              backgroundColor: "#ffffff",
            }}
          >
            <Typography variant="h5" fontWeight={700}>
              Payroll Preview
            </Typography>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {Object.keys(previewData[0]).map((key) => (
                    <TableCell
                      key={key}
                      sx={{
                        fontWeight: 700,

                        backgroundColor: "#f8fafc",
                      }}
                    >
                      {key}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {previewData.slice(0, 8).map((row, index) => (
                  <TableRow key={index}>
                    {Object.values(row).map((value, i) => (
                      <TableCell key={i}>{value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* ACTION BUTTONS */}
      {previewData.length > 0 && (
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderRadius: "14px",

              px: 4,

              textTransform: "none",

              fontWeight: 600,
            }}
          >
            Validate Payroll
          </Button>

          <Button
            variant="contained"
            size="large"
            sx={{
              borderRadius: "14px",

              px: 4,

              textTransform: "none",

              fontWeight: 600,
            }}
          >
            Process Payroll
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default RunPayroll;
