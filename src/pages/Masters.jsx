import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import {
  createDepartment,
  getAllDepartments,
  updateDepartment,
  getDepartmentById,
  deleteDepartment,
} from "../services/departmentService";
import {
  createEmploymentType,
  getEmploymentTypeById,
  getAllEmploymentTypes,
  updateEmploymentType,
  deleteEmploymentType,
} from "../services/EmploymentType";
import { useToast } from "../context/ToastContext";
import MasterModal from "../components/Masters/MasterModal";
import MasterTable from "../components/Masters/MasterTable";
import { departmentColumns } from "../components/Masters/DepartmentColumn";
import { employmentTypeColumns } from "../components/Masters/EmploymentTypeColumn";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";

const Masters = () => {
  const { showToast } = useToast();
  const [selectedMaster, setSelectedMaster] = useState("departments");

  const [openModal, setOpenModal] = useState(false);

  const [selectedRecord, setSelectedRecord] = useState(null);

  const [departmentRows, setDepartmentRows] = useState([]);

  const [employmentTypeRows, setEmploymentTypeRows] = useState([]);

  const loadDepartments = async () => {
    try {
      const response = await getAllDepartments();

      console.log("Department API Response:", response);
      console.log("Department Data:", response.data);

      setDepartmentRows(
        response.data.map((item) => ({
          id: item.departmentId,
          departmentId: item.departmentId,
          departmentName: item.departmentName,
          status: item.status ? "Active" : "Inactive",
        })),
      );
    } catch (error) {
      console.error("Department Error:", error);
    }
  };

  const loadEmploymentTypes = async () => {
    try {
      const response = await getAllEmploymentTypes();

      setEmploymentTypeRows(
        response.data.map((item) => ({
          id: item.jobTypeId,
          jobTypeId: item.jobTypeId,
          employmentType: item.jobType,
          status: item.status ? "Active" : "Inactive",
        })),
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadDepartments();
    loadEmploymentTypes();
  }, []);

  const title =
    selectedMaster === "departments"
      ? "Department Master"
      : "Employment Type Master";

  const subtitle =
    selectedMaster === "departments"
      ? "Manage and maintain department records"
      : "Manage and maintain employment types";

  const buttonText =
    selectedMaster === "departments" ? "Add Department" : "Add Employment Type";

  const handleSave = async (data) => {
    try {
      if (selectedMaster === "departments") {
        // Duplicate validation

        const isDuplicateDepartment = departmentRows.some(
          (item) =>
            item.departmentName?.trim().toLowerCase() ===
              data.name?.trim().toLowerCase() &&
            item.departmentId !== selectedRecord?.departmentId,
        );

        if (isDuplicateDepartment) {
          showToast("error", "Error", "Department already exists");
          return;
        }

        if (selectedRecord) {
          await updateDepartment({
            departmentId: selectedRecord.departmentId,
            departmentName: data.name,
            status: data.status === "Active",
          });

          showToast("success", "Success", "Department updated successfully");
        } else {
          await createDepartment({
            departmentName: data.name,
          });

          showToast("success", "Success", "Department created successfully");
        }

        await loadDepartments();
      } else {
        // Employment Type duplicate validation

        const isDuplicateEmploymentType = employmentTypeRows.some(
          (item) =>
            item.employmentType?.trim().toLowerCase() ===
              data.name?.trim().toLowerCase() &&
            item.jobTypeId !== selectedRecord?.jobTypeId,
        );

        if (isDuplicateEmploymentType) {
          showToast("error", "Error", "Employment Type already exists");
          return;
        }

        if (selectedRecord) {
          await updateEmploymentType({
            jobTypeId: selectedRecord.jobTypeId,
            jobType: data.name,
            status: data.status === "Active",
          });

          showToast(
            "success",
            "Success",
            "Employment Type updated successfully",
          );
        } else {
          await createEmploymentType({
            jobType: data.name,
            status: true,
          });

          showToast(
            "success",
            "Success",
            "Employment Type created successfully",
          );
        }

        await loadEmploymentTypes();
      }

      setOpenModal(false);
      setSelectedRecord(null);
    } catch (error) {
      console.error(error);

      showToast(
        error?.response?.data?.message || "Something went wrong",
        "error",
      );
    }
  };

  const handleEdit = async (row) => {
    try {
      if (selectedMaster === "departments") {
        setSelectedRecord({
          departmentId: row.departmentId,
          departmentName: row.departmentName,
          status: row.status,
        });
      } else {
        setSelectedRecord({
          jobTypeId: row.jobTypeId,
          employmentType: row.employmentType,
          status: row.status,
        });
      }

      setOpenModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (selectedMaster === "departments") {
        const row = departmentRows.find((item) => item.id === id);

        if (!row) return;

        await updateDepartment({
          departmentId: row.departmentId || row.id,
          departmentName: row.departmentName,
          status: false,
        });

        await loadDepartments();
      } else {
        const row = employmentTypeRows.find((item) => item.id === id);

        if (!row) return;

        await updateEmploymentType({
          jobTypeId: row.jobTypeId,
          jobType: row.employmentType,
          status: false,
        });

        await loadEmploymentTypes();
      }
    } catch (error) {
      console.error("Error deactivating record:", error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Header Banner */}

      <Box
        sx={{
          background: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)",
          color: "#fff",
          p: 4,
          borderRadius: "24px",
          mb: 4,
          boxShadow: "0 10px 30px rgba(15,23,42,0.25)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          Master Management
        </Typography>

        <Typography
          variant="body1"
          sx={{
            opacity: 0.9,
          }}
        >
          Configure departments, employment types, and business rules
        </Typography>
      </Box>

      {/* Selection Cards */}

      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
          mt: 2,
        }}
      >
        <Box
          onClick={() => setSelectedMaster("departments")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 1,
            borderRadius: "12px",
            cursor: "pointer",

            background:
              selectedMaster === "departments"
                ? "linear-gradient(135deg, #7C3AED 0%, #4F46E5 55%, #2563EB 100%)"
                : "#F8FAFC",

            color: selectedMaster === "departments" ? "#FFFFFF" : "#334155",

            border:
              selectedMaster === "departments" ? "none" : "2px solid #0b0b0bff",

            boxShadow:
              selectedMaster === "departments"
                ? "0 8px 20px rgba(79,70,229,0.25)"
                : "none",

            transition: "all 0.3s ease",
          }}
        >
          <ApartmentRoundedIcon sx={{ fontSize: 18 }} />

          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            Departments
          </Typography>
        </Box>

        <Box
          onClick={() => setSelectedMaster("employmentTypes")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 1,
            borderRadius: "12px",
            cursor: "pointer",

            background:
              selectedMaster === "employmentTypes"
                ? "linear-gradient(135deg, #7C3AED 0%, #4F46E5 55%, #2563EB 100%)"
                : "#FFFFFF",

            color: selectedMaster === "employmentTypes" ? "#FFFFFF" : "#334155",

            border:
              selectedMaster === "employmentTypes"
                ? "none"
                : "2px solid #0b0b0bff",

            boxShadow:
              selectedMaster === "employmentTypes"
                ? "0 8px 20px rgba(79,70,229,0.25)"
                : "none",

            transition: "all 0.3s ease",
          }}
        >
          <BadgeRoundedIcon sx={{ fontSize: 18 }} />

          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            Employment Types
          </Typography>
        </Box>
      </Box>

      {/* Dynamic Section Title */}

      <MasterTable
        title={
          selectedMaster === "departments"
            ? "Department Master"
            : "Employment Type Master"
        }
        subtitle={
          selectedMaster === "departments"
            ? "Manage and maintain department records"
            : "Manage and maintain employment types"
        }
        buttonText={
          selectedMaster === "departments"
            ? "Add Department"
            : "Add Employment Type"
        }
        onAddClick={() => {
          setSelectedRecord(null);
          setOpenModal(true);
        }}
        rows={
          selectedMaster === "departments" ? departmentRows : employmentTypeRows
        }
        columns={
          selectedMaster === "departments"
            ? departmentColumns(handleEdit, handleDelete)
            : employmentTypeColumns(handleEdit, handleDelete)
        }
      />
      <MasterModal
        open={openModal}
        handleClose={() => {
          setOpenModal(false);
          setSelectedRecord(null);
        }}
        record={selectedRecord}
        mode={
          selectedMaster === "departments" ? "department" : "employmentType"
        }
        onSave={handleSave}
        showToast={showToast}
      />
    </Box>
  );
};

export default Masters;
