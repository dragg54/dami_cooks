/* eslint-disable react/prop-types */
import React from 'react'
import { MdDelete } from 'react-icons/md'
import { Button } from '../button/Button'
import { useDispatch } from 'react-redux'
import { closeModal } from '@/redux/GlobalModalSlice'
import { useNavigate } from 'react-router-dom'

const Delete = ({handleDelete}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
  return (
    <div onClick={(e)=>e.stopPropagation()} className='w-[400px] h-[160px] bg-white rounded-md shadow shadow-gray-500 p-6 flex flex-col justify-center items-center'>
     <p className='text-lg text-gray-600 text-center'>Are you sure you want to delete this item?</p>
     <div className='flex gap-3 mt-5'>
        <Button onClick={()=>dispatch(closeModal())} className={'!bg-white !text-red-600 border border-red-500'}>Cancel</Button>
        <Button onClick={()=>{
            handleDelete()
        }} type="button" className={'flex items-center gap-2  !py-2'}>Delete <MdDelete /></Button>
     </div>
    </div>
  )
}

export default Delete