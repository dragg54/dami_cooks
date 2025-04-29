
import { useEffect, useState } from "react"
import { Button } from "../../../../components/button/Button"
import Switch from "../../../../components/input/Switch"
import FetchAdminSettings from "../api/FetchAdminSettings"
import UpdateAdminSettings from "../api/UpdateAdminSettings"
import { useDispatch } from "react-redux"
import { openModal } from "../../../../redux/GlobalModalSlice"
import ConfirmChanges from "../ConfirmChanges"

const Notification = () => {
    const { data: adminSettings, isLoading } = FetchAdminSettings()
    const dispatch = useDispatch()
    const [status, setStatus] = useState({
        sendOrderPlacementNotification: null,
        sendCancellationNotification: null,
        sendPaymentReportNotification: null,
        sendOrderReportNotification: null,
        sendPaymentNotification: null,
        sendNewOrderNotification: null

    })
    const mutateAdminSettings  = UpdateAdminSettings()
    useEffect(() => {
        setStatus({
            sendOrderPlacementNotification: adminSettings?.sendOrderPlacementNotification,
            sendCancellationNotification: adminSettings?.sendCancellationNotification,
            sendPaymentReportNotification: adminSettings?.sendPaymentReportNotification,
            sendOrderReportNotification: adminSettings?.sendOrderReportNotification,
            sendPaymentNotification: adminSettings?.sendPaymentNotification,
            sendNewOrderNotification: adminSettings?.sendNewOrderNotification
        })
    }, [adminSettings, isLoading])

    const handleUpdateAdminSettings = () => {
        mutateAdminSettings.mutate(status)
    }

    return (
        <div className="w-full p-6">
            <h1 className="font-semibold text-xl">Notifications</h1>
            <small className="text-gray-400">Personalize your notification</small>
            <div className="w-full mt-5">
                <ul className="text-gray-600 text-sm flex flex-col gap-3">
                    <li className="text-gray-800 first:font-semibold first:mb-1 text-[1.1rem]">Email</li>
                    <li className="flex items-center"><span className="w-[400px]">Order Placement Notification </span>
                        <NotificationSwitch {...{ status: status.sendOrderPlacementNotification, setStatus: (newStatus) => setStatus({ ...status, sendOrderPlacementNotification: newStatus }) }} /></li>
                    <li className="flex items-center"><span className="w-[400px]">Order Cancellation Notification </span>
                        <NotificationSwitch  {...{ status: status.sendCancellationNotification, setStatus: (newStatus) => setStatus({ ...status, sendCancellationNotification: newStatus }) }} /></li>
                    <li className="flex items-center"><span className="w-[400px]">Payment Notification </span>
                        <NotificationSwitch  {...{ status: status.sendPaymentReportNotification, setStatus: (newStatus) => setStatus({ ...status, sendPaymentReportNotification: newStatus }) }} /></li>
                    <li className="flex items-center"><span className="w-[400px]">Order Report </span>
                        <NotificationSwitch  {...{ status: status.sendOrderReportNotification, setStatus: (newStatus) => setStatus({ ...status, sendOrderReportNotification: newStatus }) }} /></li>
                    <li className="flex items-center"><span className="w-[400px]">Payment Report </span>
                        <NotificationSwitch  {...{ status: status.sendPaymentNotification, setStatus: (newStatus) => setStatus({ ...status, sendPaymentNotification: newStatus }) }} /></li>
                </ul>
                <ul className="text-gray-600 text-sm flex flex-col gap-3 mt-6">
                    <li className="text-gray-800 first:font-semibold first:mb-1 text-[1.1rem]">App</li>
                    <li className="flex items-center"><span className="w-[400px]">New Order Notification </span>
                        <NotificationSwitch  {...{ status: status.sendNewOrderNotification, setStatus: (newStatus) => setStatus({ ...status, sendNewOrderNotification: newStatus }) }} /></li>
                </ul>
            </div>
            <div className=" flex justify-center !w-[460px]">
                <Button onClick={() => dispatch(openModal({ component: <ConfirmChanges updateChanges={() => handleUpdateAdminSettings()} /> }))
                } className={"!rounded-full w-[100px] mt-12 ml-auto"}>Save</Button>
            </div>
        </div>
    )
}

const NotificationSwitch = ({ status, setStatus }) => {
    return (
        <Switch {...{ status, setStatus, rightLabel: true, leftLabel: false }} buttonStyle={'!h-5 !w-10 !-translate-y-2'} innerStyle={`!h-4 !w-4 ${status ? 'translate-x-5' : ""}`} />
    )
}

export default Notification