import { useMutation } from "react-query"
import Axios from "../../services/apiClient";

const deleteData =  async ({url }) => {
    const response = await Axios.delete(url);
    return response;
};
export const useDeleteData =({ onSuccess, onError, url, headers}) =>{
    return useMutation({
        mutationFn: (payload) => deleteData({ url:`${url}` }),
        onSuccess,
        onError,  
    });}