import React, { useState } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DatePickerComponent = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        format="DD/MM/YYYY"
        views={["year", "month", "day"]}
        value={selectedDate}
        onChange={(newValue) => setSelectedDate(newValue)}
        slotProps={{
          textField: {
            size: "small",
            sx: {
              width: "150px",

              "& .MuiOutlinedInput-root": {
                height: "42px",
                color: "#ffffff",
                backgroundColor: "rgba(255,255,255,0.14)",
                backdropFilter: "blur(10px)",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                paddingRight: "10px",
                overflow: "hidden",

                "& input": {
                  color: "#ffffff !important",
                  WebkitTextFillColor: "#ffffff !important",
                },

                "& fieldset": {
                  border: "1px solid rgba(255,255,255,0.08)",
                },

                "&:hover fieldset": {
                  border: "1px solid rgba(255,255,255,0.15)",
                },

                "&.Mui-focused fieldset": {
                  border: "1px solid #64748B",
                },
              },

              "& .MuiSvgIcon-root": {
                color: "#ffffff",
              },

              "& .MuiInputAdornment-root": {
                marginLeft: "8px",
              },
            },
          },

          desktopPaper: {
            sx: {
              backgroundColor: "#0F172A",
              color: "white",
              borderRadius: "18px",
              boxShadow: "0 12px 30px rgba(0,0,0,0.28)",

              "& .MuiPickersCalendarHeader-label": {
                color: "white",
                fontWeight: 600,
                fontSize: "18px",
                padding: "16px 20px 8px",
              },

              "& .MuiDayCalendar-weekContainer .MuiButtonBase-root": {
                color: "#F8FAFC",
              },

              "& .MuiPickersDay-root": {
                color: "#E2E8F0",
                fontWeight: 500,
                borderRadius: "10px",
                transition: "all 0.2s ease",

                "&:hover": {
                  backgroundColor: "#1E293B",
                },
              },

              "& .MuiPickersDay-today": {
                border: "1px solid #64748B",
              },

              "& .MuiPickersArrowSwitcher-button": {
                color: "white",
              },

              "& .MuiDayCalendar-weekDayLabel": {
                color: "#CBD5E1",
                fontWeight: 600,
              },

              "& .MuiPickersDay-root": {
                color: "#E2E8F0",
                fontWeight: 500,
                borderRadius: "10px",

                "&:hover": {
                  backgroundColor: "#1E293B",
                },
              },
              "& .MuiPickersDay-dayOutsideMonth": {
                color: "#64748B",
              },

              "& .Mui-selected": {
                background:
                  "linear-gradient(135deg, #3B82F6 0%, #6366F1 100%) !important",
                color: "white",
                fontWeight: "bold",
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
