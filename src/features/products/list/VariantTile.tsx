import { DeleteOutline, EditOutlined, Image } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";
import { Variant, useAlert, useToggle } from "../../../common";
import SFButton from "../../../common/components/Button";
import { productApiService } from "../../../infrastructure";
import VariantDrawer from "../details/Editor/VariantDrawer";
import VariantNotificationTile from "./VariantNotificationTile";

type Props = {
  variant: Variant;
  onVariantSave: (variant: Variant, index: number) => void;
  onDeleteVariant: (index: number) => void;
  index: number;
};

const VariantTile: React.FC<Props> = (props) => {
  const { variant, onVariantSave, index, onDeleteVariant } = props;
  const { isOpen, open, close } = useToggle();
  const onSave = useCallback(
    (variant: Variant) => {
      onVariantSave(variant, index);
    },
    [index, onVariantSave]
  );

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

  const onDelete = useCallback(async () => {
    startProgress();
    const apiResponse = await productApiService.deleteVariantDetails(
      variant._id,
      variant.productId
    );
    const { success } = apiResponse;
    if (success) {
      onDeleteVariant(index);
      closeDelete();
      showSuccess("Variant deleted successfully");
    } else {
      showError("Error deleting variant");
    }
    stopProgress();
  }, [
    closeDelete,
    index,
    onDeleteVariant,
    showError,
    showSuccess,
    startProgress,
    stopProgress,
    variant._id,
    variant.productId,
  ]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Dialog open={isOpenDelete} onClose={closeDelete} fullWidth>
        <DialogTitle>Delete Variant</DialogTitle>
        <Divider />
        <DialogContent>Are you sure you want to delete SKU!?</DialogContent>
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
          <VariantDrawer
            onClose={close}
            onSave={onSave}
            variant={variant}
            idx={index}
          />
        )}
      </Drawer>
      <Box
        sx={{
          width: "80px",
          height: "80px",
          bgcolor: "gray.100",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {variant.photo ? (
          <img
            src={variant.photo}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        ) : (
          <Image />
        )}
      </Box>
      <Typography variant="labelXl">#{variant.sku}</Typography>
      <Typography variant="bodyLr">
        <strong>{variant.type.length}</strong> Combinations
      </Typography>
      <Typography>₹{variant.price}</Typography>
      <Typography>{variant.stock} units</Typography>
      <Box
        sx={{
          ml: "auto",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <VariantNotificationTile variantId={variant._id} />
        <IconButton onClick={open}>
          <EditOutlined />
        </IconButton>
        <IconButton onClick={openDelete}>
          <DeleteOutline />
        </IconButton>
      </Box>
    </Box>
  );
};

export default VariantTile;
