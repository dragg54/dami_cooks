import { useQueryClient } from "react-query"
import { useUpdateData } from "../../../../hooks/api/useUpdateData"

export const UpdateItem = ({setResponseStatus, id}) => {

    const queryClient = useQueryClient()

    const onSuccess = (res) => {
        queryClient.invalidateQueries('items')
        setResponseStatus(res.status)
    }

    const onError = (error) => {
        setResponseStatus(error.response.status)
       
    }
    return useUpdateData({
        onSuccess, onError, url: `/items/${id}`, headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}