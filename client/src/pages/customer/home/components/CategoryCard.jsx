/* eslint-disable react/prop-types */
import Image from '../../../../components/image/Image'

const CategoryCard = ({ img }) => {
  return (
    <div>
      <div className='w-[90px] border-red-200 rounded-full md:w-[250px] overflow-hidden md:h-[235px] h-[90px] border flex flex-col'>
        <Image src={img.image} />
      </div>
      <p className='mt-2 font-semibold text-center'>{img.name}</p>
    </div>
  )
}

export default CategoryCard