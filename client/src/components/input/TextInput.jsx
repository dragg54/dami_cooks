/* eslint-disable react/prop-types */
import { Field, ErrorMessage } from "formik";

const TextInput = ({ label, isReadonly, name, type = "text", ...props }) => {
  return (
    <div className="">
      <label className="block text-sm font-medium mb-3">{label}</label>
      <Field
        type={type}
        name={name}
        readOnly={isReadonly || false}
        className="w-full border  border-gray-400 rounded-md p-2 text-gray-500 text-sm md:text-base"
        {...props}
      />
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
    </div>
  ); 
};

export default TextInput;
