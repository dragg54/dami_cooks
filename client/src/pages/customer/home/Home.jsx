import { useState } from 'react'
import Item from '../../../components/Item/Item'
import Hero from '../../../components/layout/Hero'
import { FetchItems } from './api/fetchItems'
import Category from './components/Category'
import Reviews from './Reviews'
import ShortDetails from './ShortDetails'
import { motion } from "framer-motion";
import Pagination from '../../../components/Pagination'

const Home = () => {
  const [filters, setFilters] = useState({ page: 1, size: 10, status: "ONLINE" })
  const itemData = FetchItems({ filters })
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative md:pb-20"
      >
        <div className='w-full px-2'>
        <Hero />

        </div>
        <div className='w-full p-2 mt-4 rounded-md'>
        <motion.div
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }} className='border rounded-md shadow-md shadow-gray-300  bg-white p-2 md:p-3 '>
          <h1 className='font-semibold mb-5 mt-4 md:mt-3 md:text-[1.5rem] text-center '>Categories</h1>
          <Category />
        </motion.div>
        <h1 className='font-semibold mb-2 mt-10 text-[1.3rem] md:text-[1.5rem] text-center '>All Items</h1>
        <motion.div
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }} className='mt-2 flex gap-2 justify-between p-2 py-4 rounded-md md:justify-start flex-wrap'>
          {
            itemData?.rows?.map((item) => (
              <Item item={item} key={item.id} />
            ))
          }
        </motion.div>
          <div className='mx-auto w-full flex justify-center -mt-3'>
          <Pagination currentPage={1} totalPages={2} showLabel={false} onPageChange={()=> null}/>
          </div>
        </div>
        <ShortDetails />
        <Reviews />
      </motion.div>
    </section>
  )
}

export default Home