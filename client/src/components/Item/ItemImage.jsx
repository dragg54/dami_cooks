import Image from '../image/Image'

const ItemImage = () => {
    return (
        <div className='h-[170px] md:h-[230px] w-full'>
            <Image style={'object-cover'} src={'/images/rice.jpg'} />
        </div>
    )
}

export default ItemImage