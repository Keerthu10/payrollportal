import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Divider,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";

import { forgotPassword, verifyOtp, resetPassword } from "../services/login";

import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { EyeIcon } from "../icons/CustomIcons";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CompanyLogo from "../components/CompanyLogo";

const ForgotPassword = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const otpRefs = useRef([]);

  // Steps
  const steps = ["Email", "OTP Verification", "Reset Password"];

  // States
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [stage, setStage] = useState(1);
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [hideStepper, setHideStepper] = useState(false);

  // OTP Input Change
  const handleOtpChange = (value, index) => {
    // allow only numbers
    if (!/^[0-9]?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;

    setOtp(updatedOtp);

    // move next box automatically
    if (value && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1].focus();
    }
  };

  // Send OTP
  const handleSendOtp = async () => {
    if (!email.trim()) {
      setEmailError("Please enter Valid email address");

      showToast("error", "Required Field", "Email address is required");

      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Please enter valid email address");

      showToast(
        "error",
        "Validation Error",
        "Please enter valid email address",
      );

      return;
    }

    try {
      const payload = {
        email,
      };

      const response = await forgotPassword(payload);

      console.log(response.data);

      setEmailError("");

      setOtp(["", "", "", "", "", ""]);

      setStage(2);

      showToast(
        "success",
        "Success",
        response.data?.message || `OTP sent successfully`,
      );
    } catch (error) {
      console.log(error);

      showToast(
        "error",
        "Error",
        error?.response?.data?.message || "Failed to send OTP",
      );
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    const otpValue = otp.join("");

    if (!otpValue) {
      setOtpError("Please enter the OTP");
      showToast("error", "Validation Error", "Please enter the OTP");
      return;
    }

    if (otpValue.length !== 6) {
      setOtpError("OTP must be 6 digits");
      showToast("error", "Validation Error", "OTP must be 6 digits");
      return;
    }

    if (!/^\d{6}$/.test(otpValue)) {
      setOtpError("OTP must contain only numbers");
      showToast("error", "Validation Error", "OTP must contain only numbers");
      return;
    }
    try {
      const payload = {
        email,
        otp: otpValue,
      };

      const response = await verifyOtp(payload);

      console.log(response.data);

      setOtpError("");

      showToast(
        "success",
        "Success",
        response.data?.message || "OTP verified successfully",
      );

      setStage(3);
    } catch (error) {
      console.log(error);

      setOtpError("Invalid OTP");

      showToast(
        "error",
        "Validation Error",
        error?.response?.data?.message || "Invalid OTP entered",
      );
    }
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;

    if (strength <= 2) return "Weak";
    if (strength === 3 || strength === 4) return "Medium";
    if (strength === 5) return "Strong";
  };

  const validatePasswordStrength = (password) => {
    const errors = [];

    if (password.length < 8) {
      errors.push("At least 8 characters");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("At least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("At least one lowercase letter");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("At least one number");
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.push("At least one special character (!@#$%^&*)");
    }

    return errors;
  };

  // Reset Password
  const handleResetPassword = async () => {
    let hasError = false;

    if (!newPassword) {
      setNewPasswordError("Please enter a new password");
      hasError = true;
    } else {
      setNewPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      hasError = true;
    } else {
      setConfirmPasswordError("");
    }

    if (hasError) return;

    const strengthErrors = validatePasswordStrength(newPassword);
    if (strengthErrors.length > 0) {
      const message = "Password must have: " + strengthErrors.join(", ");
      setNewPasswordError(message);
      showToast("error", "Weak Password", message);
      return;
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      showToast("error", "Validation Error", "Passwords do not match");
      return;
    }
    try {
      const payload = {
        email,
        newPassword,
        confirmPassword,
      };

      const response = await resetPassword(payload);

      console.log(response.data);

      setNewPasswordError("");

      showToast(
        "success",
        "Success",
        response.data?.message || "Password reset successful",
      );

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      console.log(error);

      showToast(
        "error",
        "Error",
        error?.response?.data?.message || "Failed to reset password",
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        background: `
          radial-gradient(circle at top left, rgba(255,255,255,.08), transparent 35%),
          radial-gradient(circle at bottom right, rgba(56,189,248,.15), transparent 40%),
          linear-gradient(
            135deg,
            #15123F 0%,
            #262261 25%,
            #4338CA 55%,
            #5B4CF5 75%,
            #38BDF8 100%
          )
        `,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 2, sm: 3 },
        py: { xs: 4, sm: 6 },
        paddingTop: "max(16px, env(safe-area-inset-top))",
        paddingBottom: "max(16px, env(safe-area-inset-bottom))",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 460,
          p: { xs: 2.5, sm: 4 },
          borderRadius: { xs: "20px", sm: "28px" },
          boxShadow: "0 25px 60px rgba(15,23,42,0.25)",
          background: "rgba(255,255,255,0.98)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        {/* Logo Section */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <CompanyLogo size="lg" variant="dark" showText={true} />
        </Box>

        {/* Heading */}
        {!hideStepper && (
          <Typography
            fontSize={{ xs: 24, sm: 28 }}
            fontWeight={700}
            textAlign="center"
            color="#15123F"
          >
            Forgot Password
          </Typography>
        )}

        <Typography textAlign="center" color="#64748B" fontSize={{ xs: 13, sm: 14 }} mt={0.5} mb={2.5}>
          Reset your account password securely
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* Stepper */}
        {!hideStepper && (
          <Stepper
            activeStep={stage - 1}
            alternativeLabel
            sx={{
              mb: 4,
              "& .MuiStepLabel-label": {
                fontSize: { xs: "11px", sm: "13px" },
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        )}

        {/* ================= STEP 1 ================= */}

        {stage === 1 && (
          <>
            <Typography fontSize={14} fontWeight={600} color="#334155" mb={1}>
              Email Address
            </Typography>

            <TextField
              fullWidth
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              error={Boolean(emailError)}
              helperText={emailError}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                  backgroundColor: "#F8FAFC",
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleSendOtp}
              sx={{
                py: 1.5,
                borderRadius: "14px",
                fontSize: "16px",
                fontWeight: 600,
                textTransform: "none",
                background: "linear-gradient(90deg, #6D5DFB 0%, #4338CA 100%)",
                boxShadow: "0 10px 25px rgba(74,58,255,0.25)",
                "&:hover": {
                  background: "linear-gradient(90deg, #5B4CF5 0%, #3730A3 100%)",
                },
              }}
            >
              Send OTP
            </Button>
          </>
        )}

        {/* ================= STEP 2 ================= */}

        {stage === 2 && (
          <>
            <Typography
              fontSize={14}
              fontWeight={600}
              color="#334155"
              mb={2}
              textAlign="center"
            >
              Enter 6 Digit OTP
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: { xs: 0.75, sm: 1.25 },
                mb: 4,
                width: "100%",
              }}
            >
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  value={digit}
                  inputRef={(el) => (otpRefs.current[index] = el)}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  error={Boolean(otpError)}
                  helperText={index === 0 ? otpError : ""}
                  inputProps={{
                    maxLength: 1,
                    inputMode: "numeric",
                    style: {
                      textAlign: "center",
                      fontSize: "20px",
                      fontWeight: "bold",
                      padding: "10px 0",
                    },
                  }}
                  sx={{
                    width: { xs: "calc((100% - 30px) / 6)", sm: 52 },
                    maxWidth: 54,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      backgroundColor: "#F8FAFC",
                    },
                  }}
                />
              ))}
            </Box>

            <Button
              fullWidth
              variant="contained"
              onClick={handleVerifyOtp}
              sx={{
                py: 1.5,
                borderRadius: "14px",
                fontSize: "16px",
                fontWeight: 600,
                textTransform: "none",
                background: "linear-gradient(90deg, #6D5DFB 0%, #4338CA 100%)",
                boxShadow: "0 10px 25px rgba(74,58,255,0.25)",
                "&:hover": {
                  background: "linear-gradient(90deg, #5B4CF5 0%, #3730A3 100%)",
                },
              }}
            >
              Verify OTP
            </Button>
          </>
        )}

        {/* ================= STEP 3 ================= */}

        {stage === 3 && (
          <>
            <Typography fontSize={14} fontWeight={600} color="#334155" mb={1}>
              New Password
            </Typography>

            <Box sx={{ position: "relative", mb: 2 }}>
              <TextField
                fullWidth
                placeholder="New Password"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => {
                  const value = e.target.value;
                  setNewPassword(value);
                  setPasswordStrength(getPasswordStrength(value));
                  setNewPasswordError("");
                }}
                error={Boolean(newPasswordError)}
                helperText={newPasswordError}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                  },
                }}
              />

              <IconButton
                onClick={() => setShowNewPassword(!showNewPassword)}
                sx={{
                  position: "absolute",
                  right: "18px",
                  top: "28px",
                  transform: "translateY(-50%)",
                  color: "#6b7280",
                }}
              >
                {showNewPassword ? <Visibility /> : <EyeIcon />}
              </IconButton>

              {/* 👇 Strength indicator goes right here */}
              {newPassword && (
                <Box sx={{ mt: 1, mb: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color:
                        passwordStrength === "Weak"
                          ? "error.main"
                          : passwordStrength === "Medium"
                            ? "warning.main"
                            : "success.main",
                    }}
                  >
                    Strength: {passwordStrength}
                  </Typography>

                  <Box
                    sx={{
                      mt: 0.5,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: "#e0e0e0",
                    }}
                  >
                    <Box
                      sx={{
                        height: "100%",
                        borderRadius: 3,
                        width:
                          passwordStrength === "Weak"
                            ? "33%"
                            : passwordStrength === "Medium"
                              ? "66%"
                              : "100%",
                        backgroundColor:
                          passwordStrength === "Weak"
                            ? "#ef4444"
                            : passwordStrength === "Medium"
                              ? "#f59e0b"
                              : "#10b981",
                        transition: "width 0.3s ease",
                      }}
                    />
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" fontWeight={600}>
                      Password must contain:
                    </Typography>
                    <Typography
                      variant="body2"
                      color={
                        /[A-Z]/.test(newPassword)
                          ? "success.main"
                          : "text.secondary"
                      }
                    >
                      • One uppercase letter
                    </Typography>
                    <Typography
                      variant="body2"
                      color={
                        /[a-z]/.test(newPassword)
                          ? "success.main"
                          : "text.secondary"
                      }
                    >
                      • One lowercase letter
                    </Typography>
                    <Typography
                      variant="body2"
                      color={
                        /[0-9]/.test(newPassword)
                          ? "success.main"
                          : "text.secondary"
                      }
                    >
                      • One number
                    </Typography>
                    <Typography
                      variant="body2"
                      color={
                        /[!@#$%^&*]/.test(newPassword)
                          ? "success.main"
                          : "text.secondary"
                      }
                    >
                      • One special character (!@#$%^&*)
                    </Typography>
                    <Typography
                      variant="body2"
                      color={
                        newPassword.length >= 8
                          ? "success.main"
                          : "text.secondary"
                      }
                    >
                      • At least 8 characters
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>

            <Box sx={{ position: "relative", mb: 4 }}>
              <Typography fontSize={14} fontWeight={600} mb={1}>
                Confirm Password
              </Typography>

              <TextField
                fullWidth
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setConfirmPasswordError("");
                }}
                error={Boolean(confirmPasswordError)}
                helperText={confirmPasswordError}
                sx={{
                  mb: 4,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                  },
                }}
              />

              <IconButton
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                sx={{
                  position: "absolute",
                  right: "18px",
                  top: "52px",
                  transform: "translateY(-50%)",
                  color: "#6b7280",
                }}
              >
                {showConfirmPassword ? <Visibility /> : <EyeIcon />}
              </IconButton>

              <Button
                fullWidth
                variant="contained"
                onClick={handleResetPassword}
                sx={{
                  py: 1.5,
                  borderRadius: "14px",
                  fontSize: "16px",
                  textTransform: "none",
                  background: "linear-gradient(to right, #091540, #1f3c88)",
                }}
              >
                Reset Password
              </Button>
            </Box>
          </>
        )}
      </Card>
    </Box>
  );
};

export default ForgotPassword;
