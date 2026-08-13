import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import { useToast } from "../../context/ToastContext";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  uploadSignature,
  uploadSeal,
  getStampInfo,
  getSignaturePreviewUrl,
  getSealPreviewUrl,
} from "../../services/companyProfile";

const CompanyProfile = () => {
  const [signature, setSignature] = useState(null);
  const [seal, setSeal] = useState(null);
  const { showToast } = useToast();

  const [signaturePreview, setSignaturePreview] = useState("");
  const [sealPreview, setSealPreview] = useState("");

  useEffect(() => {
    loadCompanyProfile();
  }, []);

  const loadCompanyProfile = async () => {
    try {
      const response = await getStampInfo();

      console.log("Stamp Info Response:", response);
      console.log("Stamp Info Data:", response.data);

      console.log("Signature Preview URL:", getSignaturePreviewUrl());
      console.log("Seal Preview URL:", getSealPreviewUrl());

      setSignaturePreview(getSignaturePreviewUrl());
      setSealPreview(getSealPreviewUrl());
    } catch (error) {
      console.error("Stamp Info Error:", error);
      console.error("Status:", error.response?.status);
      console.error("Data:", error.response?.data);
    }
  };

  const handleSignatureChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // File type validation
    if (!["image/png", "image/jpeg"].includes(file.type)) {
      showToast("error", "Invalid File", "Please upload a PNG or JPG image.");
      return;
    }

    // File size validation
    if (file.size > 2 * 1024 * 1024) {
      showToast("error", "File Too Large", "File size must be less than 2 MB.");
      return;
    }

    setSignature(file);
    setSignaturePreview(URL.createObjectURL(file));
  };

  const handleSealChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // File type validation
    if (!["image/png", "image/jpeg"].includes(file.type)) {
      showToast("error", "Invalid File", "Please upload a PNG or JPG image.");
      return;
    }

    // File size validation
    if (file.size > 2 * 1024 * 1024) {
      showToast("error", "File Too Large", "File size must be less than 2 MB.");
      return;
    }

    setSeal(file);
    setSealPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      if (signature) {
        const signatureFormData = new FormData();
        signatureFormData.append("file", signature);

        await uploadSignature(signatureFormData);
      }

      if (seal) {
        const sealFormData = new FormData();
        sealFormData.append("file", seal);

        await uploadSeal(sealFormData);
      }

      await getStampInfo();

      setSignaturePreview(getSignaturePreviewUrl());
      setSealPreview(getSealPreviewUrl());

      showToast("success", "Success", "Company profile updated successfully.");
    } catch (error) {
      console.error(error);

      showToast("error", "Error", "Failed to upload Signature/Seal.");
    }
  };
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        bgcolor: "#24195C",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: "#FFFFFF",
          fontWeight: 700,
          mb: 1,
        }}
      >
        Company Profile
      </Typography>

      <Typography
        sx={{
          color: "#D6D6F5",
          fontSize: "15px",
          fontWeight: 400,
          mb: 4,
        }}
      >
        Signature and seal used on generated documents.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr",
          },
          gap: 3,
        }}
      >
        {/* Signature */}

        <Paper
          sx={{
            p: 3,
            bgcolor: "#32247A",
            borderRadius: 3,
          }}
        >
          <Typography
            sx={{
              color: "#FFFFFF !important",
              fontWeight: 600,
              fontSize: "20px",
              mb: 2,
            }}
          >
            Authorized Signature
          </Typography>

          <Box
            sx={{
              position: "relative",
              height: 180,
              bgcolor: "#fff",
              borderRadius: 2,
              border: "2px dashed #CFCFCF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            {signaturePreview ? (
              <img
                src={signaturePreview}
                alt="Signature"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <Box
                sx={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  px: 2,
                }}
              >
                <UploadRoundedIcon
                  sx={{
                    fontSize: 40,
                    color: "#6C63FF",
                  }}
                />

                <Typography
                  sx={{
                    mt: 1,
                    fontWeight: 600,
                    color: "#333",
                    fontSize: 15,
                  }}
                >
                  Click to upload signature
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    color: "#888",
                    mt: 0.5,
                  }}
                >
                  PNG or JPG, up to 2 MB
                </Typography>
              </Box>
            )}
            {signaturePreview && (
              <IconButton
                size="small"
                onClick={() => {
                  setSignature(null);
                  setSignaturePreview("");
                }}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  bgcolor: "#FFFFFF",
                  color: "#EF4444",
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  "&:hover": {
                    bgcolor: "#F8FAFC",
                  },
                }}
              >
                <CloseRoundedIcon fontSize="small" />
              </IconButton>
            )}
          </Box>

          <Button
            component="label"
            fullWidth
            sx={{
              mt: 2,
              border: "1px solid #6C63FF",
              color: "#fff",
            }}
          >
            {signaturePreview ? "Replace" : "Upload"}

            <input
              hidden
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={handleSignatureChange}
            />
          </Button>
        </Paper>

        {/* Company Seal */}

        <Paper
          sx={{
            p: 3,
            bgcolor: "#32247A",
            borderRadius: 3,
          }}
        >
          <Typography
            sx={{
              color: "#FFFFFF !important",
              fontWeight: 600,
              fontSize: "20px",
              mb: 2,
            }}
          >
            Company Seal
          </Typography>

          <Box
            sx={{
              position: "relative",
              height: 180,
              bgcolor: "#fff",
              borderRadius: 2,
              border: "2px dashed #CFCFCF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            {sealPreview ? (
              <img
                src={sealPreview}
                alt="Seal"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <Box
                sx={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  px: 2,
                }}
              >
                <UploadRoundedIcon
                  sx={{
                    fontSize: 40,
                    color: "#6C63FF",
                  }}
                />

                <Typography
                  sx={{
                    mt: 1,
                    fontWeight: 600,
                    color: "#333",
                    fontSize: 15,
                  }}
                >
                  Click to upload company seal
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    color: "#888",
                    mt: 0.5,
                  }}
                >
                  PNG or JPG, up to 2 MB
                </Typography>
              </Box>
            )}
            {sealPreview && (
              <IconButton
                size="small"
                onClick={() => {
                  setSeal(null);
                  setSealPreview("");
                }}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  bgcolor: "#FFFFFF",
                  color: "#EF4444",
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  "&:hover": {
                    bgcolor: "#F8FAFC",
                  },
                }}
              >
                <CloseRoundedIcon fontSize="small" />
              </IconButton>
            )}
          </Box>

          <Button
            component="label"
            fullWidth
            sx={{
              mt: 2,
              border: "1px solid #6C63FF",
              color: "#fff",
            }}
          >
            {sealPreview ? "Replace" : "Upload"}

            <input
              hidden
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={handleSealChange}
            />
          </Button>
        </Paper>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 4,
        }}
      >
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!signature && !seal}
          sx={{
            px: 4,
            py: 1.3,
            borderRadius: 2,
            textTransform: "none",
            background: "linear-gradient(135deg,#6C63FF,#4F46E5)",
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Paper>
  );
};

export default CompanyProfile;
