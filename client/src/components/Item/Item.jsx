import ItemImage from './ItemImage'
import { Button } from '../button/Button'

const Item = () => {
    return (
        <div className='w-[48%] md:w-[32.7%] h-[280px] md:h-[360px] border rounded-md shadow shadow-gray-400'>
            <ItemImage />
            <div className='w-full p-2 text-sm'>
            <p className='font-semibold text-gray-500'>Nigerian Jollof Rice</p>
            <p className='font-semibold'>€10</p>
            <Button className={'!rounded-full w-full mt-2 md:mt-5 py-3 font-semibold'}>
                Add to cart
            </Button>
            </div>
        </div>
    )
}

export default Item