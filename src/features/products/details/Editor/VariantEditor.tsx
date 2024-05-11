import { Add } from "@mui/icons-material";
import { Box, CircularProgress, Drawer } from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import SFButton from "../../../../common/components/Button";
import TableComp, { HeadData } from "../../../../common/components/TableComp";
import { Variant } from "../../../../common/types/productTypes";
import VariantRow from "./VariantRow";
import VariantDrawer from "./VariantDrawer";
import { getDefaultVariant, useToggle } from "../../../../common";
import { useFetchVariantList } from "../../hooks";

const headData: HeadData[] = [
  {
    label: "SKU",
  },
  {
    label: "Combinations",
  },
  {
    label: "Price",
  },
  {
    label: "Stock",
  },
  {
    label: "Action",
  },
];

type Props = {
  productId: string;
};

const VariantEditor: FC<Props> = (props) => {
  const { productId } = props;

  const { data, isFetching } = useFetchVariantList(productId);

  const [variants, setVariants] = useState<Variant[]>(data);

  useEffect(() => {
    setVariants(data);
  }, [data]);

  const onChangeVariant = useCallback((variant: Variant, idx: number) => {
    setVariants((prev) => prev.map((e, i) => (i === idx ? variant : e)));
  }, []);

  const onDeleteVariant = useCallback((idx: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const onAddVariant = useCallback((variant: Variant) => {
    setVariants((prev) => [...prev, variant]);
  }, []);

  const { isOpen, open, close } = useToggle();

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
      <Drawer open={isOpen} anchor="right" onClose={close}>
        {isOpen && (
          <VariantDrawer
            onClose={close}
            onSave={onAddVariant}
            variant={getDefaultVariant(productId)}
            idx={variants.length}
            isCreate
          />
        )}
      </Drawer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <SFButton startIcon={<Add />} onClick={open}>
          Add Variant
        </SFButton>
      </Box>
      {isFetching && <CircularProgress />}
      {!isFetching && (
        <TableComp
          headData={headData}
          body={variants.map((variant, idx) => (
            <VariantRow
              index={idx}
              onChangeVariant={onChangeVariant}
              onDeleteVariant={onDeleteVariant}
              variant={variant}
              key={idx}
            />
          ))}
          isSticky
          maxHeight="400px"
        />
      )}
    </Box>
  );
};

export default VariantEditor;
