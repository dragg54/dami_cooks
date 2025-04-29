/* eslint-disable react/prop-types */
import { cn } from "../../utils/cn";
import Spinner  from "../Spinner"

// eslint-disable-next-line react/prop-types
const Button = ({ className, children, ...props }) => {
  return (
    <button
     disabled = {props.isLoading}
      className={cn(
        "px-4 py-2 bg-primary z-10 !cursor-pointer w-full text-xs md:text-sm text-white rounded-md hover:shadow-lg shadow-gray-600",
        className
      )}
      {...props}
    >
      {props.isLoading ? <Spinner style={'!h-4 !w-4 mx-auto !border-t-white !border-x-white !border-b-gray-300'} isLoading={props.isLoading}/>: children}
    </button>
  );
};

export { Button };
