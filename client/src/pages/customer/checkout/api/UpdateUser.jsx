import { useQueryClient } from "react-query"
import { useUpdateData } from "../../../../hooks/api/useUpdateData"

export const UpdateUser = ({setResponseStatus, id}) => {

     const queryClient = useQueryClient()
    
        const onSuccess = (res) => {
            queryClient.invalidateQueries('users')
            setResponseStatus(res.status)
        }
    
        const onError = (error) => {
            setResponseStatus(error.response.status)
           
        }
        return useUpdateData({
            onSuccess, onError, url: `/users/${id}`
        })
}