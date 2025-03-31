/* eslint-disable react/prop-types */
import Image from '../../../../components/image/Image'

const CategoryCard = ({ img, setSelectedCategory, category, refetch}) => {
  return (
    <div onClick={()=>{
      setSelectedCategory(img.name)
      refetch()
    }}>
      <div className={`cursor-pointer w-[70px] border-red-200 ${category == img.name && 'border-4'}
        rounded-full md:w-[150px] p-3 overflow-hidden md:h-[150px] h-[70px] border flex flex-col`}>
        <Image src={img?.image} />
      </div>
      <p className='mt-2 font-semibold text-center md:text-base text-sm'>{img?.name}</p>
    </div>
  )
}

export default CategoryCard