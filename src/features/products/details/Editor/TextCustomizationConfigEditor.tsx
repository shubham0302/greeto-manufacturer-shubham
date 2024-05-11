import React, { useCallback } from "react";
import {
  CustomizationConfig,
  TextCustomizationConfig,
} from "../../../../common";
import { Box, Typography } from "@mui/material";
import SFInput from "../../../../common/components/SFInput";

type Props = {
  customization: TextCustomizationConfig;
  onChange: (config: CustomizationConfig) => void;
};

const TextCustomizationConfigEditor: React.FC<Props> = (props) => {
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
  const onChangeStringInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ ...customization, [e.target.name]: e.target.value });
    },
    [customization, onChange]
  );

  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}
    >
      <SFInput
        value={customization.sample}
        onChange={onChangeStringInput}
        name="sample"
        label="Sample"
        placeholder="eg. Name of a person"
      />
      <SFInput
        value={customization.noOfLine}
        onChange={onChangeNumberInput}
        name="noOfLine"
        label="No. of Lines"
        placeholder="eg. 1"
        type="number"
      />
      <Typography>Character Limit</Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <SFInput
          value={customization.minCharLimit}
          onChange={onChangeNumberInput}
          name="minCharLimit"
          label="Min"
          placeholder="eg. 1"
          type="number"
        />
        <SFInput
          value={customization.maxCharLimit}
          onChange={onChangeNumberInput}
          name="maxCharLimit"
          label="Max"
          placeholder="eg. 10"
          type="number"
        />
      </Box>
    </Box>
  );
};

export default TextCustomizationConfigEditor;
