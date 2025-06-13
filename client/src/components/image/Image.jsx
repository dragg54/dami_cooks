/* eslint-disable react/prop-types */
import { CiImageOn } from "react-icons/ci";

const Image = ({src, style}) => {
  return (
    <img className={`${style} h-full w-full flex items-center object-cover justify-center`} src={src} alt={'image'}/>
  )
}
export default Image