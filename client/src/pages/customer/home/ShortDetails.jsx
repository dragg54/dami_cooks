import Image from '../../../components/image/Image'
import { Button } from '../../../components/button/Button'
import { IoCartOutline } from "react-icons/io5";
import { motion } from 'framer-motion';


const ShortDetails = () => {
    return (
        <motion.div
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true, amount: 0.2 }} 
        transition={{ duration: 0.6 }}
        className='w-full md:p-6 p-2 flex flex-col md:flex-row justify-between  relative md:h-[270px] h-[520px]  md:mt-10 mb-10 rounded-md'>
           <div className='bg-secondary rounded-md overflow-hidden  py-4'>
           <div className='md:w-[48%] p-4 md:p-6 w-full flex bg-secondary flex-col text-[#d01110]'>
                <p >We specialize in delicious African dishes and freshly baked pastries,
                    bringing you rich flavors and authentic recipes from across the continent.
                    Come dine with us and experience the warmth of African cuisine!
                </p>
                <Button className={'w-full md:w-36 !rounded-full justify-center gap-3 py-3 flex mt-4 font-semibold items-center'}>
                    Order now 
                    <IoCartOutline className='text-xl '/>
                </Button>
            </div>
            <div className='md:w-[460px] md:h-[300px]  md:absolute right-0 md:-translate-y-1/2 md:top-1/2'>
                <Image src={'/images/food.png'} />
            </div>
           </div>
        </motion.div>
    )
}

export default ShortDetails