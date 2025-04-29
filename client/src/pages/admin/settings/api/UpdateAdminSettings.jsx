import React from 'react'
import { useUpdateData } from '../../../../hooks/api/useUpdateData'
import { closeModal } from '../../../../redux/GlobalModalSlice'
import { openPopup } from '../../../../redux/PopupSlice'
import { useDispatch } from 'react-redux'

const UpdateAdminSettings = () => {
    const dispatch = useDispatch()
    const onSuccess = () => {
        dispatch(closeModal())
        dispatch(openPopup({message: "Admin settings updated" }))
    }
    const onError = (err) =>{
        console.log(err)
    }
    return useUpdateData({onSuccess, onError, url:`/adminSettings`})}

export default UpdateAdminSettings