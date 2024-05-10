import React, { useState, useEffect } from "react";
import CustomText from "./Text";
import Customdropdown from "./dropdown";
import Customimage from "./image";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import ImageLogo from "../components/images/Imagelogo.png";
import FontDownloadIcon from "@mui/icons-material/FontDownload";
import { Add, SearchOutlined } from "@mui/icons-material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import FieldButton from "../../CommonComponent/FieldButton";
import OutlineButton from "../../CommonComponent/OutlineButton";

const Customize = ({nextValue}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [imageVisible, setimageVisible] = useState(false);
  const [dropdownVisible, setdropdownVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleTextVisibility = () => {
    setTextVisible(true);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleText = () => {
    setTextVisible(true);
    setOpenDialog(false);
    handleTextVisibility();
  };
  const handleimage = () => {
    setimageVisible(true);
    setOpenDialog(false);
  };
  const handledropdown = () => {
    setdropdownVisible(true);
    setOpenDialog(false);
  };

  const handleSave = () => {
    nextValue();
  };
  return (
    <Box>
      <Box
        bgcolor={"white"}
        borderRadius={"5px"}
        boxShadow={"0px 0px 10px #00000014"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        padding={"30px"}
      >
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box>
            <Typography sx={{ fontSize: "25px", fontWeight: 600 }}>
              Customize
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            my: "20px",
            borderRadius: "10px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <TextField
                sx={{ width: "550px" }}
                size="small"
                label={
                  <Box>
                    <SearchOutlined />
                    Search
                  </Box>
                }
                value={searchTerm}
                onChange={handleSearch}
              />
            </Box>
            <Box>
              <OutlineButton
                icon={<Add />}
                onClick={handleDialogOpen}
                title={"Add coustomize"}
              />
              <FieldButton onClick={handleSave} title={"Save"} />
            </Box>
          </Box>

          <Box sx={{ mb: "10px" }}>
            {textVisible && <CustomText setVisible={setTextVisible} />}
          </Box>
          {imageVisible && <Customimage setVisible={setimageVisible} />}
          {dropdownVisible && (
            <Customdropdown setVisible={setdropdownVisible} />
          )}
        </Box>
      </Box>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle sx={{ width: 400 }}>Add Customisation</DialogTitle>
        <DialogContent></DialogContent>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "center", gap: "20px" }}>
            <Button onClick={handleText}>
              <Box
                sx={{
                  bgcolor: "#BED7DC",
                  height: "150px",
                  width: "150px",
                  borderRadius: "5px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                boxShadow={"10px 12px 12px #1E20261A"}
              >
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    color: "#000000",
                    flexDirection: "column",
                  }}
                >
                  <FontDownloadIcon fontSize="large" />
                  <Typography
                    sx={{ fontSize: "20px", fontWeight: 550, mt: "2px" }}
                  >
                    Text
                  </Typography>
                </Typography>
              </Box>
            </Button>

            <Button onClick={handleimage}>
              <Box
                sx={{
                  bgcolor: "#BED7DC",
                  height: "150px",
                  width: "150px",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
                boxShadow={"0px 12px 32px #1E20261A"}
              >
                <img src={ImageLogo} alt="" className="w-10"></img>
                <Typography
                  sx={{ fontSize: "20px", fontWeight: 550, color: "black" }}
                >
                  Image
                </Typography>
              </Box>
            </Button>

            <Button onClick={handledropdown}>
              <Box
                sx={{
                  bgcolor: "#BED7DC",
                  height: "150px",
                  width: "150px",
                  borderRadius: "5px",
                }}
                boxShadow={"0px 12px 32px #1E20261A"}
              >
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    color: "black",
                    fontSize: "17px",
                    flexDirection: "column",
                    fontWeight: 550,
                  }}
                >
                  <ListAltIcon fontSize="large" />
                  Dropdown
                </Typography>
              </Box>
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} sx={{ color: "black" }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Customize;
