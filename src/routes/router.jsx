import { createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import AddProduct, { EditProduct } from "../screens/AddProduct";
import PublicRoutes from "./PublicRoutes";
import ManufactureScreen from "../screens/ManuFactureScreen";
import CategoryScreen from "../screens/categoryScreen";
import MyProductList from "../screens/myProductList";
import OrderList from "../screens/OrderList";
import Login from "../screens/Login";

const router=createBrowserRouter([
    {
        path:"/",
        element:(<PrivateRoutes><MyProductList/></PrivateRoutes>)
    },
    {
        path:"/addProduct",
        element:(<PrivateRoutes><AddProduct/></PrivateRoutes>)
    },
    {
        path:"/editProduct",
        element:(<PrivateRoutes><EditProduct/></PrivateRoutes>)
    },
    {
        path:"/manufacture",
        element:(<PrivateRoutes><ManufactureScreen/></PrivateRoutes>)
    },
    {
        path:"/category",
        element:(<PrivateRoutes><CategoryScreen/></PrivateRoutes>)
    },
    {
        path:"/orders",
        element:(<PrivateRoutes><OrderList/></PrivateRoutes>)
    },
    {
        path:"/login",
        element:(<PublicRoutes><Login/></PublicRoutes>)
    },
])

export default router;