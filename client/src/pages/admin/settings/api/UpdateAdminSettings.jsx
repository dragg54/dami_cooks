import React from 'react'
import { useUpdateData } from '../../../../hooks/api/useUpdateData'
import { closeModal } from '../../../../redux/GlobalModalSlice'
import { openPopup } from '../../../../redux/PopupSlice'
import { useDispatch } from 'react-redux'
import { useQueryClient } from 'react-query'

const UpdateAdminSettings = () => {
    const queryClient = useQueryClient()
    const dispatch = useDispatch()
    const onSuccess = () => {
        queryClient.invalidateQueries("adminSettings")
        queryClient.invalidateQueries("admin")
        dispatch(closeModal())
        dispatch(openPopup({message: "Admin settings updated" }))
    }
    const onError = (err) =>{
        console.log(err)
    }
    return useUpdateData({onSuccess, onError, url:`/adminSettings`})}

export default UpdateAdminSettings