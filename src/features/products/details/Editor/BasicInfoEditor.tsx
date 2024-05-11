import { Add, DeleteOutline } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useCallback } from "react";
import {
  Product,
  useActiveCategories,
  useActiveRelations,
} from "../../../../common";
import SFTextEditor from "../../../../common/components/CKEditor";
import SFInput from "../../../../common/components/SFInput";
import SFMultipleSelect from "../../../../common/components/SFMultiDropdown";

type Props = {
  product: Product;
  onChangeProduct: (product: Product) => void;
};

const BasicInfoEditor: React.FC<Props> = (props) => {
  const { product, onChangeProduct } = props;

  const { categories } = useActiveCategories();
  const { relations } = useActiveRelations();

  const onChange = useCallback(
    (ind: number, value: string) => {
      onChangeProduct({
        ...product,
        bulletPoints: product.bulletPoints.map((point, i) =>
          i === ind ? value : point
        ),
      });
    },
    [onChangeProduct, product]
  );

  const onRemove = useCallback(
    (ind: number) => {
      onChangeProduct({
        ...product,
        bulletPoints: product.bulletPoints.filter((_, i) => i !== ind),
      });
    },
    [onChangeProduct, product]
  );

  const onAdd = useCallback(() => {
    onChangeProduct({
      ...product,
      bulletPoints: [...product.bulletPoints, ""],
    });
  }, [onChangeProduct, product]);

  const onChangeName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeProduct({
        ...product,
        name: e.target.value,
      });
    },
    [onChangeProduct, product]
  );

  const onChangeDesc = useCallback(
    (description: string) => {
      onChangeProduct({
        ...product,
        description,
      });
    },
    [onChangeProduct, product]
  );

  const onChangeCategories = useCallback(
    (categories: string[]) => {
      onChangeProduct({
        ...product,
        categories,
      });
    },
    [onChangeProduct, product]
  );

  const onChangeRelatives = useCallback(
    (relatives: string[]) => {
      onChangeProduct({
        ...product,
        relatives,
      });
    },
    [onChangeProduct, product]
  );

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        p: 4,
      }}
    >
      <SFInput
        label="Product Name"
        placeholder="Enter product name here"
        value={product.name}
        onChange={onChangeName}
      />
      <SFTextEditor value={product.description} onChange={onChangeDesc} />
      <Box
        sx={{ display: "flex", gap: 2, alignItems: "center", width: "100%" }}
      >
        <Box sx={{ flex: 1 }}>
          <SFMultipleSelect
            label="Categories"
            options={categories.map((e) => ({ label: e.name, value: e._id }))}
            setValue={onChangeCategories}
            value={product.categories}
            fullWidth
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <SFMultipleSelect
            label="For"
            options={relations.map((e) => ({ label: e.name, value: e._id }))}
            setValue={onChangeRelatives}
            value={product.relatives}
            fullWidth
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="labelXxl">Bullet Points</Typography>
        <Button startIcon={<Add />} variant="text" onClick={onAdd}>
          Add
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {product.bulletPoints.map((point, key) => (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              gap: 2,
            }}
            key={key}
          >
            <SFInput
              placeholder="Enter points here"
              sx={{
                flex: 1,
              }}
              value={point}
              onChange={(e) => onChange(key, e.target.value)}
            />
            <IconButton onClick={() => onRemove(key)}>
              <DeleteOutline color="primary" />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BasicInfoEditor;
