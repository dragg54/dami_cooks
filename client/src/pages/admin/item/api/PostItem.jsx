import { usePostData } from "../../../../hooks/api/usePostData"

export const PostItem = ({setResponseStatus, setInitialValues, setSelectValues}) => {
    const onSuccess = (res) => {
        setResponseStatus(res.status)
        setInitialValues({
            name: "",
            description: "",
            uom: "",
            price: 0
        })
         setSelectValues(null)
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