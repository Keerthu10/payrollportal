// import React from "react";

// import { Box, Typography, Stack } from "@mui/material";

// import { ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";

// const data = [
//   {
//     name: "Engineering",
//     value: 40,
//     fill: "#7C3AED",
//   },

//   {
//     name: "Finance",
//     value: 25,
//     fill: "#3B82F6",
//   },

//   {
//     name: "HR",
//     value: 20,
//     fill: "#10B981",
//   },

//   {
//     name: "Marketing",
//     value: 10,
//     fill: "#F59E0B",
//   },

//   {
//     name: "Support",
//     value: 5,
//     fill: "#06B6D4",
//   },
// ];

// const DepartmentDistribution = () => {
//   return (
//     <Box
//       sx={{
//         background: "#FFFFFF",

//         borderRadius: "18px",

//         border: "1px solid #E2E8F0",

//         p:3,

//         height:"100%",

//         boxShadow: "0 2px 8px rgba(15,23,42,0.04)",
//         display:"flex",
//         flexDirection:"column",
//       }}
//     >
//       {/* HEADER */}
//       <Typography
//         // sx={{
//         //   fontSize: "18px",

//         //   fontWeight: 700,

//         //   color: "#0F172A",

//         //   mb: 4,
//         // }}
//       >
//         Department Distribution
//       </Typography>

//       {/* CHART */}
//       <Box
//         sx={{
//           position: "relative",

//           width: "100%",

//           height: 180,
//         }}
//       >
//         <ResponsiveContainer width="100%" height="100%">
//           <RadialBarChart
//             innerRadius="20%"
//             outerRadius="100%"
//             barSize={14}
//             data={data}
//             startAngle={90}
//             endAngle={-270}
//             cx="50%"
//             cy="50%"
//           >
//             <RadialBar background dataKey="value" cornerRadius={20} />
//           </RadialBarChart>
//         </ResponsiveContainer>

//         {/* CENTER CONTENT */}
//         <Box
//           sx={{
//             position: "absolute",

//             top: "50%",

//             left: "50%",

//             transform: "translate(-50%, -50%)",

//             textAlign: "center",
//           }}
//         >
//           <Typography
//             sx={{
//               fontSize: "14px",

//               color: "#64748B",

//               fontWeight: 500,
//             }}
//           >
//             Total
//           </Typography>

//           <Typography
//             sx={{
//               fontSize: "34px",

//               fontWeight: 700,

//               color: "#0F172A",

//               lineHeight: 1.2,
//             }}
//           >
//             1,248
//           </Typography>

//           <Typography
//             sx={{
//               fontSize: "13px",

//               color: "#94A3B8",
//             }}
//           >
//             Employees
//           </Typography>
//         </Box>
//       </Box>

//       {/* LEGENDS */}
//       <Stack
//         spacing={2}
//         sx={{
//           mt: 2,
//         }}
//       >
//         {data.map((item) => (
//           <Box
//             key={item.name}
//             sx={{
//               display: "flex",

//               justifyContent: "space-between",
//             }}
//           >
//             {/* LEFT */}
//             <Box
//               sx={{
//                 display: "flex",

//                 alignItems: "center",

//                 gap: 1.2,
//               }}
//             >
//               {/* COLOR DOT */}
//               <Box
//                 sx={{
//                   width: 12,

//                   height: 12,

//                   borderRadius: "50%",

//                   background: item.fill,
//                 }}
//               />

//               <Typography
//                 sx={{
//                   fontSize: "14px",

//                   fontWeight: 500,

//                   color: "#334155",
//                 }}
//               >
//                 {item.name}
//               </Typography>
//             </Box>

//             {/* PERCENTAGE */}
//             <Typography
//               sx={{
//                 fontSize: "14px",

//                 fontWeight: 600,

//                 color: "#0F172A",
//               }}
//             >
//               {item.value}%
//             </Typography>
//           </Box>
//         ))}
//       </Stack>
//     </Box>
//   );
// };

// export default DepartmentDistribution;

import React from "react";

import { Box, Typography, Stack } from "@mui/material";

import { ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";

const data = [
  {
    name: "Engineering",
    value: 40,
    fill: "#7C3AED",
  },

  {
    name: "Finance",
    value: 25,
    fill: "#3B82F6",
  },

  {
    name: "HR",
    value: 20,
    fill: "#10B981",
  },

  {
    name: "Marketing",
    value: 10,
    fill: "#F59E0B",
  },

  {
    name: "Support",
    value: 5,
    fill: "#06B6D4",
  },
];

const DepartmentDistribution = () => {
  return (
    <Box
      sx={{
        background: "#FFFFFF",

        borderRadius: "18px",

        // border: "1px solid #E2E8F0",

        p: 3,

        height: "100%",

        boxShadow: "0 2px 8px rgba(15,23,42,0.04)",
      }}
    >
      {/* HEADER */}
      <Typography
        sx={{
          fontSize: "18px",

          fontWeight: 700,

          color: "#0F172A",

          mb: 3,
        }}
      >
        Department Distribution
      </Typography>

      {/* CONTENT */}
      <Box
        sx={{
          display: "flex",

          alignItems: "center",

          justifyContent: "space-between",

          gap: 2,
        }}
      >
        {/* CHART */}
        <Box
          sx={{
            position: "relative",

            width: 240,

            height: 240,

            flexShrink: 0,
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="45%"
              outerRadius="100%"
              barSize={30}
              data={data}
              startAngle={90}
              endAngle={-270}
              cx="50%"
              cy="50%"
            >
              <RadialBar background dataKey="value" cornerRadius={20} />
            </RadialBarChart>
          </ResponsiveContainer>

          {/* CENTER CONTENT */}
          <Box
            sx={{
              position: "absolute",

              top: "50%",

              left: "50%",

              transform: "translate(-50%, -50%)",

              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",

                color: "#64748B",

                fontWeight: 500,
              }}
            >
              Total
            </Typography>

            <Typography
              sx={{
                fontSize: "32px",

                fontWeight: 800,

                color: "#0F172A",

                lineHeight: 1.2,
              }}
            >
              1,248
            </Typography>

            <Typography
              sx={{
                fontSize: "15px",

                color: "#94A3B8",
              }}
            >
              Employees
            </Typography>
          </Box>
        </Box>

        {/* LEGENDS */}
        <Stack
          spacing={2}
          sx={{
            width: "48%",
          }}
        >
          {data.map((item) => (
            <Box
              key={item.name}
              sx={{
                display: "flex",

                alignItems: "center",

                justifyContent: "space-between",
              }}
            >
              {/* LEFT */}
              <Box
                sx={{
                  display: "flex",

                  alignItems: "center",

                  gap: 1,
                }}
              >
                {/* DOT */}
                <Box
                  sx={{
                    width: 10,

                    height: 10,

                    borderRadius: "50%",

                    background: item.fill,
                  }}
                />

                <Typography
                  sx={{
                    fontSize: "14px",

                    color: "#334155",

                    fontWeight: 500,
                  }}
                >
                  {item.name}
                </Typography>
              </Box>

              {/* VALUE */}
              <Typography
                sx={{
                  fontSize: "14px",

                  fontWeight: 600,

                  color: "#0F172A",
                }}
              >
                {item.value}%
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default DepartmentDistribution;
