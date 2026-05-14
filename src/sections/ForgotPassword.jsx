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

import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { EyeIcon } from "../icons/CustomIcons";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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
  const handleSendOtp = () => {
    // Empty Validation
    if (!email.trim()) {
      setEmailError("Please enter Valid email address");

      showToast("error", "Required Field", "Email address is required");

      return;
    }

    // Email Validation
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

    // Clear Error
    setEmailError("");

    // Dummy Success
    setOtp(["", "", "", "", "", ""]);

    setStage(2);

    showToast("success", "Success", `OTP has been sent to ${email}`);
  };

  // Verify OTP
  const handleVerifyOtp = () => {
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

    if (otpValue === "123456") {
      setOtpError(""); // clear error
      showToast("success", "Success", "OTP verified successfully");
      setStage(3);
    } else {
      setOtpError("Invalid OTP");
      showToast("error", "Validation Error", "Invalid OTP entered");
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
  const handleResetPassword = () => {
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

    setNewPasswordError("");
    showToast("success", "Success", "Password reset successful");
    setTimeout(() => {
      if (location.state?.goToStep3) {
        showToast("success", "Success", "Password reset successful");

        localStorage.setItem("token", "dummy_admin_token");

        navigate("/dashboard");
      } else {
        navigate("/login", {
          state: {
            passwordChanged: true,
            newPassword,
          },
        });
      }
    }, 1200);
  };

  useEffect(() => {
    if (location.state?.goToStep3) {
      setStage(3);
      setHideStepper(true);
    }
  }, [location.state]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #edf5ff 50%, #fef6f4 50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: 450,
          p: 4,
          borderRadius: 5,
          boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        {/* Heading */}
        {!hideStepper && (
          <Typography
            fontSize={30}
            fontWeight={700}
            textAlign="center"
            color="#173B8F"
          >
            Forgot Password
          </Typography>
        )}

        <Typography textAlign="center" color="gray" mt={1} mb={3}>
          Reset your account password securely
        </Typography>

        <Divider sx={{ mb: 4 }} />

        {/* Stepper */}
        {!hideStepper && (
          <Stepper activeStep={stage - 1} alternativeLabel sx={{ mb: 5 }}>
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
            <Typography fontSize={14} fontWeight={600} mb={1}>
              Email Address
            </Typography>

            <TextField
              fullWidth
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);

                // remove error while typing
                setEmailError("");
              }}
              // makes border red
              error={Boolean(emailError)}
              // shows error message
              helperText={emailError}
              sx={{
                mb: 3,

                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
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
                textTransform: "none",
                background: "linear-gradient(to right, #091540, #1f3c88)",
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
              mb={2}
              textAlign="center"
            >
              Enter 6 Digit OTP
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 1,
                mb: 4,
              }}
            >
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  value={digit}
                  inputRef={(el) => (otpRefs.current[index] = el)}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  error={Boolean(otpError)} // ✅ red border when error
                  helperText={index === 0 ? otpError : ""} // show message under first box only
                  inputProps={{
                    maxLength: 1,
                    inputMode: "numeric",
                    style: {
                      textAlign: "center",
                      fontSize: "22px",
                      fontWeight: "bold",
                    },
                  }}
                  sx={{
                    width: 55,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
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
                textTransform: "none",
                background: "linear-gradient(to right, #091540, #1f3c88)",
              }}
            >
              Verify OTP
            </Button>
          </>
        )}

        {/* ================= STEP 3 ================= */}

        {stage === 3 && (
          <>
            <Typography fontSize={14} fontWeight={600} mb={1}>
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
