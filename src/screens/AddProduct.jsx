import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Divider from "@mui/material/Divider";
import { useSearchParams } from "react-router-dom";
import General from "../Addproduct/components/general";
import Shipping from "../Addproduct/components/shipping";
import Customize from "../Addproduct/Customize/Customize"
import VariantPage from "../Addproduct/components/Variant";
import Heading from "../CommonComponent/Heading";
import useProduct from "../hooks/useProduct";
import useCategory from "../hooks/useCategory";

export const EditProduct=()=>{
  return <AddProduct isEdit/>
}

const AddProduct = ({isEdit=false,editId,editValues}) => {
  const [searchParams]=useSearchParams()
  const [value, setValue] = useState("1");
  const {getProductDetails,getRelation}=useProduct()
  const {getCategory}=useCategory()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(()=>{
    getCategory()
    getRelation()
    if (isEdit) {
      getProductDetails(searchParams.get("productId"))
    }
  },[])

  return (
    <>
      <Box>
        <Heading title={isEdit?"Edit Product":"Add Product"} />
        <Divider />
        <Box
          sx={{
            width: "96%",
            typography: "body1",
            mt: "20px",
            mx: "24px",
          }}
        >
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                sx={{
                  bgcolor: "white",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 100px #00000014",
                }}
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="General" value="1" />
                <Tab label="Variant" value="2" disabled={searchParams.get("productId")?false:true} />
                <Tab label="Customize" value="3" disabled={searchParams.get("productId")?false:true} />
                <Tab label="Shipping" value="4" disabled={searchParams.get("productId")?false:true} />
              </TabList>
            </Box>
            <TabPanel sx={{ p: 0, pt: 2 }} value="1">
              <General isEdit={isEdit} nextValue={() => setValue("2")} />
            </TabPanel>
            <TabPanel sx={{ p: 0, pt: 2 }} value="2">
              <VariantPage isEdit={isEdit} nextValue={() => setValue("3")} />
            </TabPanel>
            <TabPanel sx={{ p: 0, pt: 2 }} value="3">
              <Customize nextValue={() => setValue("4")} />
            </TabPanel>
            <TabPanel sx={{ p: 0, pt: 2 }} value="4">
              <Shipping nextValue={() => setValue("1")} />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </>
  );
};

export default AddProduct;
