import FormContainer from "../../../components/form/FormContainer"
import TextInput from "../../../components/input/TextInput"
import Select from "../../../components/input/SelectInput"
import { useState } from "react"
import FileInput from "../../../components/input/FileInput"
import NumberInput from "../../../components/input/NumberInput"
import * as Yup from 'yup'
import { useLocation } from "react-router-dom"
import { extractFileNameFromFileURL } from "../../../utils/extractFileNameFromFileURL"
import { UpdateItem } from "./api/UpdateItem"
import OrderSwitch from "../../../components/input/Switch"


const UpdateItemUI = () => {
    const [selectValues, setSelectValues] = useState({
        itemType: { label: "", value: "" },
        itemCategory: { label: "", value: "" }
    })

    const [responseStatus, setResponseStatus] = useState()
    const state = useLocation().state
    const initialValues = {
        id: state.id,
        name: state?.row["name"],
        uom: state?.row["uom"],
        description: state?.row.description,
        price: state?.row.price,
        imageUrl: state?.row.imageUrl,
        status: state?.row.status,
        itemType: state?.row.itemType

        // itemCategoryId: state?.row["name"]
    }
    const [file, setFile] = useState()
    const { mutate, isError, isLoading } = UpdateItem({ setResponseStatus,  id:state?.row?.id})
    const [status, setStatus] = useState(initialValues.status);

    
    const handleSubmit = (values, resetForm) => {
        setResponseStatus(null)
        const updatedValues = { ...values, itemCategoryId: selectValues.itemCategory.value, itemType: selectValues.itemType.value }
        const formData = new FormData()
        const {row} = state
        formData.append('image', file);
        formData.append('imageUrl', row.imageUrl)
        formData.append('name', updatedValues.name || row.name);
        formData.append('description', updatedValues.description || row.description);
        formData.append('price', updatedValues.price || row.price);
        formData.append('itemType', updatedValues.itemType || row.itemType);
        formData.append('uom', updatedValues.uom || row.uom);
        formData.append('itemCategoryId', updatedValues.itemCategoryId || row.itemCategoryId);
        formData.append("status", status)

        mutate(formData, { resetForm, setFile })
    }
    const validationSchema = Yup.object({
        name: Yup.string().required("Item Name is required"),
        description: Yup.string().required("Item Description is required"),
        uom: Yup.string().required("Unit of Measurement is required"),
        price: Yup.number().min(0.1, "Item price must be greater than 0")
    });
    const itemCategory = [
        {
            label: "Meal",
            value: 1
        },
        {
            label: "Pastry",
            value: 2
        },
        {
            label: "Soup",
            value: 3
        }
    ]
    const itemTypes = [{ label: "Main Item", value: "MAIN_ITEM" }, { label: "Sub Item", value: "SUB_ITEM" }]
    
    return (
        <div className="w-[100%] md:w-4/5 md:h-[550px] overflow-y-hidden p-4 md:p-8 bg-white">
            <FormContainer
                isUpdate = {true}
                formStyle={'grid md:grid-cols-3 grid-cols-2 gap-x-3 gap-y-3'}
                {...{
                    title: "Update Item", handleSubmit, isLoading,
                    initialValues, responseStatus, validationSchema, isError, setFile
                }}>
                <div className="w-full ">
                    <TextInput name='name' label='Item Name' />
                </div>
                <div className="w-full  md:mb-0">
                    <Select name="itemCategory" label={'Select Category'} options={[{ label: "Meal", value: "1" }, { label: "Pastry", value: "2" }]}
                     selectedValue={{itemCategory:itemCategory?.find(x => x.value == state?.row?.itemCategoryId) || selectValues}}
                       onChange={setSelectValues} />
                </div>
                <div className="w-full  md:mb-0">
                    <TextInput name='uom' label='Unit of Measurement' />
                </div>
                <div className="w-full  md:mb-0">
                    <TextInput name='description' label='Description' />
                </div>
                <div className="w-full  md:mb-0">
                    <Select name="itemType" label={'Select Item Type'} options={[{ label: "Main Item", value: "MAIN_ITEM" }, { label: "Sub Item", value: "SUB_ITEM" }]} selectedValue={{itemType:itemTypes?.find(x => x.value == state?.row?.itemType) || selectValues}} onChange={setSelectValues} />
                </div>
                <div className="w-full md:mb-0">
                    <p className="mb-2 text-sm md:text-base">
                     Item Image
                    </p>
                    <FileInput imageName={extractFileNameFromFileURL(state?.row?.imageUrl)} onFileSelect={setFile} file={file} />
                </div>
                <div className="w-full  md:mb-0">
                    Price
                    <NumberInput name={'price'} />
                </div>
                <div className="flex flex-col items-center md:mb-5 md:-ml-40 ">
                    Active
                    <OrderSwitch {...{leftLabel:'OFFLINE', rightLabel: "ONLINE", status, setStatus}}/>
                </div>
            </FormContainer >
        </div >
    )
}

export default UpdateItemUI