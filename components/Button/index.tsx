import { cn } from "@/utils/cn";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary";
  suffix?: React.ReactNode;
}

const Button = ({
  variant = "primary",
  children,
  suffix,
  className,
  ...props
}: ButtonProps) => {
  const primaryClasses = cn("bg-black", "text-white", "hover:bg-gray-800");
  const secondaryClasses = cn(
    "bg-gray-100",
    "text-gray-800",
    "hover:brightness-[95%]",

    "border",
    "border-gray-200"
  );

  const VARIANTS = {
    primary: primaryClasses,
    secondary: secondaryClasses,
  };

  return (
    <button
      className={cn(
        "py-1",
        VARIANTS[variant],
        suffix ? "items-center flex gap-2 justify-between" : "text-center",
        "px-1.5",
        "rounded-smPlus",
        "text-sm",
        "font-medium",
        "h-8",
        "transition-all",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {suffix}
    </button>
  );
};

export default Button;
