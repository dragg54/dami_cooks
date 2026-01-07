/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useFetchAllData } from "../../../../hooks/api/useFetchAllData";

export const FetchShippings = ({filters}) =>{
  const { data, isLoading, refetch, isError, error } = useFetchAllData("/Shippings", filters, "Shippings");
  useEffect(()=>{
    refetch()
  }, [filters.searchText])

  if (isError) return <p>Error: {error.message}</p>;

  return {data, refetch, isLoading};
}