import { AddToPhotos, DeleteOutline } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useMemo } from "react";
import {
  CustomizationConfig,
  DropDownCustomizationConfig,
  DropDownCustomizationConfigItem,
} from "../../../../common";
import SFButton from "../../../../common/components/Button";
import MediaUploader from "../../../../common/components/MediaUploader";
import TableComp, { HeadData } from "../../../../common/components/TableComp";

type Props = {
  customization: DropDownCustomizationConfig;
  onChange: (config: CustomizationConfig) => void;
};

const headData: HeadData[] = [
  {
    label: "Sr No.",
  },
  {
    label: "Label",
  },
  {
    label: "Price",
  },
  {
    label: "Photo",
  },
  {
    label: "Actions",
  },
];

const DropdownCustomizationConfigEditor: React.FC<Props> = (props) => {
  const { customization, onChange } = props;

  const { options = [] } = customization;

  const onChangeOptions = useCallback(
    (options: DropDownCustomizationConfigItem[]) => {
      const nConfig = { ...customization, options };
      onChange(nConfig);
    },
    [customization, onChange]
  );

  const onAddOption = useCallback(() => {
    onChangeOptions([
      ...options,
      {
        charmUrl: "",
        label: "",
        price: 0,
      },
    ]);
  }, [onChangeOptions, options]);

  const onChangeOption = useCallback(
    (option: DropDownCustomizationConfigItem, index: number) => {
      onChangeOptions(options.map((e, i) => (i === index ? option : e)));
    },
    [onChangeOptions, options]
  );

  const onDeleteOption = useCallback(
    (index: number) => {
      onChangeOptions(options.filter((_, i) => i !== index));
    },
    [onChangeOptions, options]
  );

  const rows = useMemo(
    () =>
      options.map((opt, i) => {
        const onDelete = () => onDeleteOption(i);
        const onChangeLabel = (e: React.ChangeEvent<HTMLInputElement>) =>
          onChangeOption({ ...opt, label: e.target.value }, i);
        const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) =>
          onChangeOption(
            { ...opt, price: e.target.value ? Number(e.target.value) : null },
            i
          );
        const onUpload = (url: string) =>
          onChangeOption({ ...opt, charmUrl: url }, i);
        const onRemove = () => onChangeOption({ ...opt, charmUrl: "" }, i);

        return (
          <TableRow key={i}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>
              <TextField
                value={opt.label}
                onChange={onChangeLabel}
                placeholder="eg. book"
              />
            </TableCell>
            <TableCell>
              <TextField
                value={opt.price}
                onChange={onChangePrice}
                placeholder="eg. 100"
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">₹</InputAdornment>
                  ),
                }}
              />
            </TableCell>
            <TableCell>
              <MediaUploader
                onRemove={onRemove}
                onUpload={onUpload}
                src={opt.charmUrl}
                type="image"
                height="50px"
                width="50px"
                noImageIcon={AddToPhotos}
              />
            </TableCell>
            <TableCell>
              <IconButton onClick={onDelete}>
                <DeleteOutline />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      }),
    [onChangeOption, onDeleteOption, options]
  );

  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography>Customization Options</Typography>
        <SFButton onClick={onAddOption}>Add Options</SFButton>
      </Box>
      <TableComp body={rows} headData={headData} />
    </Box>
  );
};

export default DropdownCustomizationConfigEditor;
