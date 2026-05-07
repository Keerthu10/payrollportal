import React, { useState } from "react";

import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  Link,
} from "@mui/material";

import AuthContent from "../layouts/AuthContent";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const SignInView = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthContent>
      {/* Header Section */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(to right, #0f172a, #2563eb)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}
        >
          PayRoll Pro
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "text.secondary",
            fontWeight: 500,
            mb: 2,
          }}
        >
          Payroll Management Portal
        </Typography>
        <Divider sx={{ mb: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              color: "#0f3d91",
            }}
          >
            By Cloute Technologies
          </Typography>
        </Divider>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Please sign in to your account.
        </Typography>
      </Box>

      {/* Email Field */}
      <TextField
        fullWidth
        label="Email address"
        variant="outlined"
        sx={{
          mb: 4,

          "& .MuiOutlinedInput-root": {
            borderRadius: "16px",
            backgroundColor: "rgba(255,255,255,0.7)",

            "& fieldset": {
              borderColor: "#d1d5db",
            },

            "&:hover fieldset": {
              borderColor: "#091b52ff",
            },

            "&.Mui-focused fieldset": {
              borderColor: "#091b52ff",
              borderWidth: "2px",
            },
          },

          "& .MuiInputLabel-root": {
            color: "#6b7280",
          },

          "& .MuiInputLabel-root.Mui-focused": {
            color: "#404758ff",
          },
        }}
      />

      {/* Password Field */}
      <TextField
        fullWidth
        label="Password"
        variant="outlined"
        type={showPassword ? "text" : "password"}
        sx={{
          mb: 3,

          "& .MuiOutlinedInput-root": {
            borderRadius: "16px",
            backgroundColor: "rgba(255,255,255,0.7)",

            "& fieldset": {
              borderColor: "#d1d5db",
            },

            "&:hover fieldset": {
              borderColor: "#091b52ff",
            },

            "&.Mui-focused fieldset": {
              borderColor: "#091b52ff",
              borderWidth: "2px",
            },
          },

          "& .MuiInputLabel-root": {
            color: "#6b7280",
          },

          "& .MuiInputLabel-root.Mui-focused": {
            color: "#2563eb",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Forgot Password */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 3,
        }}
      >
        <Link variant="body2" sx={{ cursor: "pointer" }}>
          Forgot password?
        </Link>
      </Box>

      {/* Sign In Button */}
      <Button
        fullWidth
        size="large"
        variant="contained"
        sx={{
          py: 1.8,
          borderRadius: "14px",
          mb: 3,

          background: "linear-gradient(to right, #0f172a, #1e3a8a)",

          fontWeight: 700,
          fontSize: "16px",

          textTransform: "none",

          boxShadow: "0 8px 20px rgba(15,23,42,0.25)",

          transition: "all 0.3s ease",

          "&:hover": {
            background: "linear-gradient(to right, #020617, #1d4ed8)",

            transform: "translateY(-2px)",

            boxShadow: "0 12px 24px rgba(15,23,42,0.35)",
          },
        }}
      >
        Sign In
      </Button>

      {/* Divider */}
      {/* <Divider sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          OR
        </Typography>
      </Divider>

      {/* Social Icons */}
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <IconButton>G</IconButton>
        <IconButton>Git</IconButton>
        <IconButton>X</IconButton>
      </Box> */}
    </AuthContent>
  );
};

export default SignInView;
