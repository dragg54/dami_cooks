/* eslint-disable react/prop-types */
import TextInput from "../../../components/input/TextInput"
import * as Yup from 'yup'
import { Form, Formik } from "formik"

const BillingDetails = ({ deliveryDetails, setDeliveryDetails }) => {

   const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    phone: Yup.string().required('Phone is required'),
    address: Yup.string().required('Address is required'),
    email: Yup.string().required('Email is required'),
    postalCode: Yup.string().required('Postal Code is required'),
    city: Yup.string().required('City is required')
  })

  const handleChange = (e) => {
    setDeliveryDetails({...deliveryDetails, [e.target.name]: e.target.value})
  }


  return (
    <div className="w-full bg-white md:w-1/2 mt-10 h-full md:mb-40 md:mr-8 border border-gray-300 shadow-md shadow-gray-300 rounded-md p-4 md:p-6">
      <h1 className=" font-semibold text-2xl my-2 border-b w-full pb-2 mb-2">Billing Details</h1>
      <Formik
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <Form>
            <div className="w-full mb-3 mt-5">
              <TextInput
                label={'First Name'}
                name={'firstName'}
                value={deliveryDetails?.firstName}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="w-full mb-3">
              <TextInput
                label={'Last Name'}
                name={'lastName'}
                value={deliveryDetails?.lastName}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="w-full mb-3">
              <TextInput
                label={'Email'}
                name={'email'}
                value={deliveryDetails?.email}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="w-full mb-3">
              <TextInput
                label={'Phone'}
                name={'phone'}
                value={deliveryDetails?.phone}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="w-full mb-3">
              <TextInput
                label={'Postal Code'}
                name={'postalCode'}
                value={deliveryDetails?.postalCode}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="w-full mb-3">
              <TextInput
                label={'Delivery Address'}
                name={'address'}
                value={deliveryDetails?.address}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="w-full mb-3">
              <TextInput
                label={'Town/City'}
                name={'city'}
                value={deliveryDetails?.city}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </Form>)
        }
      </Formik>
    </div>)
}

export default BillingDetails