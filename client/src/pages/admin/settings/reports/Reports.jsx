import { useEffect, useState } from "react"
import SelectInput from "../../../../components/input/SelectInput"
import { Button } from "../../../../components/button/Button"
import FetchAdminSettings from "../api/FetchAdminSettings"
import { useDispatch } from "react-redux"
import { openModal } from "../../../../redux/GlobalModalSlice"
import ConfirmChanges from "../ConfirmChanges"
import UpdateAdminSettings from "../api/UpdateAdminSettings"

const Reports = () => {
    const { data: adminSettings, isLoading } = FetchAdminSettings()
    const dispatch = useDispatch()
    const [selectValues, setSelectValues] = useState({
        orderReportFrequency: { label: "Monthly", value: "monthly" },
        paymentReportFrequency: { label: "Monthly", value: "monthly" }
    })
    const mutateAdminSettings  = UpdateAdminSettings()
    const options = [{ label: "Daily", value: "daily" }, { label: "Weekly", value: "weekly" }, { label: "Monthly", value: "monthly" }]
    const handleUpdateAdminSettings = () => {
        mutateAdminSettings.mutate({
            orderReportFrequency: selectValues.orderReportFrequency.value,
            paymentReportFrequency: selectValues.paymentReportFrequency.value
        })
    }
  useEffect(() => {
        setSelectValues({
            orderReportFrequency: {label: options.find(x=> adminSettings?.orderReportFrequency == x.value)?.label, value: adminSettings?.orderReportFrequency},
            paymentReportFrequency: {label: options.find(x=> adminSettings?.paymentReportFrequency == x.value)?.label, value: adminSettings?.paymentReportFrequency}
        })
    }, [adminSettings, isLoading])
    return (
        <div className="w-full p-6">
            <h1 className="text-xl">Reports</h1>
            <p className="text-gray-500 mt-1">This allows to you to schedule the period you want your reports to be sent</p>
            <div className="mt-5">
                <form action="" className="w-[50%] flex flex-col gap-3">
                    <SelectInput onChange={setSelectValues} selectedValue={selectValues} options={options} name={"orderReportFrequency"} label={"Order Report"} />
                    <SelectInput onChange={setSelectValues} selectedValue={selectValues} options={options} name={"paymentReportFrequency"} label={"Payment Report"} />
                </form>
            </div>
            <div className=" flex justify-center w-[460px]">
                <Button onClick={() => dispatch(openModal({ component: <ConfirmChanges updateChanges={() => handleUpdateAdminSettings()} /> }))
                } className={"!rounded-full w-[100px] mt-12 ml-auto"}>Save</Button>
            </div>
        </div>
    )
}

export default Reports