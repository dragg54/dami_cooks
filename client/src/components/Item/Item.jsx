/* eslint-disable react/prop-types */
import ItemImage from './ItemImage'
import AddToCartButton from '../button/AddToCartButton'

const Item = ({ item }) => {
    return (
        <div className='w-[48%] md:w-[32.7%] p-2 overflow-hidden h-[320px] md:h-[430px] border bg-white rounded-md shadow shadow-gray-400'>
            <div className='md:w-[230px] w-[150px] h-[150px] md:h-[230px] flex items-center justify-center mt-6 rounded-full mx-auto overflow-hidden'>
            <ItemImage style={''} item={item}/>
            </div>
            <div className='w-full  text-sm '>
                <p className='font-semibold text-gray-700 font-bold mt-5'>{item?.name}</p>
                <p className='font-semibold mt-3 text-gray-500 text-[1.2rem]'>€{item?.price}</p>
                <AddToCartButton {...{item, style:'!w-full mt-4 md:mt-6'}}/>
            </div>
        </div>
    )
}

export default Item