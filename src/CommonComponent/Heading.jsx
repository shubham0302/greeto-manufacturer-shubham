import { Box, Typography, alpha } from "@mui/material";
import React from "react";
import Divider from "@mui/material/Divider";

const Heading = ({ title, extraElements }) => {
  return (
    <>
      <Box
        display={"flex"}
        py={2}
        px={4}
        justifyContent={"space-between"}
        alignItems={"center"}
        // borderBottom={"1px solid"}
        // borderColor={alpha("#000000", 0.2)}
      >
        <Typography variant="h5" fontWeight={"600"}>
          {title}
        </Typography>
        {extraElements}
      </Box>
      <Divider />
    </>
  );
};

export default Heading;
