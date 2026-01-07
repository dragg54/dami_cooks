/* eslint-disable react/prop-types */
import * as Yup from 'yup'
import { Form, Formik } from "formik"
import TextInput from '@/components/input/TextInput'

const BookingDetails = ({ bookingData }) => {
   const initialValues = bookingData

  return (
    <div className="w-full bg-white  h-auto  border border-gray-300 shadow-md shadow-gray-300 rounded-md p-4">
      <h1 className=" font-semibold text-2xl my-2 border-b w-full pb-2 mb-2">Booking Details</h1>
      <p className='text-gray-600'>{bookingData.bknId}</p>
      <Formik
        initialValues={initialValues}
      >
        {({ values }) => (
          <Form className='grid grid-cols-3 gap-4 mt-8'>
            <div className="w-full mb-3">
              <TextInput
                isReadonly={true}
                label={'Event Type'}
                name="eventType"
              />
            </div>
            <div className="w-full mb-3">
              <TextInput
                isReadonly={true}
                label={'Event Location'}
                name={'eventLocation'}
              />
            </div>
            <div className="w-full mb-3">
              <TextInput
                isReadonly={true}
                label={'Event Date'}
                name={'eventDate'}
              />
            </div>
          </Form>)
        }
      </Formik>
    </div>)
}

export default BookingDetails