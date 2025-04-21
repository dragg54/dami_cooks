/* eslint-disable react/prop-types */
import { useFetchAllData } from '../../../hooks/api/useFetchAllData';

const FetchUserOrder = ({filters}) => {
    const { data, isLoading, refetch, isError, error } = useFetchAllData("/orders", filters, "userOrders");
    
      if (isError) return <p>Error: {error.message}</p>;
    
      return {data, refetch, isLoading};
}

export default FetchUserOrder