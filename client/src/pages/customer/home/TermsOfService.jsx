/* eslint-disable react/prop-types */
import React from 'react';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md m-3">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

      <p className="mb-4">
        Welcome to <strong>Dami Cooks</strong>. By using our website or ordering services, you agree to the following terms:
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Ordering</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Orders are for personal use only</li>
          <li>All prices are in GBP unless stated otherwise</li>
          <li>We reserve the right to cancel orders if stock or ingredients are unavailable</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Delivery</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Delivery times are estimates only</li>
          <li>We are not responsible for delays caused by third-party couriers</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Payment</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>All payments are processed securely via Stripe</li>
          <li>Orders are not confirmed until payment is successful</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">User obligations</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Provide accurate delivery information</li>
          <li>Respect our staff and partners</li>
          <li>Report issues or complaints promptly</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Liability</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Our liability is limited to the cost of the order</li>
          <li>We are not liable for indirect or consequential damages</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Changes</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>We may update these Terms at any time</li>
          <li>Updated terms will be posted on this page</li>
        </ul>
      </section>
    </div>
  );
};

export default TermsOfService;
