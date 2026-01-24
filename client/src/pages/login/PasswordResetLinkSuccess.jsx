import React from 'react'
import { MdOutlineDone } from 'react-icons/md'

const PasswordResetLinkSuccess = () => {
  return (
    <div className='w-[300px] mx-auto mt-32 h-[270px] rounded-md bg-white p-6 flex flex-col justify-center'>
            <div className="p-2 w-12 h-12 mb-5 mx-auto flex items-center justify-center rounded-full bg-primary"><MdOutlineDone className="text-[5rem] text-white" /></div>
            <p className='text-gray-500 text-center'>
                Password reset email has been successfully sent
            </p>
        </div>
  )
}

export default PasswordResetLinkSuccess