import { useSelector } from "react-redux"
import FormContainer from "../../../components/form/FormContainer"
import TextInput from "../../../components/input/TextInput"

const BillingDetails = () => {
    const user = useSelector(state => state.user)
    const initialValues = {
        firstName : user?.user?.firstName,
        lastName: user?.user?.lastName,
        email: user?.user?.email,
        address: user?.user?.address
    }
  return (
<div className="w-full md:w-1/2 mt-10 h-full md:mb-40 md:mr-8 border border-gray-300 shadow-md shadow-gray-300 rounded-md p-4 md:p-6">
        <h1 className=" font-semibold text-2xl my-2">Billing Details</h1>
        <FormContainer style={'!p-0'}  initialValues={initialValues}>
          <div className="w-full mb-3">
            <TextInput
              label={'First Name'}
              name={'firstName'}
            />
          </div>
          <div className="w-full mb-3">
            <TextInput
              label={'Last Name'}
              name={'lastName'}
            />
          </div>
          <div className="w-full mb-3">
            <TextInput
              label={'Email'}
              name={'email'}
            />
          </div>
          <div className="w-full mb-3">
            <TextInput
              label={'Postal Code'}
              name={'postalCode'}
            />
          </div>
          <div className="w-full mb-3">
            <TextInput
              label={'Delivery Address'}
              name={'address'}
            />
          </div>
        </FormContainer>
      </div>  )
}

export default BillingDetails