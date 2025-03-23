/* eslint-disable react/prop-types */
import { Form, Formik } from 'formik'

const FormContainer = ({ children, title, handleSubmit, initialValues, validationSchema, style, formStyle }) => {
  return (
    <div className={`${style} w-full bg-white rounded-md h-auto`}>
      <h1 className='font-semibold text-lg'>{title}</h1>
      <div className='my-3 border w-full border-gray-200'></div>
      <Formik initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm)
        }}>
        <Form className={`${formStyle} p-2 bg-white`}>
          {children}
        </Form>
      </Formik>
    </div>
  )
}

export default FormContainer