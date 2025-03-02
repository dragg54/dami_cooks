/* eslint-disable react/prop-types */
import { Field, ErrorMessage } from "formik";

const TextInput = ({ label, name, type = "text", ...props }) => {
  return (
    <div className="">
      <label className="block text-sm font-medium">{label}</label>
      <Field
        type={type}
        name={name}
        placeholder = {label}
        className="w-full border rounded-md p-2 text-sm md:text-base"
        {...props}
      />
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
    </div>
  );
};

export default TextInput;
