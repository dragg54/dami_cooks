import { Form, Formik } from "formik"
import FormContainer from "../../../components/form/FormContainer"
import TextInput from "../../../components/input/TextInput"
import Select from "../../../components/input/SelectInput"
import { useState } from "react"
import FileInput from "../../../components/input/FileInput"
import NumberInput from "../../../components/input/NumberInput"

const AddItem = () => {
    const [selectedCategory, setSelectedCategory ] = useState()
    const [file, setFile] = useState()

    return (
        <div className="w-[96%] md:w-4/5">
            <FormContainer {...{ title: "Add Item" }}>
                <Formik initialValues={{ name: "", email: "", message: "" }}
                    validationSchema={() => null}
                    onSubmit={(values, { resetForm }) => {
                        resetForm()
                    }}>
                    <Form className="w-full p-4 bg-white grid grid-cols-2 md:grid-cols-3 items-center gap-x-3 gap-y-2 ">
                        <div className="">
                            <TextInput name='name' label='Item Name' />
                        </div>
                        <div className="">
                        <Select label={'Select Category'} options = {[{label: "Meal", value: "meal"}, {label: "Pastry", value: "pastry"}]} selectedValue={selectedCategory} onChange={setSelectedCategory}/>
                        </div>
                        <div className="">
                            <TextInput name='Unit of Measurement' label='Unit of Measurement' />
                        </div>
                        <div className="col-span-2">
                            <TextInput name='description' label='Description' />
                        </div>
                        <div className="">
                            <Select label={'Select Item Type'} options = {[{label: "Meal", value: "meal"}, {label: "Pastry", value: "pastry"}]} selectedValue={selectedCategory} onChange={setSelectedCategory}/>
                        </div>
                        <div className="">
                            Item Image
                            <FileInput  onFileSelect={setFile} />
                        </div>
                        <div className="">
                            Price
                            <NumberInput />
                        </div>
                    </Form>
                </Formik>
            </FormContainer>
        </div>
    )
}

export default AddItem