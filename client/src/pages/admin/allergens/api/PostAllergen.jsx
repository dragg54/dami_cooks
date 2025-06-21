import { useQueryClient } from "react-query"
import { usePostData } from "../../../../hooks/api/usePostData"

export const PostAllergen = ({setResponseStatus}) => {
    const client = useQueryClient()
    const onSuccess = (res) => {
        client.invalidateQueries("allergens")
        setResponseStatus(res.status)
    }
    
    const onError = (error) => {
        setResponseStatus(error.response.status)
       
    }
    return usePostData({
        onSuccess, onError, url: "/allergens"
    })
}