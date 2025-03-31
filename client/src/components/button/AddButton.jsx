/* eslint-disable react/prop-types */
import { FaPlus } from "react-icons/fa"
import { Button } from "./Button"
import { cn } from "../../utils/cn"

const AddButton = ({className, ...props}) => {
  return (
   <Button className={cn('flex justify-center !w-[100px] items-center gap-2 !rounded-full border-gray-500 border', className)} {...props}>
     Add <FaPlus />
   </Button>
  )
}

export default AddButton