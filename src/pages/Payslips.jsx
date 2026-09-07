import React, { useState, useEffect } from "react";

import PayslipHeader from "../components/Payslips/PayslipHeader";
import PayslipStatusTabs from "../components/Payslips/PayslipStatusTabs";
import PayslipFilter from "../components/Payslips/PayslipFilter";
import PayslipTable from "../components/Payslips/PayslipTable";
import PayslipTablePrime from "../components/Payslips/PayslipTable";
import GlobalModal from "../ui/GlobalModal";
import {
  downloadPayslip,
  getEmployeeHistory,
  viewPayslip,
  getPayslipDetail,
  editPayslip,
  bulkDownloadPayslips
} from "../services/payroll";
import dayjs from "dayjs";
import ExportPayslipModal from "../components/Payslips/ExportPayslipModal";
import PayslipEditModal from "../components/Payslips/PayslipEditModal";
import { useToast } from "../context/ToastContext";

const Payslips = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [openExportModal, setOpenExportModal] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedPayslipId, setSelectedPayslipId] = useState(null);
  const [selectedPayslip, setSelectedPayslip] = useState(null);

  const [payslips, setPayslips] = useState([]);
  const [fromMonth, setFromMonth] = useState(null);
  const [toMonth, setToMonth] = useState(null);

  const [rowCount, setRowCount] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const [openMonthYearModal, setOpenMonthYearModal] = useState(false);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [filters, setFilters] = useState({
    search: "",
    emailVerified: "",
  });

  const fetchPayslips = async () => {
    try {
      setLoading(true);

      const payload = {
        search: filters.search,
        month: Number(selectedMonth.format("MM")),
        year: Number(selectedMonth.format("YYYY")),
        emailVerified: filters.emailVerified,
        status: selectedStatus === "ALL" ? null : selectedStatus,
        page: paginationModel.page,
        size: paginationModel.pageSize,
      };

      const response = await getEmployeeHistory(payload);

      console.log("Employee History:", response.data);

      setPayslips(response.data?.content || []);
      setRowCount(response.data?.totalElements || 0);
    } catch (error) {
      console.error("Failed to fetch payslips:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayslips();
  }, [
    selectedMonth,
    selectedStatus,
    filters,
    paginationModel.page,
    paginationModel.pageSize,
  ]);

  const serialStart = paginationModel.page * paginationModel.pageSize;

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));

    setPaginationModel((prev) => ({
      ...prev,
      page: 0,
    }));
  };

  const handleDownload = async (employeePayrollId) => {
    try {
      const response = await downloadPayslip(employeePayrollId);

      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);

      const disposition = response.headers["content-disposition"];

      let fileName = null;

      if (disposition) {
        const match = disposition.match(/filename="?([^"]+)"?/);
        if (match?.[1]) {
          fileName = match[1];
        }
      }

      const link = document.createElement("a");
      link.href = url;

      if (fileName) {
        link.download = fileName;
      }

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleView = async (id) => {
    try {
      if (previewUrl) {
        window.URL.revokeObjectURL(previewUrl);
      }

      setPreviewOpen(true);
      setPreviewLoading(true);

      const response = await viewPayslip(id);

      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);

      setPreviewUrl(url);
    } catch (error) {
      console.error("View failed:", error);
      setPreviewOpen(false);
    } finally {
      setPreviewLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        window.URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleClosePreview = () => {
    if (previewUrl) {
      window.URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(null);
    setPreviewOpen(false);
  };

  const handleReset = () => {
    setFilters({
      search: "",
      emailVerified: "",
    });

    setSelectedMonth(dayjs());

    setSelectedStatus("ALL");

    setPaginationModel({
      page: 0,
      pageSize: 10,
    });
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);

    setPaginationModel((prev) => ({
      ...prev,
      page: 0,
    }));
  };

  const handleEdit = async (row) => {
    try {
      setLoading(true);

      const response = await getPayslipDetail(row.id);

      setSelectedPayslip(response.data);

      setEditOpen(true);
    } catch (error) {
      console.error("Failed to fetch payslip detail", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePayslip = async (formData) => {
    try {
      setLoading(true);

      await editPayslip(selectedPayslip.id, {
        workingDays: Number(formData.workingDays),
        lopDays: Number(formData.lopDays),

        basicSalary: Number(formData.basicSalary),
        hra: Number(formData.hra),
        specialAllowance: Number(formData.specialAllowance),

        professionTax: Number(formData.professionTax),

        groupMedicalInsurance: Number(formData.groupMedicalInsurance),

        pf: Number(formData.pf),
        tds: Number(formData.tds),

        eduCess: Number(formData.eduCess),

        otherDeductions: Number(formData.otherDeductions),
      });

      setEditOpen(false);

      showToast("success", "Payslip Updated", "Email sent successfully");

      fetchPayslips();
    } catch (error) {
      console.error("Failed to update payslip", error);

      const validationErrors = error?.response?.data;

      const message = Array.isArray(validationErrors)
        ? validationErrors.map((e) => `${e.field}: ${e.error}`).join(" | ")
        : error?.response?.data?.message || "Failed to update payslip";

      showToast("error", "Update Failed", message);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const payload = {
        search: filters.search,
        month: Number(selectedMonth.format("MM")),
        year: Number(selectedMonth.format("YYYY")),
        emailVerified: filters.emailVerified,
        status: selectedStatus === "ALL" ? null : selectedStatus,
      };

      const response = await exportPayslipReport(payload);

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `Payslip_Report_${selectedMonth.format(
        "MMMM_YYYY",
      )}.xlsx`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  const handleBulkDownload = async () => {
    try {
      // const payload = {
      //   search: filters.search,
      //   month: Number(selectedMonth.format("MM")),
      //   year: Number(selectedMonth.format("YYYY")),
      //   emailVerified: filters.emailVerified,
      //   status: selectedStatus === "ALL" ? null : selectedStatus,
      // };
      const payload = {
        search: filters.search,
        emailVerified: filters.emailVerified,
        status: selectedStatus === "ALL" ? null : selectedStatus,

        fromDate: fromMonth
          ? dayjs(fromMonth).startOf("month").format("YYYY-MM-DD")
          : null,

        toDate: toMonth
          ? dayjs(toMonth).endOf("month").format("YYYY-MM-DD")
          : null,
      };

      const response = await bulkDownloadPayslips(payload);

      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "Payslips_Bulk.pdf";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Bulk download failed:", error);
    }
  };

  return (
    <>
      <PayslipHeader
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        onExportReport={() => setOpenExportModal(true)}
      />

      <PayslipFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
        onBulkDownload={handleBulkDownload}
        fromMonth={fromMonth}
        toMonth={toMonth}
        setFromMonth={setFromMonth}
        setToMonth={setToMonth}
      />

      <PayslipStatusTabs
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
      />

      {/* <PayslipTable
        payslips={payslips}
        loading={loading}
        rowCount={rowCount}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        serialStart={serialStart}
        onDownload={handleDownload}
        onView={handleView}
        onEdit={handleEdit}
      /> */}

      <PayslipTablePrime
        payslips={payslips}
        loading={loading}
        page={paginationModel.page}
        rowsPerPage={paginationModel.pageSize}
        totalRecords={rowCount}
        onPageChange={(page, rows) => {
          setPaginationModel({
            page,
            pageSize: rows,
          });
        }}
        onView={handleView}
        onEdit={handleEdit}
        onDownload={handleDownload}
      />

      <PayslipEditModal
        open={editOpen}
        handleClose={() => setEditOpen(false)}
        payslip={selectedPayslip}
        onSave={handleUpdatePayslip}
      />

      <ExportPayslipModal
        open={openExportModal}
        handleClose={() => setOpenExportModal(false)}
        selectedMonth={selectedMonth}
        search={filters.search}
        emailVerified={filters.emailVerified}
        status={selectedStatus === "ALL" ? null : selectedStatus}
      />

      <GlobalModal
        open={previewOpen}
        handleClose={handleClosePreview}
        title="Payslip Preview"
        subtitle="View Only"
        maxWidth={850}
      >
        <div style={{ height: "75vh", width: "100%" }}>
          {previewLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              Loading...
            </div>
          ) : (
            previewUrl && (
              <iframe
                src={previewUrl}
                title="Payslip Preview"
                width="100%"
                height="100%"
                style={{
                  border: "none",
                  borderRadius: "8px",
                }}
              />
            )
          )}
        </div>
      </GlobalModal>
    </>
  );
};

export default Payslips;
