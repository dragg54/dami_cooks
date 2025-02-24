import { cn } from "../../utils/cn";

const Button = ({ className, children, ...props }) => {
  return (
    <button
      className={cn(
        "px-4 py-2 bg-primary text-sm text-white rounded-md hover:bg-secondary",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
