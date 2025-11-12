/* eslint-disable react/prop-types */
import { useFetchAllData } from "@/hooks/api/useFetchAllData";
import { useEffect } from "react";

export const FetchAdminSettings= ({filters}) =>{
  const { data, isLoading, refetch, isError, error } = useFetchAllData("/adminSettings", filters, "adminSettings");
  
  useEffect(()=>{
    refetch()
  }, [filters?.searchText])
  if (isError) return <p>Error: {error.message}</p>;

  return {data, refetch, isLoading};
}