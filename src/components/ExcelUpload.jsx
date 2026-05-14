import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";

import {
  Box,
  Button,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
} from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import DescriptionIcon from "@mui/icons-material/Description";

const ExcelUpload = () => {
  const fileInputRef = useRef(null);

  const [fileName, setFileName] = useState("");
  const [previewData, setPreviewData] = useState([]);

  const handleFile = (file) => {
    if (!file) return;

    // File Type Validation
    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only Excel files are allowed");
      return;
    }

    // File Size Validation
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
    };

    reader.readAsBinaryString(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    handleFile(file);
  };

  return (
    <Box>
      {/* Upload Section */}
      <Paper
        elevation={0}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
        sx={{
          border: "2px dashed #2563eb",
          borderRadius: "20px",
          p: 5,
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: "#f8fafc",
          transition: "0.3s",

          "&:hover": {
            backgroundColor: "#eff6ff",
          },
        }}
      >
        <Stack spacing={2} alignItems="center">
          <UploadFileIcon
            sx={{
              fontSize: 60,
              color: "#2563eb",
            }}
          />

          <Typography variant="h5" fontWeight={700}>
            Drag & Drop Excel File
          </Typography>

          <Typography color="text.secondary">
            Upload payroll Excel template (.xlsx, .xls)
          </Typography>

          <Button variant="contained">Browse File</Button>
        </Stack>

        <input
          hidden
          type="file"
          ref={fileInputRef}
          accept=".xlsx,.xls"
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </Paper>

      {/* Uploaded File */}
      {fileName && (
        <Paper
          elevation={0}
          sx={{
            mt: 3,
            p: 2,
            borderRadius: "16px",
            backgroundColor: "#ffffff",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <DescriptionIcon color="primary" />

              <Box>
                <Typography fontWeight={600}>{fileName}</Typography>

                <Typography variant="body2" color="text.secondary">
                  Excel file uploaded successfully
                </Typography>
              </Box>
            </Stack>

            <Chip label="Uploaded" color="success" />
          </Stack>
        </Paper>
      )}

      {/* Preview Table */}
      {previewData.length > 0 && (
        <Paper
          elevation={0}
          sx={{
            mt: 4,
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              p: 3,
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <Typography variant="h6" fontWeight={700}>
              Excel Preview
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
                {previewData.slice(0, 5).map((row, index) => (
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
    </Box>
  );
};

export default ExcelUpload;
