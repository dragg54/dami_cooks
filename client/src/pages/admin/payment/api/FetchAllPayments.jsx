/* eslint-disable react/prop-types */
import Spinner from "../../../../components/Spinner";
import { useFetchAllData } from "../../../../hooks/useFetchAllData";

export const FetchPayments = ({filters}) =>{
  const { data, isLoading, isError, error, refetch } = useFetchAllData("/payments", filters, "payments");

  if (isError) return <p>Error: {error.message}</p>;

  return {data, refetch, isLoading};
}