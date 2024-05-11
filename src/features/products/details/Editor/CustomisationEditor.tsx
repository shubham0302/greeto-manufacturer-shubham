import { Abc, Add, Image } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  List,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import {
  CustomizationConfig,
  CustomizationType,
  getDefaultCustomization,
  useAuth,
  useToggle,
} from "../../../../common";
import SFButton from "../../../../common/components/Button";
import TableComp, { HeadData } from "../../../../common/components/TableComp";
import { useFetchCustomizations } from "../../hooks";
import CustomizationDrawer from "./CustomizationDrawer";
import CustomizationRow from "./CustomizationRow";

type Props = {
  productId: string;
};

const headData: HeadData[] = [
  {
    label: "Name",
  },
  {
    label: "Type",
  },
  {
    label: "Actions",
  },
];

const CustomisationEditor: React.FC<Props> = (props) => {
  const { productId } = props;
  const { data, isError, isFetching, errorMessage } =
    useFetchCustomizations(productId);

  const { user } = useAuth();
  const { _id: userId } = user || {};

  const [customizations, setCustomizations] = useState(data);
  useEffect(() => {
    setCustomizations(data);
  }, [data]);

  const { open, close, isOpen } = useToggle();
  const [nCustomization, setNCustomization] =
    useState<CustomizationConfig>(null);
  const openDrawer = Boolean(nCustomization);

  const onAdd = useCallback((config: CustomizationConfig) => {
    setCustomizations((prev) => [...prev, config]);
    setNCustomization(null);
  }, []);

  const onEdit = useCallback((config: CustomizationConfig, index: number) => {
    setCustomizations((prev) => prev.map((e, i) => (i === index ? config : e)));
  }, []);
  const onDelete = useCallback((index: number) => {
    setCustomizations((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const onChoose = useCallback(
    (type: CustomizationType) => {
      const config = getDefaultCustomization(type, productId, userId);
      setNCustomization(config);
      close();
    },
    [close, productId, userId]
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
      <Dialog open={isOpen} onClose={close} fullWidth>
        <DialogTitle>Choose Customization Type</DialogTitle>
        <Divider />
        <DialogContent>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: 4,
              alignItems: "center",
            }}
          >
            <Box
              onClick={() => onChoose("text")}
              sx={{
                flex: 1,
                p: 4,
                borderRadius: 4,
                height: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                bgcolor: "primary.200",
              }}
            >
              <Abc sx={{ color: "primary.main" }} />
              <Typography
                variant="labelXxl"
                textAlign={"center"}
                sx={{ color: "primary.main" }}
              >
                Text
              </Typography>
            </Box>
            <Box
              onClick={() => onChoose("image")}
              sx={{
                flex: 1,
                p: 4,
                borderRadius: 4,
                height: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                bgcolor: "secondary.200",
              }}
            >
              <Image sx={{ color: "secondary.main" }} />
              <Typography
                sx={{ color: "secondary.main" }}
                variant="labelXxl"
                textAlign={"center"}
              >
                Image
              </Typography>
            </Box>
            <Box
              onClick={() => onChoose("dropdown")}
              sx={{
                flex: 1,
                p: 4,
                borderRadius: 4,
                height: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                bgcolor: "success.200",
              }}
            >
              <List sx={{ color: "success.main" }} />
              <Typography
                sx={{ color: "success.main" }}
                variant="labelXxl"
                textAlign={"center"}
              >
                Drop Down
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      <Drawer open={openDrawer} anchor="right" onClose={close}>
        {openDrawer && (
          <CustomizationDrawer
            onClose={() => setNCustomization(null)}
            onSave={onAdd}
            customization={nCustomization}
            isCreate
          />
        )}
      </Drawer>
      {isFetching && <CircularProgress />}
      {!isFetching && (
        <>
          {isError && (
            <Typography>
              Error fetching customizations: {errorMessage}
            </Typography>
          )}
          {!isError && (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <SFButton
                  startIcon={<Add />}
                  sx={{ ml: "auto" }}
                  onClick={open}
                >
                  Add Customizations
                </SFButton>
              </Box>
              <TableComp
                headData={headData}
                body={customizations.map((e, i) => (
                  <CustomizationRow
                    customization={e}
                    index={i}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    key={i}
                  />
                ))}
              />
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default CustomisationEditor;
