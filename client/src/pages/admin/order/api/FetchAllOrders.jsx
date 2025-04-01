/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useFetchAllData } from "../../../../hooks/useFetchAllData";
import MerchantEmptyState from "../../../../components/MerchantEmptyState";
import Spinner from "../../../../components/Spinner";

export const FetchOrders = ({filters}) =>{
  const { data, isLoading, refetch, isError, error } = useFetchAllData("/orders", filters, "orders");
  useEffect(()=>{
    refetch()
  }, [filters.searchText])

  if (isError) return <p>Error: {error.message}</p>;

  return {data, refetch, isLoading};
}