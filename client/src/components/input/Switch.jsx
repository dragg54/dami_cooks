/* eslint-disable react/prop-types */

const Switch = ({ orderId, status, setStatus, leftLabel, rightLabel, buttonStyle, innerStyle }) => {
  const handleToggle = (e) => {
    e.preventDefault()
    const newStatus = status === rightLabel ? leftLabel : rightLabel;
    setStatus(newStatus);
  };
 console.log(status == rightLabel)
  return (
    <div className="flex items-center space-x-3 mt-3">
      <span className={`text-sm font-medium `}>
      </span>
      <button
        onClick={handleToggle}
        className={`${buttonStyle} w-16 h-8 border shadow-md shadow-gray-400 rounded-full  transition`}
        >
        <div
          className={`${innerStyle} w-6 h-6 bg-white border shadow-gray-500 rounded-full shadow-md transform transition ${
            status === rightLabel ? "translate-x-10" : "translate-x-0"
          }`}
        ></div>
      </button>
    </div>
  );
};

export default Switch;
