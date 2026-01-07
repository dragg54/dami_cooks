import { Button } from '@/components/button/Button'
import React from 'react'
import { MdOutlineDone } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const BookingQuotationDeclined = () => {
    const navigate = useNavigate()
    return (
        <div className="h-[370px] md:h-[400px] w-[90%] mt-4 md:w-1/2 mx-auto bg-white flex flex-col items-center p-10">
            <div className="p-4 rounded-full bg-primary"><MdOutlineDone className="text-[7rem] text-white" /></div>
            <p className="mt-4 text-gray-500 text-center">Booking quotation successfully declined and other arrangements will be cancelled.</p>
            <Button onClick={() => navigate("/")} className={'mt-12 w-full md:py-3'}>Go back home</Button>
        </div>
    )
}

export default BookingQuotationDeclined