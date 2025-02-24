import Image from '../../../components/image/Image'
import { Button } from '../../../components/button/Button'
import { IoCartOutline } from "react-icons/io5";


const ShortDetails = () => {
    return (
        <div className='w-full p-6 flex flex-col md:flex-row justify-between bg-secondary relative md:h-[200px] h-[500px] mt-20 mb-10 rounded-md'>
           
            <div className='md:w-[48%] w-full flex flex-col'>
                <p >We specialize in delicious African dishes and freshly baked pastries,
                    bringing you rich flavors and authentic recipes from across the continent.
                    Come dine with us and experience the warmth of African cuisine!
                </p>
                <Button className={'w-full md:w-36 !rounded-full justify-center gap-3 py-3 flex mt-4 font-semibold items-center'}>
                    Order now 
                    <IoCartOutline className='text-xl '/>
                </Button>
            </div>
            <div className='md:w-[460px] md:h-[500px] md:absolute right-0 md:-translate-y-1/2 md:top-1/2'>
                <Image src={'/images/food.png'} />
            </div>
        </div>
    )
}

export default ShortDetails