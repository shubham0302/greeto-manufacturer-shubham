import React, { useState } from "react";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  TextField,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlineButton from "../CommonComponent/OutlineButton";
import FieldButton from "../CommonComponent/FieldButton";

const Dialogbox = ({
  handleClose,
  formData,
  handleChange,
  handleAddCategory,
  deleteOpen,
  handleCloseDeleteDialog,
  handleConfirmDelete,
  open,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAddCategoryWithSnackbar = () => {
    handleAddCategory();
    setSnackbarOpen(true);
  };

  return (
      <Dialog open={open} onClose={handleClose} sx={{minwidth:"50vw"}}>
        <DialogTitle> Add Category</DialogTitle>
        <Button
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "black",
          }}
        >
          <CloseIcon />
        </Button>
        <form>
          <DialogContent dividers>
            <Box
              sx={{ width: "100%" }}
              noValidate
              autoComplete="off"
            />
            <TextField
              size="small"
              id="name"
              name="name"
              label="Name"
              type="text"
              autoComplete="current-password"
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                bgcolor: "white",
                color: "black",
                border: "1px solid #222831",
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              sx={{
                bgcolor: "#222831",
                color: "white",
                "&:hover": { bgcolor: "#222831", color: "white" },
              }}
              onClick={handleAddCategoryWithSnackbar}
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      // <Snackbar
      //   open={snackbarOpen}
      //   autoHideDuration={3000}
      //   onClose={handleSnackbarClose}
      //   message="Category added successfully!"
      //   anchorOrigin={{ vertical: "top", horizontal: "center" }}
      // />
      // <Dialog open={deleteOpen} onClose={handleCloseDeleteDialog}>
      //   <DialogTitle> Delete Category</DialogTitle>
      //   <Button
      //     aria-label="close"
      //     onClick={handleClose}
      //     sx={{
      //       position: "absolute",
      //       right: 8,
      //       top: 8,
      //       color: "black",
      //     }}
      //   >
      //     <CloseIcon />
      //   </Button>
      //   <DialogContent>
      //     <DialogContentText>
      //       Are you sure you want to delete the category?
      //     </DialogContentText>
      //   </DialogContent>
      //   <DialogActions>
      //     <OutlineButton onClick={handleCloseDeleteDialog} title={"cancel"} />
      //     <FieldButton title={"Delete"} onClick={handleConfirmDelete} />
      //   </DialogActions>
      // </Dialog>
  );
};

export default Dialogbox;
