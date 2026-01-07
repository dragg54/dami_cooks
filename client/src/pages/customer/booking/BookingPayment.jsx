/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { CardElement, useStripe, useElements, PaymentElement, Elements, CardNumberElement } from "@stripe/react-stripe-js";
import { usePostData } from "../../../hooks/api/usePostData";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { useLocation } from "react-router-dom";

const BookingPayment = ({deliveryDetails, clientSecret, setClientSecret, shippingChargeResponse}) => {
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
//

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


  if (!clientSecret) {
    return <div>A form needs to be here</div>
  }
  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
      <div className="h-auto p-4 w-full border border-gray-300 bg-white shadow-md shadow-gray-300 rounded-md p-6 pb-10">
        <h2 className="font-bold text-2xl ">Payment</h2>
        <p className="border-b border-gray-300 mb-6 text-gray-500 pb-4 text-xs">Pay with stripe</p>
        <PaymentForm {...{clientSecret, deliveryDetails, shippingChargeResponse}}/>
      </div>
    </Elements>
  );
};

export default BookingPayment;
