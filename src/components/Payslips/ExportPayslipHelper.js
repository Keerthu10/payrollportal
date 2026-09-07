export const getDateRange = (month, year) => {
  const fromDate = new Date(year, month - 1, 1);
  const toDate = new Date(year, month, 0);

  return {
    fromDate,
    toDate,
  };
};

export const buildPayslipExportPayload = ({
  search = "",
  designation = "",
  status = null,
  emailVerified = null,
  month = null,
  year = null,
  fromDate = null,
  toDate = null,
}) => ({
  search,
  designation,
  status,
  emailVerified,
  month,
  year,
  fromDate: fromDate || null,
  toDate: toDate || null,
  page: 0,
  size: 0,
});
