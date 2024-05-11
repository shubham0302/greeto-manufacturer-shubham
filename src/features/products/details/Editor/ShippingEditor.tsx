import {
  Box,
  CircularProgress,
  InputAdornment,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Shipping } from "../../../../common";
import SFInput from "../../../../common/components/SFInput";

type Props = {
  shippingDetails: Shipping;
  isFetching: boolean;
  isError: boolean;
  errorMessage: string;
  onChange: (shipping: Shipping) => void;
};

const ShippingEditor: React.FC<Props> = (props) => {
  const { shippingDetails, isFetching, isError, errorMessage, onChange } =
    props;

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
      {isFetching && <CircularProgress />}
      {!isFetching && (
        <>
          {isError && <Typography>{errorMessage}</Typography>}
          {!isError && (
            <ShippingEditorChild
              shippingDetails={shippingDetails}
              onChange={onChange}
            />
          )}
        </>
      )}
    </Box>
  );
};

const ShippingEditorChild: React.FC<
  Pick<Props, "shippingDetails" | "onChange">
> = (props) => {
  const { shippingDetails: pShippingDetails, onChange: pOnChange } = props;
  const [shippingDetails, setShippingDetails] = useState(pShippingDetails);
  useEffect(() => {
    setShippingDetails(pShippingDetails);
  }, [pShippingDetails]);

  useEffect(() => {
    pOnChange(shippingDetails);
  }, [pOnChange, shippingDetails]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value ? Number(e.target.value) : null,
    }));
  }, []);

  return (
    <>
      <SFInput
        label="Product Weight"
        placeholder="Enter product weight here"
        value={shippingDetails?.weight}
        onChange={onChange}
        name="weight"
        type="number"
        InputProps={{
          endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
        }}
      />
      <Typography variant="h4">Dimensions</Typography>
      <Box
        sx={{ width: "100%", display: "flex", alignItems: "center", gap: 4 }}
      >
        <Box sx={{ flex: 1 }}>
          <SFInput
            label="Product Width"
            placeholder="Enter product width here"
            value={shippingDetails?.width}
            onChange={onChange}
            name="width"
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">Cm</InputAdornment>,
            }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <SFInput
            label="Product Height"
            placeholder="Enter product height here"
            value={shippingDetails?.height}
            onChange={onChange}
            name="height"
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">Cm</InputAdornment>,
            }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <SFInput
            label="Product Length"
            placeholder="Enter product length here"
            value={shippingDetails?.length}
            onChange={onChange}
            name="length"
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">Cm</InputAdornment>,
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default ShippingEditor;
