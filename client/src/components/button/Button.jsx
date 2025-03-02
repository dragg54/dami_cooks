import { cn } from "../../utils/cn";

// eslint-disable-next-line react/prop-types
const Button = ({ className, children, ...props }) => {
  return (
    <button
      className={cn(
        "px-4 py-2 bg-primary md:text-sm text-white rounded-md hover:bg-secondary",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
