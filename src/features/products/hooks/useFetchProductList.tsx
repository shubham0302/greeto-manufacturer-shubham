import { useCallback, useMemo } from "react";
import {
  DataState,
  FetchFunction,
  Product,
  useDataFetch,
} from "../../../common";
import { productApiService } from "../../../infrastructure";

export const useFetchProductList = (
  generateDemoData = false,
  disableAutoFetch = false
) => {
  const initialState = useMemo<DataState<Product[], string>>(
    () => ({
      data: [],
      error: null,
      errorMessage: "",
      isError: false,
      isFetching: !disableAutoFetch,
      isSuccess: false,
    }),
    [disableAutoFetch]
  );

  const fetchFn = useCallback<FetchFunction<Product[]>>(async () => {
    const result = await productApiService.getProductList(generateDemoData);
    return result;
  }, [generateDemoData]);

  return useDataFetch(fetchFn, initialState, disableAutoFetch);
};
