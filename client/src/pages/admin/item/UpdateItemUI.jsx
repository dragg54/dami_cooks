import FormContainer from "../../../components/form/FormContainer"
import TextInput from "../../../components/input/TextInput"
import Select from "../../../components/input/SelectInput"
import { useEffect, useState } from "react"
import FileInput from "../../../components/input/FileInput"
import NumberInput from "../../../components/input/NumberInput"
import * as Yup from 'yup'
import { useLocation } from "react-router-dom"
import { extractFileNameFromFileURL } from "../../../utils/extractFileNameFromFileURL"
import { UpdateItem } from "./api/UpdateItem"
import OrderSwitch from "../../../components/input/Switch"
import { FetchAllAllergens } from "../allergens/api/FetchAllAllergens"
import { DeleteItem } from "./api/DeleteItem"


const UpdateItemUI = () => {
    const [responseStatus, setResponseStatus] = useState()
    const [allergenOptions, setAllergenOptions] = useState()
    const state = useLocation().state
    const { data: allergens, refetch, allergenLoading } = FetchAllAllergens({})
    const [selectValues, setSelectValues] = useState({
        itemType: { label: "Main Item", value: "MAIN_ITEM" },
        itemCategory: { label: state?.row["Item Category"]?.name || "", value: state?.row["Item Category"]?.id || null },
        allergens: state?.row?.allergens?.map((allergen)=> (allergen.itemAllergen?.allergenId?.toString())) || []
    })

    const initialValues = {
        id: state?.row?.id,
        name: state?.row["name"],
        uom: state?.row["uom"],
        description: state?.row.description,
        imageUrl: state?.row.imageUrl,
        status: state?.row.status,
        price: state?.row["Price £"],
        itemType: state?.row.itemType,
        itemCategory: state?.row["Item Category"],
        unitQuantity: state?.row["Unit Quantity"]

        // itemCategoryId: state?.row["name"]
    }
    const [file, setFile] = useState()
    const { mutate, isError, isLoading } = UpdateItem({ setResponseStatus, id: initialValues?.id })
    const { mutate:deleteItemMutation } = DeleteItem({setResponseStatus, id: initialValues?.id})
    const [status, setStatus] = useState(initialValues.status);
    useEffect(() => {
        const options = []
        allergens?.forEach((allergen) => {
            options.push({ label: allergen.name, value: allergen.id })
        })
        setAllergenOptions(options)
    }, [allergens])

    const handleSubmit = (values, resetForm) => {
        console.log(values)
        setResponseStatus(null)
        const updatedValues = { ...values, itemCategoryId: selectValues?.itemCategory?.value, itemType: selectValues.itemType.value }
        const formData = new FormData()
        const { row } = state
        formData.append('image', file);
        formData.append('imageUrl', row.imageUrl)
        formData.append('name', updatedValues.name || row.name);
        formData.append('unitQuantity', updatedValues.unitQuantity || row.unitQuantity);
        formData.append('description', updatedValues.description || row.description);
        formData.append('price', updatedValues.price || row.price);
        formData.append('itemType', updatedValues.itemType || row.itemType);
        formData.append('uom', updatedValues.uom || row.uom);
        formData.append('itemCategoryId', updatedValues.itemCategoryId || row.itemCategoryId);
        formData.append("status", status)
        selectValues.allergens.forEach(allergen => {
            formData.append("allergenIds[]", allergen)
        })

        mutate(formData, { resetForm, setFile })
    }

    const handleDelete = () =>{
        deleteItemMutation()
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

    useEffect(()=>{
        const selValues = {}
        if(itemCategory){
            selValues.itemCategory = itemCategory?.find(x => x.value == initialValues?.itemCategory?.id) || selectValues.itemCategory
        }
         if(itemTypes){
            selValues.itemType = itemTypes?.find(x => x.value == initialValues?.itemType?.id) || "MAIN_ITEM"
        }
        setSelectValues({...selectValues, ...selValues})
    }, [])


    return (
        <div className="w-[100%] -mt-10 md:w-4/5 md:h-[580px] overflow-y-hidden p-4 md:p-8 bg-white">
            <FormContainer
                isUpdate={true}
                formStyle={'grid md:grid-cols-3 grid-cols-2 gap-x-3 gap-y-3'}
                {...{
                    title: "Update Item", handleSubmit, isLoading, handleDelete,
                    initialValues, responseStatus, validationSchema, isError, setFile
                }}>
                <div className="w-full ">
                    <TextInput name='name' label='Item Name' />
                </div>
                <div className="w-full  md:mb-0">
                    <Select name="itemCategory" label={'Select Category'} options={[{ label: "Meal", value: "1" }, { label: "Pastry", value: "2" }]}
                        selectedValues={selectValues }
                        onChange={setSelectValues} />
                </div>
                <div className="w-full  md:mb-0">
                    <TextInput name='uom' label='Unit of Measurement' />
                </div>
                <div className="w-full  md:mb-0">
                    <TextInput name='description' label='Description' />
                </div>
                <div className="w-full  md:mb-0">
                    <Select name="itemType" label={'Select Item Type'} options={[{ label: "Main Item", value: "MAIN_ITEM" }, { label: "Sub Item", value: "SUB_ITEM" }]} selectedValues={selectValues} onChange={setSelectValues} />
                </div>
                <div className="w-full  md:mb-0">
                    <Select
                        isMultiple={true}
                        name="allergens"
                        label={'Select Allergens'}
                        selectedValues={selectValues}
                        setSelectedValues={setSelectValues}
                        options={allergenOptions}
                    />
                </div>
                <div className="w-full md:mb-0">
                    <p className="mb-2 text-sm md:text-base">
                        Item Image
                    </p>
                    <FileInput imageName={extractFileNameFromFileURL(state?.row?.imageUrl)} onFileSelect={setFile} file={file} />
                </div>
                <div className="w-full  md:mb-0">
                    Unit Quantity
                    <NumberInput name={'unitQuantity'} />
                </div>
                <div className="w-full  md:mb-0">
                    Price
                    <NumberInput name={'price'} />
                </div>
                <div className="flex flex-col items-center md:mb-5 md:-ml-40 ">
                    Active
                    <OrderSwitch {...{ leftLabel: 'OFFLINE', rightLabel: "ONLINE", status, setStatus }} />
                </div>
            </FormContainer >
        </div >
    )
}

export default UpdateItemUI