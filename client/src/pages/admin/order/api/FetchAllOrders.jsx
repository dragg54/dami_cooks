/* eslint-disable react/prop-types */
import { useFetchAllData } from "../../../../hooks/useFetchAllData";

export const FetchOrders = ({filters}) =>{
  const { data, isLoading, isError, error } = useFetchAllData("/orders", filters, "orders");

  if (isLoading) return <p>Loading orders...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return data;
}