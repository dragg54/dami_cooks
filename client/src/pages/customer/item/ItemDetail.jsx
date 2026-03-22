import { useLocation } from "react-router-dom"
import ItemImage from "../../../components/Item/ItemImage"
import AddToCartButton from "../../../components/button/AddToCartButton"
import { PoundSterling } from "lucide-react"
import { Euro } from "@/constants/Currency"

const ItemDetail = () => {
    const location = useLocation()
    const { item } = location.state
    const itemContent = (!item || !item.unitQuantity || !item.uom) ? "": `(${item?.unitQuantity} ${item?.uom})`
    return (
        <div className="w-full  md:flex-row mb-20 items-center flex flex-col bg-white pt-8 p-5">
            <div className="md:w-1/2 md:h-full flex justify-center ">
                <div className="!w-[200px] !h-[200px] rounded-full overflow-hidden flex justify-center items-center">
                    <ItemImage style={'h-full w-full'} {...{ item }} />
                </div>
            </div>
            <div className="md:w-1/2 w-full mt-8 md:mt-0">
                <p className="text-2xl font-semibold text-[#ffa303]">{item.name}</p>
                <p className="mt-4 text-gray-700 text-sm md:w-2/3 whitespace-normal">{item.description}</p>
                <p className="mt-4 text-3xl flex items-center  font-extrabold"><Euro className=""/>{item.price}<span className="text-black ml-2 mt-2 text-sm">{itemContent}</span></p>
                <p className=" mt-3 text-green-600">{item.status == "ONLINE" ? "Available" : "Unavailable"}</p>
                <div className="mt-6">
                  <p><span className="font-semibold">Allergens</span>: {(!item.allergens || item.allergens?.length < 0) ? "Allergens unspecified" :item.allergens.map((allergen, index) => (
                    <span className="text-gray-600" key={index}>{allergen.name}{index+1 < item.allergens.length && ", "}</span>
                  ))}</p>
                </div>
                <div className="md:w-2/3 h-20 mt-6 flex items-center gap-4">
                    <AddToCartButton {...{ item , style:"!w-full !py-3"}} />
                </div>
            </div>
        </div>
    )
}

export default ItemDetail