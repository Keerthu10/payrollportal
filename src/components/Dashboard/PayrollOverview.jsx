import React from "react";

import { Box, Typography, MenuItem, Select } from "@mui/material";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", payroll: 2 },
  { month: "Feb", payroll: 9 },
  { month: "Mar", payroll: 11 },
  { month: "Apr", payroll: 5 },
  { month: "May", payroll: 14 },
  { month: "Jun", payroll: 20 }
];

const PayrollOverview = () => {
  return (
    <Box
      sx={{
        background: "#FFFFFF",
        minWidth:"500px",

        borderRadius: "18px",

        border: "1px solid #E2E8F0",

        p: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",

        boxShadow: "0 2px 8px rgba(15,23,42,0.04)",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",

          alignItems: "center",

          justifyContent: "space-between",

          mb: 2,

          gap: 1,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "17px",

              fontWeight: 700,

              color: "#0F172A",
            }}
          >
            Payroll Overview
          </Typography>

          <Typography
            sx={{
              fontSize: "13px",

              color: "#64748B",

              mt: 0.5,
            }}
          >
            Monthly payroll analytics
          </Typography>
        </Box>

        {/* DROPDOWN */}
        <Select
          defaultValue="2026"
          size="small"
          sx={{
            minWidth: 82,

            height: "36px",

            borderRadius: "10px",

            fontSize: "14px",

            "& .MuiSelect-select": {
              padding: "8px 28px 8px 12px",
            },
          }}
        >
          <MenuItem value="2026">2026</MenuItem>

          <MenuItem value="2025">2025</MenuItem>
        </Select>
      </Box>

      {/* CHART */}
      <Box
        sx={{
          width:"100%",
          height: 170,
          mt: 0.5,

          // "& .recharts-responsive-container": {
          //   width: "100% !important",
          // },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorPayroll" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.25} />

                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#F1F5F9"
            />

            <XAxis
              dataKey="month"
              tick={{
                fontSize: 12,
                fill: "#64748B",
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              width={35}
              domain={[0, 20]}
              tick={{
                fontSize: 12,
                fill: "#64748B",
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #E2E8F0",
                boxShadow: "0 4px 12px rgba(15,23,42,0.08)",
                backgroundColor: "#FFFFFF",
              }}
            />

            <Area
              type="monotone"
              dataKey="payroll"
              stroke="none"
              fill="url(#colorPayroll)"
            />

            <Line
              type="monotone"
              dataKey="payroll"
              strokeLinecap="round"
              stroke="#7C3AED"
              strokeWidth={2.5}
              dot={{
                r: 3,
                fill: "#7C3AED",
              }}
              activeDot={{
                r: 6,
                stroke: "#7C3AED",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default PayrollOverview;
