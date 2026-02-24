import { usePostData } from "@/hooks/api/usePostData"

export const GetShippingCharge = ({ setResponseStatus }) => {
    const onSuccess = (res) => {
        console.log("res", res)
        setResponseStatus(res.data)
    }

    const onError = (error) => {
        setResponseStatus(error.status)

    }
    return usePostData({
        onSuccess, onError, url: "/shippings/quotes"
    })
}