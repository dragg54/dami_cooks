/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useFetchAllData } from "../../../../hooks/api/useFetchAllData";

export const FetchEventBooking = (id) =>{
  const { data, isLoading, refetch, isError, error } = useFetchAllData(`/EventBookings/${id}`, {}, "EventBookings");
  
  useEffect(()=>{
    refetch()
  }, [filters.searchText])
  if (isError) return <p>Error: {error.message}</p>;

  return {data, refetch, isLoading};
}