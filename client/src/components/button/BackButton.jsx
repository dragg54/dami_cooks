import { IoReturnDownBackOutline } from "react-icons/io5";
import { Button } from './Button'

const BackButton = ({...props}) => {
    return (
        <Button className='h-10 flex !w-[100px] items-center gap-2 !rounded-full bg-slate-400 border-gray-600' {...props}>
         Back <IoReturnDownBackOutline />
        </Button>
       )
}

export default BackButton