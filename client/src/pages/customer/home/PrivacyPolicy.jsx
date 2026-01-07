/* eslint-disable react/prop-types */
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md m-3">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        <strong>Dami Cooks</strong> is committed to protecting and respecting your privacy.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Information we collect</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Name, email, phone number, delivery address</li>
          <li>Payment information (processed securely by Stripe)</li>
          <li>Order history and preferences</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">How we use your information</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>To process and deliver your food orders</li>
          <li>To communicate order updates and promotions</li>
          <li>To comply with legal obligations</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Sharing information</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>We do not sell your information to third parties</li>
          <li>Delivery partners (e.g., Stuart) receive your address and order details only to fulfill orders</li>
          <li>Payment processors (Stripe) handle payment data securely</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Your rights</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Access, correct, or delete your personal data</li>
          <li>Object to processing or request restrictions</li>
          <li>Withdraw consent at any time</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Cookies</h2>
        <p className="text-gray-700">
          We use cookies to improve user experience and analytics.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
