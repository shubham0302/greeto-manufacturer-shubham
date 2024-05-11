import { DeleteOutline, EditOutlined } from "@mui/icons-material";
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
import { FC, useCallback } from "react";
import { useAlert, useToggle } from "../../../../common";
import { Variant } from "../../../../common/types/productTypes";
import VariantDrawer from "./VariantDrawer";
import SFButton from "../../../../common/components/Button";
import { productApiService } from "../../../../infrastructure";

type Props = {
  variant: Variant;
  onChangeVariant: (variant: Variant, index: number) => void;
  onDeleteVariant: (index: number) => void;
  index: number;
};

const VariantRow: FC<Props> = (props) => {
  const { index, onChangeVariant, variant, onDeleteVariant } = props;

  const { open, isOpen, close } = useToggle();
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

  const onSaveVariant = useCallback(
    (variant: Variant) => {
      onChangeVariant(variant, index);
    },
    [index, onChangeVariant]
  );

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
    <>
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
            onSave={onSaveVariant}
            variant={variant}
            idx={index}
          />
        )}
      </Drawer>
      <TableRow>
        <TableCell>#{variant.sku}</TableCell>
        <TableCell>{variant.type.length} Combinations</TableCell>
        <TableCell>₹{variant.price}</TableCell>
        <TableCell>{variant.stock} Units</TableCell>
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

export default VariantRow;
