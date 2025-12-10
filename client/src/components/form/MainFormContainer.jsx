/* eslint-disable react/prop-types */
import { Field, Form, Formik } from 'formik'
import Response from '../Response'
import BackButton from '../button/BackButton'
import { Button } from '../button/Button'
import AddButton from '../button/AddButton'
import { useNavigate } from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux'
import { openModal } from '@/redux/GlobalModalSlice'
import Delete from './Delete'


const MainFormContainer = ({ children, title, handleSubmit, subTitle, initialValues, 
         validationSchema, style, handleDelete, formStyle, isUpdate, isLoading, responseStatus, actionButton }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  if(isUpdate == null || isUpdate == undefined){
    isUpdate = false
  }
  return (
    <div className={`${style} w-full bg-white rounded-lg  h-auto relative`}>
      <p className='font-semibold text-xl'>{title}</p>
      <small className='text-gray-500'>{subTitle || ""}</small>
      <div className='my-3 border w-full border-gray-200'></div>
      <Formik initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema ? validationSchema : null}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm)
        }}>
        <Form className={`${formStyle} p-2 bg-white`}>
          <div className={`${formStyle} col-span-full max-h-[300px] overflow-scroll`}>
               {children}
          </div>
        <div className='md:col-span-full sticky w-full'>
           <Response {...{ responseStatus, isLoading }} style={'md:col-span-3 mt-5'} />
            <div className={`${isUpdate && '!justify-between'} mt-6 border-t w-full pt-4 flex justify-end md:col-span-3  gap-3`}>
              <div className='flex items-center gap-3'>
                 <BackButton type="button" onClick={()=> navigate(-1)}/>
                {actionButton || (isUpdate ? <Button type='submit' className={'!w-[100px] !rounded-full !bg-gray-200 border !text-gray-700 !border-gray-700'}>Update</Button>:<AddButton type='submit' />)}
              </div>
              <div>
                {isUpdate && <Button type="button" onClick={()=> dispatch(openModal({component: <Delete {...{handleDelete}}/>}))} className={'!rounded-full flex items-center gap-2  !py-2'}>Delete <MdDelete /></Button>}
              </div>
            </div>
        </div>
        </Form>
      </Formik>
    </div>
  )
}

export default MainFormContainer