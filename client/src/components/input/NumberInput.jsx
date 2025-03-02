/* eslint-disable react/prop-types */
import { useState } from "react";

const NumberInput = ({ min = 1, max = 100, step = 1, onChange }) => {
  const [value, setValue] = useState(min);

  const handleChange = (e) => {
    const newValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setValue(newValue === "" ? "" : Math.min(Math.max(Number(newValue), min), max));
    onChange && onChange(newValue);
  };

  const increase = () => {
    if (value < max) {
      setValue((prev) => {
        const newValue = Math.min(prev + step, max);
        onChange && onChange(newValue);
        return newValue;
      });
    }
  };

  const decrease = () => {
    if (value > min) {
      setValue((prev) => {
        const newValue = Math.max(prev - step, min);
        onChange && onChange(newValue);
        return newValue;
      });
    }
  };

  return (
    <div className="flex items-center space-x-2 border rounded-md p-2 w-32">
      <button
        onClick={decrease}
        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        -
      </button>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="w-12 text-center outline-none"
      />
      <button
        onClick={increase}
        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        +
      </button>
    </div>
  );
};

export default NumberInput;
