import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { useCallback } from "react";
import { CustomizationConfig, useAlert, useToggle } from "../../../../common";
import { productApiService } from "../../../../infrastructure";
import SFButton from "../../../../common/components/Button";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import CustomizationDrawer from "./CustomizationDrawer";

type Props = {
  customization: CustomizationConfig;
  index: number;
  onEdit: (customization: CustomizationConfig, index: number) => void;
  onDelete: (index: number) => void;
};

const CustomizationRow: React.FC<Props> = (props) => {
  const { customization, index, onDelete: pOnDelete, onEdit: pOnEdit } = props;
  const { isOpen, open, close } = useToggle();

  const {
    open: openDelete,
    isOpen: isOpenDelete,
    close: closeDelete,
  } = useToggle();
  const {
    open: startProgress,
    isOpen: isDeleteInProgress,
    close: stopProgress,
  } = useToggle();
  const { success: showSuccess, error: showError } = useAlert();

  const onEdit = useCallback(
    (config: CustomizationConfig) => {
      pOnEdit(config, index);
    },
    [index, pOnEdit]
  );

  const onDelete = useCallback(async () => {
    startProgress();
    const apiResponse = await productApiService.deleteCustomizationDetails(
      customization._id,
      customization.productId
    );
    const { success } = apiResponse;
    if (success) {
      pOnDelete(index);
      closeDelete();
      showSuccess("Customization deleted successfully");
    } else {
      showError("Error deleting customization");
    }
    stopProgress();
  }, [
    closeDelete,
    customization._id,
    customization.productId,
    index,
    pOnDelete,
    showError,
    showSuccess,
    startProgress,
    stopProgress,
  ]);

  return (
    <>
      <Dialog open={isOpenDelete} onClose={closeDelete} fullWidth>
        <DialogTitle>Delete Customization</DialogTitle>
        <Divider />
        <DialogContent>Are you sure you want to delete!?</DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={closeDelete} variant="outlined">
            Cancel
          </Button>
          <SFButton
            startIcon={<DeleteOutline />}
            onClick={onDelete}
            disabled={isDeleteInProgress}
          >
            Delete
          </SFButton>
        </DialogActions>
      </Dialog>
      <Drawer open={isOpen} anchor="right" onClose={close}>
        {isOpen && (
          <CustomizationDrawer
            onClose={close}
            onSave={onEdit}
            customization={customization}
          />
        )}
      </Drawer>

      <TableRow>
        <TableCell>{customization.label}</TableCell>
        <TableCell>{customization.type}</TableCell>
        <TableCell>
          <IconButton onClick={open}>
            <EditOutlined />
          </IconButton>
          <IconButton onClick={openDelete}>
            <DeleteOutline />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CustomizationRow;
