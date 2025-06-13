/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import Image from '../image/Image'

const ItemImage = ({item, style}) => {
    const navigate = useNavigate()
    return (
        <div className={`${style} object-contain overflow-hidden h-[170px] md:h-[230px] md:w-[230px] w-full `} onClick={()=>{
          navigate(`/itemDetails/${item?.id}`, {state: {item}})
        }}>
            <Image style={''} src={item?.imageUrl} />
        </div>
    )
}

export default ItemImage