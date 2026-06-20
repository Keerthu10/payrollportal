import { Backdrop, CircularProgress, Typography } from "@mui/material";

const GlobalLoader = ({ open }) => {
  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: 9999,
        background: "rgba(15,23,42,0.65)",
        backdropFilter: "blur(6px)",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <CircularProgress
        size={70}
        thickness={4}
        sx={{
          color: "#8B5CF6",
        }}
      />

      <Typography
        sx={{
          color: "#fff",
          fontWeight: 600,
          fontSize: "18px",
        }}
      >
        Loading...
      </Typography>
    </Backdrop>
  );
};

export default GlobalLoader;
