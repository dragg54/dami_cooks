/* eslint-disable react/prop-types */
import { Form, Formik } from 'formik'
import AddButton from '../button/AddButton'
import BackButton from '../button/BackButton'
import Response from '../Response'

const FormContainer = ({ children, title, handleSubmit, initialValues, responseStatus }) => {
  return (
    <div className='w-full rounded-md p-4 bg-white h-auto'>
      <h1 className='font-semibold text-lg'>{title}</h1>
      <div className='my-3 border w-full border-gray-200'></div>
      <Formik initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm)
        }}>
        <Form className="w-full p-2 md:p-4 bg-white flex flex-col md:grid grid-cols-1 md:grid-cols-3 items-center gap-x-3 gap-y-2 ">
          {children}
          <Response {...{responseStatus}} style={'md:col-span-3 mt-5'}/>
          <div className='mt-6 border-t pt-4 flex justify-end md:col-span-3  gap-3'>
            <BackButton />
            <AddButton type='submit' />
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default FormContainer