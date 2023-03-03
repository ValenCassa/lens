import { cn } from "@/utils/cn";
import { LinkedIn, Svg3DSelectFace, Twitter } from "iconoir-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Tooltip from "../Tooltip";
import SearchForm from "./SearchForm";

const Logo = () => {
  return (
    <span className={cn("flex", "items-center", "gap-1")}>
      <Image
        src={"/img/logo.png"}
        width={34}
        height={34}
        alt="logo"
        className="select-none"
      />
      <p className="font-medium text-lg">Lens</p>
      <span
        className={cn(
          "bg-orange-300 bg-opacity-20",
          "text-orange-400",
          "text-sm",
          "p-1",
          "leading-none",
          "font-medium",
          "rounded-smPlus",
          "px-2",
          "transform",
          "translate-y-[0.05rem]",
          "ml-0.5",
          "text-opacity-80"
        )}
      >
        for Reddit
      </span>
    </span>
  );
};

const Ad = () => {
  return (
    <div className="flex items-center gap-2 mt-3">
      <Tooltip label="Follow me on Twitter">
        <Link href={"https://twitter.com/devcassa"} target="_blank">
          <Twitter width={22} />
        </Link>
      </Tooltip>
      <Tooltip label="Find me on LinkedIn">
        <Link
          href={"https://www.linkedin.com/in/valentin-cassarino/"}
          target="_blank"
        >
          <LinkedIn width={22} />
        </Link>
      </Tooltip>
      <Tooltip label="Go see my portfolio">
        <Link href={"https://valencassa.dev"} target="_blank">
          <Svg3DSelectFace width={22} />
        </Link>
      </Tooltip>
    </div>
  );
};

const Sidebar = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      className={cn(className, "lg:sticky", "top-7", "self-start")}
      {...props}
    >
      <Logo />
      <SearchForm />
      <Ad />
    </div>
  );
};

export default Sidebar;
