import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Checkbox,
  Button,
  Snackbar,
} from "@mui/material";
import FieldButton from "../CommonComponent/FieldButton";
const OwnerandContactinfo = () => {
  const [contactInfo, setContactInfo] = useState({
    contactName: "",
    contactMobile: "",
    contactEmail: "",
  });
  const [autoFillChecked, setAutoFillChecked] = useState(false);
  const [contactGreetoInfo, setContactGreetoInfo] = useState({
    contactName: "",
    contactMobile: "",
    contactEmail: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (autoFillChecked) {
      setContactGreetoInfo((prevGreetoInfo) => ({
        ...prevGreetoInfo,
        [name]: value,
      }));
    }
  };
  const handleAutoFillCheck = (e) => {
    setAutoFillChecked(e.target.checked);
    if (!e.target.checked) {
      setContactGreetoInfo({
        contactName: "",
        contactMobile: "",
        contactEmail: "",
      });
    } else {
      setContactGreetoInfo(contactInfo);
    }
  };
  const handleGreetoInfoChange = (e) => {
    const { name, value } = e.target;
    setContactGreetoInfo((prevGreetoInfo) => ({
      ...prevGreetoInfo,
      [name]: value,
    }));
  };
  const handleSave = () => {
    setSnackbarMessage("Saved successfully!");
    setSnackbarOpen(true);
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  return (
    <>
      <Box>
        <Box sx={{ boxShadow: "0px 0px 10px #00000020", mt: "20px" }}>
          <Box sx={{ p: "40px" }} bgcolor={"white"} borderRadius={"8px"}>
            <Typography pt={"2px"} fontSize={"20px"} fontWeight={700}>
              Owner and Contact Person Information
            </Typography>
            <Typography sx={{ pt: "10px", fontWeight: 560, fontSize: "20px" }}>
              Owner Information
            </Typography>
            <Box>
              <Box mt="15px">
                <Typography sx={{ color: "#707888" }}>Name</Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Name"
                  variant="outlined"
                />
              </Box>
              <Box mt="15px">
                <Typography sx={{ color: "#707888" }}>Mobile No.</Typography>
                <TextField
                  type="number"
                  fullWidth
                  size="small"
                  placeholder="Mobile No."
                  variant="outlined"
                />
              </Box>
              <Box mt="15px">
                <Typography sx={{ color: "#707888" }}>Email</Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Email"
                  variant="outlined"
                />
              </Box>
            </Box>
            <Typography sx={{ pt: "40px", fontWeight: 560, fontSize: "20px" }}>
              Contact Information
            </Typography>
            <Box>
              <Box mt="15px">
                <Typography sx={{ color: "#707888" }}>Name</Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Name"
                  variant="outlined"
                  name="contactName"
                  value={contactInfo.contactName}
                  onChange={handleContactInfoChange}
                />
              </Box>
              <Box mt="15px">
                <Typography sx={{ color: "#707888" }}>Mobile No.</Typography>
                <TextField
                  type="number"
                  fullWidth
                  size="small"
                  placeholder="Mobile No."
                  variant="outlined"
                  name="contactMobile"
                  value={contactInfo.contactMobile}
                  onChange={handleContactInfoChange}
                />
              </Box>
              <Box mt="15px">
                <Typography sx={{ color: "#707888" }}>Email</Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Email"
                  variant="outlined"
                  name="contactEmail"
                  value={contactInfo.contactEmail}
                  onChange={handleContactInfoChange}
                />
              </Box>
            </Box>
            <Box mt={"30px"} display="flex" alignItems="center">
              <Checkbox
                checked={autoFillChecked}
                onChange={handleAutoFillCheck}
              />
              <Typography>Same as contact</Typography>
            </Box>
            <Typography sx={{ fontWeight: 560, mt: "30px", fontSize: "20px" }}>
              Contact Greeto Information
            </Typography>
            <Box>
              <Box mt="15px">
                <Typography sx={{ color: "#707888" }}>Name</Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Name"
                  variant="outlined"
                  name="contactName"
                  value={contactGreetoInfo.contactName}
                  onChange={handleGreetoInfoChange}
                  disabled={autoFillChecked}
                />
              </Box>
              <Box mt="15px">
                <Typography sx={{ color: "#707888" }}>Mobile No.</Typography>
                <TextField
                  type="number"
                  fullWidth
                  size="small"
                  placeholder="Mobile No."
                  variant="outlined"
                  name="contactMobile"
                  value={contactGreetoInfo.contactMobile}
                  onChange={handleGreetoInfoChange}
                  disabled={autoFillChecked}
                />
              </Box>
              <Box mt="15px">
                <Typography sx={{ color: "#707888" }}>Email</Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Email"
                  variant="outlined"
                  name="contactEmail"
                  value={contactGreetoInfo.contactEmail}
                  onChange={handleGreetoInfoChange}
                  disabled={autoFillChecked}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "600px",
            display: "flex",
            justifyContent: "end",
            mt: "5px",
          }}
        >
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
            anchorOrigin={{ vertical: "top", horizontal: "middle" }}
          />
          <Box sx={{ mt: "25px"}}>
            <FieldButton title={"submit"} onClick={handleSave} />
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default OwnerandContactinfo;
