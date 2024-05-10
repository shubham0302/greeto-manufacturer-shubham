import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import FieldButton from "../../CommonComponent/FieldButton";
import { Grid } from "@mui/material";

const CustomText = ({ setVisible }) => {
  const [textFieldVisible, setTextFieldVisible] = useState(true);

  const handleDelete = () => {
    setTextFieldVisible(false);
    setVisible(false);
  };

  return (
    <Box
      sx={{
        mt: "20px",
        display: textFieldVisible ? "block" : "none",
        bgcolor: "#9DBEE250",
        padding: "20px",
        borderRadius: "20px",
      }}
    >
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: 550,
          mt: "20px",
        }}
      >
        Customize Text
      </Typography>

      <Box sx={{ mt: "20px" }}>
        <Grid container>
          <Grid xs={4} spacing={2}>
            <Typography>Number of line</Typography>
            <TextField
              fullWidth
              id="outlined-basic"
              placeholder="1"
              size="small"
              variant="outlined"
              required
              sx={{ bgcolor: "white" }}
            />
          </Grid>
          <Grid xs={8}>
            <Typography>Character limit</Typography>
            <Box sx={{ display: "flex" }}>
              <TextField
                fullWidth
                size="small"
                id="outlined-basic"
                variant="outlined"
                type="number"
                placeholder="1"
                required
                sx={{ bgcolor: "white" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography variant="body2" color="#00000060">
                        Min
                      </Typography>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                size="small"
                id="outlined-basic"
                type="number"
                variant="outlined"
                placeholder="100"
                required
                sx={{ bgcolor: "white" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography variant="body2" color="#00000060">
                        Max
                      </Typography>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: "20px" }}>
        <Grid container>
          <Grid xs={6}>
            <Typography>Label</Typography>
            <TextField
              fullWidth
              id="outlined-basic"
              size="small"
              variant="outlined"
              placeholder="Customise your Name"
              required
              sx={{ bgcolor: "white" }}
            />
          </Grid>
          <Grid xs={6}>
            <Typography>Sample</Typography>
            <TextField
              fullWidth
              size="small"
              id="outlined-basic"
              placeholder="Meet"
              variant="outlined"
              required
              sx={{ bgcolor: "white" }}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: "15px" }}>
        <Typography
          sx={{
            fontSize: "15px",
            mt: "2px",
            color: "#707888",
          }}
        >
          Description
        </Typography>
        <textarea
          rows={3}
          width="100%"
          cols={75}
          className="border border-gray-300 w-[100%] rounded p-2"
          placeholder="Description"
          sx={{ mt: "2px" }}
          required
        />
        <Box sx={{ display: "flex", justifyContent: "end", mt: "20px" }}>
          <FieldButton
            onClick={handleDelete}
            title={"Delete"}
            icon={<Delete />}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CustomText;
