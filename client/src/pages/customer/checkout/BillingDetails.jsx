/* eslint-disable react/prop-types */
import TextInput from "../../../components/input/TextInput"
import * as Yup from 'yup'
import { Form, Formik } from "formik"
import { useState } from "react"

const BillingDetails = ({ deliveryDetails, setDeliveryDetails, shippingChargeResponse }) => {
const [phoneError, setPhoneError] = useState("");
const [emailError, setEmailError ] = useState("")

const ukPhoneRegex = /^(\+44|0)7\d{9}$/;
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
    setDeliveryDetails({ ...deliveryDetails, [e.target.name]: e.target.value })
     if (e.target.name == "phone") {
      const value = e.target.value.replace(/\s/g, ""); 
       if (!ukPhoneRegex.test(value)) {
        setPhoneError("Enter a valid UK phone number");
      } else {
        setPhoneError("");
      }
    }
    if(e.target.name == "email"){
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const value = e.target.value.replace(/\s/g, ""); 
       if (!emailRegex.test(value)) {
        setEmailError("Enter a valid email address");
      } else {
        setEmailError("");
      }
    }
  }

const isPickup = deliveryDetails?.deliveryMethod === 'pickup'
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
                value={deliveryDetails?.firstName || ""}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="w-full mb-3">
              <TextInput
                label={'Last Name'}
                name={'lastName'}
                value={deliveryDetails?.lastName || ""}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="w-full mb-3">
              <TextInput
                label={'Email'}
                name={'email'}
                errMsg={emailError}
                value={deliveryDetails?.email || ""}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="w-full mb-3">
              <TextInput
                label={'Phone'}
                name={'phone'}
                placeholder="+447XXXXXXXXX or 07XXXXXXXXX"
                value={deliveryDetails?.phone || ""}
                errMsg={phoneError}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="mb-6">
              <p className="font-medium mb-2">Delivery Method</p>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="pickup"
                    checked={deliveryDetails?.deliveryMethod === 'pickup'}
                    onChange={handleChange}
                  />
                  <span>Pickup</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="delivery"
                    checked={deliveryDetails?.deliveryMethod === 'delivery'}
                    onChange={handleChange}
                  />
                  <span>Home delivery</span>
                </label>
              </div>
            </div>

            <div className={`w-full mb-3 ${isPickup ? 'opacity-50' : ''}`}>
              <TextInput
                label="Delivery Address"
                name="address"
                value={deliveryDetails?.address || ""}
                onChange={handleChange}
                disabled={isPickup}
                errMsg={shippingChargeResponse == 500 && "Invalid address"}
              />
            </div>

            <div className={`w-full mb-3 ${isPickup ? 'opacity-50' : ''}`}>
              <TextInput
                label="Postal Code"
                name="postalCode"
                value={deliveryDetails?.postalCode}
                onChange={handleChange}
                disabled={isPickup}
              />
            </div>

            <div className={`w-full mb-3 ${isPickup ? 'opacity-50' : ''}`}>
              <TextInput
                label="Town / City"
                name="city"
                value={deliveryDetails?.city}
                onChange={handleChange}
                disabled={isPickup}
              />
            </div>
          </Form>
      )
        }
      </Formik>
    </div>)
}

export default BillingDetails