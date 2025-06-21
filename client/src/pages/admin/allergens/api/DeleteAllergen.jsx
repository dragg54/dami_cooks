import { useQueryClient } from "react-query"
import { useDeleteData } from "../../../../hooks/api/useDeleteData"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export const DeleteAllergen = ({setResponseStatus, id}) => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const onSuccess = (res) => {
        queryClient.invalidateQueries('allergens')
        navigate("/allergens")
    }

    const onError = (error) => {
        setResponseStatus(error.response.status)
       
    }
    return useDeleteData({
        onSuccess, onError, url: `/Allergens/${id}`
    })
}