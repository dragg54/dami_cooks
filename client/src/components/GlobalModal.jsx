import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import { closeModal } from "../redux/GlobalModalSlice"

// eslint-disable-next-line react/prop-types
const GlobalModal = () => {
  const dispatch = useDispatch()
  const globalModal = useSelector(state => state.globalModal)
  const location = useLocation();

  // Close the modal when the route changes
  useEffect(() => {
    dispatch(closeModal());
  }, [location]);

  return (
    <div onClick={() => {
      dispatch(closeModal())
    }} className={`w-screen h-screen z-50 overflow-hidden bg-modal ${globalModal.opened? 'flex' : 'hidden'} items-center md:items-center  md:pt-0 justify-center fixed `}>
      {globalModal?.component}
    </div>
  )
}

export default GlobalModal