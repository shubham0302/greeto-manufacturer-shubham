import { Close } from "@mui/icons-material";
import {
  Box,
  Divider,
  FormControlLabel,
  IconButton,
  MenuItem,
  Switch,
  Typography,
} from "@mui/material";
import { cloneDeep } from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  CustomizationConfig,
  DropDownCustomizationConfig,
  ImageCustomizationConfig,
  TextCustomizationConfig,
  useAlert,
  useTemplateCustomization,
  useToggle,
} from "../../../../common";
import SFButton from "../../../../common/components/Button";
import SFTextEditor from "../../../../common/components/CKEditor";
import SFDropdownComp from "../../../../common/components/SFDropdown";
import SFInput from "../../../../common/components/SFInput";
import { productApiService } from "../../../../infrastructure";
import DropdownCustomizationConfigEditor from "./DropdownCustomizationConfigEditor";
import ImageCustomizationConfigEditor from "./ImageCustomizationConfigEditor";
import TextCustomizationConfigEditor from "./TextCustomizationConfigEditor";

type Props = {
  isCreate?: boolean;
  customization: CustomizationConfig;
  onSave: (config: CustomizationConfig) => void;
  onClose: () => void;
};

const CustomizationDrawer: React.FC<Props> = (props) => {
  const {
    customization: pCustomization,
    isCreate = false,
    onClose,
    onSave: pOnSave,
  } = props;

  const [customization, setCustomization] = useState(pCustomization);
  const onChange = useCallback((config: CustomizationConfig) => {
    setCustomization(config);
  }, []);

  const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomization((prev) => ({ ...prev, label: e.target.value }));
  }, []);

  const onChangeDesc = useCallback((val: string) => {
    setCustomization((prev) => ({ ...prev, description: val }));
  }, []);

  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const { onAddCustomization, customizations: dTemplates } =
    useTemplateCustomization();

  const templates = useMemo(
    () => dTemplates.filter((e) => e.type === customization.type),
    [customization.type, dTemplates]
  );

  useEffect(() => {
    if (selectedTemplateId) {
      const selectedTemplate = templates.find(
        (e) => e._id === selectedTemplateId
      );
      if (selectedTemplate) {
        setCustomization((customization) => {
          const nTemplate = cloneDeep(selectedTemplate);
          nTemplate._id = customization._id;
          nTemplate.productId = customization.productId;
          nTemplate.isTemplate = false;
          return nTemplate;
        });
      }
    }
  }, [selectedTemplateId, templates]);

  const {
    isOpen: isSaveInProgress,
    open: startProgress,
    close: stopProgress,
  } = useToggle();
  const { success: showSuccess, error: showError } = useAlert();

  const onSave = useCallback(async () => {
    startProgress();
    if (isCreate) {
      const apiResponse = await productApiService.createCustomizationDetails(
        customization.productId,
        customization
      );
      const { data, success } = apiResponse;
      if (success) {
        pOnSave(data);
        if (data.isTemplate) {
          onAddCustomization(data);
        }
        showSuccess("Customization saved successfully");
        onClose();
      } else {
        showError("Error saving customization");
      }
    } else {
      const apiResponse = await productApiService.saveCustomizationDetails(
        customization._id,
        customization,
        customization.productId
      );
      const { data, success } = apiResponse;
      if (success) {
        pOnSave(data);
        if (data.isTemplate) {
          onAddCustomization(data);
        }
        showSuccess("Customization saved successfully");
        onClose();
      } else {
        showError("Error saving customization");
      }
    }
    stopProgress();
  }, [
    customization,
    isCreate,
    onAddCustomization,
    onClose,
    pOnSave,
    showError,
    showSuccess,
    startProgress,
    stopProgress,
  ]);

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
          {isCreate ? "Create Customization" : "Edit Customization"}
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          p: 2,
          gap: 2,
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", width: "100%", gap: 4 }}
        >
          <Box sx={{ flex: 1 }}>
            <SFDropdownComp
              options={templates.map((e) => (
                <MenuItem value={e._id}>
                  {e.label}({e.type})
                </MenuItem>
              ))}
              value={selectedTemplateId}
              onChange={(e) => {
                setSelectedTemplateId(e.target.value as string);
              }}
              label={"Templates"}
            />
          </Box>
          <FormControlLabel
            label={"Select as a Template"}
            control={<Switch />}
            checked={customization.isTemplate}
            onChange={(_, c) =>
              setCustomization((prev) => ({ ...prev, isTemplate: c }))
            }
          />
        </Box>
        <SFInput
          label={"Name"}
          placeholder="Name of customization"
          value={customization.label}
          onChange={onChangeName}
        />
        <Typography>Instructions</Typography>
        <SFTextEditor
          value={customization.description}
          onChange={onChangeDesc}
        />
        {customization.type === "text" && (
          <TextCustomizationConfigEditor
            customization={customization as TextCustomizationConfig}
            onChange={onChange}
          />
        )}
        {customization.type === "image" && (
          <ImageCustomizationConfigEditor
            customization={customization as ImageCustomizationConfig}
            onChange={onChange}
          />
        )}
        {customization.type === "dropdown" && (
          <DropdownCustomizationConfigEditor
            customization={customization as DropDownCustomizationConfig}
            onChange={onChange}
          />
        )}
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

export default CustomizationDrawer;
