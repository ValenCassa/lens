import { cn } from "@/utils/cn";

const Input = ({
  suffix,
  ...props
}: React.ComponentPropsWithoutRef<"input"> & { suffix?: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "flex",
        "items-center",
        "gap-2",
        "py-1.5",
        "px-2",
        "bg-gray-100",
        "rounded-smPlus",
        "text-sm"
      )}
    >
      <input
        {...props}
        data-value={String(!!props.value)}
        className={cn(
          "bg-transparent",
          "outline-none",
          "w-full",
          "placeholder-gray-600",
          "placeholder-opacity-50",
          "placeholder:transition-all",
          "transition-all",
          "duration-200",
          "ease-in-out",
          "focus:placeholder-opacity-0",
          "accent-gray-600"
        )}
      />
      {suffix}
    </div>
  );
};

export default Input;
