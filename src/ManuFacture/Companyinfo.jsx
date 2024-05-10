import {
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";

const Companyinfo = () => {
  const [image, setImage] = useState(null);
  const [gstImage, setGstImage] = useState(null);
  const [incorporationImage, setIncorporationImage] = useState(null);

  const handleCancelUpload = () => {
    setImage(null);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(null);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleGstImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setGstImage(null);
      setGstImage(URL.createObjectURL(file));
    }
  };

  const handleIncorporationImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIncorporationImage(null);
      setIncorporationImage(URL.createObjectURL(file));
    }
  };

  const defaultImage = "./image/Icon.png";

  return (
    <>
      <Box>
        <Box sx={{ boxShadow: "0px 0px 10px #00000020", mt: "20px" }}>
          <Box sx={{ p: "40px" }} bgcolor={"white"} borderRadius={"8px"}>
            <Typography mb={"20px"} fontSize={"20px"} fontWeight={600}>
              Company Information
            </Typography>
            <Box>
              <Typography sx={{ color: "#707888" }}>Name of Company</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Name of Company"
                variant="outlined"
                required
              />
            </Box>
            <FormControl
              sx={{
                borderRadius: "4px",
                minWidth: "100%",
                mt: "15px",
              }}
            >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size="small"
                defaultValue={"-"}
                displayEmpty
                required
              >
                <MenuItem value="-" disabled sx={{ color: "gray" }}>
                  legal structure
                </MenuItem>
                <MenuItem value={"Properterlip"}>Properiterlip</MenuItem>
                <MenuItem value={"LLP"}>LLP</MenuItem>
                <MenuItem value={"pvt.ltd"}>pvt.ltd</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ mt: "15px" }}>
              <Typography sx={{ color: "#707888" }}>
                Business address
              </Typography>
              <TextField
                fullWidth
                required
                multiline
                rows={4}
                maxRows={4}
                size="small"
                placeholder="Business address"
                variant="outlined"
              />
            </Box>
            <Box sx={{ mt: "15px" }}>
              <Typography sx={{ color: "#707888" }}>GST NO.</Typography>
              <TextField
                fullWidth
                required
                size="small"
                placeholder="GST NO."
                variant="outlined"
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ my: "20px", width: "50%" }}>
                <Typography
                  sx={{ fontSize: "15px", mt: "2px", color: "#707888" }}
                >
                  GST Certificate
                </Typography>
                <Box
                  sx={{
                    border: "1px solid lightgray",
                    width: "80%",
                    height: "100%",
                    borderRadius: "10px",
                    position: "relative",
                  }}
                >
                  {gstImage && (
                    <ClearIcon
                      sx={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        cursor: "pointer",
                        color: "white",
                      }}
                      onClick={() => {
                        setGstImage(null);
                      }}
                    />
                  )}
                  <label htmlFor={`upload-image-2`}>
                    <input
                      type="file"
                      id={`upload-image-2`}
                      accept="image/*"
                      onChange={handleGstImageUpload}
                      style={{ display: "none" }}
                    />
                    <img
                      src={gstImage ? gstImage : defaultImage}
                      alt="image"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                        aspectRatio: "16/9",
                      }}
                    />
                  </label>
                </Box>
              </Box>
              <Box sx={{ my: "20px", width: "50%" }}>
                <Typography
                  sx={{ fontSize: "15px", mt: "2px", color: "#707888" }}
                >
                  Upload Incorporation Certificate
                </Typography>
                <Box
                  sx={{
                    border: "1px solid lightgray",
                    width: "80%",
                    height: "100%",
                    borderRadius: "10px",
                    position: "relative",
                  }}
                >
                  {incorporationImage && (
                    <ClearIcon
                      sx={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        cursor: "pointer",
                        color: "white",
                      }}
                      onClick={() => {
                        setIncorporationImage(null);
                      }}
                    />
                  )}
                  <label htmlFor={`upload-incorporation-image`}>
                    <input
                      type="file"
                      id={`upload-incorporation-image`}
                      accept="image/*"
                      onChange={handleIncorporationImageUpload}
                      style={{ display: "none" }}
                    />
                    <img
                      src={
                        incorporationImage ? incorporationImage : defaultImage
                      }
                      alt="image"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                        aspectRatio: "16/9",
                      }}
                    />
                  </label>
                </Box>
              </Box>
            </Box>

            <Box sx={{ mt: "15px" }}>
              <Typography sx={{ color: "#707888" }}>
                Social media Link
              </Typography>
              <TextField
                required
                fullWidth
                size="small"
                placeholder="Social media Link"
                variant="outlined"
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "600px",
            height: "547px",
            mt: "25px",
            boxShadow: "0px 0px 10px #00000020",
          }}
        >
          <Box
            sx={{ p: "40px", boxShadow: "0px 12px 32px 0x #1D20261A" }}
            bgcolor={"white"}
            borderRadius={"8px"}
          >
            <Typography pt={"2px"} fontSize={"20px"} fontWeight={700}>
              Financial Information
            </Typography>
            <Box mt="15px">
              <Typography sx={{ color: "#707888" }}> Branch Name</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Branch Name"
                variant="outlined"
              />
            </Box>
            <Box mt="15px">
              <Typography sx={{ color: "#707888" }}>Name of Account</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Name of Account"
                variant="outlined"
              />
            </Box>
            <Box mt="15px">
              <Typography sx={{ color: "#707888" }}> Account No.</Typography>
              <TextField
                type="number"
                fullWidth
                size="small"
                placeholder="Account No."
                variant="outlined"
              />
            </Box>
            <Box sx={{ mt: "15px" }}>
              <Typography sx={{ color: "#707888" }}>
                Upload/Cancel Check
              </Typography>
              <Box
                sx={{
                  bgcolor: "white",
                  height: "130px",
                  border: "1px solid lightgray",
                  borderRadius: "5px",
                  display: "flex",
                  gap: "25px",
                  mt: "10px",
                }}
              >
                <Box
                  sx={{ position: "relative", height: "100%", width: "60%" }}
                >
                  <input
                    accept=".jpg,.jpeg,.png"
                    style={{ display: "none" }}
                    id="upload-image"
                    type="file"
                    onChange={handleImageUpload}
                  />
                  {image && (
                    <ClearIcon
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        cursor: "pointer",
                        zIndex: 1,
                      }}
                      onClick={() => {
                        setImage(null);
                      }}
                    />
                  )}
                  <label htmlFor="upload-image">
                    <img
                      src={image ? image : defaultImage}
                      alt="Course Thumbnail"
                      style={{
                        objectFit: "contain",
                        height: "100%",
                        width: "100%",
                        cursor: "pointer",
                      }}
                    />
                  </label>
                </Box>

                <Box sx={{ width: "100%", mt: "10px" }}>
                  <Typography sx={{ fontSize: "13px" }}>
                    Upload Your course Thumbnail here.
                    <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>
                      Important guidelines:
                    </Typography>
                    1200 * 800 pixels or 12:8 Ratio. Supported format:
                    <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>
                      .jpg, .jpeg, or .png
                    </Typography>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Companyinfo;
