import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getData, postData } from "../utils/serverHelper";
import { setVariant } from "../store/Reducers/variant";

const useVariant = () => {
  const dispatch = useDispatch();
  const AddBulkVariant=useCallback(async(payload,next)=>{
    try {
        await postData("/api/variant/create/bulk",payload);
        next();
    } catch (error) {
        console.log(error,"error adding variant");
    }
  },[dispatch])
  const getVariant=useCallback(async(payload)=>{
    dispatch(setVariant.fetchStart())
    try {
      let data= await getData("/api/variant/?productId="+payload)
      dispatch(setVariant.fetchSuccess(data?.data))
    } catch (error) {
      console.log(error,"error in fetching variant");
      dispatch(setVariant.fetchFailure(error));
    }
  },[dispatch])
  const editVariant=useCallback(async(payload)=>{
    try {
        let data=await postData("api/variant/edit",payload)
    } catch (error) {
        console.log(error,"error during editing the variant");
    }
  },[])
  return { AddBulkVariant,getVariant,editVariant };
};

export default useVariant;
