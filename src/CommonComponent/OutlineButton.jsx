import { Button } from "@mui/material";
import React from "react";

const OutlineButton = ({ title, icon,onClick }) => {
  return (
    <Button
      sx={{
        m: "15px",
        color: "#222831",
        bgcolor: "white",
        border: "1px solid black",
      }}
      startIcon={icon}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default OutlineButton;
