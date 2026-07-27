/* eslint-disable react/prop-types */


import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IoClose } from 'react-icons/io5'



const ModalTransparent = ({ isOpen, onClose, children }) => {
  return (
    <Transition.Root show={isOpen} as={Fragment} >
      <Dialog as="div" className="relative z-[555555555]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div 
            className="
              fixed 
              inset-0 
              bg-gray-500 
              bg-opacity-95 
              transition-opacity
            "
          />
        </Transition.Child>

        <div className="fixed inset-0 z-[555555555] overflow-y-auto ">
          <div 
            className="
              flex 
              items-center 
              justify-center 
              p-4 
              text-center 
              sm:p-0
            "
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel 
                className="
                  relative 
                  transform 
                  overflow-hidden 
                  overflow-y-auto 
                  rounded-lg 
                  bg-transparent
                  px-4 

                  pb-4
                  pt-5 
                  text-left 
                  transition-all
                   
                  sm:my-8 
                
                  sm:max-w-full 
                  md:h-[50rem] 
                  h-fit
               
                  sm:p-6
                  
                
                "
              >
                <div 
                  className="
                    absolute 
                    right-0 
                    top-0 
                     
                    pr-4 
                    pt-4 
                    block
                    z-10
                  "
                >
                  <button
                    type="button"
                    className="
                      rounded-md 
                      bg-white 
                      text-gray-400 
                      hover:text-gray-500 
                      focus:outline-none 
                      focus:ring-2 
                      focus:ring-indigo-500 
                      focus:ring-offset-2
                    "
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <IoClose className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ModalTransparent;
