
import { useNavigate } from "react-router-dom";
import { Button } from "../button/Button";

const CheckoutButton = () => {
    const navigate = useNavigate()
    return (
        <Button onClick={()=> navigate("/checkout")}>
            Process to checkout
        </Button>
    )
}

export default CheckoutButton