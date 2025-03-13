import { useFetchAllData } from "../../../../hooks/useFetchAllData";

export const FetchItems = ({filters}) =>{
  const { data, isLoading, isError, error } = useFetchAllData("/items", filters, "items");

  if (isLoading) return <p>Loading items...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return data;
}