import { useMutation } from "react-query"
import Axios from "../../services/apiClient";

const updateData =  async ({ payload, url, headers }) => {
    const response = await Axios.put(url, payload, {headers});
    return response;
};
export const useUpdateData =({ onSuccess, onError, url, headers}) =>{
    return useMutation({
        mutationFn: (payload) => updateData({ payload, url:`${url}`, headers }),
        onSuccess,
        onError,  
    });}