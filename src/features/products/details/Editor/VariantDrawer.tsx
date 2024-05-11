import {
  Add,
  AddAPhotoOutlined,
  Close,
  DeleteOutline,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { FC, useCallback, useMemo, useState } from "react";
import { useAlert, useToggle } from "../../../../common";
import SFButton from "../../../../common/components/Button";
import MediaUploader from "../../../../common/components/MediaUploader";
import SFDropdownComp from "../../../../common/components/SFDropdown";
import SFInput from "../../../../common/components/SFInput";
import { Variant, VariantType } from "../../../../common/types/productTypes";
import { productApiService } from "../../../../infrastructure";

type Props = {
  isCreate?: boolean;
  variant: Variant;
  onSave: (variant: Variant) => void;
  onClose: () => void;
  idx: number;
};

const varinatTypes: VariantType[] = [
  "color",
  "material",
  "model",
  "noOfItems",
  "size",
  "weight",
];

const variantMap: Record<VariantType, string> = {
  color: "Color",
  material: "Material",
  model: "Model",
  noOfItems: "No. of Items",
  size: "Size",
  weight: "Weight",
};

const variantMapCode: Record<VariantType, string> = {
  color: "CL",
  material: "ML",
  model: "MD",
  noOfItems: "NI",
  size: "SZ",
  weight: "WT",
};

const VariantDrawer: FC<Props> = (props) => {
  const {
    isCreate = false,
    onClose,
    onSave: pOnSave,
    variant: pVariant,
    idx,
  } = props;

  const [variant, setVariant] = useState(pVariant);

  const sku = useMemo(() => {
    const skuType = variant.type.map((e) => variantMapCode[e] || e);
    const skuValue = variant.value.map((e) =>
      e.toUpperCase().replace(/\s/g, "").slice(0, 2)
    );
    const newArr: string[] = [];

    skuType.forEach((e, i) => {
      const nType = e;
      const nVal = skuValue[i];
      const comibination = `${nType}-${nVal}`;
      newArr.push(comibination);
    });

    const sku = `PRODUCT-${idx + 1}-${newArr.join("-")}`;

    return sku;
  }, [idx, variant.type, variant.value]);

  const onChangePrice = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setVariant((prev) => ({
        ...prev,
        price: e.target.value ? Number(e.target.value) : null,
      }));
    },
    []
  );
  const onChangeStock = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setVariant((prev) => ({
        ...prev,
        stock: e.target.value ? Number(e.target.value) : null,
      }));
    },
    []
  );

  const onRemovePhoto = useCallback(() => {
    setVariant((prev) => ({
      ...prev,
      photo: "",
    }));
  }, []);
  const onAddPhoto = useCallback((photo: string) => {
    setVariant((prev) => ({
      ...prev,
      photo,
    }));
  }, []);

  const {
    isOpen: isSaveInProgress,
    open: startProgress,
    close: closeProgress,
  } = useToggle();

  const { error: showError, success: showSuccess } = useAlert();

  const onSave = useCallback(async () => {
    // api call
    try {
      startProgress();
      // api call
      const nVariant = { ...variant, sku };
      if (isCreate) {
        const apiResponse = await productApiService.createVariantDetails(
          nVariant.productId,
          nVariant
        );
        const { data, success } = apiResponse;
        if (success) {
          showSuccess("Variant Saved successfully");
          pOnSave(data);
          onClose();
        } else {
          showError("Error saving variant");
        }
      } else {
        const apiResponse = await productApiService.saveVariantDetails(
          nVariant._id,
          nVariant,
          nVariant.productId
        );
        const { data, success } = apiResponse;
        if (success) {
          showSuccess("Variant Saved successfully");
          pOnSave(data);
          onClose();
        } else {
          showError("Error saving variant");
        }
      }
    } catch (error) {
      showError("Error saving variant");
    } finally {
      closeProgress();
    }
  }, [
    closeProgress,
    isCreate,
    onClose,
    pOnSave,
    showError,
    showSuccess,
    sku,
    startProgress,
    variant,
  ]);

  const onChangeType = useCallback((type: VariantType, i: number) => {
    setVariant((variant) => {
      const nVariant = variant.type.map((e, inx) => (i === inx ? type : e));
      const nVariantVal = variant.value.map((e, inx) => (i === inx ? "" : e));
      return { ...variant, type: nVariant, value: nVariantVal };
    });
  }, []);

  const onChangeValue = useCallback((type: string, i: number) => {
    setVariant((variant) => {
      const nVariantVal = variant.value.map((e, inx) => (i === inx ? type : e));
      return { ...variant, value: nVariantVal };
    });
  }, []);

  const onDeleteValue = useCallback((i: number) => {
    setVariant((variant) => {
      const nVariantVal = variant.value.filter((_, inx) => i !== inx);
      const nVariantType = variant.type.filter((_, inx) => i !== inx);
      return { ...variant, value: nVariantVal, type: nVariantType };
    });
  }, []);

  const onAddValue = useCallback(() => {
    setVariant((variant) => {
      const nVariantVal = [...variant.value, ""];
      const nVariantType: VariantType[] = [...variant.type, "color"];
      return { ...variant, value: nVariantVal, type: nVariantType };
    });
  }, []);

  return (
    <Box
      sx={{
        minWidth: "500px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          p: 2,
          alignItems: "center",
        }}
      >
        <Typography variant="labelXxl">
          {isCreate ? "Create Variant" : "Edit Variant"}
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <Box
        sx={{
          width: "100%",
          flex: 1,
          p: 2,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            width: "100%",
            height: "100%",
            overflowY: "scroll",
            gap: 4,
          }}
        >
          <Typography variant="bodyXxxl">Basic Info</Typography>
          <Box>
            <Typography variant="body2">
              SKU-ID(Generated based on Combinations)
            </Typography>
            <Typography variant="labelXxl">#{sku}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              gap: 4,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <SFInput
                value={variant.price}
                label="Price"
                placeholder="eg. 1000"
                type="number"
                onChange={onChangePrice}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <SFInput
                value={variant.stock}
                label="Stock"
                placeholder="eg. 1000"
                type="number"
                onChange={onChangeStock}
              />
            </Box>
          </Box>

          <Typography variant="bodyXxxl">Photo & Gallery</Typography>
          <MediaUploader
            onRemove={onRemovePhoto}
            onUpload={onAddPhoto}
            src={variant.photo}
            type="image"
            noImageTitle="Add Lead photo"
            noImageDescription="JPG, PNG, JPEG are allowed"
            noImageIcon={AddAPhotoOutlined}
            width="100%"
            height="200px"
          />
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="bodyXxxl">Combinations</Typography>
            <Button startIcon={<Add />} variant="text" onClick={onAddValue}>
              Add
            </Button>
          </Box>
          {!!variant.type.length && (
            <>
              {variant.type.map((type, ind) => (
                <Box
                  key={ind}
                  sx={{
                    width: "100%",
                    gap: 2,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <SFDropdownComp
                    options={varinatTypes.map((e) => (
                      <MenuItem value={e}>{variantMap[e] || e}</MenuItem>
                    ))}
                    value={type}
                    onChange={(ev) => {
                      onChangeType(ev.target.value as VariantType, ind);
                    }}
                    sx={{ flex: 1 }}
                    label="Variant Type"
                  />
                  <SFInput
                    value={variant.value[ind]}
                    type={
                      type === "noOfItems" || type === "size"
                        ? "number"
                        : "text"
                    }
                    onChange={(ev) => onChangeValue(ev.target.value, ind)}
                    label={"Variant"}
                    sx={{ flex: 1 }}
                  />
                  <IconButton onClick={() => onDeleteValue(ind)}>
                    <DeleteOutline />
                  </IconButton>
                </Box>
              ))}
            </>
          )}
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <SFButton onClick={onSave} disabled={isSaveInProgress}>
          Save
        </SFButton>
      </Box>
    </Box>
  );
};

export default VariantDrawer;
