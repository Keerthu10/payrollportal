import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import "./Table.css";

const Table = ({
  value = [],
  columns = [],
  loading = false,
  pagination,
  totalRecords = 0,
  onPageChange,
  header = null,
  globalFilter = "",
  enablePagination = true,
  dataKey = "id",
}) => {
  // ✅ PrimeReact filters state
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  // ✅ Sync parent globalFilter → PrimeReact filter
  useEffect(() => {
    setFilters({
      global: {
        value: globalFilter,
        matchMode: FilterMatchMode.CONTAINS,
      },
    });
  }, [globalFilter]);
  return (
    <DataTable
      value={value}
      dataKey="id"
      loading={loading}
      header={header}
      filters={filters} // ✅ IMPORTANT
      globalFilterFields={columns // ✅ auto-pick searchable fields
        .filter((c) => c.field)
        .map((c) => c.field)}
      showGridlines
      className="custom-datatable"
      emptyMessage="No records found"
      responsiveLayout="scroll"
      scrollable
      scrollHeight="400px"
      {...(enablePagination && {
        paginator: true,
        // lazy: true,
        rows: pagination.size,
        first: pagination.first,
        totalRecords: totalRecords,
        onPage: (e) =>
          onPageChange({
            page: e.page,
            size: e.rows,
            first: e.first,
          }),
        rowsPerPageOptions: [10, 25, 50, 100],
      })}
    >
      {columns.map((col, index) => (
        <Column key={index} {...col} />
      ))}
    </DataTable>
  );
};

export default Table;
