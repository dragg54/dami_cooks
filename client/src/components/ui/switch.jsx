/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import * as React from "react";
import { cn } from "@/lib/utils";

const Switch = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition",
        props.checked ? "bg-blue-600" : "bg-gray-300",
        className
      )}
      onClick={() => props.onCheckedChange?.(!props.checked)}
      {...props}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white transition",
          props.checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  );
});

export { Switch };
