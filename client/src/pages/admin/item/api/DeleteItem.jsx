import { useQueryClient } from "react-query"
import { useDeleteData } from "../../../../hooks/api/useDeleteData"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export const DeleteItem = ({setResponseStatus, id}) => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const onSuccess = (res) => {
        queryClient.invalidateQueries('items')
        setResponseStatus(res.status)
        navigate("/itemlist")
    }

    const onError = (error) => {
        setResponseStatus(error.response.status)
       
    }
    return useDeleteData({
        onSuccess, onError, url: `/items/${id}`
    })
}