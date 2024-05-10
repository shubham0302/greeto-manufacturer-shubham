import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getData } from "../utils/serverHelper";
import { setCat } from "../store/Reducers/category";

const useCategory = () => {
const dispatch = useDispatch();
  const getCategory = useCallback(async () => {
    dispatch(setCat.fetchStart());
    try {
      let data = await getData("/api/category/");
      dispatch(setCat.fetchSuccess(data?.data));
    } catch (error) {
      console.log(error, "category fetch error");
      dispatch(setCat.fetchFailure(error));
    }
  }, [dispatch]);
  return {getCategory}
}

export default useCategory
