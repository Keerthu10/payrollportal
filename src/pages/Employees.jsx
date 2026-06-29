import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import EmployeeHeader from "../components/Employees/EmployeeHeader";
import EmployeeStats from "../components/Employees/EmployeeStats";
import EmployeeFilters from "../components/Employees/EmployeeFilter";
import EmployeeTable from "../components/Employees/EmployeeTable";
import EmployeeModal from "../components/Employees/EmployeeModal";
import {
  addEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  resendVerificationEmail,
  getEmployeeById,
  downloadEmployeeTemplate,
} from "../services/employeeService";
import GlobalModal from "../ui/GlobalModal";
import { useToast } from "../context/ToastContext";

const Employees = () => {
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
        designation: "",
        department: department || "",
        verified: true,
        search: debouncedSearch,
        page: 0,
        size: 10,
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
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [debouncedSearch, department, status]);

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
    } catch (error) {
      console.log(error);
      showToast("error", "Error", "Failed to delete employee");
    }
  };

  const handleResendVerification = async () => {
    try {
      await resendVerificationEmail({
        employeeId: selectedEmployee.id,
        email: selectedEmployee.email,
      });

      showToast("success", "Success", "Verification email sent successfully");
    } catch (error) {
      console.log(error);
      showToast("error", "Error", "Failed to send verification email");
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      const response = await downloadEmployeeTemplate();

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Employee_Template.xlsx");

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      showToast("error", "Error", "Failed to download template");
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
      />

      <EmployeeStats employees={employees} />

      <EmployeeFilters
        search={search}
        setSearch={setSearch}
        department={department}
        setDepartment={setDepartment}
        status={status}
        setStatus={setStatus}
      />

      <EmployeeTable
        employees={employees}
        loading={loading}
        onEdit={handleEditEmployee}
        onDelete={handleDeleteEmployee}
      />

      <EmployeeModal
        open={openEmployeeModal}
        handleClose={() => setOpenEmployeeModal(false)}
        onSave={handleAddEmployee}
        mode={mode}
        employee={selectedEmployee}
        handleResendVerification={handleResendVerification}
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
