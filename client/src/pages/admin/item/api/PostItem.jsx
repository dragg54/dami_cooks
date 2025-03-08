import { usePostData } from "../../../../hooks/usePostData"

export const PostItem = ({setResponseStatus}) => {
    const onSuccess = (res) => {
        console.log(res.status)
        setResponseStatus(res.status)
    }

    const onError = (error) => {
        console.log(error.response)
        setResponseStatus(error.response.status)
       
    }
    return usePostData({
        onSuccess, onError, url: "/items", headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}