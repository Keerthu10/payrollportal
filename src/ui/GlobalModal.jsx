import React from "react";
import {
  Modal,
  Box,
  Typography,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Button,
} from "@mui/material";
import { CloseTwoTone } from "@mui/icons-material";

const GlobalModal = ({
  open,
  handleClose,
  title,
  subtitle,
  children,
  actions,
  loading = false,
  maxWidth = 500,
  fullWidth = true,
  disableBackdropClick = false,
  errors = {},
  onFieldChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const style = {
    position: "absolute",
    top: isMobile ? "0" : "50%",
    left: isMobile ? "0" : "50%",
    transform: isMobile ? "none" : "translate(-50%, -50%)",

    width: isMobile ? "100%" : fullWidth ? "90%" : maxWidth,
    maxWidth,

    background: "linear-gradient(135deg,#F5F3FF 0%,#EEF2FF 50%,#E0EAFF 100%)",

    borderRadius: isMobile ? 0 : "24px",

    border: "1px solid #E2E8F0",

    boxShadow: "0 25px 80px rgba(15,23,42,0.25)",

    maxHeight: "90vh",

    overflow: "hidden",

    display: "flex",
    flexDirection: "column",

    p: 0,
  };

  return (
    <Modal
      open={open}
      onClose={disableBackdropClick ? undefined : handleClose}
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "blur(6px)",
            backgroundColor: "rgba(15,23,42,0.45)",
          },
        },
      }}
      aria-labelledby="modal-title"
      aria-describedby="modal-content"
    >
      <Box sx={style}>
        {/* Header */}
        <Box
          sx={{
            px: 4,
            py: 3,
            background:
              "linear-gradient(90deg,#1E3A8A 0%,#2563EB 50%,#7C3AED 100%)",
            color: "#fff",
            position: "relative",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
            }}
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              sx={{
                mt: 0.5,
                opacity: 0.85,
                fontSize: 14,
              }}
            >
              {subtitle}
            </Typography>
          )}

          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,

              color: "#fff",

              backgroundColor: "rgba(255,255,255,0.15)",

              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.25)",
              },
            }}
          >
            <CloseTwoTone />
          </IconButton>
        </Box>

        {/* Content */}
        <Box
          id="modal-content"
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            overflowX: "hidden",
            px: 4,
            py: 4,
            background: "linear-gradient(180deg,#F8FAFF 0%,#F3F4FF 100%)",
            "&.MuiTextField-root": { mb: 2 },
          }}
        >
          {React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return child;
            return React.cloneElement(child, {
              errors,
              onFieldChange,
            });
          })}
        </Box>

        {/* Actions */}
        {actions && (
          <Box
            sx={{
              px: 4,
              py: 3,
              borderTop: "1px solid #E2E8F0",
              background: "#F8FAFC",
            }}
          >
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              {React.Children.map(actions, (action) =>
                React.cloneElement(action, {
                  disabled: loading,
                }),
              )}

              {loading && <CircularProgress size={24} />}
            </Stack>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default GlobalModal;

export const GlobalDeleteModal = ({
  open,
  onClose,
  onConfirm,
  title = "Delete Confirmation",
  message = "Are You sure you want to delete this item?",
}) => {
  return (
    <GlobalModal
      open={open}
      handleClose={onClose}
      title={title}
      actions={
        <>
          <Button variant="contained" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={onConfirm}>
            Delete
          </Button>
        </>
      }
    >
      <Typography>{message}</Typography>
    </GlobalModal>
  );
};

export const GlobalSessionTimeoutModal = ({
  open,
  countdown,
  onContinue,
  onLogout,
}) => {
  return (
    <GlobalModal
      open={open}
      handleClose={onContinue}
      title="Session Expiring"
      subtitle="Your session is about to expire due to inactivity."
      disableBackdropClick={true}
      actions={
        <>
          <Button
            variant="outlined"
            color="error"
            onClick={onLogout}
            sx={{
              minWidth: 110,
              borderRadius: "10px",
            }}
          >
            Logout
          </Button>

          <Button
            variant="contained"
            onClick={onContinue}
            sx={{
              minWidth: 170,
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Continue Session
          </Button>
        </>
      }
    >
      <Box
        sx={{
          backgroundColor: "#f5f7ff",
          borderRadius: "12px",
          padding: 2,
          mt: 1,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
          }}
        >
          Your session will expire in{" "}
          <Box
            component="span"
            sx={{
              color: "primary.main",
              fontWeight: 700,
              fontSize: "20px",
            }}
          >
            {countdown}
          </Box>{" "}
          seconds.
        </Typography>
      </Box>
    </GlobalModal>
  );
};
