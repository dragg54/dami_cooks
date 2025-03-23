/* eslint-disable react/prop-types */
import ItemImage from './ItemImage'
import { useDispatch } from 'react-redux'
import AddToCartButton from '../button/AddToCartButton'

const Item = ({ item }) => {
    const dispatch = useDispatch()
    return (
        <div className='w-[48%] md:w-[32.7%] overflow-hidden h-[300px] md:h-[380px] border bg-white rounded-md shadow shadow-gray-400'>
            <ItemImage item={item}/>
            <div className='w-full p-2 text-sm border-t border-gray-300'>
                <p className='font-semibold text-gray-500'>{item?.name}</p>
                <p className='font-semibold mt-3 text-gray-700 text-[1.2rem]'>€{item?.price}</p>
                <AddToCartButton {...{item, style:'!w-full mt-4 md:mt-6'}}/>
            </div>
        </div>
    )
}

export default Item