/* eslint-disable react/prop-types */
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";
import { CiWarning } from "react-icons/ci";
import { VscError } from "react-icons/vsc";
import Spinner from "./Spinner";


const Response = ({ style, responseStatus, isLoading }) => {
  if(isLoading){
    return(
      <div className={style + ` md:mt-12 gap-6 w-full px-4 items-center py-3 flex bg-secondary`}>
       <div className="w-6 h-6">
          <Spinner {...{isLoading}}/>
       </div>
          <p className="text-gray-600">Process request...</p>
    </div>
    )
  }
  switch (responseStatus) {
    case 200:
      return (
        <div className={style + ` md:mt-12 w-full px-4 gap-6 text-gray-600 items-center py-3 flex bg-green-500`}>
          <IoMdCheckmark />
          <p>Request Successful</p>
        </div>
      )
    case 201:
      return (
        <div className={style + ` md:mt-12 w-full px-4 gap-6 text-gray-600 items-center py-3 flex bg-green-500`}>
          <IoMdCheckmark />
          <p>Request Successful</p>
        </div>
      )
      case 400:
      return (
        <div className={style + ` md:mt-12 w-full px-4 gap-6 items-center py-3 text-gray-200 flex bg-red-500`}>
          <CiWarning />
          <p>Operation Failed: Seems like your request is invalid</p>
        </div>
      )
    case 409:
      return (
        <div className={style + ` md:mt-12 w-full px-4 gap-6 items-center py-3 text-gray-200 flex bg-red-500`}>
          <CiWarning />
          <p>Operation Failed: Duplicate Request</p>
        </div>
      )
    case 500:
      return (
        <div className={style + ` md:mt-12 w-full px-4 gap-6 items-center py-3 flex bg-green-500`}>
          <VscError />
          <p>Ooops!! Something happened</p>
        </div>
      )
    default:
      return (
        <div className={style + ` md:mt-12 w-full px-4 items-center py-3 flex bg-secondary`}>
          <IoMdInformationCircleOutline />
        </div>
      )
  }
 
}

export default Response