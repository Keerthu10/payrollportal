import React from "react";

import { Box, Typography, Avatar, Stack, Chip } from "@mui/material";

const earners = [
  {
    name: "John Doe",
    role: "Software Engineer",
    badge: "Top Performer",
    image: "https://i.pravatar.cc/150?img=12",
  },

  {
    name: "Sophia Brown",
    role: "Product Manager",
    badge: "Employee of Month",
    image: "https://i.pravatar.cc/150?img=32",
  },

  {
    name: "Mason Joe",
    role: "Team Lead",
    badge: "Highest Attendance",
    image: "https://i.pravatar.cc/150?img=15",
  },

  // {
  //   name: "Emily Davis",
  //   role: "Senior Designer",
  //   badge: "Best Contributor",
  //   image: "https://i.pravatar.cc/150?img=45",
  // },
];

const TopEarners = () => {
  return (
    <Box
      sx={{
        background: "#FFFFFF",
        minWidth:"250px",
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
          Top Earners
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

      {/* EMPLOYEE LIST */}
      <Stack spacing={3}>
        {earners.map((employee) => (
          <Box
            key={employee.name}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {/* AVATAR */}
            <Avatar
              src={employee.image}
              sx={{
                width: 52,
                height: 52,
              }}
            />

            {/* DETAILS */}
            <Box>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#0F172A",
                }}
              >
                {employee.name}
              </Typography>

              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#64748B",
                  mt: 0.3,
                }}
              >
                {employee.role}
              </Typography>

              <Chip
                label={employee.badge}
                size="small"
                sx={{
                  mt: 1,
                  background: "#EEF2FF",
                  color: "#4F46E5",
                  fontWeight: 600,
                  fontSize: "11px",
                  borderRadius: "8px",
                }}
              />
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default TopEarners;
