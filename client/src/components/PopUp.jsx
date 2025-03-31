import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closePopup } from "../redux/PopupSlice";

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
        <div className="fixed top-5 right-5 bg-green-500 text-white p-3 rounded shadow-lg transition-opacity duration-300">
          ✅ {popUp?.message}
        </div>
      )}
    </div>
  );
};

export default PopUp;
