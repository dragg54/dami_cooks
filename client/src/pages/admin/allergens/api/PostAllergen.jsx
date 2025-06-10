import { usePostData } from "../../../../hooks/api/usePostData"

export const PostAllergen = ({setResponseStatus}) => {
    const onSuccess = (res) => {
        setResponseStatus(res.status)
    }
    
    const onError = (error) => {
        setResponseStatus(error.response.status)
       
    }
    return usePostData({
        onSuccess, onError, url: "/allergens"
    })
}