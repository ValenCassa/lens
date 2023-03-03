import { cn } from "@/utils/cn";
import Tooltip from "../Tooltip";
import Info from "public/svgs/info.svg";

const InputWrapper = ({
  children,
  className,
  label,
  error,
  tooltip,
}: React.ComponentPropsWithoutRef<"fieldset"> & {
  label: string;
  error?: string;
  tooltip?: string;
}) => {
  return (
    <fieldset className={cn(className, "grid")}>
      <label className="text-gray-800 mb-0.5 text-[15px]">
        {label}
        {!!tooltip && (
          <span className={"ml-0.5 inline-block"}>
            <Tooltip label={tooltip}>
              <Info />
            </Tooltip>
          </span>
        )}
      </label>
      {children}
      {error && <span className="text-[13px] text-red-600">{error}</span>}
    </fieldset>
  );
};

export default InputWrapper;
