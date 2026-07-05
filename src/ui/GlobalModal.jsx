import React, { useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Stack,
  IconButton,
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

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const style = {
    position: "absolute",
    top: {
      xs: 0,
      sm: "50%",
    },

    left: {
      xs: 0,
      sm: "50%",
    },

    transform: {
      xs: "none",
      sm: "translate(-50%, -50%)",
    },

    width: {
      xs: "100%",
      sm: "95%",
      md: fullWidth ? "90%" : `${maxWidth}px`,
    },
    maxWidth: maxWidth,

    background: "linear-gradient(135deg,#F5F3FF 0%,#EEF2FF 50%,#E0EAFF 100%)",

    borderRadius: {
      xs: 0,
      sm: "16px",
      md: "24px",
    },

    border: "1px solid #E2E8F0",

    boxShadow: "0 25px 80px rgba(15,23,42,0.25)",
    height: {
      xs: "100vh",
      sm: "auto",
    },

    maxHeight: {
      xs: "100vh",
      sm: "90vh",
    },
    display: "flex",
    flexDirection: "column",

    overflow: "hidden",

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
            px: {
              xs: 2,
              sm: 3,
              md: 4,
            },

            py: {
              xs: 2,
              sm: 2.5,
              md: 3,
            },
            background:
              "linear-gradient(90deg,#1E3A8A 0%,#2563EB 50%,#7C3AED 100%)",
            color: "#fff",
            position: "sticky",
            top: 0,
            zIndex: 10,
            flexShrink: 0,
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: {
                xs: "20px",
                sm: "24px",
                md: "28px",
              },
            }}
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              sx={{
                mt: 0.5,
                opacity: 0.85,
                fontSize: {
                  xs: 12,
                  sm: 13,
                  md: 14,
                },
              }}
            >
              {subtitle}
            </Typography>
          )}

          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: {
                xs: 8,
                md: 16,
              },

              right: {
                xs: 8,
                md: 16,
              },
              padding: {
                xs: "6px",
                md: "8px",
              },

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
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            overflowX: "hidden",
            WebkitOverflowScrolling: "touch",
            overscrollBehavior: "contain",
            px: {
              xs: 2,
              sm: 3,
              md: 4,
            },

            py: {
              xs: 2,
              sm: 3,
              md: 4,
            },
            background: "linear-gradient(180deg,#F8FAFF 0%,#F3F4FF 100%)",
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
              px: {
                xs: 2,
                sm: 3,
                md: 4,
              },

              py: {
                xs: 2,
                md: 2.5,
              },
              borderTop: "1px solid #E2E8F0",
              background: "#FFFFFF",
              flexShrink: 0,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
              justifyContent="flex-end"
              alignItems="stretch"
              sx={{
                width: "100%",
              }}
            >
              {React.Children.map(actions, (action) =>
                React.cloneElement(action, {
                  disabled: loading,
                }),
              )}

              {loading && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: {
                      xs: "100%",
                      sm: "auto",
                    },
                  }}
                >
                  <CircularProgress size={24} />
                </Box>
              )}
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
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
              },
              flex: {
                xs: 1,
                sm: "none",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={onConfirm}
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
              },
              flex: {
                xs: 1,
                sm: "none",
              },
            }}
          >
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
              width: {
                xs: "100%",
                sm: "auto",
              },
              flex: {
                xs: 1,
                sm: "none",
              },
              minWidth: {
                sm: 110,
              },
              borderRadius: "10px",
            }}
          >
            Logout
          </Button>

          <Button
            variant="contained"
            onClick={onContinue}
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
              },
              flex: {
                xs: 1,
                sm: "none",
              },
              minWidth: {
                sm: 170,
              },
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
