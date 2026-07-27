/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { app_routes } from "../../utils/app_routes";

const ExpandedDialogWithButton = ({
  isOpen,
  onClose,
  children,
  maxWidth,
  round,
}) => {
  const location = useLocation().pathname;

  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[10]" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full md:pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel
                    className={`pointer-events-auto w-full md:w-[${maxWidth ? maxWidth: "50rem"}] ${location===app_routes?.hrOperation?.performance?.setup && 'md:w-[65rem]'} bg-white ${round && "rounded-l-2xl"}`}
                  >
                    <div
                      className={`absolute cursor-pointer hover:bg-slate-50 top-2 md:top-3 right-5  border border-slate-400 rounded-full`}
                    >
                      <IoClose
                        className="text-slate-400 font-thin"
                        size={20}
                        onClick={onClose}
                      />
                    </div>
                    <div className="overflow-auto h-full">
                      {children}
                    </div>
                   
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

    </>
  );
};

export default ExpandedDialogWithButton;
