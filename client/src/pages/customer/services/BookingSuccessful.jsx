import { Button } from '@/components/button/Button'
import React from 'react'
import { MdOutlineDone } from 'react-icons/md'

const BookingSuccessful = () => {
    return (
        <div className='w-[300px] h-[270px] rounded-md bg-white p-6 flex flex-col justify-center'>
            <div className="p-2 w-12 h-12 mb-5 mx-auto flex items-center justify-center rounded-full bg-primary"><MdOutlineDone className="text-[5rem] text-white" /></div>
            <p className='text-gray-500'>
                Your booking request has been sent and will be reviewed shortly. We will update you once the process is complete.            </p>
            <Button className={'!rounded-full mt-10'}>Close</Button>
        </div>
    )
}

export default BookingSuccessful