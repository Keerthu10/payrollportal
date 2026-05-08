import React, { useState, useEffect } from "react";

import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  Link,
} from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import AuthContent from "../layouts/AuthContent";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const SignInView = () => {
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [passwordChanged, setPasswordChanged] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const DUMMY_EMAIL = "abc@gmail.com";
  const [dummyPassword, setDummyPassword] = useState("Password@123");

  const validateEmail = (value) => {
    if (!value.trim()) {
      return "Email is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      return "Enter a valid email address";
    }

    return "";
  };

  const validatePassword = (value) => {
    if (!value.trim()) {
      return "Password is required";
    }

    return "";
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    // Email regex check
    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
      valid = false;
    }

    // Password check
    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = () => {
    if (validateForm()) {
      if (email === DUMMY_EMAIL && password === dummyPassword) {
        if (passwordChanged) {
          // ✅ Already changed → go to dashboard
          showToast("success", "Login Successful", "Welcome back!");
          navigate("/dashboard");
        } else {
          // ❌ Not changed → force reset
          showToast(
            "warn",
            "Password Change Required",
            "Please reset your password",
          );
          navigate("/forgot-password", { state: { goToStep3: true } });
        }
      } else {
        showToast("error", "Login Failed", "Invalid email or password");
        setErrors({ ...errors, password: "Invalid email or password" });
      }
    } else {
      showToast(
        "error",
        "Validation Error",
        "Please fix the highlighted fields",
      );
    }
  };

  useEffect(() => {
    if (location.state?.passwordChanged && location.state?.newPassword) {
      setPasswordChanged(true);

      setDummyPassword(location.state.newPassword);

      showToast(
        "success",
        "Password Updated",
        "Your password has been changed successfully",
      );
      navigate(location.pathname, {
        replace: true,
      });
    }
  }, [location.state,navigate]);

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
        value={email}
        onChange={(e) => {
          const value = e.target.value;

          setEmail(value);

          setErrors({
            ...errors,
            email: validateEmail(value),
          });
        }}
        error={Boolean(errors.email)}
        helperText={errors.email}
        sx={{
          mb: 4,

          "& .MuiOutlinedInput-root": {
            borderRadius: "16px",
            backgroundColor: "rgba(255,255,255,0.7)",
            "& fieldset": {
              borderColor: errors.email
                ? "#ef4444" // 🔴 red when invalid
                : email
                  ? "#10b981" // 🟢 green when valid
                  : "#d1d5db", // default gray
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
        value={password}
        onChange={(e) => {
          const value = e.target.value;

          setPassword(value);

          setErrors({
            ...errors,
            password: validatePassword(value),
          });
        }}
        error={Boolean(errors.password)}
        helperText={errors.password}
        sx={{
          mb: 3,

          "& .MuiOutlinedInput-root": {
            borderRadius: "16px",
            backgroundColor: "rgba(255,255,255,0.7)",

            "& fieldset": {
              borderColor: errors.password
                ? "#ef4444"
                : password
                  ? "#10b981"
                  : "#d1d5db",
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
        <Typography
          variant="body2"
          sx={{ cursor: "pointer", color: "primary.main" }}
          onClick={() => navigate("/forgot-password")}
        >
          Forgot password?
        </Typography>
      </Box>

      {/* Sign In Button */}
      <Button
        fullWidth
        size="large"
        variant="contained"
        onClick={handleLogin}
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
