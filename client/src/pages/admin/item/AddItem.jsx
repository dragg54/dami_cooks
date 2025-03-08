import { Form, Formik } from "formik"
import FormContainer from "../../../components/form/FormContainer"
import TextInput from "../../../components/input/TextInput"
import Select from "../../../components/input/SelectInput"
import { useState } from "react"
import FileInput from "../../../components/input/FileInput"
import NumberInput from "../../../components/input/NumberInput"
import { PostItem } from "./api/PostItem"
import BackButton from "../../../components/button/BackButton"
import AddButton from "../../../components/button/AddButton"

const AddItem = () => {
    const [selectValues, setSelectValues] = useState({
        itemType: { label: "", value: "" },
        itemCategory: { label: "", value: "" }
    })
    const [responseStatus, setResponseStatus ] = useState()
    const [file, setFile] = useState()
    const { mutate, isLoading, error } = PostItem({setResponseStatus})

    const handleSubmit = (values, resetForm) => {
        const updatedValues = { ...values, itemCategoryId: selectValues.itemCategory.value, itemType: selectValues.itemType.value }
        const formData = new FormData()
        formData.append('image', file);
        formData.append('name', updatedValues.name);
        formData.append('description', updatedValues.description);
        formData.append('price', updatedValues.price);
        formData.append('itemType', updatedValues.itemType);
        formData.append('uom', updatedValues.uom);
        formData.append('itemCategoryId', updatedValues.itemCategoryId);

        mutate(formData)

        setFile()
    }

    const initialValues = {
        name: "",
        description: "",
        uom: "",
        price: 0
    }


    return (
        <div className="w-[100%] md:w-4/5 h-screen overflow-y-scroll">
            <FormContainer {...{ title: "Add Item", handleSubmit, initialValues, responseStatus }}>
                <div className="w-full mb-2">
                    <TextInput name='name' label='Item Name' />
                </div>
                <div className="w-full mb-2 md:mb-0">
                    <Select name="itemCategory" label={'Select Category'} options={[{ label: "Meal", value: "1" }, { label: "Pastry", value: "2" }]} selectedValue={selectValues} onChange={setSelectValues} />
                </div>
                <div className="w-full mb-2 md:mb-0">
                    <TextInput name='uom' label='Unit of Measurement' />
                </div>
                <div className="w-full mb-2 md:mb-0">
                    <TextInput name='description' label='Description' />
                </div>
                <div className="w-full mb-2 md:mb-0">
                    <Select name="itemType" label={'Select Item Type'} options={[{ label: "Main Item", value: "MAIN_ITEM" }, { label: "Sub Item", value: "SUB_ITEM" }]} selectedValue={selectValues} onChange={setSelectValues} />
                </div>
                <div className="w-full mb-2 md:mb-0">
                    Item Image
                    <FileInput onFileSelect={setFile} />
                </div>
                <div className="w-full mb-2 md:mb-0">
                    Price
                    <NumberInput name={'price'}/>
                </div>
        </FormContainer>
        </div >
    )
}

export default AddItem