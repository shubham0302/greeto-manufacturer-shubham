import React from "react";
import Companyinfo from "../ManuFacture/Companyinfo";
import OwnerandContactinfo from "../ManuFacture/OwnerandContactinfo";
import { Box } from "@mui/material";
import Heading from "../CommonComponent/Heading";

const ManufactureScreen = () => {
  return (
    <Box>
      <Heading title={"Manufacture"} />
      <Box display={"flex"} justifyContent={"space-around"}>
        <Companyinfo />
        <OwnerandContactinfo />
      </Box>
    </Box>
  );
};
export default ManufactureScreen;
