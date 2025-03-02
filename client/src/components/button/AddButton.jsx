import { FaPlus } from "react-icons/fa"
import { Button } from "./Button"

const AddButton = ({...props}) => {
  return (
   <Button className='h-10 flex items-center gap-2 !rounded-full border-gray-500 border' {...props}>
    Add <FaPlus />
   </Button>
  )
}

export default AddButton