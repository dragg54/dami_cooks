import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { FaCreditCard } from "react-icons/fa";

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: "https://your-site.com/confirmation" },
    });

    if (error) console.log(error);
    else console.log("PaymentIntent:", paymentIntent);

    setIsLoading(false);
  };

  return (
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
  );
}

export default PaymentForm