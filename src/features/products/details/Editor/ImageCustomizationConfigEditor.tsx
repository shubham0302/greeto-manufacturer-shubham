import { Box } from "@mui/material";
import React, { useCallback } from "react";
import {
  CustomizationConfig,
  ImageCustomizationConfig,
} from "../../../../common";
import SFInput from "../../../../common/components/SFInput";

type Props = {
  customization: ImageCustomizationConfig;
  onChange: (config: CustomizationConfig) => void;
};

const ImageCustomizationConfigEditor: React.FC<Props> = (props) => {
  const { customization, onChange } = props;

  const onChangeNumberInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        ...customization,
        [e.target.name]: e.target.value ? Number(e.target.value) : null,
      });
    },
    [customization, onChange]
  );

  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}
    >
      <SFInput
        value={customization.noOfImages}
        onChange={onChangeNumberInput}
        name="noOfImages"
        label="No. of Images"
        placeholder="eg. 1"
        type="number"
      />
    </Box>
  );
};

export default ImageCustomizationConfigEditor;
