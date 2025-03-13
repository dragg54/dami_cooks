import { useState } from 'react'
import Item from '../../../components/Item/Item'
import Hero from '../../../components/layout/Hero'
import { FetchItems } from './api/fetchItems'
import Category from './components/Category'
import Reviews from './Reviews'
import ShortDetails from './ShortDetails'

const Home = () => {
  const [filters, setFilters] = useState({ page: 1, size: 10, status: "ONLINE" })
  const itemData = FetchItems({ filters })
  console.log(itemData)
  return (
    <section>
      <div className='w-full px-4 bg-white p-4'>
        <Hero />
        <div className='border p-3'>
          <h1 className='font-semibold mb-3 mt-6 md:mt-3 text-[1.5rem]'>Categories</h1>
          <Category />
        </div>
        <div className='mt-8 flex gap-2 justify-between md:justify-start flex-wrap'>
          {
            itemData?.rows?.map((item) => (
              <Item item={item} key={item.id} />
            ))
          }
        </div>
        <ShortDetails />
        <Reviews />
      </div>
    </section>
  )
}

export default Home