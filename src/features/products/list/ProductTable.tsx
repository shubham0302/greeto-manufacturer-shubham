import { Box } from "@mui/material";
import React, { useCallback, useState } from "react";
import { Product } from "../../../common";
import ProductTile from "./ProductTile";

type Props = {
  products: Product[];
};

const ProductTable: React.FC<Props> = (props) => {
  const { products: pProducts } = props;
  const [products, setProducts] = useState(pProducts);

  const onDelete = useCallback((index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {products.map((product, idx) => (
        <ProductTile
          product={product}
          key={idx}
          onDeleteProduct={onDelete}
          index={idx}
        />
      ))}
    </Box>
  );
};

export default ProductTable;
