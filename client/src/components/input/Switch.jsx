import { useState } from "react";

const OrderSwitch = ({ orderId, initialStatus = "pending", onUpdate }) => {
  const [status, setStatus] = useState(initialStatus);

  const handleToggle = () => {
    const newStatus = status === "accepted" ? "rejected" : "accepted";
    setStatus(newStatus);
    onUpdate(orderId, newStatus); // Call parent function to update order
  };

  return (
    <div className="flex items-center space-x-3">
      <span className={`text-sm font-medium ${status === "accepted" ? "text-green-600" : "text-red-600"}`}>
        {status === "accepted" ? "Accepted" : "Rejected"}
      </span>
      <button
        onClick={handleToggle}
        className={`relative w-12 h-6 rounded-full p-1 transition ${
          status === "accepted" ? "bg-green-500" : "bg-red-500"
        }`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition ${
            status === "accepted" ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};

export default OrderSwitch;
