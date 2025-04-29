/* eslint-disable react/prop-types */
import { Field, Form, Formik } from 'formik'
import Response from '../Response'
import BackButton from '../button/BackButton'
import { Button } from '../button/Button'
import AddButton from '../button/AddButton'
import { useNavigate } from 'react-router-dom'

const MainFormContainer = ({ children, title, handleSubmit, subTitle, initialValues, validationSchema, style, formStyle, isUpdate, isLoading, responseStatus }) => {
  const navigate = useNavigate()
  return (
    <div className={`${style} w-full bg-white rounded-md h-auto`}>
      <p className='font-semibold text-xl'>{title}</p>
      <small className='text-gray-500'>{subTitle || ""}</small>
      <div className='my-3 border w-full border-gray-200'></div>
      <Formik initialValues={initialValues}
        validationSchema={validationSchema ? validationSchema : null}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm)
        }}>
        <Form className={`${formStyle} p-2 bg-white`}>
          {children}
          <Response {...{ responseStatus, isLoading }} style={'md:col-span-3 mt-5'} />
            <div className='mt-6 border-t w-full pt-4 flex justify-end md:col-span-3  gap-3'>
                <BackButton onClick={()=> navigate(-1)}/>
                {isUpdate ? <Button type='submit' className={'!w-[100px] !rounded-full'}>Update</Button>:<AddButton type='submit' />}
            </div>
        </Form>
      </Formik>
    </div>
  )
}

export default MainFormContainer