// import React, { useState, useRef, useEffect } from "react";
// import {
//   Box,
//   Card,
//   TextField,
//   Button,
//   Typography,
//   Divider,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useToast } from "../context/ToastContext";

// const ForgotPassword = () => {
//   const { showToast } = useToast();
//   const navigate = useNavigate();
//   const passwordRefs = useRef([]);
//   const confirmRefs = useRef([]);

//   const [email, setEmail] = useState("");
//   const [stage, setStage] = useState(1);
//   const [dummyPassword, setDummyPassword] = useState("");
//   const [newPassword, setNewPassword] = useState(["", "", "", "", "", ""]);
//   const [confirmPassword, setConfirmPassword] = useState([
//     "",
//     "",
//     "",
//     "",
//     "",
//     "",
//   ]);
//   const [timer, setTimer] = useState(180); // 3 minutes
//   const [expired, setExpired] = useState(false);

//   // Handle box input
//   const handleBoxChange = (value, index, setter, refs, arr) => {
//     if (!/^[0-9a-zA-Z]?$/.test(value)) return;
//     const updated = [...arr];
//     updated[index] = value;
//     setter(updated);
//     if (value && index < refs.current.length - 1) {
//       refs.current[index + 1].focus();
//     }
//   };

//   // Timer effect
//   useEffect(() => {
//     if (stage !== 3 || expired) return;
//     if (timer === 0) {
//       setExpired(true);
//       return;
//     }
//     const interval = setInterval(() => {
//       setTimer((prev) => prev - 1);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [stage, timer, expired]);

//   const handleNext = () => {
//     if (stage === 1) {
//       if (!email) {
//         showToast("Please enter your email", "error");
//         return;
//       }
//       setStage(2);
//     } else if (stage === 2) {
//       if (!dummyPassword) {
//         showToast("Please enter dummy password", "error");
//         return;
//       }
//       if (dummyPassword !== "123456") {
//         showToast("Dummy password is incorrect", "error");
//         return;
//       }
//       setStage(3);
//       setTimer(180);
//       setExpired(false);
//     } else if (stage === 3) {
//       const newPass = newPassword.join("");
//       const confirmPass = confirmPassword.join("");
//       if (newPass.length !== 6 || confirmPass.length !== 6) {
//         showToast("Please enter 6 characters in both fields", "error");
//         return;
//       }
//       if (newPass !== confirmPass) {
//         showToast("Passwords do not match", "error");
//         return;
//       }
//       if (expired) {
//         showToast("Time expired. Please restart reset process", "error");
//         return;
//       }
//       showToast("Password reset successful (dummy)", "success");
//       setTimeout(() => navigate("/"), 1200);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         backgroundColor: "#F9F8FC",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Card sx={{ width: 440, p: 4, borderRadius: 4 }}>
//         <Typography fontSize={24} fontWeight={600} textAlign="center">
//           Forgot Password
//         </Typography>
//         <Divider sx={{ my: 2 }} />

//         {/* Stage 1: Email */}
//         {stage === 1 && (
//           <>
//             <Typography fontSize={14} fontWeight={500} mb={1}>
//               Enter Email
//             </Typography>
//             <TextField
//               fullWidth
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               sx={{ mb: 2 }}
//             />
//             <Button fullWidth variant="contained" onClick={handleNext}>
//               Next
//             </Button>
//           </>
//         )}

//         {/* Stage 2: Dummy Password */}
//         {stage === 2 && (
//           <>
//             <Typography fontSize={14} fontWeight={500} mb={1}>
//               Enter Dummy Password
//             </Typography>
//             <TextField
//               fullWidth
//               type="password"
//               placeholder="Enter dummy password"
//               value={dummyPassword}
//               onChange={(e) => setDummyPassword(e.target.value)}
//               sx={{ mb: 2 }}
//             />
//             <Button fullWidth variant="contained" onClick={handleNext}>
//               Next
//             </Button>
//           </>
//         )}

//         {/* Stage 3: Reset Password with 6 boxes */}
//         {stage === 3 && (
//           <>
//             <Typography fontSize={14} fontWeight={500} mb={1}>
//               New Password
//             </Typography>
//             <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
//               {newPassword.map((char, index) => (
//                 <TextField
//                   key={index}
//                   value={char}
//                   inputRef={(el) => (passwordRefs.current[index] = el)}
//                   onChange={(e) =>
//                     handleBoxChange(
//                       e.target.value,
//                       index,
//                       setNewPassword,
//                       passwordRefs,
//                       newPassword,
//                     )
//                   }
//                   inputProps={{
//                     maxLength: 1,
//                     style: { textAlign: "center", fontSize: 20 },
//                   }}
//                   sx={{ width: 50 }}
//                 />
//               ))}
//             </Box>

//             <Typography fontSize={14} fontWeight={500} mb={1}>
//               Confirm Password
//             </Typography>
//             <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
//               {confirmPassword.map((char, index) => (
//                 <TextField
//                   key={index}
//                   value={char}
//                   inputRef={(el) => (confirmRefs.current[index] = el)}
//                   onChange={(e) =>
//                     handleBoxChange(
//                       e.target.value,
//                       index,
//                       setConfirmPassword,
//                       confirmRefs,
//                       confirmPassword,
//                     )
//                   }
//                   inputProps={{
//                     maxLength: 1,
//                     style: { textAlign: "center", fontSize: 20 },
//                   }}
//                   sx={{ width: 50 }}
//                 />
//               ))}
//             </Box>

//             <Typography
//               fontSize={13}
//               color={expired ? "red" : "#6B7280"}
//               mb={2}
//             >
//               {expired
//                 ? "Time expired. Please restart reset process"
//                 : `Time remaining: ${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, "0")}`}
//             </Typography>

//             <Button
//               fullWidth
//               variant="contained"
//               onClick={handleNext}
//               disabled={expired}
//             >
//               Reset Password
//             </Button>
//           </>
//         )}
//       </Card>
//     </Box>
//   );
// };

// export default ForgotPassword;

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
  const [passwordError, setPasswordError] = useState("");
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
      setEmailError("Email address is required");

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

    showToast("success", "Success", "OTP sent successfully");
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
    if (!newPassword || !confirmPassword) {
      setPasswordError("Please fill all fields");
      showToast("error", "Validation Error", "Please fill all fields");
      return;
    }

    const strengthErrors = validatePasswordStrength(newPassword);
    if (strengthErrors.length > 0) {
      const message = "Password must have: " + strengthErrors.join(", ");
      setPasswordError(message);
      showToast("error", "Weak Password", message);
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      showToast("error", "Validation Error", "Passwords do not match");
      return;
    }

    setPasswordError("");
    showToast("success", "Success", "Password reset successful");
    setTimeout(
      () => navigate("/", { state: { passwordChanged: true, newPassword } }),
      1200,
    );
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

            <TextField
              fullWidth
              placeholder="New Password"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => {
                const value = e.target.value;
                setNewPassword(value);
                setPasswordStrength(getPasswordStrength(value));
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(passwordError)}
              helperText={passwordError}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                },
              }}
            />

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

            <Typography fontSize={14} fontWeight={600} mb={1}>
              Confirm Password
            </Typography>

            <TextField
              fullWidth
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(passwordError)}
              helperText={passwordError}
              sx={{
                mb: 4,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                },
              }}
            />

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
          </>
        )}
      </Card>
    </Box>
  );
};

export default ForgotPassword;
