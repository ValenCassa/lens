import { cn } from "@/utils/cn";

const Command = ({ cmd }: { cmd: string }) => {
  return (
    <span
      className={cn(
        "px-1.5",
        "h-6",
        "flex",
        "items-center",
        "bg-white",
        "border-gray-200",
        "border",
        "text-gray-600",
        "rounded-[5px]",
        "whitespace-nowrap",
        "text-sm",
        "font-medium"
      )}
    >
      {cmd}
    </span>
  );
};

export default Command;
