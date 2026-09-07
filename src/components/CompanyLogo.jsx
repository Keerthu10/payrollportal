import React from "react";
import { Box, Typography } from "@mui/material";
import logoImg from "../assets/cloude.png";

const SIZES = {
  sm: { imgWidth: 38, imgHeight: 24, fontSize: 13 },
  md: { imgWidth: 56, imgHeight: 34, fontSize: 16 },
  lg: { imgWidth: 84, imgHeight: 50, fontSize: 20 },
};

/**
 * Responsive Company Logo component
 * - Supports light (for dark header/nav/drawer) and dark (for white cards/login)
 * - Retains crisp aspect ratio via objectFit: contain
 * - Responsive breakpoints across mobile, tablet, and desktop
 */
const CompanyLogo = ({
  size = "md",
  variant = "light",
  showText = true,
  sx = {},
}) => {
  const s = SIZES[size] || SIZES.md;
  const isLight = variant === "light";

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: { xs: 1, sm: 1.5 },
        textDecoration: "none",
        userSelect: "none",
        ...sx,
      }}
    >
      <Box
        component="img"
        src={logoImg}
        alt="Cloute Technologies"
        sx={{
          width: {
            xs: Math.round(s.imgWidth * 0.8),
            sm: s.imgWidth,
          },
          height: {
            xs: Math.round(s.imgHeight * 0.8),
            sm: s.imgHeight,
          },
          objectFit: "contain",
          filter: isLight
            ? "drop-shadow(0 4px 12px rgba(109,93,251,0.35))"
            : "drop-shadow(0 2px 6px rgba(0,0,0,0.08))",
          flexShrink: 0,
        }}
      />

      {showText && (
        <Typography
          component="span"
          sx={{
            fontWeight: 700,
            fontSize: {
              xs: `${s.fontSize - 2}px`,
              sm: `${s.fontSize}px`,
            },
            letterSpacing: "1px",
            background: isLight
              ? "linear-gradient(90deg, #FFFFFF 0%, #E2E8F0 100%)"
              : "linear-gradient(90deg, #6D5DFB 0%, #2563EB 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            whiteSpace: "nowrap",
            lineHeight: 1.1,
          }}
        >
          CLOUTE
        </Typography>
      )}
    </Box>
  );
};

export default CompanyLogo;
