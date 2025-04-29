import React, { useEffect, useState } from 'react'
import FormContainer from '../../../../components/form/FormContainer'
import TextInput from '../../../../components/input/TextInput'
import FetchAdmin from '../api/FetchAdmin'
import UpdateAdmin from '../api/UpdateAdmin'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { openModal } from '../../../../redux/GlobalModalSlice'
import ConfirmChanges from '../ConfirmChanges'

const UserManagement = () => {
  const dispatch = useDispatch()
  const {data, isLoading} = FetchAdmin()
  const {mutate} = UpdateAdmin(data?.id)

  const initialValues ={
    firstName: data?.firstName,
    lastName: data?.lastName,
    email: data?.email,
    phone: data?.phone   
  }


  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Email is required"),
    phone: Yup.string().length(9)
  })
  
  const updateChanges = (values) =>{
    mutate(values)
  }

  if(isLoading){
   console.log("Loading...")
  }

  
  return (
    <div className='p-8'>
      {!isLoading && data &&
        <FormContainer
        isUpdate={true}
        validationSchema={validationSchema}
        handleSubmit={(values)=>{
          dispatch(openModal({component: <ConfirmChanges updateChanges={()=>updateChanges(values)}/>}))
        }}
        initialValues={initialValues}
        formStyle={'grid md:grid-cols-3 grid-cols-2 gap-x-3 gap-y-3'}
                {...{
                    title: "User Management",
                    subTitle: "Manage admin profile"
                }}>
                <div className="w-full ">
                    <TextInput name='firstName' label='First Name'/>
                </div>
                 <div className="w-full ">
                    <TextInput name='lastName' label='Last Name' />
                </div>
                <div className="w-full ">
                    <TextInput  isReadonly={true} name='email'  label='Email' />
                </div>
                <div className="w-full  md:mb-0">
                    <TextInput name='phone' label='Phone Number' />
                </div>
        </FormContainer>
        }
    </div>
  )
}

export default UserManagement