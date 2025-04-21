/* eslint-disable react/prop-types */
import Spinner from "../../../../components/Spinner";
import { useFetchAllData } from "../../../../hooks/api/useFetchAllData";

export const FetchItemCategories = ({filters}, name="itemCategories") =>{
  const { data, isLoading, isError, refetch, error } = useFetchAllData("/itemCategories", filters, name);

  if (isLoading) return <div className="w-full h-screen flex items-center justify-center"><Spinner isLoading={isLoading}/></div>
  if (isError) return <p>Error: {error.message}</p>;

  return {data, refetch};
}