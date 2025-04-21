/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { CardElement, useStripe, useElements, PaymentElement, Elements, CardNumberElement } from "@stripe/react-stripe-js";
import { usePostData } from "../../../hooks/api/usePostData";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { Button } from "../../../components/button/Button";

const Payment = ({deliveryDetails, clientSecret}) => {
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


  const cart = useSelector(state => state.cart)

  const onSuccess = (data) => {
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
      { ...cartItem.item, quantity: cartItem.quantity }
    ))
    mutate({ items: cartItems })
  }, [cart, cart?.cartItems])


  const { mutate, isLoading, isError, isSuccess } = usePostData({ onSuccess, onError, url: '/payments' })

  useEffect(() => {
    if (elements) {
      console.log("CardNumberElement:", elements.getElement(CardNumberElement));
    }
  }, [elements]);
  

  if (isLoading) {
    return <>Loading...</>
  }
  if (!clientSecret) {
    return <div>A form needs to be here</div>
  }
  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
      <div className="h-auto p-4 w-full border border-gray-300 bg-white shadow-md shadow-gray-300 rounded-md p-6 pb-10">
        <h2 className="font-bold text-2xl ">Payment</h2>
        <p className="border-b border-gray-300 mb-6 text-gray-500 pb-4 text-xs">Pay with stripe</p>
        <PaymentForm {...{clientSecret, deliveryDetails}}/>
      </div>
    </Elements>
  );
};

export default Payment;
