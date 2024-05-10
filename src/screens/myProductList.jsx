import { Box } from "@mui/material";
import React from "react";
import MyProductHeader from "../myProduct/myProductHeader";
import MyProductTable from "../myProduct/myProductTable";

const MyProductList = () => {
  return (
    <Box>
      <MyProductHeader />
      <MyProductTable />
    </Box>
  );
};

export default MyProductList;
