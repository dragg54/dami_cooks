import { useUpdateData } from '../../../../hooks/api/useUpdateData'
import { closeModal } from '../../../../redux/GlobalModalSlice'
import { openPopup } from '../../../../redux/PopupSlice'
import { useDispatch } from 'react-redux'
import { useQueryClient } from 'react-query'
import { useState } from 'react'

const UpdatePassword = ({id, setError}) => {
    const queryClient = useQueryClient()
    const dispatch = useDispatch()
    const onSuccess = () => {
        queryClient.invalidateQueries("adminSettings")
        queryClient.invalidateQueries("admin")
        dispatch(closeModal())
        dispatch(openPopup({message: "Admin settings updated" }))
        setError("")
    }
    const onError = (err) =>{
        setError(err)
    }
    return useUpdateData({onSuccess, onError, url:`/users/${id}/password`})}

export default UpdatePassword