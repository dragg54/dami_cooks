/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useFetchAllData } from "../../../../hooks/useFetchAllData";

export const FetchAllItems = ({filters}) =>{
  const { data, isLoading, refetch, isError, error } = useFetchAllData("/items", filters, "items");
  
  useEffect(()=>{
    refetch()
  }, [filters.searchText])
  if (isLoading) return <p>Loading orders...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return {data, refetch};
}