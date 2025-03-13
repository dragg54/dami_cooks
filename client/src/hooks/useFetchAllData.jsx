import { useQuery } from "react-query";
import Axios from "../services/apiClient";

const fetchData = async ({ queryKey }) => {
  const [_key, url, params] = queryKey;
  const { data } = await Axios.get(url, { params });
  return data;
};

export const useFetchAllData = (url, params = {}, queryKey = "data") => {
  return useQuery([queryKey, url, params], fetchData, {
    staleTime: 5 * 60 * 1000, 
    refetchOnWindowFocus: false,
    keepPreviousData: true, 
  });
};
