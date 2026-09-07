export const getDateRange = (month, year) => {
  const fromDate = new Date(year, month - 1, 1);
  const toDate = new Date(year, month, 0);

  return {
    fromDate,
    toDate,
  };
};

export const buildExportPayload = ({
  fromDate,
  toDate,
  designation = "",
  active = null,
  emailVerified = null,
  search = "",
}) => ({
  designation,
  active,
  emailVerified,
  search,
  fromDate: fromDate || null,
  toDate: toDate || null,
});
