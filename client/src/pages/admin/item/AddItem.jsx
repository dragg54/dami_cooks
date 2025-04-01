import FormContainer from "../../../components/form/FormContainer"
import TextInput from "../../../components/input/TextInput"
import Select from "../../../components/input/SelectInput"
import { useState } from "react"
import FileInput from "../../../components/input/FileInput"
import NumberInput from "../../../components/input/NumberInput"
import { PostItem } from "./api/PostItem"
import * as Yup from 'yup'
import OrderSwitch from "../../../components/input/Switch"
import { FetchItemCategories } from "./api/FetchItemCategories"


const AddItem = () => {
    const [selectValues, setSelectValues] = useState({
        itemType: { label: "", value: "" },
        itemCategory: { label: "", value: "" }
    })
    const [responseStatus, setResponseStatus] = useState()
    const [file, setFile] = useState()
    const { mutate, isError, isLoading } = PostItem({ setResponseStatus })
    const [status, setStatus] = useState(null);
    const {data: categoryData} = FetchItemCategories({})


    const handleSubmit = (values, resetForm) => {
        setResponseStatus(null)
        const updatedValues = { ...values, itemCategoryId: selectValues.itemCategory.value, itemType: selectValues.itemType.value }
        const formData = new FormData()
        formData.append('image', file);
        formData.append('name', updatedValues.name);
        formData.append('description', updatedValues.description);
        formData.append('price', updatedValues.price);
        formData.append('itemType', updatedValues.itemType);
        formData.append('uom', updatedValues.uom);
        formData.append('itemCategoryId', updatedValues.itemCategoryId);
        formData.append('status', status)
        mutate(formData, { resetForm, setFile })
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("Item Name is required"),
        description: Yup.string().required("Item Description is required"),
        uom: Yup.string().required("Unit of Measurement is required"),
        price: Yup.number().min(0.1, "Item price must be greater than 0")
    });

    const initialValues = {
        name: "",
        description: "",
        uom: "",
        price: 0
    }

    const categorySelections = categoryData?.map((cat)=>({
        label: cat.name,
        value: cat.id
    }))

    return (
        <div className="w-[100%] md:w-4/5 md:h-[550px] overflow-y-hidden p-4 md:p-8 bg-white">
            <FormContainer
                formStyle={'grid md:grid-cols-3 grid-cols-2 gap-x-3 gap-y-3'}
                {...{
                    title: "Add Item", handleSubmit, isLoading,
                    initialValues, responseStatus, validationSchema, isError, setFile
                }}>
                <div className="w-full ">
                    <TextInput name='name' label='Item Name' />
                </div>
                <div className="w-full  md:mb-0">
                    <Select name="itemCategory" label={'Select Category'} options={categorySelections} selectedValue={selectValues} onChange={setSelectValues} />
                </div>
                <div className="w-full  md:mb-0">
                    <TextInput name='uom' label='Unit of Measurement' />
                </div>
                <div className="w-full  md:mb-0">
                    <TextInput name='description' label='Description' />
                </div>
                <div className="w-full  md:mb-0">
                    <Select name="itemType" label={'Select Item Type'} options={[{ label: "Main Item", value: "MAIN_ITEM" }, { label: "Sub Item", value: "SUB_ITEM" }]} selectedValue={selectValues} onChange={setSelectValues} />
                </div>
                <div className="w-full md:mb-0">
                    <p className="mb-2 text-sm md:text-base">
                     Item Image
                    </p>
                    <FileInput onFileSelect={setFile} file={file} />
                </div>
                <div className="w-full  md:mb-0">
                    Price
                    <NumberInput name={'price'} />
                </div>
                <div className="flex flex-col items-center md:mb-5 md:-ml-40 ">
                    Active
                    <OrderSwitch {...{leftLabel:'OFFLINE', rightLabel: "ONLINE", status, setStatus}}/>
                </div>
            </FormContainer>
        </div >
    )
}

export default AddItem