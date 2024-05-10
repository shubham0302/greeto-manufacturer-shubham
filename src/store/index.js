import { configureStore } from "@reduxjs/toolkit";
import user from "./Reducers/user";
import category from "./Reducers/category";
import relation from "./Reducers/relation";
import product from "./Reducers/product";
import variant from "./Reducers/variant";
import productDetails from "./Reducers/productDetails";

const store = configureStore({
  reducer: {
    auth:user,
    category,
    relation,
    product,
    variant,
    productDetails
  },
});

export default store;