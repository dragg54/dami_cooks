/* eslint-disable react/prop-types */
import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md m-3">
      <h1 className="text-3xl font-bold mb-6">Refund & Cancellation Policy</h1>

      <p className="mb-4">
        At <strong>Dami Cooks</strong>, we aim to provide fresh, high-quality Nigerian foods. Please read our policy below:
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Cancellations</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Orders can be canceled <strong>up to 2 hours before delivery</strong> without charge</li>
          <li>Cancellations after this time may not be refundable due to preparation</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Refunds</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Refunds are provided if:
            <ul className="list-disc list-inside ml-6">
              <li>Wrong or missing items</li>
              <li>Food quality issues (e.g., spoiled or unsafe)</li>
            </ul>
          </li>
          <li>Refunds will <strong>only be issued</strong> after verification</li>
          <li>Refunds are processed via the original payment method (Stripe)</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Exceptions</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Custom or pre-ordered items may not be refundable</li>
          <li>Delivery delays outside our control (e.g., traffic) do not qualify for refunds</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">How to request a refund</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Contact support via email: <strong>damicooks25@gmail.com</strong></li>
          <li>Provide order number and reason</li>
        </ul>
      </section>
    </div>
  );
};

export default RefundPolicy;
