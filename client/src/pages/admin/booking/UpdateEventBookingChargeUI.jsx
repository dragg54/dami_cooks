import { useState } from 'react'
import FormContainer from '../../../components/form/FormContainer'
import { UpdateEventBookingCharge } from './api/UpdateEventBookingCharge'
import * as Yup from 'yup'
import TextInput from '../../../components/input/TextInput'
import { useLocation } from 'react-router-dom'
import { openModal } from '@/redux/GlobalModalSlice'
import BookingChargeModal from './BookingChargeModal'
import { useDispatch } from 'react-redux'
import { Button } from '@/components/button/Button'

const UpdateEventBookingChargeUI = () => {
  const [responseStatus, setResponseStatus] = useState()
  const [bookingCharge, setBookingCharge ] = useState(0)
  const [bookingItems, setBookingItems ] = useState([])
  const dispatch = useDispatch()
  const location = useLocation()
  const state = location.state
  const booking = state?.row
  const { mutate, isError, isLoading } = UpdateEventBookingCharge({ setResponseStatus, id:booking.id })
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    whatsapp: Yup.string().required("Whatsapp number is required"),
    mobileNumber: Yup.string().required("Mobile number is required"),
    eventType: Yup.string().required("Event Type is required"),
    guestCount: Yup.number().required("Guest count required"),
    eventDate: Yup.string().required("Event date required"),
    eventStartTime: Yup.string().required("Start time required"),
    eventEndTime: Yup.string().required("End time required"),
    eventLocation: Yup.string().required("Location required"),
    cateringType: Yup.string().required("Catering type required"),
    eventAddress: Yup.string().required("Event address is required"),
    bookingCharge: Yup.number().required("Booking charge is required"),
  })

    const initialValues = {
    name: booking?.name || "",
    email: booking?.email || "",
    whatsapp: booking?.whatsapp || "",
    mobileNumber: booking?.["Mobile Number"] || "",
    eventType: booking?.["Event Type"] || "",
    guestCount: booking?.["Guest Count"] || "",
    // eventDate: booking?.["Event Date"]
    //   ? new Date(booking["Event Date"]).toISOString().split("T")[0]
    //   : "",
    eventStartTime: booking?.["Event Start Time"] || "",
    eventEndTime: booking?.["Event End Time"] || "",
    eventLocation: booking?.["Event Location"] || "",
    cateringType: booking?.["Catering Type"] || "",
    eventAddress: booking?.["Event Address"] || "",
    dietaryRequirements: booking?.["Dietary Requirements"] || "",
    foodPackageReferences: booking?.["Food Package References"] || "",
    bookingCharge: bookingCharge,
    id: booking?.id || null, // Needed for update API
  }

  const handleSubmit = (values, resetForm) => {
    values.bookingItems = bookingItems
    values.eventBookingId = booking.id
    mutate(values)
  }

  const onSave = (charge, bookingItems) =>{
    setBookingCharge(charge)
    setBookingItems(bookingItems)
  }

  return (
    <div className="w-[100%] md:h-[610px] overflow-y-auto -mt-10 p-4 md:p-8 bg-white rounded-lg shadow-md shadow-gray-300">
      <FormContainer
        formStyle={'grid md:grid-cols-3 grid-cols-2 gap-x-3 gap-y-3'}
        {...{
          title: "Update Event Booking Charge",
          handleSubmit,
          isLoading,
          initialValues,
          actionButton: <Button disabled={bookingCharge == 0} className={`${bookingCharge == 0 && "bg-red-300"} cursor-pointer px-4 py-2 bg-primary z-10  w-full text-xs md:text-sm text-white
             rounded-3xl border hover:shadow-lg shadow-gray-600`}>Complete</Button>,
          responseStatus,
          // validationSchema,
          isError
        }}
      >
        <TextInput isReadonly={true} name='name' label='Name' />
        <TextInput isReadonly={true} name='email' label='Email' />
        <TextInput isReadonly={true} name='whatsapp' label='Whatsapp' />
        <TextInput isReadonly={true} name='mobileNumber' label='Mobile Number' />
        <TextInput isReadonly={true} name='eventType' label='Event Type' />
        <TextInput isReadonly={true} name='guestCount' label='Guest Count' />
        <TextInput isReadonly={true} name='eventDate' label='Event Date' type='date' />
        <TextInput isReadonly={true} name='eventStartTime' label='Start Time' type='time' />
        <TextInput isReadonly={true} name='eventEndTime' label='End Time' type='time' />
        <TextInput isReadonly={true} name='eventLocation' label='Event Location' />
        <TextInput isReadonly={true} name='cateringType' label='Catering Type' />
        <TextInput isReadonly={true} name='eventAddress' label='Event Address' />
        <TextInput isReadonly={true} name='dietaryRequirements' label='Dietary Requirements' />
        <TextInput isReadonly={true} name='foodPackageReferences' label='Food Package References' />

        {/* NEW FIELD */}
        <TextInput
          name="bookingCharge" 
         onClick={()=> dispatch(openModal({component: <BookingChargeModal {...{
             onSave,
             booking,
         }}/>}))}label='Booking Charge (₦)' type='number' />
      </FormContainer>
    </div>
  )
}

export default UpdateEventBookingChargeUI
