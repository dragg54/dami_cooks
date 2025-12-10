/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useFetchAllData } from "../../../../hooks/api/useFetchAllData";

export const FetchAllEventBookings = ({filters}) =>{
  const { data, isLoading, refetch, isError, error } = useFetchAllData("/EventBookings", filters, "EventBookings");
  
  useEffect(()=>{
    refetch()
  }, [filters.searchText])
  if (isError) return <p>Error: {error.message}</p>;

  return {data, refetch, isLoading};
}