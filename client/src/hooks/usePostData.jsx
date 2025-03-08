import { useMutation } from "@tanstack/react-query"
import Axios from "../services/apiClient";

const postData =  async ({ payload, url, headers }) => {
    const response = await Axios.post(url, payload, {headers});
    return response;
};
export const usePostData =({ onSuccess, onError, url, headers}) =>{
    return useMutation({
        mutationFn: (payload) => postData({ payload, url, headers }),
        onSuccess,
        onError,  
    });}