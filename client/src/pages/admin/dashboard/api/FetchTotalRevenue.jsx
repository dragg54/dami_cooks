/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useFetchAllData } from "../../../../hooks/api/useFetchAllData";

export const FetchTotalRevenue = ({filters}) =>{
  const { data, isLoading, refetch, isError, error } = useFetchAllData("/payments/totalRevenue", {}, "totalRevenue");

  if (isError) return <p>Error: {error.message}</p>;

  return {data, refetch, isLoading};
}