import Item from '../../../components/Item/Item'
import Category from './components/Category'
import Reviews from './Reviews'
import ShortDetails from './ShortDetails'

const Home = () => {
  return (
    <div className='w-full px-4'>
      <h1 className='font-semibold mb-3 mt-6 md:mt-3 text-[1.5rem]'>Categories</h1>
      <Category />
      <div className='mt-8 flex gap-2 justify-between md:justify-start flex-wrap'>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
      <ShortDetails />
      <Reviews />
    </div>
  )
}

export default Home