import React from "react";
import { useFetchProductList } from "../hooks/useFetchProductList";
import { Box, CircularProgress, Typography } from "@mui/material";
import ProductTable from "./ProductTable";
import MaxWidthWrapper from "../../../common/components/MaxWidthWrapper";

const ProductListPage: React.FC<any> = () => {
  const { data, isError, isFetching, errorMessage } = useFetchProductList();
  return (
    <MaxWidthWrapper>
      <Box sx={{ width: "100%" }}>
        {isFetching && <CircularProgress />}
        {!isFetching && (
          <>
            {isError && (
              <Typography>Error fetching products: {errorMessage}</Typography>
            )}
            {!isError && <ProductTable products={data} />}
          </>
        )}
      </Box>
    </MaxWidthWrapper>
  );
};

export default ProductListPage;
