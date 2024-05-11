import {
  DeleteOutline,
  EditOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { Product, useAlert, useToggle } from "../../../common";
import SFButton from "../../../common/components/Button";
import { routeConstants } from "../../../common/router/routeConstants";
import { productApiService } from "../../../infrastructure";
import VariantsListView from "./VariantsListView";

type Props = {
  product: Product;
  onDeleteProduct: (index: number) => void;
  index: number;
};

const ProductTile: React.FC<Props> = (props) => {
  const { product, onDeleteProduct, index } = props;
  const { toggle, isOpen } = useToggle();

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
    const apiResponse = await productApiService.deleteProductDetails(
      product._id
    );
    const { success } = apiResponse;
    if (success) {
      onDeleteProduct(index);
      closeDelete();
      showSuccess("Variant deleted successfully");
    } else {
      showError("Error deleting variant");
    }
    stopProgress();
  }, [
    closeDelete,
    index,
    onDeleteProduct,
    product._id,
    showError,
    showSuccess,
    startProgress,
    stopProgress,
  ]);
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "gray.white",
        borderRadius: 2,
      }}
    >
      <Dialog open={isOpenDelete} onClose={closeDelete} fullWidth>
        <DialogTitle>Delete Variant</DialogTitle>
        <Divider />
        <DialogContent>Are you sure you want to delete Product!?</DialogContent>
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
      <Box
        sx={{
          width: "100%",
          p: 2,
          borderBottom: "1px solid",
          borderBottomColor: "gray.100",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <IconButton onClick={toggle}>
          {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
        <Typography variant="labelXl">{product.name}</Typography>
        <Typography variant="bodyLr">
          <strong>{product.categories?.length}</strong> Categories
        </Typography>
        <Typography>
          <strong>{product.relatives?.length}</strong> tags
        </Typography>
        <Box
          sx={{
            ml: "auto",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Link
            to={`${routeConstants.productDetails.replace(
              ":productId",
              product._id
            )}`}
          >
            <IconButton>
              <EditOutlined />
            </IconButton>
          </Link>
          <IconButton onClick={openDelete}>
            <DeleteOutline />
          </IconButton>
        </Box>
      </Box>
      {isOpen && <VariantsListView productId={product._id} />}
    </Box>
  );
};

export default ProductTile;
