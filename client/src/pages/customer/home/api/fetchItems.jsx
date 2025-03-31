/* eslint-disable react/prop-types */
import Spinner from "../../../../components/Spinner";
import { useFetchAllData } from "../../../../hooks/useFetchAllData";

export const FetchItems = ({filters}, name="items") =>{
  const { data, isLoading, isError, refetch, error } = useFetchAllData("/items", filters, name);

  if (isLoading) return <div className="w-full h-screen flex items-center justify-center"><Spinner isLoading={isLoading}/></div>
  if (isError) return <p>Error: {error.message}</p>;

  return {data, refetch};
}