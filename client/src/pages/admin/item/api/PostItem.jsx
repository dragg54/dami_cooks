import { usePostData } from "../../../../hooks/api/usePostData"

export const PostItem = ({setResponseStatus}) => {
    const onSuccess = (res) => {
        setResponseStatus(res.status)
    }

    const onError = (error) => {
        setResponseStatus(error.response.status)
       
    }
    return usePostData({
        onSuccess, onError, url: "/items", headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}