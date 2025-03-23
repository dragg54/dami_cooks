import { useMutation } from "react-query"
import Axios from "../services/apiClient";

const patchData =  async ({ payload, url, headers }) => {
    const response = await Axios.patch(url, payload, {headers});
    return response;
};
export const usePatchData =({ onSuccess, onError, url, headers}) =>{
    return useMutation({
        mutationFn: (payload) => patchData({ payload, url: getUrl(url, payload), headers }),
        onSuccess,
        onError,  
    });}


function getUrl(url, payload){
  const newUrl = url.split("/")
  const idIndex =newUrl.findIndex(x => x == 'id')
  newUrl[idIndex] = payload.id
  console.log(newUrl.join(","))
  return newUrl.join("/")
}