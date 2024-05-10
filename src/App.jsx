import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Divider, Typography } from "@mui/material";
import { Link, RouterProvider, useLocation } from "react-router-dom";
import { Add, Factory, LogoutOutlined, ViewList } from "@mui/icons-material";
import CategoryIcon from "@mui/icons-material/Category";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import { alpha } from "@material-ui/core";
import router from "./routes/router";
import useAuth from "./hooks/useAuth";

const routePath = [
  {
    path: "",
    name: "MyProduct",
    icon: <PlaylistAddCheckIcon />,
  },
  {
    path: "category",
    name: "Category",
    icon: <CategoryIcon />,
  },
  {
    path: "manufacture",
    name: "Manufacture",
    icon: <Factory />,
  },
  {
    path: "addProduct",
    name: "AddProduct",
    icon: <Add />,
  },
  {
    path: "orders",
    name: "Orders",
    icon: <ViewList />,
  },
];

const theme = createTheme({
  palette: {
    text: {
      gray: "#969696",
      dark: "#000000",
      light: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

export const Navbar = () => {
  const location = useLocation();
  const {logout}=useAuth()
  return (
    <Box width={"13%"} display={"flex"} py={5} bgcolor={"black"} height={"100vh"} flexDirection={"column"} justifyContent={"space-between"}>
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography
        color={"white"}
        fontSize={30}
        fontWeight={600}
        textAlign={"start"}
        ml={2}
        letterSpacing={2}
      >
        GREETO.
      </Typography>
      <Divider sx={{ width: "100%", borderColor: alpha("#ffffff", 0.2) }} />
      <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        px:1
      }}
    >
      {routePath.map((item) => (
        <Box
          key={item.path}
          sx={{
            bgcolor: location.pathname === `/${item.path}` ? "white" : "black",
            color: location.pathname === `/${item.path}` ? "black" : "white",
            py: 1,
            borderRadius: 6,
            px: 2,
          }}
        >
          <Link
            to={`/${item.path}`}
            style={{
              textDecoration: "none",
            }}
          >
            <Box display={"flex"} gap={1}>
              {item.icon}
              <Typography>{item.name}</Typography>
            </Box>
          </Link>
        </Box>
      ))}
    </Box>
    </Box>
      <Box display={"flex"} gap={1} onClick={logout} color={"white"} px={3} sx={{cursor:"pointer"}}>
        <LogoutOutlined/>
        <Typography>Logout</Typography>
      </Box>
    </Box>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
