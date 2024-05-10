import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import FieldButton from "../../CommonComponent/FieldButton";

const Shipping = ({ nextValue }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSave = () => {
    setOpenSnackbar(true);
    setSnackbarMessage("Save Information");
    nextValue();
  };

  return (
    <Box>
      <Box
        sx={{
          bgcolor: "white",
          padding: "30px",
          borderRadius: "5px",
        }}
        boxShadow={"0px 0px 100px #00000014"}
      >
        <Typography fontSize={"25px"} marginBottom={"20px"} fontWeight={600}>
          Shipping
        </Typography>
        <Typography sx={{ fontSize: "15px", color: "#707888" }}>
          Weight
        </Typography>
        <TextField
          size="small"
          id="outlined-basic"
          placeholder="Product weight"
          variant="outlined"
          sx={{ mt: "2px", width: "48%" }}
        />
        <FormHelperText>Set a product weight in kilograms (kg).</FormHelperText>
        <Box
          sx={{ bgcolor: "white", mt: "20px", display: "flex", gap: "20px" }}
        >
          <Box>
            <Typography sx={{ fontSize: "15px", color: "#707888" }}>
              Dimension
            </Typography>
            <TextField
              size="small"
              id="outlined-basic"
              placeholder="Width (W)"
              variant="outlined"
              sx={{ mt: "2px" }}
            />
          </Box>
          <Box>
            <Typography sx={{ fontSize: "15px", color: "#707888" }}>
              Hight
            </Typography>
            <TextField
              size="small"
              id="outlined-basic"
              placeholder="Hight (H)"
              variant="outlined"
              sx={{ mt: "2px" }}
            />
          </Box>
          <Box>
            <Typography sx={{ fontSize: "15px", color: "#707888" }}>
              Length
            </Typography>
            <TextField
              size="small"
              id="outlined-basic"
              placeholder="Length (L)"
              variant="outlined"
              sx={{ mt: "2px" }}
            />
          </Box>
        </Box>
        <FormHelperText>
          Enter the product dimensions in centimeters (cm).
        </FormHelperText>
        <Box sx={{ display: "flex", justifyContent: "end", padding: "10px" }}>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={() => setOpenSnackbar(false)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "middle",
            }}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={() => setOpenSnackbar(false)}
              severity="success"
              sx={{ bgcolor: "black", color: "white" }}
            >
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>

          <FieldButton onClick={handleSave} title={"Save"} />
        </Box>
      </Box>
    </Box>
  );
};

export default Shipping;
