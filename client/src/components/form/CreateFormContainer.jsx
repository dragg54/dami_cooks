/* eslint-disable react/prop-types */
import AddButton from "../button/AddButton"
import BackButton from "../button/BackButton"
import Response from "../Response"
import FormContainer from "./FormContainer"

const CreateFormContainer = ({ responseStatus, isLoading}) => {
    return (
        <div className="w-full  flex flex-col md:grid grid-cols-1 md:grid-cols-3 items-center gap-x-3 gap-y-2">
            <FormContainer />
            <Response {...{ responseStatus, isLoading }} style={'md:col-span-3 mt-5'} />
            <div className='mt-6 border-t pt-4 flex justify-end md:col-span-3  gap-3'>
                <BackButton />
                <AddButton type='submit' />
            </div>
        </div>
    )
}

export default CreateFormContainer