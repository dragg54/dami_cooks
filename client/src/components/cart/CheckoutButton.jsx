/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { Button } from "../button/Button";
import { useSelector } from "react-redux";

const CheckoutButton = ({setCartOpen}) => {
    const cartItems = useSelector(state => state. cart)?.cartItems
    const navigate = useNavigate()
    return (
        <Button onClick={()=>{
            cartItems && cartItems.length && navigate("/checkout")
            setCartOpen(false)
        }}>
            Proceed to checkout
        </Button>
    )
}

export default CheckoutButton