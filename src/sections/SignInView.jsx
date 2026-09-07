import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import AuthContent from "../layouts/AuthContent";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { loginUser } from "../services/login";
import CompanyLogo from "../components/CompanyLogo";

const SignInView = () => {
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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

    if (!email) {
      newErrors.email = "Please enter your email address";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
      valid = false;
    }

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

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!validateForm()) {
      showToast(
        "error",
        "Validation Error",
        "Please fix the highlighted fields"
      );
      return;
    }
    try {
      setLoading(true);
      const payload = { email, password };
      const response = await loginUser(payload);

      localStorage.setItem("token", response.data?.token);
      showToast("success", "Login Successful", "Welcome back");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      showToast(
        "error",
        "Login Failed",
        error?.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContent>
      {/* Mobile / Card Top Logo */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <CompanyLogo size="md" variant="dark" />
      </Box>

      {/* Header Section */}
      <Box sx={{ mb: { xs: 2.5, sm: 3 }, textAlign: { xs: "center", sm: "left" } }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "24px", sm: "28px", md: "30px" },
            fontWeight: 700,
            color: "#0F172A",
            mb: 0.5,
            letterSpacing: "-0.5px",
          }}
        >
          SIGN IN
        </Typography>

        <Typography
          sx={{
            color: "#64748B",
            fontSize: { xs: 14, sm: 15 },
          }}
        >
          Enter your credentials to continue
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleLogin} noValidate>
        {/* Email Field */}
        <TextField
          fullWidth
          label="Email address"
          variant="outlined"
          type="email"
          autoComplete="email"
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
              minHeight: { xs: "48px", sm: "52px" },
              "& fieldset": {
                borderColor: errors.email
                  ? "#ef4444"
                  : email
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

        {/* Password Field with Standard EndAdornment */}
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  aria-label="toggle password visibility"
                  sx={{ color: "#6b7280", p: 1 }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",
              backgroundColor: "#F8FAFC",
              minHeight: { xs: "48px", sm: "52px" },
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

        {/* Forgot Password Link */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
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
              fontSize: { xs: "13px", sm: "14px" },
              py: 0.5,
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password?
          </Typography>
        </Box>

        {/* Sign In Button */}
        <Button
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          disabled={loading}
          sx={{
            height: { xs: 50, sm: 54, md: 58 },
            borderRadius: "16px",
            background:
              "linear-gradient(90deg,#6D5DFB 0%, #4A3AFF 50%, #45D7FF 100%)",
            fontWeight: 700,
            fontSize: { xs: "15px", sm: "16px", md: "17px" },
            textTransform: "none",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 10px 25px rgba(74,58,255,.3)",
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
              transform: "translateY(-2px)",
              boxShadow: "0 15px 35px rgba(74,58,255,.4)",
            },
            "&:active": {
              transform: "translateY(0)",
            },
          }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </Box>

      <Typography
        align="center"
        sx={{
          mt: 3,
          fontSize: { xs: 12, sm: 13 },
          color: "#94A3B8",
        }}
      >
        Secure login powered by Cloute Technologies
      </Typography>
    </AuthContent>
  );
};

export default SignInView;

