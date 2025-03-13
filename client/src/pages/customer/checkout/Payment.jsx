/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { CardElement, useStripe, useElements, PaymentElement, Elements } from "@stripe/react-stripe-js";
import { usePostData } from "../../../hooks/usePostData";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { Button } from "../../../components/button/Button";

const Payment = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

  const CARD_OPTIONS = {
    style: {
      base: {
        fontSize: "16px",
        color: "#32325d",
        display: "flex",
        fontFamily: "'Poppins', sans-serif",
        "::placeholder": {
          color: "#aab7c4",
        },
        flexDirection: "column",
        padding: "10px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
      },
      invalid: {
        color: "#fa755a",
      },
    },
  };
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");


  const cart = useSelector(state => state.cart)

  const onSuccess = (data) => {
    console.log("data", data)
    setClientSecret(data.data.clientSecret)
  }

  const onError = (err) => {
    console.log(err.message)
  }

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#007bff",
      colorBackground: "#f8f9fa",
      colorText: "#212529",
      colorDanger: "#dc3545",
      fontFamily: "Arial, sans-serif",
      spacingUnit: "5px",
    },
    rules: {
      ".Input": {
        display: "flex",
        flexDirection: "column",
      },
      ".Label": {
        fontWeight: "bold",
      },
      ".StripeElement": {
        marginBottom: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: "100%"
      },
    },
  };

  useEffect(() => {
    const cartItems = cart.cartItems?.map(cartItem => (
      {...cartItem.item, quantity:cartItem.quantity}
    ))
    mutate({ items: cartItems })
  }, [cart, cart?.cartItems])


  console.log(clientSecret)

  const { mutate, isLoading, isError, isSuccess } = usePostData({ onSuccess, onError, url: '/payments' })

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;
    console.log(clientSecret)
    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

  };
  if (isLoading) {
    return <>Loading...</>
  }
  if(!clientSecret){
    return <div>A form needs to be here</div>
  }
  return (
    <div className="h-auto p-4 w-full border border-gray-300 shadow-md shadow-gray-300 rounded-md p-6 pb-10">
      <h2 className="font-bold text-2xl ">Payment</h2>
      <p className="border-b border-gray-300 mb-6 text-gray-500 pb-4 text-xs">Pay with stripe</p>
      <form style={{
        maxWidth: "400px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "20px"
      }} onSubmit={handleSubmit}>
        <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
          <PaymentForm />
        </Elements>
        <p className="text-gray-500 text-sm mt-3">
        Your personal data will be used to process your order, support your experience throughout this website,
         and for other purposes described in our privacy policy.
        </p>
        <Button className={'!rounded-full'}>Place Order</Button>
      </form>

    </div>
  );
};

export default Payment;
