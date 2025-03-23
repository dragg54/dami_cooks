/* eslint-disable react/prop-types */
import { useFetchAllData } from "../../../../hooks/useFetchAllData";

export const FetchPayments = ({filters}) =>{
  const { data, isLoading, isError, error } = useFetchAllData("/payments", filters, "payments");

  if (isLoading) return <p>Loading Payments...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return data;
}