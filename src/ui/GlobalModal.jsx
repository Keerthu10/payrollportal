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
    maxWidth: maxWidth,
    bgcolor: "background.paper",
    borderRadius: isMobile ? 0 : 3,
    boxShadow: theme.shadows[25],
    maxHeight: "90vh",
    overflowY: "auto",
    p: 4,
    display: "flex",
    flexDirection: "column",
    titleBgColor: "primary.main",
    titleColor: "white",
  };

  return (
    <Modal
      open={open}
      onClose={disableBackdropClick ? undefined : handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-content"
    >
      <Box sx={style}>
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ mb: 2 }}
        >
          <Box>
            <Typography id="modal-title" variant="h6" component="h2">
              <strong>{title}</strong>
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 20,
              right: 20,
              color: theme.palette.grey[600],

              "&:hover": {
                color: theme.palette.grey[900],
                backgroundColor: "transparent",
              },
            }}
          >
            <CloseTwoTone />
          </IconButton>
        </Stack>

        {/* Content */}
        <Box
          id="modal-content"
          sx={{
            mb: actions ? 3 : 0,
            flexGrow: 1,
            overflowY: "auto",
            overflowX: "auto",
            mt: 1,
            px: 2,
            py: 1,
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
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            {React.Children.map(actions, (action) =>
              React.cloneElement(action, { disabled: loading }),
            )}
            {loading && <CircularProgress size={24} />}
          </Stack>
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
