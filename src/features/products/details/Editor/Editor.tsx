import {
  Box,
  Button,
  CircularProgress,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  Product,
  Shipping,
  getDefaultProduct,
  useActiveCategories,
  useActiveRelations,
  useAlert,
  useTemplateCustomization,
  useToggle,
} from "../../../../common";
import SFButton from "../../../../common/components/Button";
import { productApiService } from "../../../../infrastructure";
import {
  useFetchProductDetails,
  useFetchProductShippingDetails,
} from "../../hooks";
import BasicInfoEditor from "./BasicInfoEditor";
import CustomisationEditor from "./CustomisationEditor";
import VariantEditor from "./VariantEditor";
import ShippingEditor from "./ShippingEditor";

type Props = {
  productId?: string;
  product: Product;
};

enum SettingsTab {
  basic = "basic",
  variant = "variant",
  customization = "customization",
  shipping = "shipping",
}

const EditorChild: React.FC<Props> = (props) => {
  const { product: pProduct } = props;
  const { fetchTemplateCustomizations } = useTemplateCustomization();
  useEffect(() => {
    fetchTemplateCustomizations();
  }, [fetchTemplateCustomizations]);

  const { fetchCategories } = useActiveCategories();
  const { fetchRelations } = useActiveRelations();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchRelations();
  }, [fetchRelations]);

  const [product, setProduct] = useState(pProduct);

  useEffect(() => {
    setProduct(pProduct);
  }, [pProduct]);

  const onChangeProduct = useCallback((product: Product) => {
    setProduct(product);
  }, []);

  const { _id: productId } = product || {};

  const [searchParams] = useSearchParams();

  const { isCreate } = useMemo(() => {
    const mode = searchParams.get("mode");
    return {
      isEdit: !productId ? true : mode === "edit",
      isCreate: !productId,
    };
  }, [productId, searchParams]);

  const [tab, setTab] = useState<SettingsTab>(SettingsTab.basic);
  const onChangeTabDt = useCallback(
    (_: any, val: SettingsTab) => {
      if (!isCreate) {
        setTab(val);
      }
    },
    [isCreate]
  );
  const {
    isOpen: isSaveProgress,
    open: startProgress,
    close: stopProgress,
  } = useToggle();

  const { success: showSuccess, error: showError } = useAlert();

  const [savedShippingDetails, setSavedShippingDetails] =
    useState<Shipping>(null);

  const onChangeSavedShippingDetails = useCallback((shipping: Shipping) => {
    setSavedShippingDetails(shipping);
  }, []);

  const onSave = useCallback(async () => {
    startProgress();
    if (!productId) {
      if (tab === SettingsTab.basic) {
        const apiResponse = await productApiService.createProductDetails(
          product
        );
        const { data, success, error } = apiResponse;
        if (success) {
          onChangeProduct(data);
          showSuccess("Course saved successfully");
        } else {
          showError(error?.message || "Error saving course details");
        }
      } else if (tab === SettingsTab.shipping) {
        const apiResponse = await productApiService.saveShippingDetails(
          productId,
          savedShippingDetails
        );
        const { success, error } = apiResponse;
        if (success) {
          showSuccess("Course saved successfully");
        } else {
          showError(error.message || "Error saving course details");
        }
      }
    } else {
      if (tab === SettingsTab.basic) {
        const apiResponse = await productApiService.saveProductDetails(
          productId,
          product
        );
        const { data, success, error } = apiResponse;
        if (success) {
          onChangeProduct(data);
          showSuccess("Course saved successfully");
        } else {
          showError(error.message || "Error saving course details");
        }
      } else if (tab === SettingsTab.shipping) {
        const apiResponse = await productApiService.saveShippingDetails(
          productId,
          savedShippingDetails
        );
        const { success, error } = apiResponse;
        if (success) {
          showSuccess("Course saved successfully");
        } else {
          showError(error.message || "Error saving course details");
        }
      }
    }
    stopProgress();
  }, [
    onChangeProduct,
    product,
    productId,
    savedShippingDetails,
    showError,
    showSuccess,
    startProgress,
    stopProgress,
    tab,
  ]);

  const onSaveAndNext = useCallback(async () => {
    if (tab === SettingsTab.basic) {
      await onSave();
      const nextTab = getNextOrPrevStatus(tab, false);
      setTab(nextTab);
    }
    if (tab === SettingsTab.variant) {
      const nextTab = getNextOrPrevStatus(tab, false);
      setTab(nextTab);
    }
    if (tab === SettingsTab.customization) {
      const nextTab = getNextOrPrevStatus(tab, false);
      setTab(nextTab);
    }
  }, [onSave, tab]);

  const {
    data: shippingDetails,
    isError: shippingError,
    isFetching: shippingFetching,
    errorMessage: shippingErrorMessage,
    refetch,
  } = useFetchProductShippingDetails(productId, false, true);

  useEffect(() => {
    console.log("fetched", productId);

    if (productId && tab === SettingsTab.shipping) {
      refetch();
    }
  }, [productId, refetch, tab]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        p: 2,
      }}
    >
      <Box
        width={"90%"}
        sx={{
          bgcolor: "white",
          mx: "auto",
        }}
      >
        <Tabs value={tab} onChange={onChangeTabDt} variant="fullWidth">
          <Tab value={SettingsTab.basic} label={"Basic Information"} />
          <Tab value={SettingsTab.variant} label="Variants" />
          <Tab value={SettingsTab.customization} label="Customizations" />
          <Tab value={SettingsTab.shipping} label="Shipping Details" />
        </Tabs>
      </Box>
      <Box
        sx={{
          width: "90%",
          height: "fit-content",
          maxHeight: "80%",
          // pb: 20,
          overflowY: "scroll",
          mx: "auto",
          bgcolor: "white",
        }}
      >
        {tab === SettingsTab.basic && (
          <BasicInfoEditor
            product={product}
            onChangeProduct={onChangeProduct}
          />
        )}
        {tab === SettingsTab.variant && <VariantEditor productId={productId} />}
        {tab === SettingsTab.customization && (
          <CustomisationEditor productId={productId} />
        )}
        {tab === SettingsTab.shipping && (
          <ShippingEditor
            shippingDetails={shippingDetails}
            errorMessage={shippingErrorMessage}
            isError={shippingError}
            isFetching={shippingFetching}
            onChange={onChangeSavedShippingDetails}
          />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          //   justifyContent: "space-between",
          alignItems: "center",
          p: 4,
        }}
      >
        {tab !== SettingsTab.basic && (
          <SFButton
            sfColor="sp"
            size="large"
            onClick={() => {
              const nextTab = getNextOrPrevStatus(tab, true);
              setTab(nextTab);
            }}
          >
            Previous
          </SFButton>
        )}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", ml: "auto" }}>
          {(tab === SettingsTab.basic || tab === SettingsTab.shipping) && (
            <SFButton size="large" disabled={isSaveProgress} onClick={onSave}>
              Save
            </SFButton>
          )}

          {tab !== SettingsTab.shipping && (
            <Button
              size="medium"
              disabled={isSaveProgress}
              onClick={onSaveAndNext}
              sx={{ textTransform: "capitalize", borderRadius: 0 }}
              variant="outlined"
            >
              {tab === SettingsTab.basic ? "Save & Next" : "Next"}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const Editor = () => {
  const { productId } = useParams();

  const { data, isError, isFetching, errorMessage, refetch } =
    useFetchProductDetails(productId, false, true);

  useEffect(() => {
    if (productId) {
      refetch();
    }
  }, [productId, refetch]);

  return (
    <>
      {isFetching && <CircularProgress />}
      {!isFetching && (
        <>
          {isError && (
            <Typography>Error fetching details: {errorMessage}</Typography>
          )}
          {!isError && (
            <EditorChild
              product={data || getDefaultProduct()}
              productId={productId}
            />
          )}
        </>
      )}
    </>
  );
};

const getNextOrPrevStatus = (
  tab: SettingsTab,
  isPrev: boolean
): SettingsTab => {
  switch (tab) {
    case SettingsTab.basic:
      return isPrev ? SettingsTab.basic : SettingsTab.variant;
    case SettingsTab.variant:
      return isPrev ? SettingsTab.basic : SettingsTab.customization;
    case SettingsTab.customization:
      return isPrev ? SettingsTab.variant : SettingsTab.shipping;
    case SettingsTab.shipping:
      return isPrev ? SettingsTab.customization : SettingsTab.shipping;
    default:
      return tab;
  }
};

export default Editor;
