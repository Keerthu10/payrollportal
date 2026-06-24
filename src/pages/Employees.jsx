import React, { useState, useEffect } from "react";

import EmployeeHeader from "../components/Employees/EmployeeHeader";
import EmployeeStats from "../components/Employees/EmployeeStats";
import EmployeeFilters from "../components/Employees/EmployeeFilter";
import EmployeeTable from "../components/Employees/EmployeeTable";
import EmployeeModal from "../components/Employees/EmployeeModal";
import {
  addEmployee,
  getEmployees,
  updateEmployee,
  resendVerificationEmail,
  getEmployeeById,
  downloadEmployeeTemplate,
} from "../services/employeeService";
import { useToast } from "../context/ToastContext";

const Employees = () => {
  const [search, setSearch] = useState("");
  const { showToast } = useToast();
  const [openEmployeeModal, setOpenEmployeeModal] = useState(false);
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");

  const [mode, setMode] = useState("add");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees({
        name: "",
        designation: "",
        department: "",
        active: true,
        page: 0,
        size: 10,
      });

      console.log("Response:", response.data);

      setEmployees(response.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

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

  const handleViewEmployee = async (employee) => {
    try {
      const response = await getEmployeeById(employee.id);

      setMode("view");
      setSelectedEmployee(response.data);
      setOpenEmployeeModal(true);
    } catch (error) {
      console.log(error);
      showToast("error", "Error", "Failed to fetch employee details");
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

  const filteredEmployees = (employees || []).filter((employee) => {
    const matchesSearch = [
      employee.employeeId,
      employee.name,
      employee.email,
      employee.department,
      employee.designation,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesDepartment =
      department === "" || employee.department === department;

    const matchesStatus =
      status === "" ||
      (status === "Active" && employee.active) ||
      (status === "Inactive" && !employee.active);

    return matchesSearch && matchesDepartment && matchesStatus;
  });

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
        employees={filteredEmployees}
        loading={false}
        onView={handleViewEmployee}
        onEdit={handleEditEmployee}
      />

      <EmployeeModal
        open={openEmployeeModal}
        handleClose={() => setOpenEmployeeModal(false)}
        onSave={handleAddEmployee}
        mode={mode}
        employee={selectedEmployee}
        handleResendVerification={handleResendVerification}
      />
    </>
  );
};

export default Employees;
