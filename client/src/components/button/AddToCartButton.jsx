/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/CartSlice'
import { Button } from './Button'
import { usePostData } from '../../hooks/usePostData'
import Spinner from '../Spinner'

const AddToCartButton = ({ item, style }) => {
    const onSuccess = () => {
        dispatch(addToCart(item))
    }

    const onError = (error) => {
        console.log(error)
    }

    const addToCartMutation = usePostData({ onSuccess, onError, url: '/cartItems', })

    const handleAddToCart = () => {
        addToCartMutation.mutate({ itemId: item.id })
    }

    const dispatch = useDispatch()
    return (
        <Button
            disabled={addToCartMutation.isLoading}
            onClick={() => handleAddToCart()} className={`${style} !rounded-full w-1/2 py-3 font-semibold`}>
            {addToCartMutation.isPending ? <Spinner style={'!w-6 !h-6 mx-auto !border-white !border-t-transparent !text-white '} isLoading={addToCartMutation.isLoading} /> : "Add To Cart"}
        </Button>)
}

export default AddToCartButton