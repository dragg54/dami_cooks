/* eslint-disable react/prop-types */
import { useFormik } from "formik";

const CheckBoxInput = ({ label, name, value, onChange, checked }) => {
  return (
    <label className="flex items-start space-x-2 cursor-pointer">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="hidden" // Hide default checkbox
      />
      <div
        className={`w-5 h-5 border-2 rounded ${
          checked ? "bg-blue-500 border-blue-500" : "border-gray-400"
        } flex items-center justify-center`}
      >
        {checked && <span className="text-white font-bold">✓</span>}
      </div>
      <span className="text-gray-600 text-sm">{label}</span>
    </label>
  );
};


export default CheckBoxInput;
