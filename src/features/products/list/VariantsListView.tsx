import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useFetchVariantList } from "../hooks/useFetchVariantList";
import { Variant } from "../../../common";
import VariantTile from "./VariantTile";

type Props = {
  productId: string;
};

const VariantsListView: React.FC<Props> = (props) => {
  const { productId } = props;
  const { data, errorMessage, isFetching, isError } =
    useFetchVariantList(productId);
  return (
    <Box sx={{ width: "100%", p: 2 }}>
      {isFetching && <CircularProgress />}
      {!isFetching && (
        <>
          {isError && (
            <Typography>Error fetching variants: {errorMessage}</Typography>
          )}
          {!isError && <VariantsList variants={data} />}
        </>
      )}
    </Box>
  );
};

type PropsList = {
  variants: Variant[];
};

const VariantsList: React.FC<PropsList> = (props) => {
  const { variants: pVariants } = props;
  const [variants, setVariants] = useState(pVariants);

  const onChangeVariant = useCallback((variant: Variant, idx: number) => {
    setVariants((prev) => prev.map((e, i) => (i === idx ? variant : e)));
  }, []);

  const onDeleteVariant = useCallback((idx: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}
    >
      {variants.map((variant, idx) => (
        <VariantTile
          variant={variant}
          key={idx}
          index={idx}
          onDeleteVariant={onDeleteVariant}
          onVariantSave={onChangeVariant}
        />
      ))}
    </Box>
  );
};

export default VariantsListView;
