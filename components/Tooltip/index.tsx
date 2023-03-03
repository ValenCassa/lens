import React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import clsx from "clsx";
import localFont from "next/font/local";

interface TooltipProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
}

const satoshiFont = localFont({
  src: "../../public/fonts/Satoshi-Variable.ttf",
  variable: "--satoshi-font",
});

const Tooltip = ({ label, children, className }: TooltipProps) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <RadixTooltip.Provider delayDuration={2}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger type="button">{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            sideOffset={5}
            className={clsx(
              "font-sans",
              satoshiFont.variable,
              "z-50 font-medium overflow-hidden rounded-md border border-slate-100 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-md animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 ",
              "z-[99999999999]",
              className
            )}
          >
            {label}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

export default Tooltip;
