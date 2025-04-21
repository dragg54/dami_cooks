/* eslint-disable react/prop-types */
import { useFetchAllData } from "../../../../hooks/api/useFetchAllData";

export const FetchOrder = (id) =>{
  const { data, isLoading, isError, error } = useFetchAllData(`/orders/${id}`, {}, "orders");

  if (isLoading) return <p>Loading orders...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return data;
}