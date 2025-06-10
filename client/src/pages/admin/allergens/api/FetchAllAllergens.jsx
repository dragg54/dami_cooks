/* eslint-disable react/prop-types */
import { useFetchAllData } from "../../../../hooks/api/useFetchAllData";

export const FetchAllAllergens = ({filters}) =>{
  const { data, isLoading, refetch, isError, error } = useFetchAllData("/allergens", filters, "allergens");
  
  if (isError) return <p>Error: {error.message}</p>;

  return {data, refetch, isLoading};
}