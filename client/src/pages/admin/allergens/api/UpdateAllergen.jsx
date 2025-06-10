import { useQueryClient } from "react-query"
import { useUpdateData } from "../../../../hooks/api/useUpdateData"

export const UpdateAllergen = ({setResponseStatus, id}) => {

    const queryClient = useQueryClient()

    const onSuccess = (res) => {
        queryClient.invalidateQueries('Allergens')
        setResponseStatus(res.status)
    }

    const onError = (error) => {
        setResponseStatus(error.response.status)
       
    }
    return useUpdateData({
        onSuccess, onError, url: `/Allergens/${id}`
    })
}