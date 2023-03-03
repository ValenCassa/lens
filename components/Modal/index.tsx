import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import localFont from "next/font/local";
import React from "react";
import { twMerge } from "tailwind-merge";
import Spinner from "../Spinner";

const satoshiFont = localFont({
  src: "../../public/fonts/Satoshi-Variable.ttf",
  variable: "--satoshi-font",
});

const Modal = Dialog.Root as typeof Dialog.Root & {
  Overlay: typeof ModalOverlay;
  Content: typeof ModalContent;
  Title: typeof Dialog.Title;
  Description: typeof Dialog.Description;
  Close: typeof Dialog.Close;
  Trigger: typeof Dialog.Trigger;
  Portal: typeof Dialog.Portal;
  Footer: typeof ModalFooter;
};
const ModalTrigger = Dialog.Trigger;
const ModalPortal = Dialog.Portal;
const ModalOverlay = () => {
  return (
    <Dialog.Overlay
      className={clsx(
        "fixed",
        "bg-black",
        "bg-opacity-20",
        "inset-0",
        "backdrop-blur-sm",
        "animate-overlayShow",
        "z-[9999]"
      )}
    />
  );
};
const ModalContent = ({
  children,
  isLoading,
  ...props
}: Dialog.DialogContentProps & { isLoading?: boolean }) => {
  return (
    <Dialog.Content
      {...props}
      className={clsx(
        "bg-white",
        "rounded-md",
        "top-1/2",
        "left-1/2",
        "transform",
        "translate-x-[-50%]",
        "translate-y-[-50%]",
        "max-h-[85vh]",
        "overflow-y-auto",
        "animate-contentShow",
        "fixed",
        "z-[9999]",
        "focus:outline-none",
        satoshiFont.variable,
        "font-sans",
        props.className,
        "overflow-x-hidden"
      )}
    >
      <>{isLoading ? <Spinner /> : children}</>
    </Dialog.Content>
  );
};

const ModalFooter = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      {...props}
      className={twMerge(
        "relative before:-z-10 lg:sticky top-0 bg-white py-3 before:shadow-sm before:border-t before:border-gray-200 before:absolute before:-left-4 before:top-0 before:w-[200%] before:h-full",
        className
      )}
    >
      {children}
    </div>
  );
};

const ModalTitle = Dialog.Title;
const ModalDescription = Dialog.Description;
const ModalClose = Dialog.Close;

Modal.Overlay = ModalOverlay;
Modal.Content = ModalContent;
Modal.Title = ModalTitle;
Modal.Description = ModalDescription;
Modal.Close = ModalClose;
Modal.Trigger = ModalTrigger;
Modal.Portal = ModalPortal;
Modal.Footer = ModalFooter;

export default Modal;
