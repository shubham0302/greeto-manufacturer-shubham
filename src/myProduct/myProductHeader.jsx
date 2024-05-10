import { Box, FilledInput } from "@mui/material";
import React, { useState } from "react";
import Heading from "../CommonComponent/Heading";
import { Search } from "@mui/icons-material";

const MyProductHeader = () => {

  return (
    <Box>
      <Box>
        <Heading
          title={"My Products"}
          extraElements={
            <FilledInput
              size="small"
              placeholder="Search Orders"
              hiddenLabel
              startAdornment={<Search sx={{ mr: "4px" }} />}
              sx={{ overflow: "hidden", borderRadius: "8px", width: "20%" }}
              disableUnderline
            />
          }
        />
      </Box>
    </Box>
  );
};

export default MyProductHeader;
