import { Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 2,
        color: "rgba(255,255,255,0.75)",
        fontSize: "14px",
      }}
    >
      © {new Date().getFullYear()} Payroll Portal. All Rights Reserved.
    </Box>
  );
};

export default Footer;
