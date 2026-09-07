import React from "react";
import { Box, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const STATUS_CONFIG = [
  { key: "delivered", label: "Delivered", color: "#10B981" },
  { key: "pending", label: "Pending", color: "#FBBF24" },
  { key: "failed", label: "Failed", color: "#FF7A59" },
  { key: "bounced", label: "Bounced", color: "#6366F1" },
];

const EmailStatusPie = ({ dashboardStats }) => {
  const delivered = dashboardStats?.overall?.totalDelivered || 0;
  const pending = dashboardStats?.overall?.totalPending || 0;
  const failed = dashboardStats?.overall?.totalFailed || 0;
  const bounced = dashboardStats?.overall?.totalBounced || 0;

  const total = delivered + pending + failed + bounced;
  const counts = { delivered, pending, failed, bounced };

  const visibleStatuses = STATUS_CONFIG.filter((s) => counts[s.key] > 0);
  const chartData = visibleStatuses.map((s) => ({
    name: s.label,
    value: counts[s.key],
    color: s.color,
  }));

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography
        sx={{ fontWeight: 700, color: "#0F172A", fontSize: "18px" }}
      >
        Email Status
      </Typography>

      <Box
        sx={{
          flex: 1,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {total === 0 ? (
          <Typography sx={{ color: "#94A3B8", fontSize: 14 }}>
            No email activity yet
          </Typography>
        ) : (
          <>
            <PieChart width={220} height={220}>
              <defs>
                <linearGradient id="deliveredGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#34D399" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <linearGradient id="pendingGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FCD34D" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
                <linearGradient id="failedGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FB923C" />
                  <stop offset="100%" stopColor="#EF4444" />
                </linearGradient>
                <linearGradient id="bouncedGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#818CF8" />
                  <stop offset="100%" stopColor="#4F46E5" />
                </linearGradient>
                <filter
                  id="ringGlow"
                  x="-40%"
                  y="-40%"
                  width="180%"
                  height="180%"
                >
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={90}
                paddingAngle={chartData.length > 1 ? 3 : 0}
                cornerRadius={8}
                dataKey="value"
                stroke="none"
                isAnimationActive
                animationDuration={900}
                animationEasing="ease-out"
                style={{ filter: "url(#ringGlow)" }}
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={`url(#${entry.name.toLowerCase()}Grad)`}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>

            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                pointerEvents: "none",
              }}
            >
              <Typography
                sx={{ color: "#64748B", fontSize: 14, fontWeight: 600 }}
              >
                Total
              </Typography>
              <Typography
                sx={{ color: "#111827", fontSize: 26, fontWeight: 700 }}
              >
                {total}
              </Typography>
            </Box>
          </>
        )}
      </Box>

      <Box
        sx={{
          mt: 2,
          borderTop: "1px dashed #E5E7EB",
          pt: 3,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
        }}
      >
        {STATUS_CONFIG.map((s) => (
          <Legend
            key={s.key}
            color={s.color}
            label={s.label}
            value={counts[s.key]}
          />
        ))}
      </Box>
    </Box>
  );
};

const Legend = ({ color, label, value }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <Box sx={{ width: 14, height: 14, borderRadius: "50%", bgcolor: color }} />
    <Typography sx={{ fontSize: 14 }}>
      {label} {typeof value === "number" ? `(${value})` : ""}
    </Typography>
  </Box>
);

export default EmailStatusPie;