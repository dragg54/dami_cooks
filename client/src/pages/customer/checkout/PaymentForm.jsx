/* eslint-disable react/prop-types */
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from 'react-router-dom'
import { FaCreditCard } from "react-icons/fa";
import { Button } from "../../../components/button/Button";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../redux/CartSlice";

function PaymentForm({clientSecret, deliveryDetails}) {
  const stripe = useStripe();
  const elements = useElements(); 
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const cardElement = elements.getElement(CardNumberElement);
  if (!cardElement) {
    console.error("CardNumberElement not found!");
    return;
  }
    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${deliveryDetails?.firstName} ${deliveryDetails?.lastName}`,
            phone: deliveryDetails?.phone,
            address: {
              line1: deliveryDetails?.address || "",
              line2: "",
              city: "",
              state: "",
              postal_code: deliveryDetails?.postalCode || "",
              country: "GB",
            },
          }
      },
      shipping:{
        name: `${deliveryDetails?.firstName} ${deliveryDetails?.lastName}`,
        phone: deliveryDetails?.phone,
        address: {
          line1: deliveryDetails?.address || "",
          line2: "",
          city: "",
          state: "",
          postal_code: deliveryDetails?.postalCode || "",
          country: "GB",
      }
    },
      });

      if(paymentIntent && paymentIntent.status == "succeeded"){
        navigate("/success")
        dispatch(clearCart())
      }
    }
    catch (err) {
      console.log(err.message)
    }
  };

  return (
    <form style={{
        maxWidth: "400px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "20px"
      }} onSubmit={handleSubmit}>
    <div className="mt-1 w-full" style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
      <label className="text-sm text-gray-500">Card Details</label>
      <div className="border border-gray-400 p-2 relative">
        <CardNumberElement
          options={{
            style: {
              base: {
                border: "1px solid #747474",
                fontSize: "13px",
                color: "#212529",
                "::placeholder": { color: "#888" },
              },
              invalid: { color: "#dc3545" },
            },
          }}
        />
        <FaCreditCard className="absolute right-1 -top-1/2 h-full text-lg text-gray-500 translate-y-1/2" />
      </div>

      <div className="mt-4">
        <label className="text-sm text-gray-500">Expiry Date</label>
        <div className="border border-gray-400 p-2 mt-2 relative">
          <CardExpiryElement
            options={{
              style: {
                base: {
                  fontSize: "13px",
                  color: "#212529",
                  "::placeholder": { color: "#888" },
                },
                invalid: { color: "#dc3545" },
              },
            }}
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="text-sm text-gray-500">CVC</label>
        <div className="border border-gray-400 p-2 mt-2">
          <CardCvcElement
            options={{
              style: {
                base: {
                  fontSize: "13px",
                  color: "#212529",
                  "::placeholder": { color: "#888" },
                },
                invalid: { color: "#dc3545" },
              },
            }}
          />
        </div>
      </div>
    </div>
    <p className="text-gray-500 text-sm mt-3">
    Your personal data will be used to process your order, support your experience throughout this website,
      and for other purposes described in our privacy policy.
    </p>
     <Button className={'!rounded-full'}>Place Order</Button>
    </form>
  );
}

export default PaymentForm