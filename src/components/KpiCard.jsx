import { Card, CardContent, Typography, Box } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Filler);

export default function KpiCard({
  label,
  value,
  trend,
  trendUp,
  sparkData,
  sparkColor,
}) {
  const chartData = {
    labels: sparkData.map((_, i) => i),
    datasets: [
      {
        data: sparkData,
        borderColor: sparkColor,
        backgroundColor: sparkColor + "22",
        borderWidth: 1.5,
        pointRadius: 0,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } },
    animation: false,
  };

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: "2px",
        border: "1px solid #d2d0ce",
        overflow: "hidden",
      }}
    >
      <CardContent
        sx={{
          p: "10px 12px !important",
          pb: "34px !important",
          position: "relative",
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          mb={0.5}
        >
          {label}
        </Typography>

        <Typography
          variant="h5"
          fontWeight={700}
          color="#252423"
          lineHeight={1}
        >
          {value}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3, mt: 0.5 }}>
          {trendUp ? (
            <TrendingUpIcon sx={{ fontSize: 13, color: "#107c10" }} />
          ) : (
            <TrendingDownIcon sx={{ fontSize: 13, color: "#d83b01" }} />
          )}
          <Typography variant="caption" color={trendUp ? "#107c10" : "#d83b01"}>
            {trend}
          </Typography>
        </Box>

        {/* Sparkline at the bottom */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 28,
          }}
        >
          <Line data={chartData} options={chartOptions} />
        </Box>
      </CardContent>
    </Card>
  );
}
