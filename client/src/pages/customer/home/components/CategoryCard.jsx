/* eslint-disable react/prop-types */
import Image from '../../../../components/image/Image'

const CategoryCard = ({ img }) => {
  return (
    <div>
      <div className='w-[60px] border-red-200 rounded-full md:w-[150px] p-3 overflow-hidden md:h-[150px] h-[60px] border flex flex-col'>
        <Image src={img.image} />
      </div>
      <p className='mt-2 font-semibold text-center'>{img.name}</p>
    </div>
  )
}

export default CategoryCard