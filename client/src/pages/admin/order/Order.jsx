/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import FormContainer from "@/components/form/FormContainer"
import SelectInput from "@/components/input/SelectInput"
import TextInput from "@/components/input/TextInput"
import { Euro } from "@/constants/Currency"
import { useEffect, useMemo, useState } from "react"
import * as Yup from 'yup'
import { FetchAllItems } from "../item/api/FetchAllItems"
import { Button } from "@/components/button/Button"
import { CreateOrder } from "./api/CreateOrder"

const Order = () => {
    const [responseStatus, setResponseStatus] = useState()
    const [newOrderItem, setNewOrderItem] = useState()
    const [itemOptions, setItemOptions] = useState([])
    const [isAdded, setIsAdded] = useState(false)
    const [newOrderItems, setNewOrderItems] = useState([])
    const [initialValues, setInitialValues] = useState({
        customerName: null,
        customerPhone: null,
        quantity: 0,
    })
    const [selectValues, setSelectValues] = useState({
        item: { label: "", value: "", price: 0 },
    })

    const { data: items } = FetchAllItems({ filters: {} })
    const orderMutation = CreateOrder({setResponseStatus})
    const validationSchema = Yup.object({
        customerName: Yup.string().required("Customer Name is required"),
        quantity: Yup.number().min(1).required("Quantity is required"),
    })

    useEffect(() => {
        const options = []
        items?.rows?.forEach((item) => {
            options.push({ label: item.name, value: item.id, price: item.price })
        })
        setItemOptions(options)
    }, [items])

    const handleSubmit = (values, resetForm) => {
        if(selectValues?.item?.label.length <  1){
            setResponseStatus(400)
            return
        }
        setNewOrderItem({ ...values, item: selectValues.item })
        setInitialValues({ ...values, item: null, quantity: 0 })
        setSelectValues({
        item: { label: "", value: "", price: 0 },
    })
        setIsAdded(true)
        resetForm()
    }


 const calculateTotalPrice = () => {
  return newOrderItems.reduce((sum, item) => {
    const price = Number(item?.item?.price || 0)
    const qty = Number(item?.quantity || 0)
    return sum + price * qty
  }, 0)
}

const handleSubmitOrder = () =>{
    let formData = {}
    formData.customerName = newOrderItems[0].customerName,
    formData.customerPhone = newOrderItems[0].customerPhone
    formData.orderItems = []

    for(let item of newOrderItems){
       formData.orderItems.push(
        {
            id: item.item.value,
            quantity: item.quantity
        })
    }
    orderMutation.mutate(formData)
}

    return (
        <div className="w-[90%] h-auto bg-white p-6 -mt-6">
            <FormContainer
                formStyle={'grid md:grid-cols-3 grid-cols-3 gap-x-3 gap-y-3'}
                {...{
                    title: "Create Order", handleSubmit,
                    initialValues, responseStatus, validationSchema
                }}>
                <div className="w-full">
                    <TextInput disabled={newOrderItems.length > 0} name='customerName' label='Customer Name' />
                </div>
                <div className="w-full">
                    <TextInput disabled={newOrderItems.length > 0} name='customerPhone' label='Customer Phone' />
                </div>
                <div className="w-full">
                    <SelectInput onChange={setSelectValues} options={itemOptions} selectedValues={selectValues} name='item' label='Item' />
                </div>
                <div className="w-full">
                    <TextInput type="number" name='quantity' label='Quantity' />
                </div>
            </FormContainer>
            <NewOrder {...{ newOrderItem,  newOrderItems, setNewOrderItems }} />
           {isAdded && <div className="mt-3 !rounded-full flex justify-between text-[!0.6rem] w-full">
               <span className="text-sm text-gray-700">Total Price: <Euro />{calculateTotalPrice()}</span>
                <Button onClick={()=> handleSubmitOrder()} className={' !rounded-md !bg-green-600 !text-gray-100  !text-[0.6rem]  !w-24 !font-bold !py-2 !px-1'}>Submit Order</Button>
            </div>
            }
        </div>
    )
}

const NewOrder = ({ newOrderItem , newOrderItems, setNewOrderItems}) => {
    useEffect(() => {
        if (newOrderItem) {
            setNewOrderItems(prev => [...prev, newOrderItem])
        }
    }, [newOrderItem])

    const handleRemove = (index) => {
        setNewOrderItems(prev => prev.filter((_, i) => i !== index))
    }

    return (
        <div className="w-full mt-3 text-[0.65rem] max-h-44 overflow-y-scroll border shadow-sm shadow-gray-300">
            <div className="w-full grid grid-cols-5 font-bold">
                <div className="p-2 border">Item</div>
                <div className="p-2 border">Quantity</div>
                <div className="p-2 border">Unit Price (<Euro />)</div>
                <div className="p-2 border">Total Item Price (<Euro />)</div>
                <div className="p-2 border"></div>
            </div>
            {newOrderItems.length < 1 && 
            <div className="mx-auto flex  justify-center p-3 text-gray-400">
                You've not added any item
            </div>
            }
            {newOrderItems?.map((itm, index) => {
                return (
                    <div key={index} className="w-full grid grid-cols-5 text-gray-500">
                        <div className="p-2 border">{itm?.item?.label}</div>
                        <div className="p-2 border">{itm?.quantity}</div>
                        <div className="p-2 border">{itm?.item?.price}</div>
                        <div className="p-2 border">{Number(itm?.item?.price) * itm.quantity}</div>
                        <div className="flex justify-center p-2 border">
                            <button
                                className="p-1 bg-red-400 px-4 font-bold rounded-md text-white text-[0.6rem]"
                                onClick={() => handleRemove(index)}
                            >
                                REMOVE
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Order
