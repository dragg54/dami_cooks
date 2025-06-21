import { useState } from 'react'
import FormContainer from '../../../components/form/FormContainer'
import { PostAllergen } from './api/PostAllergen'
import { FetchAllAllergens } from './api/FetchAllAllergens'
import * as Yup from 'yup'
import TextInput from '../../../components/input/TextInput'
import { useLocation } from 'react-router-dom'
import { UpdateAllergen } from './api/UpdateAllergen'
import { DeleteAllergen } from './api/DeleteAllergen'

const UpdateAllergenUI = () => {
    const [responseStatus, setResponseStatus] = useState()
    const { mutate, isError, isLoading } = UpdateAllergen({ setResponseStatus })
     const state = useLocation().state
     
    const initialValues = {
        id: state?.row.id,
        name: state?.row["name"]
    }
    const { mutate:deleteAllergenMutation } = DeleteAllergen({setResponseStatus, id: initialValues?.id})
    const validationSchema = Yup.object({
        name: Yup.string().required("Item Name is required")
    })

    const handleSubmit = (values, resetForm) => {
        mutate(values)
        resetForm()
    }

    const handleDelete = () =>{
        deleteAllergenMutation()
    }
    return (
        <div className="w-[100%] md:w-4/5 md:h-[550px] overflow-y-hidden p-4 md:p-8 bg-white">
            <FormContainer
                formStyle={'grid md:grid-cols-3 grid-cols-2 gap-x-3 gap-y-3'}
                {...{
                    title: "Update Item", handleSubmit, isLoading, isUpdate: true, handleDelete,
                    initialValues, responseStatus, validationSchema, isError
                }}>
                    <div className="w-full ">
                    <TextInput name='name' label='Name' />
                </div>
            </FormContainer>
        </div>
    )
}

export default UpdateAllergenUI