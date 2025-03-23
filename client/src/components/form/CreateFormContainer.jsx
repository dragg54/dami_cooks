/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import { Children } from "react"
import AddButton from "../button/AddButton"
import BackButton from "../button/BackButton"
import Response from "../Response"
import FormContainer from "./FormContainer"
import { useNavigate } from "react-router-dom"

const CreateFormContainer = ({ children, responseStatus, isLoading, title, handleSubmit,
                 initialValues, validationSchema, style, formStyle
      }) => {
        const navigate = useNavigate()
    return (
        <div className="w-full flex flex-col  items-center gap-x-3 gap-y-2">
            <FormContainer children={children} {...{style, formStyle, title,
                 handleSubmit, initialValues, validationSchema}}/>
            <Response {...{ responseStatus, isLoading }} style={'md:col-span-3 mt-5'} />
            <div className='mt-6 border-t w-full pt-4 flex justify-end md:col-span-3  gap-3'>
                <BackButton onClick={()=> navigate(-1)}/>
                <AddButton type='submit' />
            </div>
        </div>
    )
}

export default CreateFormContainer