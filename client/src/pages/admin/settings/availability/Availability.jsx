import { useEffect, useState } from 'react'
import { Button } from '../../../../components/button/Button'
import Switch from '../../../../components/input/Switch'
import { useDispatch } from 'react-redux'
import FetchAdminSettings from '../api/FetchAdminSettings'
import UpdateAdminSettings from '../api/UpdateAdminSettings'
import { openModal } from '../../../../redux/GlobalModalSlice'
import ConfirmChanges from '../ConfirmChanges'

const Availability = () => {
    const { data: adminSettings, isLoading } = FetchAdminSettings()
    const dispatch = useDispatch()
    const [status, setStatus] = useState({
        isOnline: null,
        offlineDuration: null,

    })
    const mutateAdminSettings  = UpdateAdminSettings()
    useEffect(() => {
        setStatus({
            isOnline: adminSettings?.isOnline,
            offlineDuration: adminSettings?.offlineDuration,
        })
    }, [adminSettings, isLoading])

    const handleUpdateAdminSettings = () => {
        mutateAdminSettings.mutate(status)
    }   
    if(isLoading){
        return <>Loading...</>
    }
     return (
        <div className='w-full p-6'>
            <h1 className='text-xl font-semibold'>Availability</h1>
            <small className='text-gray-400'>Manage your availabilty</small>
            <div className='mt-6'>
                <ul className="text-gray-600 text-sm flex flex-col gap-8 mt-6 w-[700px]">
                    <li className="flex justify-between items-center"><span className="w-[400px]"><span>Online</span> </span><AvailabilitySwitch setStatus={(newStatus)=> setStatus({...status, isOnline: newStatus})} {...{ status: status.isOnline }} /></li>
                    <li className="flex justify-between items-center"><span className="w-[400px]"><span>Online Duration</span></span><span className='text-gray-400'>Always Available</span></li>
                    <li className="flex justify-between items-center"><span className="w-[400px]"><span>Offline Duration</span></span>
                        <span><input onChange={(e)=>{
                            setStatus({...status, offlineDuration: e.target.value})
                        }} type="number" value={status.offlineDuration} className='border p-3 !w-20 !h-6 bg-gray-100 mr-2' />Hours</span>
                    </li>
                </ul>
            </div>
            <div className=" flex justify-end w-[700px]">
            <Button onClick={() => dispatch(openModal({ component: <ConfirmChanges updateChanges={() => handleUpdateAdminSettings()} /> }))
                } className={"!rounded-full w-[100px] mt-12 ml-auto"}>Save</Button>           
            </div>
        </div>
    )
}

const AvailabilitySwitch = ({ status, setStatus }) => {
    return (
        <Switch {...{ status, setStatus, rightLabel: true, leftLabel: false }} buttonStyle={'!h-5 !w-10 !-translate-y-2'} innerStyle={`!h-4 !w-4 ${status ? 'translate-x-5' : ""}`} />
    )
}
export default Availability