import React from 'react'
import Image from './image/Image'
import { format } from 'date-fns'

const Unavailable = ({nextAvailabilityTime}) => {
    console.log(nextAvailabilityTime)
  return (
    <div className='w-[370px] h-[300px] bg-white mx-auto rounded-md shadow-sm p-5 relative'>
       <Image src={'/images/unavailable.jpg'} style={'!h-32 !w-32 !mx-auto'}/>
       <p className='mt-20 absolute bottom-10 text-lg mx-auto mr-2 text-gray-700'>
         Sorry our wonderful customer. Dami Cooks is not available to take orders till
          <span className='text-green-500'> {(format(nextAvailabilityTime, 'dd MMM hh:mm a'))}</span>. Please bear with us.
       </p>
    </div>
  )
}

export default Unavailable