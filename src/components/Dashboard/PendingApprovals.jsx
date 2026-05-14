import React from "react";

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
} from "@mui/material";

import { Chip } from "@mui/material";

import { FiCheckCircle, FiXCircle, FiBriefcase } from "react-icons/fi";

import { MdPayments, MdOutlineWorkHistory } from "react-icons/md";

import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const rows = [
  {
    type: "Leave Request",
    name: "Sophia Brown",
    date: "May 26, 2026",
    amount: "3 Days",
    avatar: "https://i.pravatar.cc/100?img=5",
    icon: <MdOutlineWorkHistory />,
    iconBg: "#DCFCE7",
    iconColor: "#16A34A",
  },

  {
    type: "Salary Revision",
    name: "Mason Joe",
    date: "May 25, 2026",
    amount: "₹5,000",
    avatar: "https://i.pravatar.cc/100?img=3",
    icon: <MdPayments />,
    iconBg: "#DBEAFE",
    iconColor: "#2563EB",
  },

  {
    type: "Expense Claim",
    name: "Emily Davis",
    date: "May 24, 2026",
    amount: "₹8,750",
    avatar: "https://i.pravatar.cc/100?img=9",
    icon: <FiBriefcase />,
    iconBg: "#FEF3C7",
    iconColor: "#D97706",
  },
];

const PendingApprovals = () => {
  return (
    <Box
      sx={{
        background: "#FFFFFF",
        borderRadius: "18px",
        border: "1px solid #E2E8F0",
        p: 3,
        height: "100%",
        boxShadow: "0 2px 8px rgba(15,23,42,0.04)",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 700,
            color: "#0F172A",
          }}
        >
          Pending Approvals
        </Typography>

        <Typography
          sx={{
            fontSize: "13px",
            color: "#7C3AED",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          View All
        </Typography>
      </Box>

      <TableContainer>
        <Table>
          {/* <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Requested On</TableCell>
              <TableCell>Amount/Days</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead> */}
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#64748B",
                  borderBottom: "1px solid #F1F5F9",
                }}
              >
                Type
              </TableCell>

              <TableCell
                sx={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#64748B",
                  borderBottom: "1px solid #F1F5F9",
                }}
              >
                Name
              </TableCell>

              <TableCell
                sx={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#64748B",
                  borderBottom: "1px solid #F1F5F9",
                }}
              >
                Requested On
              </TableCell>

              <TableCell
                sx={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#64748B",
                  borderBottom: "1px solid #F1F5F9",
                }}
              >
                Amount/Days
              </TableCell>

              <TableCell
                sx={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#64748B",
                  borderBottom: "1px solid #F1F5F9",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: "10px",
                        background: row.iconBg,
                        color: row.iconColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                      }}
                    >
                      {row.icon}
                    </Box>

                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      {row.type}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    {/* <Avatar
                      src={row.avatar}
                      sx={{
                        width: 34,
                        height: 34,
                      }}
                    /> */}

                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      {row.name}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell>{row.date}</TableCell>

                <TableCell>
                  <Chip
                    label={row.amount}
                    size="small"
                    sx={{
                      background: "#F1F5F9",
                      color: "#0F172A",
                      fontWeight: 600,
                      borderRadius: "8px",
                    }}
                  />
                </TableCell>

                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton color="success">
                      <FiCheckCircle />
                    </IconButton>

                    <IconButton color="error">
                      <FiXCircle />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PendingApprovals;
