import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closePopup } from "../redux/PopupSlice";
import { IoMdCheckmark } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";

const PopUp = () => {
  const popUp = useSelector(state => state.popUp)
  const dispatch = useDispatch()


  useEffect(()=>{
    setTimeout(() => {
       dispatch(closePopup())
      }, 3000);
  }, [popUp])
  return (
    <div>
      
      {popUp?.isOpened && popUp?.message && (
        <div className="fixed flex items-center gap-2 bg-white top-5 right-5  text-gray-500 p-3 border rounded shadow-lg transition-opacity duration-300">
          {(popUp.success || popUp.success == null) ? <IoMdCheckmark />: <span className="text-red-500"><MdOutlineCancel/></span>} {popUp?.message}
        </div>
      )}
    </div>
  );
};

export default PopUp;
