import React from "react";

export const EyeIcon = ({ width = 24, height = 24, color = "#000" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 10a13.4 13.4 0 0 0 3 2.685M21 10a13.4 13.4 0 0 1-3 2.685m-8 1.624L9.5 16.5m.5-2.19a10.6 10.6 0 0 0 4 0m-4 0a11.3 11.3 0 0 1-4-1.625m8 1.624l.5 2.191m-.5-2.19a11.3 11.3 0 0 0 4-1.625m0 0l1.5 1.815M6 12.685L4.5 14.5"
      />
    </svg>
  );
};

export const PasswordEyeIcon = ({
  width = 24,
  height = 24,
  color = "#000",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <g fill="none" stroke={color} strokeWidth="1.5">
        <path strokeLinecap="round" d="M2 8s4.477-5 10-5s10 5 10 5" />

        <path d="M21.544 13.045c.304.426.456.64.456.955c0 .316-.152.529-.456.955C20.178 16.871 16.689 21 12 21c-4.69 0-8.178-4.13-9.544-6.045C2.152 14.529 2 14.315 2 14c0-.316.152-.529.456-.955C3.822 11.129 7.311 7 12 7c4.69 0 8.178 4.13 9.544 6.045Z" />

        <path d="M15 14a3 3 0 1 0-6 0a3 3 0 0 0 6 0Z" />
      </g>
    </svg>
  );
};
