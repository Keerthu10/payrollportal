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
import { EyeIcon } from "../icons/CustomIcons";
import { PasswordEyeIcon } from "../icons/CustomIcons";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { loginUser } from "../services/login";
import cloudeLogo from "../assets/cloude.png"

const SignInView = () => {
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const location = useLocation();

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
      newErrors.email = "Please enter your email address";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
      valid = false;
    }

    // Password check
    if (!password) {
      newErrors.password = "Please enter your password";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      showToast(
        "error",
        "Validation Error",
        "Please fix the highlighted fields",
      );
      return;
    }
    try {
      const payload = {
        email,
        password,
      };
      const response = await loginUser(payload);
      console.log("Login Response:", response.data);

      localStorage.setItem("token", response.data?.token);

      showToast("success", "Login Successful", "Welcome back");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      showToast(
        "error",
        "Login Failed",
        error?.response?.data?.message || "Invalid email or password",
      );
    }
  };

  return (
    <AuthContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 1,
        }}
      >
        <Box
          component="img"
          src={cloudeLogo}
          alt="Cloute Technologies"
          sx={{
            width: 100,
            height: "auto",
            objectFit: "contain",
          }}
        />
      </Box>
      <Typography
        sx={{
          color: "#6D5DFB",
          fontWeight: 700,
          fontSize: 15,
          letterSpacing: 1.5,
          textAlign: "center",
          mb:3
        }}
      >
        CLOUTE TECHNOLOGIES
      </Typography>
      {/* Header Section */}
      <Box sx={{ mb: 3 }}>

        <Typography
          sx={{
            fontSize: "30px",
            fontWeight: 700,
            color: "#0F172A",
            mb: 0.5,
          }}
        >
          SIGN IN
        </Typography>

        <Typography
          sx={{
            color: "#64748B",
            fontSize: 15,
          }}
        >
          Enter your credentials to continue
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
          mb: 2,

          "& .MuiOutlinedInput-root": {
            borderRadius: "16px",
            backgroundColor: "#F8FAFC",
            "& fieldset": {
              borderColor: errors.email
                ? "#ef4444" // 🔴 red when invalid
                : email
                  ? "#10b981" // 🟢 green when valid
                  : "#d1d5db", // default gray
            },

            "&:hover fieldset": {
              borderColor: "#6D5DFB",
            },

            "&.Mui-focused fieldset": {
              borderColor: "#6D5DFB",
              borderWidth: 2,
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
      {/* <TextField
        fullWidth
        label="Password"
        variant="outlined"
        InputProps={{
          type: showPassword ? "text" : "password",

          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }} */}
      <Box sx={{ position: "relative", mb: 3 }}>
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
              backgroundColor: "#F8FAFC",

              "& .MuiInputBase-input": {
                paddingRight: "50px",
              },

              "& fieldset": {
                borderColor: errors.password
                  ? "#ef4444"
                  : password
                    ? "#10b981"
                    : "#d1d5db",
              },

              "&:hover fieldset": {
                borderColor: "#6D5DFB",
              },

              "&.Mui-focused fieldset": {
                borderColor: "#6D5DFB",
                borderWidth: 2,
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
        <IconButton
          onClick={() => setShowPassword(!showPassword)}
          sx={{
            position: "absolute",
            right: "18px",
            top: "28px",
            transform: "translateY(-50%)",
            color: "#6b7280",
          }}
        >
          {showPassword ? <Visibility /> : <EyeIcon />}
        </IconButton>
      </Box>

      {/* Forgot Password */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            cursor: "pointer",
            color: "#6D5DFB",
            fontWeight: 600,
          }}
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
          height: 58,
          borderRadius: "18px",

          background:
            "linear-gradient(90deg,#6D5DFB 0%, #4A3AFF 50%, #45D7FF 100%)",

          fontWeight: 700,
          fontSize: "17px",
          textTransform: "none",

          position: "relative",
          overflow: "hidden",

          boxShadow: "0 15px 35px rgba(74,58,255,.3)",

          transition: "all .3s ease",

          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent)",
            transition: "all .8s",
          },

          "&:hover::before": {
            left: "100%",
          },

          "&:hover": {
            background: "linear-gradient(90deg,#5B4CF5,#3B2CF8,#2AC5FF)",

            transform: "translateY(-3px)",

            boxShadow: "0 20px 45px rgba(74,58,255,.4)",
          },

          "&:active": {
            transform: "translateY(-1px)",
          },
        }}
      >
        Sign In
      </Button>
      <Typography
        align="center"
        sx={{
          mt: 2,
          fontSize: 13,
          color: "#94A3B8",
        }}
      >
        Secure login powered by Cloute Technologies
      </Typography>

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
