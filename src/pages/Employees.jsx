import React, { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import { Button, Typography } from "@mui/material";
import EmployeeHeader from "../components/Employees/EmployeeHeader";
import EmployeeStats from "../components/Employees/EmployeeStats";
import EmployeeFilters from "../components/Employees/EmployeeFilter";
import EmployeeTable from "../components/Employees/EmployeeTable";
import EmployeeTablePrime from "../ui/EmployeeTablePrime";
import EmployeeModal from "../components/Employees/EmployeeModal";
import ExportEmployeeModal from "../components/Employees/ExportEmployeeModal";
import {
  addEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  resendVerificationEmail,
  getEmployeeById,
  downloadEmployeeTemplate,
  exportEmployeeReport,
} from "../services/employeeService";
import { getDashboardEmployeeStats } from "../services/dashboard";
import GlobalModal from "../ui/GlobalModal";
import { useToast } from "../context/ToastContext";
import UploadEmployeeModal from "../components/Employees/UploadEmployeeModal";
import { bulkUploadEmployees } from "../services/employeeService";
import { buildExportPayload } from "../components/Employees/ExportHelpers";
import dayjs from "dayjs";

const Employees = () => {
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [openExportModal, setOpenExportModal] = useState(false);
  const [search, setSearch] = useState("");
  const { showToast } = useToast();
  const [openEmployeeModal, setOpenEmployeeModal] = useState(false);
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("Active");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [mode, setMode] = useState("add");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalElements, setTotalElements] = useState(0);

  const fileInputRef = useRef(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [excelData, setExcelData] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [importing, setImporting] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const [designation, setDesignation] = useState("");

  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    inactiveEmployees: 0,
    newEmployees: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // wait 500ms after user stops typing

    return () => clearTimeout(timer);
  }, [search]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const payload = {
        designation: designation || "",
        verified: true,
        search: debouncedSearch,
        page,
        size: rowsPerPage,
      };

      if (status !== "") {
        payload.active = status === "Active";
      }

      // 👇 Add this
      console.log("Payload:", payload);

      const response = await getEmployees(payload);

      // 👇 Add this
      console.log("Response:", response.data.content);

      setEmployees(response.data.content || []);
      setTotalElements(response.data.totalElements || 0);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [debouncedSearch, designation, status, page, rowsPerPage]);

  // const validateEmployeeData = (data) => {
  //   const errors = [];

  //   const emails = new Set();

  //   data.forEach((employee, index) => {
  //     const row = index + 2;

  //     if (!employee["Name"]) {
  //       errors.push(`Row ${row}: Name is required`);
  //     }

  //     if (!employee["Email"]) {
  //       errors.push(`Row ${row}: Email is required`);
  //     }

  //     if (employee["Email"] && emails.has(employee["Email"].toLowerCase())) {
  //       errors.push(`Row ${row}: Duplicate Email`);
  //     } else if (employee["Email"]) {
  //       emails.add(employee["Email"].toLowerCase());
  //     }

  //     if (!employee["Phone"]) {
  //       errors.push(`Row ${row}: Phone is required`);
  //     }

  //     if (!employee["Designation"]) {
  //       errors.push(`Row ${row}: Designation is required`);
  //     }

  //     if (!employee["Employement Type"]) {
  //       errors.push(`Row ${row}: Employment Type is required`);
  //     }

  //     // Department Removed
  //     // UAN Optional
  //   });

  //   setValidationErrors(errors);
  // };

  const validateEmployeeData = (data) => {
    const errors = [];

    data.forEach((employee, index) => {
      const row = index + 2;

      if (!employee["Name"]) {
        errors.push({
          row,
          field: "Name",
          message: "Name is required",
        });
      }

      if (!employee["Email"]) {
        errors.push({
          row,
          field: "Email",
          message: "Email is required",
        });
      }

      if (
        employee["Email"] &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employee["Email"])
      ) {
        errors.push({
          row,
          field: "Email",
          message: "Invalid Email",
        });
      }

      if (!employee["Phone"]) {
        errors.push({
          row,
          field: "Phone",
          message: "Phone is required",
        });
      }
    });

    setValidationErrors(errors);
  };

  const fetchEmployeeStats = async () => {
    try {
      const response = await getDashboardEmployeeStats();
      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployeeStats();
  }, []);

  const handleUploadEmployee = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setSelectedFile(file);
    setUploadedFileName(file.name);

    const reader = new FileReader();

    reader.readAsArrayBuffer(file);

    reader.onload = (e) => {
      try {
        const workbook = XLSX.read(e.target.result, {
          type: "array",
        });

        const sheetName = workbook.SheetNames[0];

        const worksheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          defval: "",
          raw: false,
        });

        setExcelData(jsonData);

        validateEmployeeData(jsonData);

        setOpenUploadModal(true);
      } catch (error) {
        console.log(error);
        showToast("error", "Error", "Invalid Excel File");
      }
    };
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleAddEmployee = async (employeeData) => {
    try {
      if (mode === "edit") {
        await updateEmployee(selectedEmployee.id, employeeData);
        showToast("success", "Success", "Employee updated successfully");
      } else {
        await addEmployee(employeeData);
        showToast("success", "Success", "Employee added successfully");
      }

      fetchEmployees(); // refresh table
      fetchEmployeeStats();

      setOpenEmployeeModal(false);
      setSelectedEmployee(null);
    } catch (error) {
      console.log("Error:", error);
      showToast(
        "error",
        "Error",
        mode === "edit"
          ? "Failed to update employee"
          : "Failed to add employee",
      );
    }
  };

  const handleEditEmployee = async (employee) => {
    try {
      const response = await getEmployeeById(employee.id);

      setMode("edit");
      setSelectedEmployee(response.data);
      setOpenEmployeeModal(true);
    } catch (error) {
      console.log(error);
      showToast("error", "Error", "Failed to fetch employee details");
    }
  };

  const handleDeleteEmployee = async (employee) => {
    try {
      const response = await getEmployeeById(employee.id);

      setSelectedEmployee(response.data);
      setOpenDeleteModal(true);
    } catch (error) {
      console.log(error);
      showToast("error", "Error", "Failed to fetch employee details");
    }
  };

  const confirmDeleteEmployee = async () => {
    try {
      await deleteEmployee(selectedEmployee.id);

      showToast("success", "Success", "Employee deleted successfully");

      setOpenDeleteModal(false);
      setSelectedEmployee(null);

      setMode("add");

      fetchEmployees();
      fetchEmployeeStats();
    } catch (error) {
      console.log(error);
      showToast("error", "Error", "Failed to delete employee");
    }
  };

  const handleResendVerification = async () => {
    try {
      await resendVerificationEmail({
        employeeId: selectedEmployee.id,
      });

      showToast("success", "Success", "Verification email sent successfully");
    } catch (error) {
      console.log(error);
      showToast("error", "Error", "Failed to send verification email");
    }
  };

  const handleResendVerificationForRow = async (employee) => {
    console.log("Employee Object:", employee);

    try {
      const payload = {
        employeeId: employee.id,
      };

      console.log("Payload:", payload);

      const response = await resendVerificationEmail(payload);

      console.log("Response:", response);

      showToast(
        "success",
        "Success",
        `Verification email sent to ${employee.name}`,
      );
    } catch (error) {
      console.log("Error Response:", error.response?.data);
      console.log("Status:", error.response?.status);

      showToast("error", "Error", "Failed to send verification email");
    }
  };

  const handleExportEmployees = async (exportData) => {
    try {
      const payload = buildExportPayload(exportData);

      console.log("Export Payload:", payload);

      const response = await exportEmployeeReport(payload);

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = `Employee_Report_${Date.now()}.xlsx`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export Failed:", error);
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      const response = await downloadEmployeeTemplate();

      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Extract filename from Content-Disposition header sent by backend
      let fileName = "Employee_Template.xlsx"; // fallback
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
      showToast("error", "Error", "Failed to download template");
    }
  };

  const handleImportEmployees = async () => {
    if (!selectedFile) {
      showToast("error", "Error", "Please select an Excel file.");
      return;
    }

    try {
      setImporting(true);

      const formData = new FormData();
      formData.append("file", selectedFile);

      console.log("FormData File:", formData.get("file"));

      const response = await bulkUploadEmployees(formData);

      const { successCount, failureCount } = response.data;

      if (failureCount > 0) {
        showToast(
          "error",
          "Import Failed",
          `${failureCount} employee(s) could not be imported. Please check the validation errors.`,
        );
      } else {
        showToast(
          "success",
          "Import Successful",
          `${successCount} employee(s) imported successfully.`,
        );
      }

      setOpenUploadModal(false);
      setUploadedFileName("");
      setExcelData([]);
      setSelectedFile(null);

      fetchEmployees();
      fetchEmployeeStats();
    } catch (error) {
      showToast(
        "error",
        "Error",
        error.response?.data?.message || "Employee import failed.",
      );
    } finally {
      setImporting(false);
    }
  };

  // const filteredEmployees = (employees || []).filter((employee) => {
  //   const matchesSearch = [
  //     employee.employeeId,
  //     employee.name,
  //     employee.email,
  //     employee.department,
  //     employee.designation,
  //   ]
  //     .join(" ")
  //     .toLowerCase()
  //     .includes(search.toLowerCase());

  //   const matchesDepartment =
  //     department === "" || employee.department === department;

  //   const matchesStatus =
  //     status === "" ||
  //     (status === "Active" && employee.active) ||
  //     (status === "Inactive" && !employee.active);

  //   return matchesSearch && matchesDepartment && matchesStatus;
  // });

  return (
    <>
      <EmployeeHeader
        onAddEmployee={() => {
          setMode("add");
          setSelectedEmployee(null);
          setOpenEmployeeModal(true);
        }}
        onDownloadTemplate={handleDownloadTemplate}
        onUploadEmployee={handleUploadClick}
        onExportEmployees={() => {
          console.log("Export Button Clicked");
          setOpenExportModal(true);
        }}
      />

      <ExportEmployeeModal
        open={openExportModal}
        handleClose={() => setOpenExportModal(false)}
        onExport={handleExportEmployees}
      />

      <EmployeeStats stats={stats} />

      <EmployeeFilters
        search={search}
        setSearch={setSearch}
        designation={designation}
        setDesignation={setDesignation}
        status={status}
        setStatus={setStatus}
      />

      {/* <EmployeeTable
        employees={employees}
        loading={loading}
        onEdit={handleEditEmployee}
        onDelete={handleDeleteEmployee}
        onResendVerification={handleResendVerificationForRow}
        rowCount={totalElements}
        paginationModel={{ page, pageSize: rowsPerPage }}
        onPaginationModelChange={(model) => {
          setPage(model.page);
          setRowsPerPage(model.pageSize);
        }}
      /> */}

      <EmployeeTablePrime
        employees={employees}
        loading={loading}
        onEdit={handleEditEmployee}
        onDelete={handleDeleteEmployee}
        onResendVerification={handleResendVerificationForRow}
        page={page}
        rowsPerPage={rowsPerPage}
        totalRecords={totalElements}
        onPageChange={(newPage, newRowsPerPage) => {
          setPage(newPage);
          setRowsPerPage(newRowsPerPage);
        }}
      />

      <EmployeeModal
        open={openEmployeeModal}
        handleClose={() => setOpenEmployeeModal(false)}
        onSave={handleAddEmployee}
        mode={mode}
        employee={selectedEmployee}
        handleResendVerification={handleResendVerification}
      />

      <UploadEmployeeModal
        open={openUploadModal}
        handleClose={() => setOpenUploadModal(false)}
        uploadedFileName={uploadedFileName}
        excelData={excelData}
        validationErrors={validationErrors}
        loading={loading}
        importing={importing}
        onImportEmployees={handleImportEmployees}
      />

      <input
        hidden
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        onChange={handleUploadEmployee}
      />

      <GlobalModal
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        title="Delete Employee"
        subtitle="Are you sure you want to delete this employee?"
        maxWidth={450}
        modalHeight="auto"
        actions={
          <>
            <Button
              variant="outlined"
              onClick={() => {
                setOpenDeleteModal(false);
                setSelectedEmployee(null);
              }}
              sx={{
                borderRadius: "12px",
                px: 4,
                py: 1.2,
                minWidth: 120,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "16px",

                borderColor: "#93C5FD",
                color: "#2563EB",

                "&:hover": {
                  borderColor: "#2563EB",
                  backgroundColor: "#EFF6FF",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={confirmDeleteEmployee}
              sx={{
                borderRadius: "12px",
                px: 4,
                py: 1.2,
                minWidth: 190,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "16px",

                background: "linear-gradient(135deg,#EF4444,#DC2626)",

                boxShadow: "0 6px 15px rgba(220,38,38,0.35)",

                "&:hover": {
                  background: "linear-gradient(135deg,#DC2626,#B91C1C)",
                  boxShadow: "0 8px 20px rgba(185,28,28,0.45)",
                },
              }}
            >
              Delete Employee
            </Button>
          </>
        }
      >
        <Typography sx={{ mb: 2 }}>
          <strong>Employee ID:</strong> {selectedEmployee?.employeeId}
        </Typography>

        <Typography>
          <strong>Employee Name:</strong> {selectedEmployee?.name}
        </Typography>
      </GlobalModal>
    </>
  );
};

export default Employees;
