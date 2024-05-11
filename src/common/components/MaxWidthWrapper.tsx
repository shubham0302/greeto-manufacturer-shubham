import { Box } from "@mui/material";

const MaxWidthWrapper: React.FC<any> = ({ children }) => {
  return (
    <Box
      sx={{
        maxWidth: "88%",
        mx: "auto",
        p: 2,
      }}
    >
      {children}
    </Box>
  );
};

export default MaxWidthWrapper;
