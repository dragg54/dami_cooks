import { getScreenSize } from '@/utils/getScreenSize'
import React from 'react'
import { FaWhatsapp } from "react-icons/fa";


const ChatBox = () => {
    return(
      <div className='rounded-md p-2 bg-green-600 ml-auto flex items-center justify-center text-white fixed right-5 w-12 h-12 bottom-20'>
        <a
      href={`https://wa.me/447594970997`}
      target="_blank"
      rel="noopener noreferrer"
    >
        <FaWhatsapp className='text-3xl'/></a>
      </div>
    )
 }

export default ChatBox