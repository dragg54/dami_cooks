/* eslint-disable react/prop-types */
import React from 'react'
import { Button } from '../../../components/button/Button'
import { MdOutlineDone } from 'react-icons/md'

const UpdateOrderStatusResponse = ({ status }) => {
    return (
        <div className='w-[300px] h-[270px] rounded-md bg-white p-6 flex flex-col justify-center'>
            <div className="p-2 w-12 h-12 mb-5 mx-auto flex items-center justify-center rounded-full bg-primary"><MdOutlineDone className="text-[5rem] text-white" /></div>
            <p className='text-gray-500'>
                Order successfully {status == 'ACCEPT' ? 'accepted' : status == "SHIP" ? 'shipped' : 'rejected'} and  update will be sent to {"customer's"} email.
            </p>
            <Button className={'!rounded-full mt-10'}>Close</Button>
        </div>
    )
}

export default UpdateOrderStatusResponse