import { forwardRef } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { cn } from "@/utils/cn";
import { Check, NavArrowDown, NavArrowUp } from "iconoir-react";
import localFont from "next/font/local";

const satoshiFont = localFont({
  src: "../../public/fonts/Satoshi-Variable.ttf",
  variable: "--satoshi-font",
});

interface SelectProps {
  data: { value: string; label: string }[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const Select = ({ data, placeholder, value, onChange }: SelectProps) => (
  <RadixSelect.Root value={value} onValueChange={onChange}>
    <RadixSelect.Trigger
      className={cn(
        "inline-flex items-center justify-between leading-none h-[35px] text-violet11 data-[placeholder]:text-gray-500 outline-none w-full",
        "gap-2",
        "py-1.5",
        "px-2",
        "bg-gray-100",
        "rounded-smPlus",
        "text-sm",
        satoshiFont.variable,
        "font-sans",
        "focus:outline focus:outline-gray-200 focus:outline-offset-0"
      )}
      aria-label="Food"
    >
      <RadixSelect.Value placeholder={placeholder} />
      <RadixSelect.Icon className="text-violet11">
        <NavArrowDown height={18} width={18} />
      </RadixSelect.Icon>
    </RadixSelect.Trigger>
    <RadixSelect.Portal className="z-[9999999999]">
      <RadixSelect.Content
        className="overflow-hidden bg-gray-50 rounded-md shadow-md w-[var(--radix-select-trigger-width)] max-h-[var(--radix-select-content-available-height)]"
        position="popper"
      >
        <RadixSelect.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
          <NavArrowUp />
        </RadixSelect.ScrollUpButton>
        <RadixSelect.Viewport>
          {data.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </RadixSelect.Viewport>
        <RadixSelect.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
          <NavArrowDown />
        </RadixSelect.ScrollDownButton>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  </RadixSelect.Root>
);

const SelectItem = forwardRef<any, any>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <RadixSelect.Item
        className={cn(
          "text-sm leading-none rounded-smPlus flex items-center p-2 pl-[30px]  hover:bg-gray-100 relative select-none data-[highlighted]:outline-none data-[highlighted]:bg-gray-100 data-[highlighted]:text-black",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
        <RadixSelect.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <Check width={16} height={16} />
        </RadixSelect.ItemIndicator>
      </RadixSelect.Item>
    );
  }
);

SelectItem.displayName = "SelectItem";

export default Select;
