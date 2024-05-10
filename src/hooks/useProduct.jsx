import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getData, postData } from "../utils/serverHelper";
import { setRelation } from "../store/Reducers/relation";
import { setProduct } from "../store/Reducers/product";
import { useSearchParams } from "react-router-dom";
import { setVariant } from "../store/Reducers/variant";
import { setProductDetails } from "../store/Reducers/productDetails";

const useProduct = () => {
  const [searchParams ,setSearchParams]=useSearchParams()
  const dispatch = useDispatch();

  const getRelation = useCallback(async () => {
    dispatch(setRelation.fetchStart());
    try {
      let data = await getData("/api/Relation/");
      dispatch(setRelation.fetchSuccess(data?.data));
    } catch (error) {
      console.log(error, "Relation fetch error");
      dispatch(setRelation.fetchFailure(error));
    }
  }, [dispatch]);

  const addProduct = useCallback(async (payload,next) => {
    try {
      let data = await postData("/api/product/create", payload);
      searchParams.set("productId",data?.data?._id)
      setSearchParams(searchParams);
      next();
    } catch (error) {
      console.log((error, "error while adding product"));
    }
  }, []);

  const getProduct = useCallback(async () => {
    dispatch(setProduct.fetchStart());
    try {
      let data = await getData("/api/product/");
      dispatch(setProduct.fetchSuccess(data?.data));
    } catch (error) {
      console.log(error, "error in getting product list");
      dispatch(setProduct.fetchFailure(error));
    }
  }, [dispatch]);

  const editProduct=useCallback(async(payload,next)=>{
    try {
      let data=await postData("/api/product/edit",payload)
      next()
    } catch (error) {
      console.log(error,"error in editing the product");
    }
  },[])

  const getProductDetails=useCallback(async(payload)=>{
    dispatch(setProductDetails.fetchStart())
    try {
      let data=await getData("/api/product/details?productId="+payload)
      let cat=data?.data?.category?.map(item=>item._id)
      // console.log(cat,relation);
      dispatch(setProductDetails.registerData({name:data?.data?.name,description:data?.data?.description,points:data?.data?.points}))
      dispatch(setProductDetails.registerCategory(cat))
      dispatch(setProductDetails.registerRelation(data?.data?.productFor))
    } catch (error) {
      console.log(error,"error while fetching fetching product details");
      dispatch(setProductDetails.fetchFailure(error))
    }
  },[dispatch])

  return { getRelation, addProduct, getProduct, getProductDetails, editProduct };
};

export default useProduct;
