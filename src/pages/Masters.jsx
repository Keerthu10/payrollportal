import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import {
  createDesignation,
  getAllDesignation,
  updateDesignation,
  getDesignationById,
  deleteDesignation,
} from "../services/designationService";
import {
  createEmploymentType,
  getEmploymentTypeById,
  getAllEmploymentTypes,
  updateEmploymentType,
  deleteEmploymentType,
} from "../services/EmploymentType";
import GlobalModal from "../ui/GlobalModal";
import { useToast } from "../context/ToastContext";
import MasterModal from "../components/Masters/MasterModal";
import MasterTable from "../components/Masters/MasterTable";
import { designationColumns } from "../components/Masters/DesignationColumn";
import { employmentTypeColumns } from "../components/Masters/EmploymentTypeColumn";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";

const Masters = () => {
  const { showToast } = useToast();
  const [selectedMaster, setSelectedMaster] = useState("designation");

  const [openModal, setOpenModal] = useState(false);

  const [selectedRecord, setSelectedRecord] = useState(null);

  const [designationRows, setDesignationRows] = useState([]);

  const [employmentTypeRows, setEmploymentTypeRows] = useState([]);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);

  const loadDesignations = async () => {
    try {
      const response = await getAllDesignation();

      console.log("Designation API Response:", response);
      console.log("Designation Data:", response.data);

      setDesignationRows(
        response.data.map((item) => ({
          id: item.designationId,
          designationId: item.designationId,
          designationName: item.designationName,
          status: item.status ? "Active" : "Inactive",
        })),
      );
    } catch (error) {
      console.error("Designation Error:", error);
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
    loadDesignations();
    loadEmploymentTypes();
  }, []);

  const title =
    selectedMaster === "designation"
      ? "Designation Master"
      : "Employment Type Master";

  const subtitle =
    selectedMaster === "designation"
      ? "Manage and maintain designation records"
      : "Manage and maintain employment types";

  const buttonText =
    selectedMaster === "designation"
      ? "Add Designation"
      : "Add Employment Type";

  const handleSave = async (data) => {
    try {
      if (selectedMaster === "designation") {
        // Duplicate validation

        const isDuplicateDesignation = designationRows.some(
          (item) =>
            item.designationName?.trim().toLowerCase() ===
              data.name?.trim().toLowerCase() &&
            item.designationId !== selectedRecord?.designationId,
        );

        if (isDuplicateDesignation) {
          showToast("error", "Error", "Designation already exists");
          return;
        }

        if (selectedRecord) {
          await updateDesignation({
            designationId: selectedRecord.designationId,
            designationName: data.name,
            status: data.status === "Active",
          });

          showToast("success", "Success", "Designation updated successfully");
        } else {
          await createDesignation({
            designationName: data.name,
          });

          showToast("success", "Success", "Designation created successfully");
        }

        await loadDesignations();
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
        "error",
        "Error",
        error?.response?.data?.message || "Something went wrong",
      );
    }
  };

  const handleEdit = async (row) => {
    try {
      if (selectedMaster === "designation") {
        setSelectedRecord({
          designationId: row.designationId,
          designationName: row.designationName,
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

  // const handleDelete = async (id) => {
  //   try {
  //     if (selectedMaster === "departments") {
  //       const row = departmentRows.find((item) => item.id === id);

  //       if (!row) return;

  //       await updateDepartment({
  //         departmentId: row.departmentId || row.id,
  //         departmentName: row.departmentName,
  //         status: false,
  //       });

  //       await loadDepartments();
  //     } else {
  //       const row = employmentTypeRows.find((item) => item.id === id);

  //       if (!row) return;

  //       await updateEmploymentType({
  //         jobTypeId: row.jobTypeId,
  //         jobType: row.employmentType,
  //         status: false,
  //       });

  //       await loadEmploymentTypes();
  //     }
  //   } catch (error) {
  //     console.error("Error deactivating record:", error);
  //   }
  // };

  const handleDelete = (id) => {
    setDeleteRecord(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      if (selectedMaster === "designation") {
        await deleteDesignation(deleteRecord);

        await loadDesignations();

        showToast("success", "Success", "Designation deleted successfully");
      } else {
        await deleteEmploymentType(deleteRecord);

        await loadEmploymentTypes();

        showToast("success", "Success", "Employment Type deleted successfully");
      }

      setDeleteModalOpen(false);
      setDeleteRecord(null);
    } catch (error) {
      console.error("Error deleting record:", error);
      console.error(error.response);

      showToast("error", "Error", "Failed to delete record");

      setDeleteModalOpen(false);
      setDeleteRecord(null);
    }
  };

  return (
    <Box
      sx={{
        p: {
          xs: 2,
          sm: 3,
          md: 4,
        },
      }}
    >
      {/* Header Banner */}

      <Box
        sx={{
          background: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)",
          color: "#fff",
          p: {
            xs: 2,
            sm: 3,
            md: 4,
          },
          borderRadius: {
            xs: 3,
            md: 4,
          },
          mb: 4,
          boxShadow: "0 10px 30px rgba(15,23,42,0.25)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: {
              xs: 26,
              sm: 34,
              md: 38,
            },
            fontWeight: 700,
            mb: 1,
          }}
        >
          Master Management
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: {
              xs: 14,
              sm: 16,
            },
            opacity: 0.9,
          }}
        >
          Configure designation, employment types, and business rules
        </Typography>
      </Box>

      {/* Selection Cards */}

      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          width: {
            xs: "100%",
            sm: "auto",
          },
          gap: 2,
          mb: 4,
          mt: 2,
        }}
      >
        <Box
          onClick={() => setSelectedMaster("designation")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            width: {
              xs: "100%",
              sm: "auto",
            },
            px: {
              xs: 2,
              sm: 2.5,
            },

            py: {
              xs: 1.2,
              sm: 1,
            },
            borderRadius: "12px",
            cursor: "pointer",

            background:
              selectedMaster === "designation"
                ? "linear-gradient(135deg, #7C3AED 0%, #4F46E5 55%, #2563EB 100%)"
                : "#F8FAFC",

            color: selectedMaster === "designation" ? "#FFFFFF" : "#334155",

            border:
              selectedMaster === "designation" ? "none" : "2px solid #0b0b0bff",

            boxShadow:
              selectedMaster === "designation"
                ? "0 8px 20px rgba(79,70,229,0.25)"
                : "none",

            transition: "all 0.3s ease",
          }}
        >
          <ApartmentRoundedIcon
            sx={{
              fontSize: {
                xs: 22,
                sm: 18,
              },
            }}
          />

          <Typography
            sx={{
              fontSize: {
                xs: 15,
                sm: 14,
              },
              fontWeight: 600,
            }}
          >
            Designation
          </Typography>
        </Box>

        <Box
          onClick={() => setSelectedMaster("employmentTypes")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: {
              xs: 2,
              sm: 2.5,
            },

            py: {
              xs: 1.2,
              sm: 1,
            },

            width: {
              xs: "100%",
              sm: "auto",
            },
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
          <BadgeRoundedIcon
            sx={{
              fontSize: {
                xs: 22,
                sm: 18,
              },
            }}
          />

          <Typography
            sx={{
              fontSize: {
                xs: 15,
                sm: 14,
              },
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
          selectedMaster === "designation"
            ? "Designation Master"
            : "Employment Type Master"
        }
        subtitle={
          selectedMaster === "designation"
            ? "Manage and maintain designation records"
            : "Manage and maintain employment types"
        }
        buttonText={
          selectedMaster === "designation"
            ? "Add Designation"
            : "Add Employment Type"
        }
        onAddClick={() => {
          setSelectedRecord(null);
          setOpenModal(true);
        }}
        rows={
          selectedMaster === "designation"
            ? designationRows
            : employmentTypeRows
        }
        columns={
          selectedMaster === "designation"
            ? designationColumns(handleEdit, handleDelete)
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
          selectedMaster === "designation" ? "designation" : "employmentType"
        }
        onSave={handleSave}
        showToast={showToast}
      />
      <GlobalModal
        open={deleteModalOpen}
        handleClose={() => {
          setDeleteModalOpen(false);
          setDeleteRecord(null);
        }}
        title="Delete Confirmation"
      >
        <Typography sx={{ mb: 3, fontWeight: 700 }}>
          Are you sure you want to delete this{" "}
          {selectedMaster === "designation" ? "Designation" : "Employment Type"}
          ?
        </Typography>

        <Box
          sx={{
            display: "flex",

            flexDirection: {
              xs: "column",
              sm: "row",
            },

            justifyContent: "flex-end",

            alignItems: "stretch",

            gap: 2,

            mt: 5,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
              },
              minWidth: 110,
              borderRadius: "8px",
              textTransform: "none",
            }}
            onClick={() => {
              setDeleteModalOpen(false);
              setDeleteRecord(null);
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="error"
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
              },
              minWidth: 110,
              borderRadius: "8px",
              textTransform: "none",
            }}
            onClick={confirmDelete}
          >
            Delete
          </Button>
        </Box>
      </GlobalModal>
    </Box>
  );
};

export default Masters;
