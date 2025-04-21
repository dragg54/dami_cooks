/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useFetchAllData } from "../../../../hooks/api/useFetchAllData";

export const FetchAllItems = ({filters}) =>{
  const { data, isLoading, refetch, isError, error } = useFetchAllData("/items", filters, "items");
  
  useEffect(()=>{
    refetch()
  }, [filters.searchText])
  if (isError) return <p>Error: {error.message}</p>;

  return {data, refetch, isLoading};
}