import { Button } from "@mui/material";

const FieldButton = ({ title, icon, onClick, type = "button" }) => {
  return (
    <>
      <Button
        sx={{
          color: "white",
          bgcolor: "#222831",
          border: "1px solid black",
          "&:hover": {
            bgcolor: "#222831",
            color: "white",
          },
        }}
        startIcon={icon}
        onClick={onClick}
        type={type}
      >
        {title}
      </Button>
    </>
  );
};

export default FieldButton;
