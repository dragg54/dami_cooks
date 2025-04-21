/* eslint-disable react/prop-types */
import { useFetchAllData } from '../../../hooks/api/useFetchAllData';

const FetchOrderDetails = (id) => {
    const { data, isLoading, refetch, isError, error } = useFetchAllData(`/orders/${id}`,{}, "orderItem");
    
      if (isError) return <p>Error: {error.message}</p>;
    
      return {data, refetch, isLoading};
}

export default FetchOrderDetails