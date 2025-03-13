/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { X } from "lucide-react";
import ItemImage from "../Item/ItemImage";
import ItemQuantityCounter from "../Item/ItemQuantityCounter";
import { euro } from "../../constants/Currency";
import { useSelector } from "react-redux";
import CheckoutButton from "./CheckoutButton";
import { useState } from "react";

const Cart = ({ cartOpen, setCartOpen }) => {
  const cart = useSelector(state => state.cart)
  return (
    <div className="relative">
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Sidebar Menu */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: cartOpen ? "0%" : "100%" }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 p-5 flex flex-col"
      >
        {/* Close Button */}
        <button className="self-end mb-5 text-gray-400" onClick={() => setCartOpen(false)}>
          <X size={24} />
        </button>

        {/* Navigation Links */}
        <div className="w-full">
          <h1 className="text-2xl font-semibold mb-16">Cart</h1>
          <div className="w-full flex flex-col mb-8">
          {
            cart && cart.cartItems && cart.cartItems.length > 0 && cart.cartItems.map((cart) => (
              <div className="w-full flex items-center gap-3" key={cart.id}>
                  <div className="w-1/3">
                  <ItemImage item={cart.item} style={'!w-16 !h-16 rounded-full'}/>
                </div>
                <ItemDtl {...{cartItem: cart}}/>
              </div>
            ))
          }
          </div>
        </div>
        <CheckoutButton items={cart.cartItems}/>
      </motion.div>
    </div>
  );
};

const ItemDtl = ({cartItem}) => {
  const [quantity, setQuantity ] = useState(1)
  return (
    <div className="w-[2/3] mt-4">
      <p className="font-semibold mb-4">{cartItem.item?.name}</p>
      <ItemQuantityCounter {...{quantity, setQuantity, cartItem}} style={'!h-6 !mt-5'} />
      <p className="mt-3 text-orange-700 font-semibold">{euro}{cartItem.item?.price}</p>
    </div>
  )
}

export default Cart;
