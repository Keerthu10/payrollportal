import { Backdrop, CircularProgress, Typography } from "@mui/material";

const GlobalLoader = ({ open }) => {
  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: (theme) => theme.zIndex.modal + 1,
        background: "rgba(15,23,42,0.70)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)", // Safari support
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
          fontSize: 18,
          letterSpacing: 0.5,
        }}
      >
        Loading...
      </Typography>
    </Backdrop>
  );
};

export default GlobalLoader;
