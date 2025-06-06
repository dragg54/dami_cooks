import { useLocation } from "react-router-dom"
import ItemImage from "../../../components/Item/ItemImage"
import AddToCartButton from "../../../components/button/AddToCartButton"

const ItemDetail = () => {
    const location = useLocation()
    const { item } = location.state
    return (
        <div className="w-full  md:flex-row items-center flex flex-col bg-white pt-8 p-5">
            <div className="md:w-1/2 md:h-full flex justify-center ">
                <div className="!w-[200px] !h-[200px] rounded-full overflow-hidden flex justify-center items-center">
                    <ItemImage style={'h-full w-full'} {...{ item }} />
                </div>
            </div>
            <div className="md:w-1/2 w-full mt-8 md:mt-0">
                <p className="text-2xl font-semibold">{item.name}</p>
                <p className="mt-4 text-gray-400 text-sm md:w-2/3 whitespace-normal">{item.description}</p>
                <p className="mt-4 text-3xl  text-[#fdb750] font-bold">€{item.price}</p>
                <p className=" mt-3 text-green-600">{item.status == "ONLINE" ? "Available" : "Unavailable"}</p>
                <div className="w-2/3 h-20 mt-8 flex items-center gap-4">
                    <AddToCartButton {...{ item }} />
                </div>
            </div>
        </div>
    )
}

export default ItemDetail