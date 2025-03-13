/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity } from "../../redux/CartSlice";

const ItemQuantityCounter = ({quantity=1, setQuantity, cartItem}) => {
    const dispatch = useDispatch()
    const increase = () => {
       dispatch(increaseQuantity(cartItem))
    };

    const decrease = () => {
        if (cartItem?.quantity > 1) {
            dispatch(decreaseQuantity(cartItem))
        }
    }
        return (
            <div className={`w-28 p-3 h-10 border shadow-sm shadow-gray-300 flex text-gray-500 items-center justify-between`}>
                <button onClick={()=> decrease()} className="text-2xl">-</button>
                <span className="">{cartItem?.quantity}</span>
                <button onClick={()=> increase()} className="text-2xl">+</button>
            </div>
        )
    }

    export default ItemQuantityCounter